'use server'
import { createClient } from '@/lib/supabase/server'

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

  // 🔌 Aquí va Mercado Pago (RF-04)
  // const mpUrl = await createMercadoPagoPreference(order, payload.items)
  // return { orderId: order.id, redirectUrl: mpUrl }

  return { orderId: order.id }
}
