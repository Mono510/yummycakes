'use client'
import { useState } from 'react'
import { useCartStore } from '../hooks/useCartStore'
import type { Product } from '@/types/database'

interface Props {
  product: Product
}

export default function AddToCartButton({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState('15 personas')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCartStore()

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      {/* Selector de tamaño */}
      <div className="mb-10">
        <h4 className="text-xs font-bold uppercase tracking-widest mb-4">
          Tamaño: {selectedSize}
        </h4>
        <div className="flex gap-4">
          {['15 personas', '25 personas'].map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                selectedSize === size
                  ? 'bg-stone-800 text-white shadow-md'
                  : 'bg-white border border-stone-200 text-stone-400 hover:border-rose-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
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
