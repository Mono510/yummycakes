import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/modules/auth/AuthProvider'
import CartDrawer from '@/modules/cart/components/CartDrawer'
import ChatWidget from '@/modules/chatbot/ChatWidget'
import 'leaflet/dist/leaflet.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Yummy Cakes - Pastelería Artesanal',
  description: 'Dulzura artesanal para tus mejores momentos.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="flex flex-col min-h-screen bg-[#FFFDF9]">
        <AuthProvider>        
          <Header />
          <CartDrawer />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  )
}
