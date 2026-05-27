'use client'
import { useState, useTransition, useRef } from 'react'
import Link from 'next/link'
import { login, resendConfirmation } from '../actions'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [resendMsg, setResendMsg] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isResending, startResend] = useTransition()
  const emailRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setResendMsg(null)
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) setError(result.error)
    })
  }

  function handleResend() {
    const email = emailRef.current?.value
    if (!email) {
      setResendMsg('Escribe tu correo arriba antes de reenviar.')
      return
    }
    setResendMsg(null)
    startResend(async () => {
      const result = await resendConfirmation(email)
      if (result?.error) setResendMsg(result.error)
      else setResendMsg('Correo reenviado. Revisa tu bandeja de entrada.')
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
            MI CUENTA
          </h1>
          <p className="text-stone-400 mt-2 text-sm">
            Ingresa para ver tus pedidos y más
          </p>
        </div>

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
                ref={emailRef}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="tu@correo.com"
                className="w-full bg-white text-stone-800 border border-stone-200 rounded-xl px-4 py-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent transition-all"
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
                className="w-full bg-white text-stone-800 border border-stone-200 rounded-xl px-4 py-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="block mt-2 text-xs text-rose-500 hover:underline disabled:opacity-50 font-semibold"
                >
                  {isResending ? 'Reenviando...' : '¿No te llegó el correo de confirmación? Reenviar ahora'}
                </button>
              </div>
            )}

            {resendMsg && (
              <div className={`text-sm px-4 py-3 rounded-xl border ${
                resendMsg.includes('Correo reenviado')
                  ? 'bg-green-50 border-green-100 text-green-700'
                  : 'bg-amber-50 border-amber-100 text-amber-700'
              }`}>
                {resendMsg}
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
              <Link href="/cuenta/registro" className="text-rose-500 font-semibold hover:underline">
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
