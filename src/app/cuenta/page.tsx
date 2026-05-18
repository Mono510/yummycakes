import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CuentaPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/cuenta/dashboard')
  } else {
    redirect('/cuenta/login')
  }
}
