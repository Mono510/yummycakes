import { createClient } from '@/lib/supabase/server'
import { updateOrderStatus } from '../actions'

const formatPrice = (n: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n)

const ESTADOS = [
  { value: 'all', label: 'Todos' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'paid', label: 'Pagado' },
  { value: 'preparing', label: 'Preparando' },
  { value: 'ready', label: 'Listo' },
  { value: 'delivered', label: 'Entregado' },
  { value: 'cancelled', label: 'Cancelado' },
]

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-600 border-amber-100',
  paid: 'bg-blue-50 text-blue-600 border-blue-100',
  preparing: 'bg-purple-50 text-purple-600 border-purple-100',
  ready: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  delivered: 'bg-green-50 text-green-600 border-green-100',
  cancelled: 'bg-red-50 text-red-500 border-red-100',
}

const ALL_STATUSES = ['pending', 'paid', 'preparing', 'ready', 'delivered', 'cancelled']

export default async function AdminOrdenesPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>
}) {
  const { estado } = await searchParams
  const filtro = estado ?? 'all'

  const supabase = await createClient()

  let query = supabase
    .from('orders')
    .select('*, order_items(*, products(name))')
    .order('created_at', { ascending: false })

  if (filtro !== 'all') {
    query = query.eq('status', filtro)
  }

  const { data: orders } = await query
  const lista = orders ?? []

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">Órdenes</h1>
        <p className="text-stone-400 text-sm mt-1">{lista.length} pedido{lista.length !== 1 ? 's' : ''} {filtro !== 'all' ? `con estado "${ESTADOS.find(e => e.value === filtro)?.label}"` : 'en total'}</p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap mb-6">
        {ESTADOS.map(e => (
          <a
            key={e.value}
            href={e.value === 'all' ? '/admin/ordenes' : `/admin/ordenes?estado=${e.value}`}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
              filtro === e.value
                ? 'bg-stone-800 text-white border-stone-800'
                : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
            }`}
          >
            {e.label}
          </a>
        ))}
      </div>

      {/* Tabla */}
      <div className="space-y-4">
        {lista.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 py-20 text-center text-stone-400">
            No hay pedidos con este filtro.
          </div>
        ) : (
          lista.map((order: any) => (
            <div key={order.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              {/* Header de la orden */}
              <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-stone-50">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-bold text-stone-800 text-sm">
                      {order.guest_name ?? 'Cliente'} — #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {new Date(order.created_at).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}
                      {' · '}
                      {order.delivery_type === 'pickup' ? '🏪 Retiro en tienda' : '🚗 Delivery'}
                      {order.commune ? ` · ${order.commune}` : ''}
                    </p>
                    {order.scheduled_date && (
                      <p className="text-xs text-stone-400">
                        📅 {order.scheduled_date} · {order.scheduled_time_slot}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${STATUS_COLORS[order.status]}`}>
                    {ESTADOS.find(e => e.value === order.status)?.label ?? order.status}
                  </span>
                  <span className="font-bold text-stone-800">{formatPrice(order.total)}</span>
                </div>
              </div>

              {/* Productos del pedido */}
              <div className="px-6 py-3 bg-stone-50/50">
                <div className="flex flex-wrap gap-2">
                  {(order.order_items ?? []).map((item: any) => (
                    <span key={item.id} className="text-xs bg-white border border-stone-100 px-3 py-1 rounded-full text-stone-600">
                      {item.quantity}× {item.products?.name ?? 'Producto'} {item.size ? `(${item.size})` : ''}
                    </span>
                  ))}
                </div>
                {order.notes && (
                  <p className="text-xs text-stone-500 mt-2 italic">💬 {order.notes}</p>
                )}
              </div>

              {/* Acciones */}
              <div className="px-6 py-3 border-t border-stone-50 flex items-center gap-3">
                <p className="text-xs text-stone-400 font-medium">Estado:</p>
                <form
                  action={async (formData: FormData) => {
                    'use server'
                    const newStatus = formData.get('status') as string
                    await updateOrderStatus(order.id, newStatus)
                  }}
                  className="flex items-center gap-2"
                >
                  <select
                    name="status"
                    defaultValue={order.status}
                    className="text-xs border border-stone-200 rounded-lg px-2 py-1.5 text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-rose-200"
                  >
                    {ALL_STATUSES.map(s => (
                      <option key={s} value={s}>
                        {ESTADOS.find(e => e.value === s)?.label ?? s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="text-xs font-bold px-3 py-1.5 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition-all"
                  >
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
