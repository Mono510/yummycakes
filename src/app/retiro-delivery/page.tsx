import Link from 'next/link'

const HORARIOS = [
  { dia: 'Lunes – Viernes', hora: '10:00 – 20:30' },
  { dia: 'Sábado', hora: '10:00 – 19:00' },
  { dia: 'Domingo', hora: 'Cerrado' },
]

const COMUNAS = [
  'Santiago Centro', 'Providencia', 'Ñuñoa', 'Macul',
  'San Joaquín', 'La Florida', 'Peñalolén', 'Vitacura',
  'Las Condes', 'Recoleta', 'Independencia', 'Estación Central',
]

const FAQS = [
  {
    pregunta: '¿Con cuánta anticipación debo hacer mi pedido?',
    respuesta: 'Mínimo 24 horas antes. Para pedidos especiales (más de 30 personas o decoraciones personalizadas), recomendamos 48–72 horas.',
  },
  {
    pregunta: '¿Puedo cambiar la fecha de retiro o entrega?',
    respuesta: 'Sí, con al menos 12 horas de anticipación. Escríbenos por Instagram o WhatsApp y coordinamos sin problema.',
  },
  {
    pregunta: '¿Cómo llega la torta para el delivery?',
    respuesta: 'En caja especial con base antideslizante. Las tortas van seguras para trayectos dentro de la Región Metropolitana.',
  },
  {
    pregunta: '¿El costo de delivery varía según la comuna?',
    respuesta: 'No. El costo es fijo: $4.000 CLP para todas las comunas disponibles dentro de la RM.',
  },
  {
    pregunta: '¿Hacen despacho fuera de Santiago?',
    respuesta: 'Por ahora solo dentro de la Región Metropolitana. Para pedidos fuera de Santiago, contáctanos y evaluamos caso a caso.',
  },
]

