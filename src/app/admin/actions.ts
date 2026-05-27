'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const slug = name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  let images: string[] = []
  try { images = JSON.parse(formData.get('images_json') as string) } catch {}

  const { error } = await supabase.from('products').insert({
    name,
    slug,
    description: formData.get('description') as string || null,
    price: Number(formData.get('price')),
    stock: Number(formData.get('stock') ?? 10),
    category_id: formData.get('category_id') as string || null,
    images,
    is_active: formData.get('is_active') === 'on',
    is_bestseller: formData.get('is_bestseller') === 'on',
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/productos')
  revalidatePath('/catalogo')
  revalidatePath('/')
  redirect('/admin/productos')
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()

  let images: string[] = []
  try { images = JSON.parse(formData.get('images_json') as string) } catch {}

  const { error } = await supabase.from('products').update({
    name: formData.get('name') as string,
    description: formData.get('description') as string || null,
    price: Number(formData.get('price')),
    stock: Number(formData.get('stock') ?? 10),
    category_id: formData.get('category_id') as string || null,
    images,
    is_active: formData.get('is_active') === 'on',
    is_bestseller: formData.get('is_bestseller') === 'on',
  }).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/productos')
  revalidatePath('/catalogo')
  revalidatePath('/')
  redirect('/admin/productos')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  await supabase.from('products').update({ is_active: false }).eq('id', id)
  revalidatePath('/admin/productos')
  revalidatePath('/catalogo')
  revalidatePath('/')
}

export async function updateOrderStatus(id: string, status: string) {
  const supabase = await createClient()
  await supabase.from('orders').update({ status }).eq('id', id)
  revalidatePath('/admin/ordenes')
}
