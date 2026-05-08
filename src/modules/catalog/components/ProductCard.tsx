import Link from 'next/link'

export default function ProductCard({ product }: { product: any }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price)
  }

  // Extraemos la primera imagen del arreglo, o usamos la de respaldo si viene vacío
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800'

  return (
    <div className="group flex flex-col bg-white overflow-hidden transition-all duration-300">
      {/* Usamos el slug en lugar del ID para URLs más amigables con SEO */}
      <Link href={`/producto/${product.slug || product.id}`} className="relative aspect-square overflow-hidden bg-[#FCE4EC]/30 rounded-xl mb-4">
        <img 
          src={mainImage} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.is_bestseller && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-tighter">
            Best Seller
          </div>
        )}
      </Link>
      
      <div className="flex flex-col text-center md:text-left px-1">
        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.2em] mb-1">
          {product.categories?.name || 'Yummy Cakes'}
        </span>
        <h3 className="font-display text-lg text-stone-800 font-semibold mb-2 leading-tight group-hover:text-rose-500 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-center md:justify-start gap-2">
          <span className="text-md font-bold text-stone-600">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  )
}
