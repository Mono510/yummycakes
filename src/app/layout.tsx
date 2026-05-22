import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/modules/auth/AuthProvider'
import CartDrawer from '@/modules/cart/components/CartDrawer'  
import 'leaflet/dist/leaflet.css'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Yummy Cakes - Pastelería Artesanal',
  description: 'Dulzura artesanal para tus mejores momentos.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex flex-col min-h-screen bg-[#FFFDF9]">
        <AuthProvider>        
          <Header />
          <CartDrawer />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
