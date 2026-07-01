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

        {/* Social + Contacto */}
        <div>
          <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.35em] mb-6">
            Síguenos
          </p>
          <a
            href="https://instagram.com/yummycakes.cl"
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

          <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.35em] mt-8 mb-4">
            Contacto
          </p>
          <a
            href="https://wa.me/56964743032"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-stone-400 hover:text-green-300 transition-colors group"
            aria-label="WhatsApp de Yummy Cakes"
          >
            <div className="w-9 h-9 border border-stone-700 group-hover:border-green-400 flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <span className="text-sm">+56 9 6474 3032</span>
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
