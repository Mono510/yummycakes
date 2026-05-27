import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '../actions'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/cuenta/login')

  const fullName = user.user_metadata?.full_name ?? user.email

  const { data: orders } = await supabase
    .from('orders')
    .select('id, status, total, created_at, delivery_type')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const allOrders = orders ?? []
  const totalOrders = allOrders.length
  const inProgress = allOrders.filter(o =>
    ['pending', 'paid', 'preparing', 'ready'].includes(o.status)
  ).length
  const completed = allOrders.filter(o => o.status === 'delivered').length

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n)

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('es-CL', {
      day: 'numeric', month: 'long', year: 'numeric',
    })

  const STATUS_LABELS: Record<string, string> = {
    pending: 'Pendiente',
    paid: 'Pagado',
    preparing: 'En preparación',
    ready: 'Listo para entrega',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-stone-400 text-sm uppercase tracking-widest mb-1">Mi cuenta</p>
            <h1 className="font-display text-3xl text-stone-800 font-bold">
              Hola, {fullName} 👋
            </h1>
            <p className="text-stone-400 text-sm mt-1">{user.email}</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-stone-500 hover:text-rose-500 border border-stone-200 hover:border-rose-300 px-4 py-2 rounded-full transition-all"
            >
              Cerrar sesión
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
            <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
            </div>
            <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Pedidos totales</p>
            <p className="text-2xl font-bold text-stone-800">{totalOrders}</p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
            <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">En proceso</p>
            <p className="text-2xl font-bold text-stone-800">{inProgress}</p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
            <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Completados</p>
            <p className="text-2xl font-bold text-stone-800">{completed}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-stone-50">
            <h2 className="font-semibold text-stone-800 uppercase tracking-widest text-sm">
              Historial de compras
            </h2>
          </div>

          {allOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4d0cc" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              </div>
              <p className="text-stone-400 font-medium">Aún no tienes pedidos</p>
              <p className="text-stone-300 text-sm mt-1">Cuando hagas tu primera compra, aparecerá aquí.</p>
              <a href="/catalogo" className="mt-6 bg-rose-400 hover:bg-rose-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all">
                Ver productos
              </a>
            </div>
          ) : (
            <div className="divide-y divide-stone-50">
              {allOrders.map(order => (
                <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-stone-700">
                      Pedido #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">{formatDate(order.created_at)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-stone-800">{formatPrice(order.total)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                      order.status === 'cancelled' ? 'bg-red-50 text-red-500' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
