import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('id', params.id)
    .single()

  if (!product) notFound()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Imagen Estilo Hamilton */}
        <div className="sticky top-32 space-y-4">
           <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-rose-50">
             <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
           </div>
        </div>

        {/* Info */}
        <div className="pt-8">
          <span className="text-rose-400 font-bold uppercase tracking-widest text-xs mb-4 block">
            {product.categories?.name}
          </span>
          <h1 className="font-display text-5xl text-stone-800 font-bold mb-4">{product.name}</h1>
          <div className="text-2xl text-stone-600 mb-8">{formatPrice(product.price)}</div>
          
          <div className="prose text-stone-600 mb-10 leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Selección de Tamaño (Referencia Pág. 3) */}
          <div className="mb-10">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Tamaño: 15 personas</h4>
            <div className="flex gap-4">
              <button className="bg-stone-800 text-white px-6 py-3 rounded-lg text-sm font-bold shadow-md">15 personas</button>
              <button className="bg-white border border-stone-200 text-stone-400 px-6 py-3 rounded-lg text-sm font-bold hover:border-rose-300">25 personas</button>
            </div>
          </div>

          <div className="flex gap-4 items-center mb-6">
            <div className="flex border border-stone-200 rounded-full bg-white px-4 py-2">
              <button className="px-3">-</button>
              <span className="px-6 font-bold">1</span>
              <button className="px-3">+</button>
            </div>
            <button className="flex-grow bg-[#BCAAA4] hover:bg-[#A1887F] text-white py-4 rounded-full font-bold transition-all uppercase tracking-widest text-sm">
              Agregar al carrito
            </button>
          </div>

          <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            <span>Quedan pocos. Ordena pronto</span>
          </div>
        </div>
      </div>
    </div>
  )
}
