'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    num: '01',
    tag: 'Colección 2025',
    title: 'Dulzura artesanal para tus momentos especiales.',
    subtitle: 'Tortas personalizadas hechas con amor y los mejores ingredientes.',
    cta: 'Ver catálogo',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 2,
    num: '02',
    tag: 'Nueva temporada',
    title: 'Sabores frescos con frutas de estación.',
    subtitle: 'Descubre nuestras nuevas creaciones con ingredientes de temporada.',
    cta: 'Hacer mi pedido',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1920&auto=format&fit=crop',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length)
        setAnimating(false)
      }, 500)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i: number) => {
    if (i === current) return
    setAnimating(true)
    setTimeout(() => { setCurrent(i); setAnimating(false) }, 500)
  }

  const slide = slides[current]

  return (
    <div className="relative h-[88vh] min-h-[620px] w-full overflow-hidden bg-[#2C1810] flex">

      {/* Left panel: editorial text */}
      <div className={`relative z-10 flex flex-col justify-center px-10 md:px-16 lg:px-24 w-full md:w-[44%] transition-all duration-500 ${animating ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>

        {/* Decorative large number */}
        <span className="font-display text-[140px] md:text-[180px] leading-none text-rose-900/25 font-bold select-none absolute top-6 left-6 md:left-12 pointer-events-none">
          {slide.num}
        </span>

        <div className="relative">
          <p className="text-rose-300/80 text-[10px] font-bold uppercase tracking-[0.45em] mb-7">
            {slide.tag}
          </p>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.08] mb-6">
            {slide.title}
          </h1>

          <div className="w-10 h-px bg-rose-400 mb-6" />

          <p className="text-stone-400 text-sm md:text-base leading-relaxed mb-10 max-w-[280px]">
            {slide.subtitle}
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/catalogo"
              className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-3.5 px-8 text-xs uppercase tracking-[0.15em] transition-all hover:scale-105"
            >
              {slide.cta}
            </Link>
            <Link
              href="/nosotros"
              className="border border-stone-600 hover:border-rose-400 text-stone-300 hover:text-rose-300 font-semibold py-3.5 px-8 text-xs uppercase tracking-[0.15em] transition-all"
            >
              Nuestra historia
            </Link>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-2.5 mt-14">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all rounded-full h-0.5 ${i === current ? 'w-8 bg-rose-400' : 'w-4 bg-stone-600 hover:bg-stone-400'}`}
            />
          ))}
        </div>
      </div>

      {/* Right panel: image with diagonal clip */}
      <div
        className="hidden md:block absolute right-0 top-0 h-full w-[63%]"
        style={{ clipPath: 'polygon(9% 0, 100% 0, 100% 100%, 0% 100%)' }}
      >
        <img
          key={slide.id}
          src={slide.image}
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-700 ${animating ? 'opacity-0' : 'opacity-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810]/70 via-[#2C1810]/10 to-transparent" />
      </div>

      {/* Mobile: full-bleed background image */}
      <div className="absolute inset-0 md:hidden">
        <img
          key={`mob-${slide.id}`}
          src={slide.image}
          alt=""
          className={`w-full h-full object-cover transition-opacity duration-700 ${animating ? 'opacity-0' : 'opacity-100'}`}
        />
        <div className="absolute inset-0 bg-[#2C1810]/75" />
      </div>
    </div>
  )
}
