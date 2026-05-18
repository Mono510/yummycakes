'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { login } from '../actions'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#F8BBD0] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-sm mx-auto mb-4">
            YC
          </div>
          <h1 className="font-display text-3xl text-stone-800 font-bold tracking-wide">
            MI CUENTA
          </h1>
          <p className="text-stone-400 mt-2 text-sm">
            Ingresa para ver tus pedidos y más
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          <h2 className="text-stone-400 font-semibold text-xs uppercase tracking-widest mb-6">
            Acceder
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                autoComplete="current-password"
                placeholder="••••••••"
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
              {isPending ? 'Ingresando...' : 'ACCESO'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <Link
              href="#"
              className="block text-sm text-stone-400 hover:text-rose-400 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <p className="text-sm text-stone-500">
              ¿No tienes cuenta?{' '}
              <Link
                href="/cuenta/registro"
                className="text-rose-500 font-semibold hover:underline"
              >
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
