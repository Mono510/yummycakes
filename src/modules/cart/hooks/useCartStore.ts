import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/database'

export type CartItem = {
  product: Product
  quantity: number
  size: string
  flavor?: string    // relleno elegido (tortas con rellenos a elección)
  message?: string   // dedicatoria / mensaje sobre la torta
}

// Clave única de una línea del carrito: mismo producto + tamaño + relleno + mensaje se agrupan
export function getItemKey(i: { product: { id: string }; size: string; flavor?: string; message?: string }) {
  return `${i.product.id}::${i.size}::${i.flavor ?? ''}::${i.message ?? ''}`
}

type CartStore = {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, size: string, flavor?: string, message?: string) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, delta: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, size, flavor, message) => {
        const items = get().items
        const key = getItemKey({ product, size, flavor, message })
        const existing = items.find(i => getItemKey(i) === key)
        if (existing) {
          set({
            items: items.map(i =>
              getItemKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i
            ),
          })
        } else {
          set({ items: [...items, { product, quantity: 1, size, flavor, message }] })
        }
        set({ isOpen: true }) // Abrir drawer al agregar
      },

      removeItem: (key) =>
        set({ items: get().items.filter(i => getItemKey(i) !== key) }),

      updateQuantity: (key, delta) => {
        const updated = get().items
          .map(i => (getItemKey(i) === key ? { ...i, quantity: i.quantity + delta } : i))
          .filter(i => i.quantity > 0)
        set({ items: updated })
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((acc, i) => acc + i.product.price * i.quantity, 0),

      count: () =>
        get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    { name: 'yummy-cart' }
  )
)
