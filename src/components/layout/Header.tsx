'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/modules/auth/AuthProvider'
import { useCartStore } from '@/modules/cart/hooks/useCartStore'

export default function Header() {
  const [mounted, setMounted] = useState(false)  
  const [isPasteleriaOpen, setIsPasteleriaOpen] = useState(false)
  const { user, loading } = useAuth()
  const { count, total, openCart } = useCartStore() // 👈 CAMBIO 1: usar el store
 
  useEffect(() => setMounted(true), [])   
 
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)

  return (
    <header className="w-full bg-white border-b border-stone-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-8">

        {/* Logo — sin cambios */}
        <Link href="/" className="flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-[#F8BBD0] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm">
              YC
            </div>
            <span className="font-display text-2xl text-stone-800 font-bold hidden sm:block">Yummy Cakes</span>
          </div>
        </Link>

        {/* Buscador — sin cambios */}
        <div className="flex-grow max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for..."
            className="w-full bg-stone-100 border-none rounded-full py-2.5 px-6 pl-12 focus:ring-2 focus:ring-rose-200 transition-all text-sm"
          />
          <svg className="absolute left-4 top-3 text-stone-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>

        {/* Acceso y Carrito */}
        <div className="flex items-center gap-4">
          {!loading && (
            user ? (
              <Link href="/cuenta/dashboard" className="flex items-center gap-2 text-stone-600 hover:text-rose-500 transition-colors">
                <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 font-bold text-sm">
                  {(user.user_metadata?.full_name ?? user.email ?? 'U')[0].toUpperCase()}
                </div>
                <span className="text-sm font-medium hidden md:block">
                  {user.user_metadata?.full_name ?? 'Mi cuenta'}
                </span>
              </Link>
            ) : (
              <Link href="/cuenta/login" className="flex items-center gap-2 text-stone-600 hover:text-rose-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span className="text-sm font-medium hidden md:block">Account</span>
              </Link>
            )
          )}

          {/* 👇 CAMBIO 2: botón conectado al store */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 bg-stone-800 text-white px-4 py-2 rounded-full hover:bg-stone-700 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span className="text-sm font-bold">{mounted ? formatPrice(total()): '0'} ({mounted ? count() : 0})</span>
            {mounted && count() > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-400 rounded-full text-white text-xs flex items-center justify-center font-bold">
                {count()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navegación — sin cambios */}
      <nav className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-center gap-8 text-sm font-semibold text-stone-600 uppercase tracking-widest border-t border-stone-50">
        <div
          className="relative group"
          onMouseEnter={() => setIsPasteleriaOpen(true)}
          onMouseLeave={() => setIsPasteleriaOpen(false)}
        >
          <button className="hover:text-rose-500 flex items-center gap-1 transition-colors">
            Pastelería <svg className={`transition-transform ${isPasteleriaOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          {isPasteleriaOpen && (
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl border border-stone-100 py-2 rounded-b-lg">
              <Link href="/catalogo?cat=tortas" className="block px-4 py-2 hover:bg-rose-50 hover:text-rose-600 transition-colors">• Tortas</Link>
              <Link href="/catalogo?cat=mesa-dulce" className="block px-4 py-2 hover:bg-rose-50 hover:text-rose-600 transition-colors">• Mesa Dulce</Link>
            </div>
          )}
        </div>
        <Link href="/nosotros" className="hover:text-rose-500 transition-colors">Sobre nosotros</Link>
        <Link href="/retiro-delivery" className="hover:text-rose-500 transition-colors">Retiro y Delivery</Link>
        <Link href="/cuenta" className="hover:text-rose-500 transition-colors">Mi cuenta</Link>
      </nav>
    </header>
  )
}
