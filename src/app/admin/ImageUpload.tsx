'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ImageUpload({ currentImages }: { currentImages: string[] | null }) {
  const [images, setImages] = useState<string[]>(currentImages ?? [])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const removeImage = (url: string) => setImages(prev => prev.filter(i => i !== url))

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    const supabase = createClient()
    const ext = file.name.split('.').pop() ?? 'jpg'
    const fileName = `${Date.now()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, file, { contentType: file.type })

    if (uploadError) {
      setError(`Error al subir: ${uploadError.message}`)
      setUploading(false)
      e.target.value = ''
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName)
    setImages(prev => [...prev, publicUrl])
    setUploading(false)
    e.target.value = ''
  }

  return (
    <div className="space-y-4">
      <input type="hidden" name="images_json" value={JSON.stringify(images)} />

      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative group">
              <img src={url} alt="" className="w-24 h-24 object-cover rounded-xl border border-stone-200" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="border-2 border-dashed border-stone-200 rounded-xl p-6 text-center hover:border-rose-300 transition-colors">
        {uploading ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="w-6 h-6 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-stone-400">Subiendo imagen...</span>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-stone-500 mb-1">
              {images.length === 0 ? 'Agregar imagen del producto' : 'Agregar otra imagen'}
            </p>
            <p className="text-xs text-stone-400 mb-3">JPG, PNG o WEBP</p>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              disabled={uploading}
              className="block w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-rose-50 file:text-rose-500 hover:file:bg-rose-100 cursor-pointer"
            />
          </>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}
    </div>
  )
}
