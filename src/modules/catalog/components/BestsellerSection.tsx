'use client'

import { useState, useEffect } from 'react'
import type { Product } from '@/types/database'
import Link from 'next/link'

interface BestsellerSectionProps {
  products: Product[]
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)
}

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800'

export default function BestsellerSection({ products }: BestsellerSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fading, setFading] = useState(false)

  const featured = products[0]
  const secondary = products.slice(1)

  useEffect(() => {
    if (secondary.length < 2) return
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActiveIndex(prev => (prev + 1) % secondary.length)
        setFading(false)
      }, 350)
    }, 3500)
    return () => clearInterval(timer)
  }, [secondary.length])

  if (!featured) return null

  const featuredImage = (featured as any).images?.[0] ?? FALLBACK_IMG
  const active = secondary[activeIndex]
  const activeImage = active ? ((active as any).images?.[0] ?? FALLBACK_IMG) : null

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] min-h-[520px]">

      {/* Producto destacado — grande izquierda */}
      <Link
        href={`/producto/${(featured as any).slug || featured.id}`}
        className="group relative overflow-hidden min-h-[380px] md:min-h-0"
      >
        <img
          src={featuredImage}
          alt={featured.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/95 via-[#2C1810]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12">
          <span className="text-rose-300/80 text-[9px] font-bold uppercase tracking-[0.4em] block mb-3">
            {(featured as any).categories?.name || 'Destacado'}
          </span>
          <h3 className="font-display text-3xl md:text-4xl text-white font-bold leading-tight mb-4 max-w-xs">
            {featured.name}
          </h3>
          <div className="flex items-center gap-5">
            <span className="text-white font-bold text-lg">{formatPrice(featured.price)}</span>
            <span className="border border-white/30 group-hover:border-rose-400 group-hover:bg-rose-400 text-white text-[10px] uppercase tracking-[0.2em] px-5 py-2 transition-all">
              Ver producto →
            </span>
          </div>
        </div>
      </Link>

      {/* Columna derecha — 1 producto rotando en grande */}
      <div className="flex flex-col bg-[#2C1810]">
        {active && activeImage ? (
          <Link
            href={`/producto/${(active as any).slug || active.id}`}
            className="group flex-1 relative overflow-hidden min-h-[300px]"
          >
            <img
              src={activeImage}
              alt={active.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 ${fading ? 'opacity-0' : 'opacity-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/20 to-transparent" />

            <div className={`absolute bottom-0 left-0 p-7 transition-opacity duration-350 ${fading ? 'opacity-0' : 'opacity-100'}`}>
              <span className="text-rose-300/80 text-[9px] font-bold uppercase tracking-[0.4em] block mb-2">
                {(active as any).categories?.name || 'Yummy Cakes'}
              </span>
              <h4 className="font-display text-2xl text-white font-bold leading-tight mb-2">
                {active.name}
              </h4>
              <span className="text-stone-300 font-bold text-sm">{formatPrice(active.price)}</span>
            </div>
          </Link>
        ) : null}

        {/* Dots de navegación + CTA */}
        <div className="px-7 py-5 border-t border-stone-800/30 flex items-center justify-between">
          {secondary.length > 1 && (
            <div className="flex gap-1.5">
              {secondary.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setFading(true)
                    setTimeout(() => { setActiveIndex(i); setFading(false) }, 350)
                  }}
                  className={`h-0.5 rounded-full transition-all ${i === activeIndex ? 'w-6 bg-rose-400' : 'w-2 bg-stone-700 hover:bg-stone-500'}`}
                />
              ))}
            </div>
          )}
          <Link
            href="/catalogo"
            className="text-[10px] font-bold uppercase tracking-widest text-rose-400 hover:text-rose-300 border-b border-rose-400/40 hover:border-rose-300 pb-0.5 transition-all ml-auto"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </div>
  )
}
