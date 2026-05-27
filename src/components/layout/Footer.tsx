import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#2C1810] text-stone-400">

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand */}
        <div>
          <h3 className="font-display text-3xl text-white font-bold mb-2 leading-none">
            Yummy<br />Cakes.
          </h3>
          <div className="w-8 h-px bg-rose-400 mt-3 mb-5" />
          <p className="text-sm leading-relaxed text-stone-500 max-w-xs">
            Pastelería artesanal en Santiago. Horneamos con amor, dedicación y los mejores ingredientes.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.35em] mb-6">
            Navegación
          </p>
          <ul className="space-y-3 text-sm">
            {[
              { href: '/catalogo', label: 'Catálogo de productos' },
              { href: '/nosotros', label: 'Nuestra historia' },
              { href: '/retiro-delivery', label: 'Retiro y delivery' },
              { href: '/cuenta', label: 'Mi cuenta' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-rose-300 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.35em] mb-6">
            Síguenos
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-stone-400 hover:text-rose-300 transition-colors group"
            aria-label="Instagram de Yummy Cakes"
          >
            <div className="w-9 h-9 border border-stone-700 group-hover:border-rose-400 flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
            <span className="text-sm">@yummycakes.cl</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800/60 max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600 gap-2">
        <p>&copy; {new Date().getFullYear()} Yummy Cakes. Todos los derechos reservados.</p>
        <p>Hecho con cariño en Santiago, Chile.</p>
      </div>
    </footer>
  )
}
