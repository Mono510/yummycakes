'use server'
import { createClient } from '@/lib/supabase/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

interface OrderPayload {
  userId: string | null
  guestName: string
  guestEmail: string
  guestPhone: string
  deliveryType: 'pickup' | 'delivery'
  deliveryAddress: string
  commune: string | null
  scheduledDate: string
  scheduledTimeSlot: string
  notes: string
  paymentMethod: string
  items: {
    productId: string
    quantity: number
    unitPrice: number
    size: string
  }[]
  total: number
}

export async function createOrder(payload: OrderPayload) {
  const supabase = await createClient()

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: payload.userId,
      guest_name: payload.guestName,
      guest_email: payload.guestEmail,
      guest_phone: payload.guestPhone,
      status: 'pending',
      total: payload.total,
      delivery_type: payload.deliveryType,
      delivery_address: payload.deliveryAddress,
      commune: payload.commune,
      scheduled_date: payload.scheduledDate,
      scheduled_time_slot: payload.scheduledTimeSlot,
      notes: payload.notes || null,
    })
    .select()
    .single()

  if (orderError) {
    console.error('Error creando orden:', orderError)
    return { error: 'No se pudo crear el pedido. Intenta de nuevo.' }
  }

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(
      payload.items.map(item => ({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        size: item.size,
      }))
    )

  if (itemsError) {
    console.error('Error creando items:', itemsError)
    return { error: 'Error al guardar los productos del pedido.' }
  }

  // Mercado Pago Checkout Pro — siempre, retiro o delivery
  try {
      const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })
      const preference = new Preference(mp)

      const result = await preference.create({
        body: {
          items: payload.items.map(item => ({
            id: item.productId,
            title: `Producto × ${item.quantity}`,
            quantity: item.quantity,
            unit_price: item.unitPrice,
            currency_id: 'CLP',
          })),
          payer: {
            name: payload.guestName,
            email: payload.guestEmail,
            phone: { number: payload.guestPhone },
          },
          back_urls: {
            success: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/checkout/confirmacion?order=${order.id}`,
            failure: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/checkout?error=pago-fallido`,
            pending: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/checkout/confirmacion?order=${order.id}&status=pending`,
          },
          external_reference: order.id,
          auto_return: process.env.NEXT_PUBLIC_SITE_URL ? 'approved' : undefined,
          notification_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/mp-webhook`,
        },
      })

      return { orderId: order.id, redirectUrl: result.init_point! }
  } catch (err: any) {
    console.error('Error Mercado Pago:', err?.message ?? err)
    return { error: 'No se pudo conectar con Mercado Pago. Intenta de nuevo.' }
  }
}
