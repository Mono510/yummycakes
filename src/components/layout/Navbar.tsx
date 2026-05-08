'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Search, User, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/modules/cart/hooks/useCartStore'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pasteleriaOpen, setPasteleriaOpen] = useState(false)
  const itemCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0))

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/">
          <span className="font-display text-2xl text-rose-600 tracking-tight">Yummy<span className="text-stone-800">Cakes</span></span>
        </Link>
        <div className="hidden md:flex flex-1 max-w-sm relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input type="text" placeholder="Buscar productos..." className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-300" />
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-rose-600 transition-colors" onMouseEnter={() => setPasteleriaOpen(true)} onMouseLeave={() => setPasteleriaOpen(false)}>
              Pastelería <ChevronDown size={14} />
            </button>
            {pasteleriaOpen && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-stone-100 rounded-xl shadow-lg py-2" onMouseEnter={() => setPasteleriaOpen(true)} onMouseLeave={() => setPasteleriaOpen(false)}>
                <Link href="/catalogo/tortas" className="block px-4 py-2 text-sm hover:bg-rose-50 hover:text-rose-600">Tortas</Link>
                <Link href="/catalogo/mesa-dulce" className="block px-4 py-2 text-sm hover:bg-rose-50 hover:text-rose-600">Mesa Dulce</Link>
              </div>
            )}
          </div>
          <Link href="/sobre-nosotros" className="hover:text-rose-600 transition-colors">Sobre nosotros</Link>
          <Link href="/retiro-delivery" className="hover:text-rose-600 transition-colors">Retiro y Delivery</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/mi-cuenta" className="hidden md:flex items-center gap-1.5 text-sm text-stone-600 hover:text-rose-600 transition-colors">
            <User size={18} /><span>Mi cuenta</span>
          </Link>
          <Link href="/carrito" className="relative p-2 hover:bg-rose-50 rounded-full transition-colors">
            <ShoppingCart size={20} className="text-stone-700" />
            {itemCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">{itemCount}</span>}
          </Link>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium text-stone-700">
          <Link href="/catalogo/tortas" onClick={() => setMenuOpen(false)}>Tortas</Link>
          <Link href="/catalogo/mesa-dulce" onClick={() => setMenuOpen(false)}>Mesa Dulce</Link>
          <Link href="/sobre-nosotros" onClick={() => setMenuOpen(false)}>Sobre nosotros</Link>
          <Link href="/retiro-delivery" onClick={() => setMenuOpen(false)}>Retiro y Delivery</Link>
          <Link href="/mi-cuenta" onClick={() => setMenuOpen(false)}>Mi cuenta</Link>
        </div>
      )}
    </header>
  )
}
