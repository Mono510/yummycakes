export type Category = {
  id: string
  name: string
  slug: string
  created_at: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  stock: number
  category_id: string | null
  images: string[] | null
  is_active: boolean
  is_bestseller: boolean
  created_at: string
  categories?: Category
}

export type Order = {
  id: string
  user_id: string
  status: 'pending' | 'paid' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  total: number
  delivery_type: 'pickup' | 'delivery'
  delivery_address: string | null
  notes: string | null
  created_at: string
  order_items?: OrderItem[]
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  products?: Product
}

export type Profile = {
  id: string
  full_name: string | null
  phone: string | null
  address: string | null
  created_at: string
}
