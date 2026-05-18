'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { register } from '../actions'

export default function RegistroPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    const password = formData.get('password') as string
    const confirm = formData.get('confirm_password') as string

    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    startTransition(async () => {
      const result = await register(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#F8BBD0] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-sm mx-auto mb-4">
            YC
          </div>
          <h1 className="font-display text-3xl text-stone-800 font-bold tracking-wide">
            CREAR CUENTA
          </h1>
          <p className="text-stone-400 mt-2 text-sm">
            Únete a Yummy Cakes y haz tus pedidos
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <h2 className="text-stone-400 font-semibold text-xs uppercase tracking-widest mb-6">
            Registro
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1.5">
                Nombre completo
              </label>
              <input
                name="full_name"
                type="text"
                required
                placeholder="Ej: María González"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1.5">
                Correo electrónico
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="tu@correo.com"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1.5">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-600 mb-1.5">
                Confirmar contraseña
              </label>
              <input
                name="confirm_password"
                type="password"
                required
                placeholder="Repite tu contraseña"
                className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-rose-400 hover:bg-rose-500 disabled:opacity-60 text-white py-3 rounded-xl font-semibold text-sm transition-all mt-2"
            >
              {isPending ? 'Creando cuenta...' : 'CREAR CUENTA'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500">
            ¿Ya tienes cuenta?{' '}
            <Link href="/cuenta/login" className="text-rose-500 font-semibold hover:underline">
              Ingresar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
