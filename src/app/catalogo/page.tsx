import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/modules/catalog/components/ProductCard'

export default async function CatalogoPage() {
  const supabase = await createClient()

  // Consulta simple adaptada a tus columnas actuales
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(*)')

  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 font-bold mb-4">
            Nuestro Catálogo
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Explora todas nuestras dulces creaciones. Todo es horneado bajo pedido para garantizar la máxima frescura y sabor.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {(products ?? []).length > 0 ? (
            (products ?? []).map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-stone-500">
              <p>Aún no hay productos en el catálogo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
