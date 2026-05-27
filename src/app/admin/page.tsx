import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const formatPrice = (n: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n)

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  preparing: 'En preparación',
  ready: 'Listo',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-600',
  paid: 'bg-blue-50 text-blue-600',
  preparing: 'bg-purple-50 text-purple-600',
  ready: 'bg-cyan-50 text-cyan-600',
  delivered: 'bg-green-50 text-green-600',
  cancelled: 'bg-red-50 text-red-500',
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { data: orders },
    { data: products },
    { data: orderItems },
  ] = await Promise.all([
    supabase.from('orders').select('id, status, total, created_at, guest_name, delivery_type').order('created_at', { ascending: false }),
    supabase.from('products').select('id, name, is_active').eq('is_active', true),
    supabase.from('order_items').select('product_id, quantity, products(name)'),
  ])

  const allOrders = orders ?? []
  const activeProducts = products ?? []
  const items = orderItems ?? []

  // ── Stats ──
  const totalVentas = allOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.total, 0)

  const pedidosMes = allOrders.filter(o => {
    const mes = new Date()
    mes.setDate(1)
    mes.setHours(0, 0, 0, 0)
    return new Date(o.created_at) >= mes
  }).length

  const pendientes = allOrders.filter(o => ['pending', 'paid', 'preparing', 'ready'].includes(o.status)).length

  // ── Ranking productos ──
  const rankMap: Record<string, { name: string; qty: number }> = {}
  items.forEach((item: any) => {
    const pid = item.product_id
    if (!rankMap[pid]) rankMap[pid] = { name: item.products?.name ?? 'Producto', qty: 0 }
    rankMap[pid].qty += item.quantity
  })
  const ranking = Object.values(rankMap).sort((a, b) => b.qty - a.qty).slice(0, 5)

  // ── Conteo por estado ──
  const porEstado = ['pending', 'paid', 'preparing', 'ready', 'delivered', 'cancelled'].map(s => ({
    status: s,
    count: allOrders.filter(o => o.status === s).length,
  }))

  const recientes = allOrders.slice(0, 6)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">Dashboard</h1>
        <p className="text-stone-400 text-sm mt-1">Resumen general de Yummy Cakes</p>
      </div>

      {/* ── Stats cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Ventas totales</p>
          <p className="text-2xl font-bold text-stone-800">{formatPrice(totalVentas)}</p>
          <p className="text-xs text-stone-400 mt-1">Órdenes no canceladas</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Pedidos totales</p>
          <p className="text-2xl font-bold text-stone-800">{allOrders.length}</p>
          <p className="text-xs text-stone-400 mt-1">Desde el inicio</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Este mes</p>
          <p className="text-2xl font-bold text-stone-800">{pedidosMes}</p>
          <p className="text-xs text-stone-400 mt-1">Pedidos del mes actual</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">En proceso</p>
          <p className="text-2xl font-bold text-rose-500">{pendientes}</p>
          <p className="text-xs text-stone-400 mt-1">Requieren atención</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* ── Órdenes por estado ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <h2 className="font-bold text-stone-700 text-sm uppercase tracking-wider mb-4">Por estado</h2>
          <div className="space-y-2">
            {porEstado.map(({ status, count }) => (
              <div key={status} className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[status]}`}>
                  {STATUS_LABELS[status]}
                </span>
                <span className="text-sm font-bold text-stone-700">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Ranking productos ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-stone-700 text-sm uppercase tracking-wider">Ranking de productos</h2>
            <Link href="/admin/productos" className="text-xs text-rose-400 hover:text-rose-500 font-semibold">Ver todos →</Link>
          </div>
          {ranking.length === 0 ? (
            <p className="text-stone-400 text-sm text-center py-8">Aún no hay datos de ventas.</p>
          ) : (
            <div className="space-y-3">
              {ranking.map((p, i) => (
                <div key={p.name} className="flex items-center gap-4">
                  <span className="w-6 h-6 bg-rose-50 text-rose-400 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-700 truncate">{p.name}</p>
                    <div className="h-1.5 bg-stone-100 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-rose-300 rounded-full"
                        style={{ width: `${Math.min(100, (p.qty / (ranking[0]?.qty || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-stone-500 flex-shrink-0">{p.qty} uds.</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Pedidos recientes ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-stone-50 flex items-center justify-between">
          <h2 className="font-bold text-stone-700 text-sm uppercase tracking-wider">Pedidos recientes</h2>
          <Link href="/admin/ordenes" className="text-xs text-rose-400 hover:text-rose-500 font-semibold">Ver todos →</Link>
        </div>
        <div className="divide-y divide-stone-50">
          {recientes.length === 0 ? (
            <p className="text-stone-400 text-sm text-center py-12">Sin pedidos aún.</p>
          ) : (
            recientes.map(order => (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-stone-700">
                    {order.guest_name ?? 'Cliente'} — #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {new Date(order.created_at).toLocaleDateString('es-CL')} · {order.delivery_type === 'pickup' ? 'Retiro' : 'Delivery'}
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                    {STATUS_LABELS[order.status]}
                  </span>
                  <span className="text-sm font-bold text-stone-700">{formatPrice(order.total)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
