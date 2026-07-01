'use client'
import { useState, useRef, useEffect } from 'react'
import { KNOWLEDGE_BASE, WHATSAPP_PHONE, type QA } from './knowledgeBase'

type Msg = { from: 'bot' | 'user'; text: string; wa?: string }

const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[¿?¡!.,;:]/g, ' ').replace(/\s+/g, ' ').trim()

// Busca la mejor respuesta por coincidencia de palabras clave.
function findAnswer(input: string): QA | null {
  const text = ` ${normalize(input)} `
  let best: QA | null = null
  let bestScore = 0
  for (const qa of KNOWLEDGE_BASE) {
    let score = 0
    for (const kw of qa.keywords) {
      const k = normalize(kw)
      if (text.includes(` ${k} `) || text.includes(` ${k}`) || text.includes(`${k} `)) {
        // frases (más palabras) pesan más que una sola palabra
        score += 1 + k.split(' ').length
      }
    }
    if (score > bestScore) {
      bestScore = score
      best = qa
    }
  }
  return bestScore > 0 ? best : null
}

const SUGGESTIONS = KNOWLEDGE_BASE.filter(q => q.suggested)

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    { from: 'bot', text: '¡Hola! 👋 Soy el asistente de Yummy Cakes. Pregúntame por precios, sabores, cómo pedir, retiro y más. ¿En qué te ayudo?' },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const waLink = (q: string) =>
    `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`¡Hola! Tengo una consulta: ${q}`)}`

  const send = (raw: string) => {
    const q = raw.trim()
    if (!q) return
    setInput('')
    const userMsg: Msg = { from: 'user', text: q }
    const match = findAnswer(q)
    const botMsg: Msg = match
      ? { from: 'bot', text: match.answer }
      : {
          from: 'bot',
          text: 'Mmm, no estoy segur@ de esa 🤔. Para ayudarte mejor con eso, escríbenos directamente por WhatsApp y te respondemos al tiro:',
          wa: waLink(q),
        }
    setMessages(prev => [...prev, userMsg, botMsg])
  }

  // Chips de sugerencia: respuesta exacta garantizada (sin pasar por el matcher)
  const askSuggestion = (qa: QA) => {
    setMessages(prev => [...prev, { from: 'user', text: qa.question }, { from: 'bot', text: qa.answer }])
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Abrir chat de ayuda"
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-rose-400 hover:bg-rose-500 text-white shadow-lg flex items-center justify-center transition-all hover:scale-105"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>

      {/* Panel del chat */}
      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-sm h-[70vh] max-h-[520px] bg-white rounded-3xl shadow-2xl border border-stone-100 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#2C1810] px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-rose-400 flex items-center justify-center text-white font-bold flex-shrink-0">🎂</div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm leading-tight">Asistente Yummy Cakes</p>
              <p className="text-stone-400 text-[11px]">Normalmente responde al instante</p>
            </div>
          </div>

          {/* Mensajes */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-stone-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-rose-400 text-white rounded-br-sm'
                      : 'bg-white border border-stone-100 text-stone-700 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                  {m.wa && (
                    <a
                      href={m.wa}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2.5 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs font-bold py-2 px-3 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Escribir por WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Sugerencias rápidas (solo al inicio) */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => askSuggestion(s)}
                    className="text-xs bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {s.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={e => { e.preventDefault(); send(input) }}
            className="border-t border-stone-100 p-3 flex items-center gap-2 bg-white"
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 border border-stone-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className="w-10 h-10 flex-shrink-0 rounded-full bg-rose-400 hover:bg-rose-500 text-white flex items-center justify-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}
