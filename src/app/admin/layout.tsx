import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'yuliana@yummycakes.cl'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/productos', label: 'Productos', icon: '🎂' },
  { href: '/admin/ordenes', label: 'Órdenes', icon: '📦' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== ADMIN_EMAIL) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-stone-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-white flex flex-col fixed h-full z-40">
        <div className="px-6 py-8 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-400 rounded-full flex items-center justify-center font-bold text-lg">
              YC
            </div>
            <div>
              <p className="font-bold text-sm">Yummy Cakes</p>
              <p className="text-stone-400 text-xs">Panel de administración</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-300 hover:bg-stone-800 hover:text-white transition-all text-sm font-medium"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-6 py-6 border-t border-stone-800">
          <p className="text-stone-500 text-xs truncate">{user.email}</p>
          <Link href="/" className="text-rose-400 hover:text-rose-300 text-xs mt-1 block transition-colors">
            ← Volver a la tienda
          </Link>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
