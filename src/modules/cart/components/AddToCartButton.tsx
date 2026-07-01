'use client'
import { useState } from 'react'
import { useCartStore } from '../hooks/useCartStore'
import type { Product } from '@/types/database'

interface Props {
  product: Product
}

type Tier = { label: string; price: number }

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)

// Extrae las opciones (tamaños / cantidades) desde la descripción del producto.
// Reconoce líneas tipo: "• 10 porciones — $21.000"  o  "• 50 unidades — $22.500"
function parseTiers(description: string | null, basePrice: number): Tier[] {
  const tiers: Tier[] = []
  if (description) {
    const re = /•\s*(.+?)\s*[—–-]\s*\$\s*([\d.]+)/g
    let m: RegExpExecArray | null
    while ((m = re.exec(description)) !== null) {
      const label = m[1].trim()
      const price = parseInt(m[2].replace(/\./g, ''), 10)
      if (label && !Number.isNaN(price)) tiers.push({ label, price })
    }
  }
  if (tiers.length === 0) tiers.push({ label: 'Estándar', price: basePrice })
  return tiers
}

export default function AddToCartButton({ product }: Props) {
  const tiers = parseTiers(product.description ?? null, product.price)
  const [selected, setSelected] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCartStore()

  const tier = tiers[selected]

  const handleAdd = () => {
    // Guardamos el producto con el precio de la opción elegida y su etiqueta como "size"
    const productForCart = { ...product, price: tier.price }
    for (let i = 0; i < quantity; i++) {
      addItem(productForCart, tier.label)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      {/* Selector de tamaño / cantidad */}
      <div className="mb-8">
        <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-stone-500">
          {tiers.length > 1 ? 'Elige una opción' : 'Opción'}
        </h4>
        <div className="flex flex-wrap gap-3">
          {tiers.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setSelected(i)}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all text-left ${
                selected === i
                  ? 'bg-stone-800 text-white shadow-md'
                  : 'bg-white border border-stone-200 text-stone-500 hover:border-rose-300'
              }`}
            >
              <span className="block leading-tight">{t.label}</span>
              <span className={`block text-xs font-semibold mt-0.5 ${selected === i ? 'text-rose-200' : 'text-rose-400'}`}>
                {formatPrice(t.price)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Precio de la opción seleccionada */}
      <div className="mb-6">
        <span className="text-sm text-stone-400">Precio: </span>
        <span className="text-2xl font-bold text-stone-800">{formatPrice(tier.price)}</span>
      </div>

      {/* Cantidad + Botón */}
      <div className="flex gap-4 items-center mb-6">
        <div className="flex border border-stone-200 rounded-full bg-white px-4 py-2">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-3 text-stone-500 hover:text-rose-500 transition-colors font-bold"
          >−</button>
          <span className="px-6 font-bold text-stone-800">{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-3 text-stone-500 hover:text-rose-500 transition-colors font-bold"
          >+</button>
        </div>

        <button
          onClick={handleAdd}
          className={`flex-grow py-4 rounded-full font-bold transition-all uppercase tracking-widest text-sm ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-[#BCAAA4] hover:bg-[#A1887F] text-white'
          }`}
        >
          {added ? '✓ Agregado' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}
