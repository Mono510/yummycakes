'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser()
      .then(({ data }) => { setUser(data.user) })
      .catch(() => { setUser(null) })
      .finally(() => { setLoading(false) })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'INITIAL_SESSION') return
        setUser(session?.user ?? null)
        router.refresh()
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
