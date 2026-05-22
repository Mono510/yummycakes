import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types/database'

export type CartItem = {
  product: Product
  quantity: number
  size: string          // 👈 NUEVO
}

type CartStore = {
  items: CartItem[]
  isOpen: boolean       // 👈 NUEVO
  openCart: () => void  // 👈 NUEVO
  closeCart: () => void // 👈 NUEVO
  addItem: (product: Product, size: string) => void  // 👈 size agregado
  removeItem: (productId: string, size: string) => void // 👈 size agregado
  updateQuantity: (productId: string, size: string, delta: number) => void // 👈 delta en vez de quantity absoluta
  clearCart: () => void
  total: () => number
  count: () => number   // 👈 NUEVO
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, size) => {
        const items = get().items
        const existing = items.find(
          i => i.product.id === product.id && i.size === size
        )
        if (existing) {
          set({
            items: items.map(i =>
              i.product.id === product.id && i.size === size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...items, { product, quantity: 1, size }] })
        }
        set({ isOpen: true }) // Abrir drawer al agregar
      },

      removeItem: (productId, size) =>
        set({
          items: get().items.filter(
            i => !(i.product.id === productId && i.size === size)
          ),
        }),

      updateQuantity: (productId, size, delta) => {
        const updated = get().items
          .map(i =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity: i.quantity + delta }
              : i
          )
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
