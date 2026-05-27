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
    <section className="max-w-5xl mx-auto px-4 py-24">

      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-rose-400 text-[10px] font-bold uppercase tracking-[0.45em] mb-4">
            Resolvemos tus dudas
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-stone-800 font-bold leading-[0.95]">
            Preguntas<br />frecuentes.
          </h2>
        </div>
        <p className="text-stone-500 text-sm max-w-xs leading-relaxed md:text-right">
          Todo lo que necesitas saber antes de hacer tu pedido dulce.
        </p>
      </div>

      {/* FAQ list */}
      <div>
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group border-t border-stone-200 last:border-b [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-start gap-6 py-7 cursor-pointer select-none">
              {/* Large number */}
              <span className="font-display text-5xl text-stone-200 font-bold leading-none select-none flex-shrink-0 group-open:text-rose-200 transition-colors w-14 text-right">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Question + toggle */}
              <div className="flex-grow flex items-start justify-between pt-1 gap-4">
                <p className="font-display text-xl md:text-2xl text-stone-800 font-medium leading-tight group-open:text-rose-600 transition-colors">
                  {faq.question}
                </p>
                <span className="text-stone-400 group-open:text-rose-400 group-open:rotate-45 transition-all duration-300 flex-shrink-0 text-3xl font-light leading-none mt-0.5">
                  +
                </span>
              </div>
            </summary>

            {/* Answer */}
            <div className="ml-20 pb-8">
              <p className="text-stone-500 leading-relaxed text-base">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
