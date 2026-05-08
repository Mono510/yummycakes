const faqs = [
  {
    question: '¿Con cuánto tiempo de anticipación debo hacer mi pedido?',
    answer: 'Para tortas personalizadas solicitamos al menos 7 días de anticipación. Para productos de catálogo regular, puedes pedir con 48 horas de anticipación.'
  },
  {
    question: '¿Hacen envíos a domicilio?',
    answer: 'Sí, contamos con servicio de delivery a zonas específicas con un costo adicional dependiendo de la distancia. También puedes retirar gratis en nuestro taller.'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos transferencias bancarias, tarjetas de débito/crédito a través de Mercado Pago y efectivo al momento de retirar en el taller.'
  },
  {
    question: '¿Tienen opciones sin gluten o veganas?',
    answer: '¡Sí! Contamos con una línea especial de productos adaptados. Por favor, indícanos tus requerimientos al momento de cotizar para ofrecerte las mejores opciones.'
  }
]

export default function FAQ() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl text-stone-800 font-bold mb-4">Preguntas Frecuentes</h2>
        <p className="text-stone-600">Resolvemos tus dudas más comunes antes de hacer tu pedido dulce.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details 
            key={index}
            className="group bg-white border border-stone-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-stone-800 hover:text-rose-500 transition-colors">
              <span>{faq.question}</span>
              <span className="transition duration-300 group-open:-rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </summary>
            <div className="p-5 pt-0 text-stone-600 border-t border-stone-100 bg-stone-50">
              <p className="mt-3">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
