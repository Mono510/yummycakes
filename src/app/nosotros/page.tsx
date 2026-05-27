import Link from 'next/link'

const VALORES = [
  {
    titulo: 'Hecho a pedido',
    descripcion: 'Cada torta se prepara el día que la necesitas. Sin stock previo, sin freezer. Solo ingredientes frescos.',
    emoji: '⏰',
  },
  {
    titulo: 'Con amor de verdad',
    descripcion: 'No somos una fábrica. Somos una persona que hornea con cuidado, probando cada sabor antes de entregarlo.',
    emoji: '🤍',
  },
  {
    titulo: 'Calidad artesanal',
    descripcion: 'Usamos mantequilla real, chocolate de cobertura y frutos frescos de temporada. Sin atajos.',
    emoji: '🏅',
  },
]

const HITOS = [
  { numero: '2019', texto: 'Primer pedido — una torta de cumpleaños para la familia.' },
  { numero: '2021', texto: 'Primeros clientes fuera del círculo familiar vía Instagram.' },
  { numero: '2023', texto: 'Local propio en Ejército 441, Santiago.' },
  { numero: 'Hoy', texto: 'Más de 500 tortas entregadas con amor.' },
]

export default function NosotrosPage() {
  return (
    <div className="bg-[#FFFDF9]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-rose-50 py-24 px-4">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-rose-400 font-bold uppercase tracking-[0.3em] text-xs mb-6">Nuestra historia</p>
          <h1 className="font-display text-5xl md:text-7xl text-stone-800 font-bold leading-tight mb-8">
            Dulzura que nace<br />
            <span className="text-rose-400">desde el corazón</span>
          </h1>
          <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Somos una pastelería artesanal ubicada en Santiago. Cada torta que sale de nuestra cocina lleva tiempo, cuidado y los mejores ingredientes.
          </p>
        </div>
      </section>

      {/* ── HISTORIA ── */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-rose-100">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800"
                alt="Yuliana preparando tortas"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-stone-100">
              <p className="text-4xl font-bold font-display text-stone-800">+500</p>
              <p className="text-stone-400 text-sm font-medium">tortas entregadas</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-rose-400 font-bold uppercase tracking-[0.2em] text-xs">La fundadora</p>
            <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold leading-tight">
              Hola, soy<br />Yuliana
            </h2>
            <div className="space-y-4 text-stone-500 leading-relaxed text-base">
              <p>
                Todo empezó en 2019 con una torta de cumpleaños para mi mamá. La decoré, la fotografié, la compartí — y desde ese día no paré.
              </p>
              <p>
                Lo que empezó como un hobby en casa se fue convirtiendo en algo real: pedidos de amigos, luego de conocidos, luego de desconocidos que llegaban por Instagram.
              </p>
              <p>
                En 2023 abrí mi propio espacio en Ejército 441, Santiago. Hoy trabajo con mucha dedicación, y cada torta que preparo lleva el mismo cuidado que la primera.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-12 h-1 bg-rose-300 rounded-full" />
              <p className="text-rose-400 font-semibold text-sm italic">— Yuliana, fundadora</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section className="bg-stone-50 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-rose-400 font-bold uppercase tracking-[0.3em] text-xs mb-4">Lo que nos define</p>
            <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold">
              Nuestra forma de trabajar
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALORES.map((v) => (
              <div key={v.titulo} className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                  {v.emoji}
                </div>
                <h3 className="font-display text-xl font-bold text-stone-800 mb-3">{v.titulo}</h3>
                <p className="text-stone-500 leading-relaxed text-sm">{v.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LÍNEA DE TIEMPO ── */}
      <section className="max-w-3xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <p className="text-rose-400 font-bold uppercase tracking-[0.3em] text-xs mb-4">El camino</p>
          <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold">
            Cómo llegamos hasta aquí
          </h2>
        </div>
        <div className="relative space-y-0">
          {HITOS.map((h, i) => (
            <div key={h.numero} className="flex gap-6 items-start">
              {/* Columna izquierda: línea + círculo */}
              <div className="flex flex-col items-center flex-shrink-0 w-14">
                <div className="w-14 h-14 bg-rose-400 rounded-full flex items-center justify-center shadow-md z-10">
                  <span className="text-white font-bold text-xs text-center leading-tight">{h.numero}</span>
                </div>
                {i < HITOS.length - 1 && (
                  <div className="w-0.5 h-12 bg-rose-100 mt-1" />
                )}
              </div>
              {/* Texto */}
              <div className="pt-3 pb-12">
                <p className="text-stone-600 text-base leading-relaxed">{h.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FRASE ── */}
      <section className="bg-stone-800 py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-3xl md:text-4xl text-white font-bold leading-relaxed mb-4">
            &ldquo;Cada torta tiene que hacerte sentir que fue hecha especialmente para ti. Porque lo fue.&rdquo;
          </p>
          <p className="text-stone-400 font-medium">— Yuliana</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 text-center">
        <p className="text-rose-400 font-bold uppercase tracking-[0.3em] text-xs mb-6">¿Lista para pedir?</p>
        <h2 className="font-display text-4xl md:text-5xl text-stone-800 font-bold mb-8">
          Explora nuestras creaciones
        </h2>
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
