'use client'
import { useEffect, useState } from 'react'
import { useCartStore } from '../hooks/useCartStore'
import { useAuth } from '@/modules/auth/AuthProvider'
import Link from 'next/link'

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, total, count, isOpen, closeCart } = useCartStore()
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])  

  const totalValue = mounted ? total() : 0
  const countValue = mounted ? count() : 0

  if(!mounted) return null
 

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={closeCart}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div>
            <h2 className="font-display text-xl font-bold text-stone-800">Mi Carrito</h2>
            <p className="text-xs text-stone-400 mt-0.5">
              {countValue} {countValue === 1 ? 'producto' : 'productos'}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4d0cc" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </div>
              <p className="text-stone-400 font-medium">Tu carrito está vacío</p>
              <p className="text-stone-300 text-sm mt-1">Agrega productos para comenzar</p>
              <button
                onClick={closeCart}
                className="mt-6 text-rose-400 hover:text-rose-500 text-sm font-semibold transition-colors"
              >
                Seguir comprando →
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4 py-4 border-b border-stone-50">
                {/* Imagen */}
                <div className="w-20 h-20 bg-rose-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.images?.[0] ?? ''}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-800 text-sm leading-tight truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">{item.size}</p>
                  <p className="text-rose-500 font-bold text-sm mt-1">
                    {formatPrice(item.product.price)}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-stone-200 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, -1)}
                        className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-rose-500 transition-colors"
                      >−</button>
                      <span className="w-6 text-center text-sm font-bold text-stone-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, 1)}
                        className="w-7 h-7 flex items-center justify-center text-stone-500 hover:text-rose-500 transition-colors"
                      >+</button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="text-xs text-stone-300 hover:text-red-400 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-stone-700">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-stone-500 font-medium">Total</span>
              <span className="text-2xl font-bold text-stone-800">{formatPrice(totalValue)}</span>
            </div>

           {user ? (
   <Link
     href="/checkout"
    onClick={closeCart}
    className="block w-full bg-stone-800 hover:bg-stone-700 text-white text-center py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all"
  >
    Ir al pago
  </Link>
) : (
  <div className="space-y-3">
    {/* Opción principal: continuar sin cuenta */}
    <Link
      href="/checkout"
      onClick={closeCart}
      className="block w-full bg-stone-800 hover:bg-stone-700 text-white text-center py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all"
    >
      Continuar sin cuenta
    </Link>

    {/* Separador */}
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-stone-100" />
      <span className="text-xs text-stone-300">o</span>
      <div className="flex-1 h-px bg-stone-100" />
    </div>

    {/* Opción secundaria: iniciar sesión */}
    <Link
      href="/cuenta/login"
      onClick={closeCart}
      className="block w-full border border-stone-200 hover:border-stone-300 text-stone-600 hover:text-stone-800 text-center py-3.5 rounded-full font-semibold text-sm transition-all"
    >
      Iniciar sesión
    </Link>

    <p className="text-center text-xs text-stone-300">
      Con cuenta puedes ver el historial de tus pedidos
    </p>
  </div>
)}
          </div>
        )}
      </div>
    </>
  )
}
