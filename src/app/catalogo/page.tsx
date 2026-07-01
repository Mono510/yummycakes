import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/modules/catalog/components/ProductCard'

// Orden en que se muestran las categorías
const CATEGORY_ORDER = ['tortas', 'mesa-dulce']

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('is_active', true)

  const all = products ?? []

  // Agrupar por categoría
  const groupsMap = new Map<string, { name: string; slug: string; items: any[] }>()
  for (const p of all) {
    const slug = p.categories?.slug ?? 'otros'
    const name = p.categories?.name ?? 'Otros'
    if (!groupsMap.has(slug)) groupsMap.set(slug, { name, slug, items: [] })
    groupsMap.get(slug)!.items.push(p)
  }

  // Ordenar según CATEGORY_ORDER y filtrar si viene ?cat=
  let groups = Array.from(groupsMap.values()).sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a.slug)
    const ib = CATEGORY_ORDER.indexOf(b.slug)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })
  if (cat) groups = groups.filter(g => g.slug === cat)

  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl text-stone-800 font-bold mb-4">
            Nuestro Catálogo
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Explora todas nuestras dulces creaciones. Todo es horneado bajo pedido para garantizar la máxima frescura y sabor.
          </p>
        </div>

        {groups.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <p>Aún no hay productos en el catálogo.</p>
          </div>
        ) : (
          <div className="space-y-20">
            {groups.map(group => (
              <section key={group.slug}>
                {/* Encabezado de categoría */}
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold whitespace-nowrap">
                    {group.name}
                  </h2>
                  <div className="flex-1 h-px bg-stone-200" />
                  <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                    {group.items.length} {group.items.length === 1 ? 'producto' : 'productos'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                  {group.items.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
