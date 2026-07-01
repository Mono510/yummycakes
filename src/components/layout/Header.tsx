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

        <Link href="/" className="flex-shrink-0 group">
          <img
            src="/logo.png"
            alt="Yummy Cakes"
            className="h-12 w-auto group-hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Acceso y Carrito */}
        <div className="flex items-center gap-4">
          {/* Estado de sesión — siempre visible */}
          {loading ? (
            <div className="flex items-center gap-2.5 animate-pulse">
              <div className="w-8 h-8 bg-stone-200 rounded-full" />
              <div className="flex flex-col gap-1">
                <div className="w-20 h-2.5 bg-stone-200 rounded" />
                <div className="w-14 h-2 bg-stone-100 rounded" />
              </div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link href="/cuenta/dashboard" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 bg-rose-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 group-hover:bg-rose-500 transition-colors">
                  {(user.user_metadata?.full_name ?? user.email ?? 'U')[0].toUpperCase()}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-stone-800 group-hover:text-rose-500 transition-colors">
                    {user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Mi cuenta'}
                  </span>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                    ● Conectado
                  </span>
                </div>
              </Link>
              {user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  Dashboard
                </Link>
              )}
            </div>
          ) : (
            <Link href="/cuenta/login" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-stone-700 group-hover:text-rose-500 transition-colors">Ingresar</span>
                <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
                  ○ Sin sesión
                </span>
              </div>
            </Link>
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

      <nav className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-center gap-8 text-sm font-semibold text-stone-600 uppercase tracking-widest border-t border-stone-50">
        <Link href="/" className="hover:text-rose-500 transition-colors">Inicio</Link>
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
        {mounted && user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
          <Link href="/admin" className="text-rose-500 hover:text-rose-600 transition-colors border border-rose-200 hover:border-rose-400 px-3 py-0.5 rounded-full">
            Admin
          </Link>
        )}
      </nav>
    </header>
  )
}
