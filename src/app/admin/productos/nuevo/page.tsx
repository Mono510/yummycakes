import { createClient } from '@/lib/supabase/server'
import { createProduct } from '../../actions'
import Link from 'next/link'
import ImageUpload from '../../ImageUpload'

export default async function NuevoProductoPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('name')

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/productos" className="text-stone-400 hover:text-stone-600 transition-colors">
          ← Volver
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Nuevo producto</h1>
          <p className="text-stone-400 text-sm mt-0.5">Agrega un producto al catálogo</p>
        </div>
      </div>

      <form action={createProduct} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 space-y-6">

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Nombre *</label>
          <input
            name="name"
            type="text"
            required
            placeholder="Ej: Torta de Chocolate"
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
          <p className="text-xs text-stone-400 mt-1">El slug se genera automáticamente.</p>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Descripción</label>
          <textarea
            name="description"
            rows={3}
            placeholder="Describe sabores, rellenos, decoración..."
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Imágenes</label>
          <ImageUpload currentImages={[]} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Precio (CLP) *</label>
            <input
              name="price"
              type="number"
              required
              min="0"
              step="1"
              placeholder="25000"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Stock</label>
            <input
              name="stock"
              type="number"
              min="0"
              defaultValue={10}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Categoría</label>
          <select
            name="category_id"
            className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
          >
            <option value="">Sin categoría</option>
            {(categories ?? []).map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input name="is_active" type="checkbox" defaultChecked className="w-4 h-4 accent-rose-400" />
            <span className="text-sm font-medium text-stone-600">Activo en tienda</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input name="is_bestseller" type="checkbox" className="w-4 h-4 accent-rose-400" />
            <span className="text-sm font-medium text-stone-600">Marcar como Bestseller</span>
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-rose-400 hover:bg-rose-500 text-white py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all"
          >
            Crear producto
          </button>
          <Link
            href="/admin/productos"
            className="px-6 py-3 border border-stone-200 rounded-full text-sm font-semibold text-stone-500 hover:border-stone-400 transition-all"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}
