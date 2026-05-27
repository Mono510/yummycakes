'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    return { error: 'Correo o contraseña incorrectos.' }
  }

  redirect('/cuenta/dashboard')
}

export async function register(formData: FormData) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('full_name') as string,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.user) {
    await supabase.from('profiles').insert({
      id: data.user.id,
      full_name: formData.get('full_name') as string,
    })
  }

  redirect('/cuenta/dashboard')
}

export async function resendConfirmation(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.resend({ type: 'signup', email })
  if (error) return { error: 'No pudimos reenviar el correo. Verifica que el email sea correcto.' }
  return { success: true }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
