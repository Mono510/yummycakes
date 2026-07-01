import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/modules/cart/components/AddToCartButton'
import ProductGallery from '@/modules/catalog/components/ProductGallery'

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params  // 👈 las dos correcciones están aquí

  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('slug', slug)              // 👈 usar id directo, no params.id
    .single()

  if (!product) notFound()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        <div className="sticky top-32">
          <ProductGallery images={product.images} alt={product.name} />
        </div>

        <div className="pt-8">
          <span className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-4 block">
            {product.categories?.name}
          </span>
          <h1 className="font-display text-5xl text-stone-800 font-bold mb-4">{product.name}</h1>
          <div className="text-2xl text-stone-600 mb-8">Desde {formatPrice(product.price)}</div>

          <div className="text-stone-600 mb-10 leading-relaxed whitespace-pre-line">
            {product.description}
          </div>

          <AddToCartButton product={product} />

          <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            <span>Quedan pocos. Ordena pronto</span>
          </div>
        </div>
      </div>
    </div>
  )
}
