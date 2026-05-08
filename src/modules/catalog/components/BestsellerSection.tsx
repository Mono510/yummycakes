import type { Product } from '@/types/database'
import ProductCard from './ProductCard'

interface BestsellerSectionProps {
  products: Product[]
}

export default function BestsellerSection({ products }: BestsellerSectionProps) {
  return (
    <section className="bg-rose-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold mb-3">
            Los Favoritos de Yummy Cakes
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Nuestras creaciones más amadas por los clientes. Si es tu primera vez aquí, te recomendamos empezar por uno de estos.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
