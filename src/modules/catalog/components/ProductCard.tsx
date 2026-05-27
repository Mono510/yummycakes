import Link from 'next/link'

export default function ProductCard({ product }: { product: any }) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price)

  const mainImage = product.images && product.images.length > 0
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800'

  return (
    <Link href={`/producto/${product.slug || product.id}`} className="group flex flex-col">
      {/* Portrait image 3:4 */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#2C1810]/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white text-[#2C1810] font-bold text-[10px] uppercase tracking-[0.2em] px-6 py-2.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
            Ver producto
          </span>
        </div>

        {/* Price pill */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-[11px] font-bold text-stone-800">
          {formatPrice(product.price)}
        </div>

        {/* Bestseller strip */}
        {product.is_bestseller && (
          <div className="absolute top-4 left-0 bg-rose-400 text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
            Favorito
          </div>
        )}
      </div>

      {/* Text */}
      <div className="px-0.5">
        <p className="text-[9px] font-bold text-rose-400 uppercase tracking-[0.3em] mb-1.5">
          {product.categories?.name || 'Yummy Cakes'}
        </p>
        <h3 className="font-display text-xl text-stone-800 font-medium leading-tight group-hover:text-rose-500 transition-colors">
          {product.name}
        </h3>
      </div>
    </Link>
  )
}
