'use client'
import { useState } from 'react'

const FALLBACK = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800'

export default function ProductGallery({ images, alt }: { images: string[] | null; alt: string }) {
  const pics = images && images.length > 0 ? images : [FALLBACK]
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-rose-50">
        <img src={pics[active]} alt={alt} className="w-full h-full object-cover" />
      </div>

      {pics.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {pics.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`aspect-square rounded-xl overflow-hidden bg-rose-50 transition-all ${
                active === i ? 'ring-2 ring-rose-400 ring-offset-2' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={src} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
