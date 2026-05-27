import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; status?: string; payment_id?: string }>
}) {
  const { order, status, payment_id } = await searchParams

  // Si MP redirigió con status=approved, actualizamos el pedido a "paid"
  if (order && (status === 'approved' || payment_id)) {
    const supabase = await createClient()
    await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', order)
      .eq('status', 'pending')
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#639922" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <h1 className="font-display text-3xl font-bold text-stone-800 mb-3">
          ¡Pedido confirmado!
        </h1>
        <p className="text-stone-500 mb-2">
          Gracias por tu compra. Hemos recibido tu pedido correctamente.
        </p>
        {order && (
          <p className="text-xs text-stone-300 font-mono mb-8">
            Orden #{order.slice(0, 8).toUpperCase()}
          </p>
        )}

        <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-8 text-left space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <p className="text-sm text-stone-600">
              Te contactaremos al teléfono indicado para coordinar el retiro o delivery.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <p className="text-sm text-stone-600">
              Tu pago fue procesado correctamente. ¡Gracias por tu confianza!
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/cuenta/dashboard"
            className="block w-full bg-stone-800 hover:bg-stone-700 text-white py-3.5 rounded-full font-bold uppercase tracking-widest text-sm transition-all"
          >
            Ver mis pedidos
          </Link>
          <Link
            href="/"
            className="block w-full border border-stone-200 text-stone-600 hover:border-stone-300 py-3.5 rounded-full font-semibold text-sm transition-all"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
