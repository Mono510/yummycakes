import { createClient } from '@/lib/supabase/server'
import HeroSlider from '@/modules/catalog/components/HeroSlider'
import ProductCard from '@/modules/catalog/components/ProductCard'
import BestsellerSection from '@/modules/catalog/components/BestsellerSection'
import FAQ from '@/modules/catalog/components/FAQ'
import Link from 'next/link'
import type { Product } from '@/types/database'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .limit(8)

  if (error) {
    console.error("Error de Supabase:", error)
  }

  // Pasamos todos los productos disponibles para que BestsellerSection pueda rotar
  const bestsellers = products ?? []

  return (
    <main className="bg-[#FFFDF9]">
      <HeroSlider />

      {/* Manifiesto de marca */}
      <section className="border-b border-stone-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-0 items-center">

            {/* Left: Quote */}
            <div className="md:pr-16">
              <p className="text-rose-400 text-[10px] font-bold uppercase tracking-[0.45em] mb-5">
                Por qué Yummy Cakes
              </p>
              <blockquote className="font-display text-3xl md:text-4xl text-stone-800 font-medium leading-[1.2]">
                "Horneamos con tiempo. Decoramos con detalle. Entregamos con cariño."
              </blockquote>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-40 bg-stone-200 mx-16" />

            {/* Right: 3 pillars */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: '7+', label: 'Años horneando' },
                { num: '500+', label: 'Pedidos felices' },
                { num: '100%', label: 'Ingredientes frescos' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-display text-4xl md:text-5xl text-rose-400 font-bold mb-2">
                    {item.num}
                  </p>
                  <p className="text-stone-500 text-xs uppercase tracking-wider leading-tight">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Nuestros productos */}
      <section className="max-w-7xl mx-auto px-4 py-24 border-b border-stone-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-rose-400 font-bold uppercase tracking-[0.35em] text-[10px] mb-3">
              Lo que horneamos
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-stone-800 font-bold leading-none">
              Nuestros<br />productos.
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-rose-500 transition-colors uppercase tracking-widest group"
          >
            Ver catálogo completo
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {(products ?? []).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Sección: Bestsellers — fondo chocolate */}
      {bestsellers.length > 0 && (
        <section id="bestsellers" className="bg-[#2C1810]">
          <div className="max-w-7xl mx-auto px-4 pt-16 pb-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <p className="text-rose-300/70 text-[10px] font-bold uppercase tracking-[0.45em] mb-3">
                  Los favoritos
                </p>
                <h2 className="font-display text-5xl md:text-6xl text-white font-bold leading-none">
                  Nuestro<br />Bestseller.
                </h2>
              </div>
            </div>
          </div>
          <BestsellerSection products={bestsellers} />
        </section>
      )}

      {/* Sección: FAQ */}
      <section className="py-8 border-t border-stone-100">
        <FAQ />
      </section>
    </main>
  )
}
