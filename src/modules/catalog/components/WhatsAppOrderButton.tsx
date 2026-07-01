import type { Product } from '@/types/database'

// Número de WhatsApp de Yummy Cakes (Yuliana)
const WHATSAPP_PHONE = '56964743032'

export default function WhatsAppOrderButton({ product }: { product: Product }) {
  const text = `¡Hola Yummy Cakes! 🎂 Me interesa una *${product.name}*. Me gustaría coordinar el diseño, tamaño, sabor y fecha de entrega. ¿Me ayudan?`
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`

  return (
    <div>
      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 mb-6">
        <p className="text-sm text-stone-600 leading-relaxed">
          Las tortas personalizadas se cotizan <span className="font-semibold">directamente por WhatsApp</span>,
          para coordinar contigo el diseño, tamaño, sabor y fecha. ¡Cuéntanos tu idea!
        </p>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full py-4 rounded-full font-bold uppercase tracking-widest text-sm bg-[#25D366] hover:bg-[#1EBE5B] text-white transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Pedir por WhatsApp
      </a>
    </div>
  )
}
