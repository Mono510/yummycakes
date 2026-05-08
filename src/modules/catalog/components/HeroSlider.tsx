'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    title: 'Dulzura Artesanal para tus Momentos Especiales',
    subtitle: 'Tortas personalizadas y mesas dulces hechas con amor y los mejores ingredientes.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Nueva Colección de Temporada',
    subtitle: 'Descubre nuestros nuevos sabores con frutas frescas de estación.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1920&auto=format&fit=crop',
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-stone-900">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={slide.image} 
            alt="Banner Yummy Cakes" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-display text-4xl md:text-6xl text-white font-bold mb-4 max-w-4xl drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-rose-50 mb-8 max-w-2xl drop-shadow-md">
              {slide.subtitle}
            </p>
            <Link 
              href="/catalogo" 
              className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg"
            >
              Hacer mi pedido
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
