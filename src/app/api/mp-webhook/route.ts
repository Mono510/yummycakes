import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // MP envía type=payment cuando se aprueba un pago
    if (body.type !== 'payment' || !body.data?.id) {
      return NextResponse.json({ ok: true })
    }

    const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! })
    const payment = new Payment(mp)
    const paymentData = await payment.get({ id: body.data.id })

    if (paymentData.status !== 'approved') {
      return NextResponse.json({ ok: true })
    }

    const orderId = paymentData.external_reference
    if (!orderId) return NextResponse.json({ ok: true })

    const supabase = await createClient()
    await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', orderId)
      .eq('status', 'pending')

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Webhook MP error:', err)
    return NextResponse.json({ error: 'error' }, { status: 500 })
  }
}
