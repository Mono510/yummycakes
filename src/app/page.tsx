import { createClient } from '@/lib/supabase/server'
import HeroSlider from '@/modules/catalog/components/HeroSlider'
import ProductCard from '@/modules/catalog/components/ProductCard'
import BestsellerSection from '@/modules/catalog/components/BestsellerSection'
import FAQ from '@/modules/catalog/components/FAQ'
import Link from 'next/link'
import type { Product } from '@/types/database'

export default async function HomePage() {
  const supabase = await createClient()

  // Adaptado a TU esquema de base de datos actual
  const { data: products, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .limit(8)

  if (error) {
    console.error("Error de Supabase:", error)
  }

  // Como no tenemos la columna is_bestseller aún, tomamos los primeros 4 como destacados
  const bestsellers = products ? products.slice(0, 4) : []

  return (
    <main className="bg-[#FFFDF9]">
      <HeroSlider />

      {/* Sección 1: NUESTROS PRODUCTOS */}
      <section className="max-w-7xl mx-auto px-4 py-20 border-b border-stone-100">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold uppercase tracking-widest mb-6">
            Nuestros Productos
          </h2>
          <Link 
            href="/catalogo" 
            className="inline-block border-b-2 border-stone-800 pb-1 font-bold text-stone-800 hover:text-rose-500 hover:border-rose-500 transition-all uppercase tracking-widest text-sm"
          >
            Ver Todos
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {(products ?? []).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Sección 2: NUESTRO BESTSELLER */}
      {bestsellers.length > 0 && (
        <section className="bg-rose-50/50">
          <div className="max-w-7xl mx-auto px-4 py-20">
             <h2 className="font-display text-4xl text-center text-stone-800 font-bold uppercase tracking-widest mb-16">
               Nuestro Bestseller
             </h2>
             <BestsellerSection products={bestsellers} />
          </div>
        </section>
      )}

      {/* Sección 3: PREGUNTAS FRECUENTES */}
      <section className="py-20">
        <FAQ />
      </section>
    </main>
  )
}
