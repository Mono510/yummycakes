import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { deleteProduct } from '../actions'

const formatPrice = (n: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n)

export default async function AdminProductosPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(*)')
    .order('created_at', { ascending: false })

  const lista = products ?? []

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Productos</h1>
          <p className="text-stone-400 text-sm mt-1">{lista.length} producto{lista.length !== 1 ? 's' : ''} en total</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="bg-rose-400 hover:bg-rose-500 text-white px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Producto</th>
              <th className="text-left px-4 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Categoría</th>
              <th className="text-right px-4 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Precio</th>
              <th className="text-center px-4 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Stock</th>
              <th className="text-center px-4 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Activo</th>
              <th className="text-center px-4 py-4 text-xs font-bold uppercase tracking-wider text-stone-400">Bestseller</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {lista.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-stone-400">
                  No hay productos. <Link href="/admin/productos/nuevo" className="text-rose-400 font-semibold">Crear el primero →</Link>
                </td>
              </tr>
            ) : (
              lista.map((product: any) => (
                <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 overflow-hidden flex-shrink-0">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">🎂</div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-700">{product.name}</p>
                        <p className="text-xs text-stone-400">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-stone-500">
                    {product.categories?.name ?? <span className="text-stone-300">—</span>}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold text-stone-700">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${product.stock > 5 ? 'bg-green-50 text-green-600' : product.stock > 0 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`w-2.5 h-2.5 rounded-full inline-block ${product.is_active ? 'bg-green-400' : 'bg-stone-300'}`} />
                  </td>
                  <td className="px-4 py-4 text-center">
                    {product.is_bestseller ? '⭐' : <span className="text-stone-300">—</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/productos/${product.id}/editar`}
                        className="text-xs font-semibold text-stone-500 hover:text-stone-800 border border-stone-200 hover:border-stone-400 px-3 py-1.5 rounded-full transition-all"
                      >
                        Editar
                      </Link>
                      <form action={async () => {
                        'use server'
                        await deleteProduct(product.id)
                      }}>
                        <button
                          type="submit"
                          className="text-xs font-semibold text-red-400 hover:text-red-600 border border-red-100 hover:border-red-300 px-3 py-1.5 rounded-full transition-all"
                        >
                          Desactivar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
