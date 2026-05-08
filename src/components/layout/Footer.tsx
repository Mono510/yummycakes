import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t-4 border-rose-500">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Columna 1: Marca */}
        <div>
          <h3 className="text-2xl font-display text-white mb-4">Yummy Cakes</h3>
          <p className="text-sm leading-relaxed max-w-xs">
            Dulzura artesanal para tus mejores momentos. Horneamos con amor, dedicación y los mejores ingredientes.
          </p>
        </div>

        {/* Columna 2: Enlaces */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Enlaces Rápidos</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/catalogo" className="hover:text-rose-400 transition-colors">
                Catálogo de Productos
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className="hover:text-rose-400 transition-colors">
                Nuestra Historia
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-rose-400 transition-colors">
                Contacto y Ubicación
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Redes Sociales */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Síguenos</h4>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-stone-800 hover:bg-rose-500 hover:text-white transition-all text-stone-400 group"
            aria-label="Instagram de Yummy Cakes"
          >
            {/* Ícono SVG Nativo de Instagram (Reemplaza a lucide-react) */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" height="20" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:scale-110 transition-transform"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
        <p>&copy; {new Date().getFullYear()} Yummy Cakes. Todos los derechos reservados.</p>
        <p className="mt-2 md:mt-0">Diseñado con ♥ para los amantes de lo dulce.</p>
      </div>
    </footer>
  )
}