export default function RetiroDeliveryPage() {
  return (
    <div className="bg-[#FFFDF9]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-stone-800 py-24 px-4 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?q=80&w=1600')] bg-cover bg-center opacity-10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-rose-300 font-bold uppercase tracking-[0.3em] text-xs mb-6">Cómo recibir tu pedido</p>
          <h1 className="font-display text-5xl md:text-6xl text-white font-bold leading-tight mb-6">
            Retiro y Delivery
          </h1>
          <p className="text-stone-300 text-lg max-w-xl mx-auto leading-relaxed">
            Elige cómo quieres recibir tu torta. Retiro gratis en tienda o delivery a tu puerta.
          </p>
        </div>
      </section>

      {/* ── DOS OPCIONES ── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* RETIRO */}
          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="bg-rose-50 px-8 py-10">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-3xl">
                🏪
              </div>
              <h2 className="font-display text-3xl font-bold text-stone-800 mb-2">Retiro en tienda</h2>
              <p className="text-stone-500 text-sm">Sin costo adicional</p>
              <div className="mt-4 inline-block bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Gratis
              </div>
            </div>

            <div className="px-8 py-8 space-y-6">
              {/* Dirección */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Dirección</p>
                  <p className="text-stone-700 font-semibold">Ejército 441, Santiago</p>
                  <p className="text-stone-400 text-sm">Metro Toesca (L2) — 5 min a pie</p>
                </div>
              </div>

              {/* Horarios */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Horario de atención</p>
                  <div className="space-y-1.5">
                    {HORARIOS.map((h) => (
                      <div key={h.dia} className="flex justify-between text-sm">
                        <span className="text-stone-500">{h.dia}</span>
                        <span className={`font-semibold ${h.hora === 'Cerrado' ? 'text-stone-300' : 'text-stone-700'}`}>
                          {h.hora}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Instrucciones */}
              <div className="bg-stone-50 rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">¿Cómo funciona?</p>
                <ol className="space-y-2 text-sm text-stone-600">
                  <li className="flex gap-2"><span className="text-rose-400 font-bold">1.</span> Haz tu pedido en línea eligiendo la fecha y horario de retiro.</li>
                  <li className="flex gap-2"><span className="text-rose-400 font-bold">2.</span> Recibirás una confirmación por correo.</li>
                  <li className="flex gap-2"><span className="text-rose-400 font-bold">3.</span> Llega a la tienda en el horario elegido y retira tu torta.</li>
                </ol>
              </div>

              <Link
                href="/catalogo"
                className="block text-center bg-stone-800 hover:bg-stone-700 text-white py-3.5 rounded-full font-bold text-sm uppercase tracking-widest transition-all"
              >
                Pedir para retiro
              </Link>
            </div>
          </div>

          {/* DELIVERY */}
          <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
            <div className="bg-stone-800 px-8 py-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🚗
              </div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">Delivery a domicilio</h2>
              <p className="text-stone-300 text-sm">Región Metropolitana</p>
              <div className="mt-4 inline-block bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                $4.000 CLP
              </div>
            </div>

            <div className="px-8 py-8 space-y-6">
              {/* Zona */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Cobertura</p>
                  <p className="text-stone-700 font-semibold">Región Metropolitana</p>
                  <p className="text-stone-400 text-sm">Comunas seleccionadas</p>
                </div>
              </div>

              {/* Horarios delivery */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">Ventanas de entrega</p>
                  <div className="space-y-1 text-sm text-stone-600">
                    <p>• 10:00 – 13:00</p>
                    <p>• 13:00 – 16:00</p>
                    <p>• 16:00 – 19:00</p>
                    <p>• 19:00 – 21:00</p>
                  </div>
                </div>
              </div>

              {/* Instrucciones */}
              <div className="bg-stone-50 rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">¿Cómo funciona?</p>
                <ol className="space-y-2 text-sm text-stone-600">
                  <li className="flex gap-2"><span className="text-stone-500 font-bold">1.</span> Elige tu dirección con el autocompletado al hacer el pedido.</li>
                  <li className="flex gap-2"><span className="text-stone-500 font-bold">2.</span> Selecciona fecha y ventana horaria.</li>
                  <li className="flex gap-2"><span className="text-stone-500 font-bold">3.</span> Recibirás tu torta en caja especial lista para celebrar.</li>
                </ol>
              </div>

              <Link
                href="/catalogo"
                className="block text-center bg-rose-400 hover:bg-rose-500 text-white py-3.5 rounded-full font-bold text-sm uppercase tracking-widest transition-all"
              >
                Pedir con delivery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMUNAS ── */}
      <section className="bg-stone-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-rose-400 font-bold uppercase tracking-[0.3em] text-xs mb-4">Dónde llegamos</p>
            <h2 className="font-display text-4xl text-stone-800 font-bold">Comunas con delivery</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {COMUNAS.map((c) => (
              <div key={c} className="bg-white rounded-xl px-4 py-3 text-center border border-stone-100 shadow-sm">
                <p className="text-stone-600 text-sm font-medium">{c}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-stone-400 text-sm mt-8">
            ¿No ves tu comuna? <a href="https://www.instagram.com" className="text-rose-400 hover:text-rose-500 font-semibold">Escríbenos</a> y coordinamos.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-rose-400 font-bold uppercase tracking-[0.3em] text-xs mb-4">Dudas frecuentes</p>
          <h2 className="font-display text-4xl text-stone-800 font-bold">Preguntas frecuentes</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details key={faq.pregunta} className="group bg-white rounded-2xl border border-stone-100 shadow-sm">
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                <span className="font-semibold text-stone-700 text-sm pr-4">{faq.pregunta}</span>
                <svg className="flex-shrink-0 w-5 h-5 text-stone-400 group-open:rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-stone-500 text-sm leading-relaxed">{faq.respuesta}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-rose-50 py-20 px-4 text-center">
        <h2 className="font-display text-4xl text-stone-800 font-bold mb-4">
          ¿Lista para hacer tu pedido?
        </h2>
        <p className="text-stone-500 mb-8 max-w-md mx-auto">
          Elige tu torta, selecciona cómo recibirla y lo preparamos especialmente para ti.
        </p>
        <Link
          href="/catalogo"
          className="inline-block bg-stone-800 hover:bg-stone-700 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all"
        >
          Ver catálogo
        </Link>
      </section>

    </div>
  )
}
