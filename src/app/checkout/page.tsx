'use client'
import { useState, useTransition } from 'react'
import { useCartStore } from '@/modules/cart/hooks/useCartStore'
import { useAuth } from '@/modules/auth/AuthProvider'
import { createOrder } from './actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AddressAutocomplete from '@/modules/checkout/components/AddressAutocomplete'

const formatPrice = (n: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n)

const DELIVERY_COST = 4000

const TIME_SLOTS = [
  '10:00 - 13:00',
  '13:00 - 16:00',
  '16:00 - 19:00',
  '19:00 - 21:00',
]

function getMinDate() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const { user } = useAuth()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup')
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'card'>('mercadopago')
  const [selectedAddress, setSelectedAddress] = useState<{
    fullAddress: string
    street: string
    commune: string
  } | null>(null)

  const subtotal = total()
  const shippingCost = deliveryType === 'delivery' ? DELIVERY_COST : 0
  const totalWithShipping = subtotal + shippingCost

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-400 text-lg mb-4">Tu carrito está vacío</p>
          <Link href="/catalogo" className="text-rose-400 hover:text-rose-500 font-semibold">
            Ver productos →
          </Link>
        </div>
      </div>
    )
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (deliveryType === 'delivery' && !selectedAddress) {
      setError('Por favor selecciona una dirección válida del autocompletado.')
      return
    }

    const fd = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await createOrder({
        userId: user?.id ?? null,
        guestName: fd.get('name') as string,
        guestEmail: fd.get('email') as string,
        guestPhone: fd.get('phone') as string,
        deliveryType,
        deliveryAddress: deliveryType === 'delivery'
          ? `${selectedAddress?.fullAddress}${fd.get('street_detail') ? `, ${fd.get('street_detail')}` : ''}`
          : 'Retiro en tienda - Ejército 441, Santiago',
        commune: deliveryType === 'delivery' ? selectedAddress?.commune ?? null : null,
        scheduledDate: fd.get('scheduled_date') as string,
        scheduledTimeSlot: fd.get('time_slot') as string,
        notes: fd.get('notes') as string,
        paymentMethod,
        items: items.map(i => ({
          productId: i.product.id,
          quantity: i.quantity,
          unitPrice: i.product.price,
          size: i.size,
        })),
        total: totalWithShipping,
      })

      if (result.error) {
        setError(result.error)
        return
      }

      clearCart()
      router.push(`/checkout/confirmacion?order=${result.orderId}`)
    })
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* ── FORMULARIO ── */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-[#F8BBD0] rounded-full flex items-center justify-center text-white font-bold">YC</div>
              <span className="font-display text-xl font-bold text-stone-800">Yummy Cakes</span>
            </Link>

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* CONTACTO */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-stone-800">Contacto</h2>
                  {!user && (
                    <Link href="/cuenta/login" className="text-sm text-rose-400 hover:text-rose-500">
                      Iniciar sesión
                    </Link>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    name="email"
                    type="email"
                    required
                    defaultValue={user?.email ?? ''}
                    placeholder="Correo electrónico"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
                  />
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
                  />
                  <label className="flex items-center gap-2 text-sm text-stone-400 cursor-pointer">
                    <input type="checkbox" name="newsletter" className="rounded" />
                    Enviarme novedades y ofertas por correo electrónico
                  </label>
                </div>
              </div>

              {/* TIPO DE ENTREGA */}
              <div>
                <h2 className="text-lg font-bold text-stone-800 mb-4">Entrega</h2>
                <div className="space-y-3">

                  {/* Retiro */}
                  <label
                    className={`flex items-start gap-3 border rounded-xl px-4 py-4 cursor-pointer transition-all ${deliveryType === 'pickup' ? 'border-rose-300 bg-rose-50' : 'border-stone-200 bg-white hover:border-rose-200'}`}
                    onClick={() => { setDeliveryType('pickup'); setSelectedAddress(null) }}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${deliveryType === 'pickup' ? 'border-rose-400' : 'border-stone-300'}`}>
                      {deliveryType === 'pickup' && <div className="w-2 h-2 rounded-full bg-rose-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-stone-700">Retiro en tienda</p>
                        <span className="text-sm font-bold text-green-600">Gratis</span>
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">Ejército 441, Santiago</p>
                      <p className="text-xs text-stone-400">Lun–Sáb 10:00 a 20:30 hrs</p>
                    </div>
                  </label>

                  {/* Delivery */}
                  <label
                    className={`flex items-start gap-3 border rounded-xl px-4 py-4 cursor-pointer transition-all ${deliveryType === 'delivery' ? 'border-rose-300 bg-rose-50' : 'border-stone-200 bg-white hover:border-rose-200'}`}
                    onClick={() => setDeliveryType('delivery')}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${deliveryType === 'delivery' ? 'border-rose-400' : 'border-stone-300'}`}>
                      {deliveryType === 'delivery' && <div className="w-2 h-2 rounded-full bg-rose-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-stone-700">Delivery</p>
                        <span className="text-sm font-bold text-stone-700">{formatPrice(DELIVERY_COST)}</span>
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">Región Metropolitana · 10:00 a 21:00 hrs</p>
                    </div>
                  </label>
                </div>

                {/* Dirección con OpenStreetMap — solo si es delivery */}
                {deliveryType === 'delivery' && (
                  <div className="mt-4 space-y-3 p-4 bg-white border border-stone-100 rounded-xl">
                    <AddressAutocomplete
                      required
                      onSelect={(result) => setSelectedAddress(result)}
                    />
                    <input
                      name="street_detail"
                      type="text"
                      placeholder="Depto, oficina, referencias (opcional)"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
                    />
                    {selectedAddress?.commune && (
                      <div className="flex items-center gap-2 text-xs text-stone-500 px-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        Comuna: <span className="font-semibold text-stone-700">{selectedAddress.commune}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* FECHA Y HORA */}
              <div>
                <h2 className="text-lg font-bold text-stone-800 mb-1">
                  {deliveryType === 'pickup' ? 'Fecha y hora de retiro' : 'Fecha y hora de entrega'}
                </h2>
                <p className="text-xs text-stone-400 mb-4">
                  Los pedidos se preparan desde el día siguiente a la compra.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-stone-500 mb-1.5 font-medium">Fecha</label>
                    <input
                      name="scheduled_date"
                      type="date"
                      required
                      min={getMinDate()}
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 mb-1.5 font-medium">Horario</label>
                    <select
                      name="time_slot"
                      required
                      defaultValue=""
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
                    >
                      <option value="" disabled>Selecciona</option>
                      {TIME_SLOTS.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* DATOS PERSONALES */}
              <div>
                <h2 className="text-lg font-bold text-stone-800 mb-4">Datos personales</h2>
                <div className="space-y-3">
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={user?.user_metadata?.full_name ?? ''}
                    placeholder="Nombre completo"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
                  />
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Notas del pedido (opcional): sabor de relleno, decoración, dedicatoria..."
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white resize-none"
                  />
                </div>
              </div>

              {/* PAGO */}
              <div>
                <h2 className="text-lg font-bold text-stone-800 mb-1">Pago</h2>
                <p className="text-xs text-stone-400 mb-4">Todas las transacciones son seguras y están encriptadas.</p>

                <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
                  <label
                    className={`flex items-center justify-between px-4 py-4 cursor-pointer border-b border-stone-100 transition-colors ${paymentMethod === 'card' ? 'bg-rose-50' : 'hover:bg-stone-50'}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'card' ? 'border-rose-400' : 'border-stone-300'}`}>
                        {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-rose-400" />}
                      </div>
                      <span className="text-sm font-medium text-stone-700">Tarjeta de crédito o débito</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">VISA</div>
                      <div className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">MC</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center justify-between px-4 py-4 cursor-pointer transition-colors ${paymentMethod === 'mercadopago' ? 'bg-rose-50' : 'hover:bg-stone-50'}`}
                    onClick={() => setPaymentMethod('mercadopago')}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === 'mercadopago' ? 'border-rose-400' : 'border-stone-300'}`}>
                        {paymentMethod === 'mercadopago' && <div className="w-2 h-2 rounded-full bg-rose-400" />}
                      </div>
                      <span className="text-sm font-medium text-stone-700">Todos los medios de pago · Mercado Pago</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="bg-[#009EE3] text-white text-xs font-bold px-1.5 py-0.5 rounded">MP</div>
                      <div className="bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">VISA</div>
                      <div className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">MC</div>
                    </div>
                  </label>

                  {paymentMethod === 'mercadopago' && (
                    <div className="px-4 py-3 bg-stone-50 border-t border-stone-100">
                      <p className="text-xs text-stone-500">
                        Se te redirigirá a Mercado Pago para completar tu pago de forma segura.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-stone-800 hover:bg-stone-700 disabled:opacity-60 text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all"
              >
                {isPending ? 'Procesando pedido...' : `Confirmar pedido · ${formatPrice(totalWithShipping)}`}
              </button>
            </form>
          </div>

          {/* ── RESUMEN ── */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-stone-50">
                  <h3 className="font-semibold text-stone-800 text-sm uppercase tracking-widest">Tu pedido</h3>
                </div>

                <div className="px-6 py-4 space-y-4">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 bg-rose-50 rounded-xl overflow-hidden">
                          {item.product.images?.[0] ? (
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">🎂</div>
                          )}
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-stone-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-stone-700 truncate">{item.product.name}</p>
                        <p className="text-xs text-stone-400">{item.size}</p>
                      </div>
                      <p className="text-sm font-bold text-stone-700 flex-shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-5 border-t border-stone-50 space-y-2.5">
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Despacho</span>
                    {deliveryType === 'pickup' ? (
                      <span className="text-green-600 font-medium">Gratis</span>
                    ) : (
                      <span className="text-stone-700 font-medium">{formatPrice(DELIVERY_COST)}</span>
                    )}
                  </div>
                  <div className="flex justify-between font-bold text-stone-800 pt-2 border-t border-stone-100">
                    <span>Total</span>
                    <span className="text-lg">{formatPrice(totalWithShipping)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
