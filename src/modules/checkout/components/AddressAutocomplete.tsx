'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import AddressMap from './AddressMap'
interface AddressResult {
  fullAddress: string
  street: string
  commune: string
}

interface NominatimResult {
  place_id: number
  display_name: string
  lat: string
  lon: string
  address: {
    road?: string
    house_number?: string
    suburb?: string
    city_district?: string
    city?: string
    town?: string
    village?: string
    county?: string
    state?: string
  }
}

interface Props {
  onSelect: (result: AddressResult) => void
  required?: boolean
}


const COMMUNES = [
  'Buin','Cerrillos','Cerro Navia','Colina','Conchalí','El Bosque',
  'Estación Central','Huechuraba','Independencia','La Cisterna',
  'La Florida','La Granja','La Pintana','La Reina','Lampa',
  'Las Condes','Lo Barnechea','Lo Espejo','Lo Prado','Macul',
  'Maipú','Melipilla','Ñuñoa','Pedro Aguirre Cerda','Peñalolén',
  'Providencia','Pudahuel','Puente Alto','Quilicura','Quinta Normal',
  'Recoleta','Renca','San Bernardo','San Joaquín','San Miguel',
  'San Ramón','Santiago','Talagante','Vitacura',
].sort()

// Extraer número del texto escrito por el usuario
function extractNumberFromQuery(query: string): string {
  const match = query.match(/\d+/)
  return match ? match[0] : ''
}

function extractStreet(address: NominatimResult['address']): string {
  const road = address.road ?? ''
  const number = address.house_number ?? ''
  return number ? `${road} ${number}` : road
}

export default function AddressAutocomplete({ onSelect, required }: Props) {
  const [commune, setCommune] = useState('')
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSuggestions([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Resetear calle cuando cambia la comuna
  function handleCommuneChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setCommune(e.target.value)
    setQuery('')
    setSelected(false)
    setSuggestions([])
    setError(null)
  }

  const search = useCallback(async (value: string, selectedCommune: string) => {
    if (value.length < 4 || !selectedCommune) {
      setSuggestions([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        q: `${value}, ${selectedCommune}, Región Metropolitana, Chile`,
        format: 'json',
        addressdetails: '1',
        limit: '5',
        countrycodes: 'cl',
        'accept-language': 'es',
        dedupe: '1', // Nominatim deduplica resultados similares
      })

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?${params}`,
        { headers: { 'User-Agent': 'YummyCakes/1.0' } }
      )

      const data: NominatimResult[] = await res.json()

      // Filtrar solo resultados con calle y deduplicar por nombre de calle
      const seen = new Set<string>()
      const filtered = data
        .filter(r => r.address.road)
        .filter(r => {
          const key = extractStreet(r.address)
          if (seen.has(key)) return false
          seen.add(key)
          return true
        })

      setSuggestions(filtered)
    } catch {
      setError('Error buscando la dirección. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value)
    setSelected(false)
    setError(null)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(value, commune), 500)
  }

 function handleSelect(result: NominatimResult) {
  const road = result.address.road ?? ''
  
  // Priorizar número que escribió el usuario sobre el que devuelve Nominatim
  const userNumber = extractNumberFromQuery(query)
  const apiNumber = result.address.house_number ?? ''
  const number = userNumber || apiNumber

  const street = number ? `${road} ${number}` : road
  const displayAddress = `${street}, ${commune}`

  setQuery(street)
  setSuggestions([])
  setSelected(true)
  setError(null)
  setCoords({ lat: parseFloat(result.lat), lon: parseFloat(result.lon) }) 
  onSelect({
    fullAddress: displayAddress,
    street,
    commune,
  })
}

  return (
    <div className="space-y-3">

      {/* Paso 1: Seleccionar comuna */}
      <div>
        <label className="block text-xs text-stone-500 mb-1.5 font-medium">
          Comuna <span className="text-rose-400">*</span>
        </label>
        <select
          value={commune}
          onChange={handleCommuneChange}
          required={required}
          className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white"
        >
          <option value="" disabled>Selecciona tu comuna</option>
          {COMMUNES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Paso 2: Calle — solo si hay comuna seleccionada */}
      {commune && (
        <div ref={containerRef} className="relative">
          <label className="block text-xs text-stone-500 mb-1.5 font-medium">
            Calle y número <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              required={required}
              placeholder={`Ej: Av. Providencia 1234`}
              autoComplete="off"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 bg-white pr-10"
            />

            <div className="absolute right-3 top-3.5">
              {loading && (
                <div className="w-4 h-4 border-2 border-rose-200 border-t-rose-400 rounded-full animate-spin" />
              )}
              {!loading && selected && (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#639922" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </div>
          </div>

          {/* Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute z-50 w-full bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden mt-1">
              {suggestions.map(result => {
                const street = extractStreet(result.address)
                return (
                  <button
                    key={result.place_id}
                    type="button"
                    onClick={() => handleSelect(result)}
                    className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-rose-50 transition-colors border-b border-stone-50 last:border-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <div>
                      <p className="text-sm text-stone-700 font-medium">{street}</p>
                      <p className="text-xs text-stone-400">{commune}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {/* Sin resultados */}
          {!loading && query.length >= 4 && suggestions.length === 0 && !selected && (
            <p className="text-xs text-stone-400 mt-1.5 px-1">
              No se encontraron resultados. Intenta con otro nombre de calle.
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 mt-1.5 px-1">{error}</p>
          )}

          {/* Confirmación */}
          {selected && (
            <p className="text-xs text-green-600 mt-1.5 px-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Dirección validada · {commune}
            </p>
          )}
{selected && coords && (
  <AddressMap
    lat={coords.lat}
    lon={coords.lon}
    address={`${query}, ${commune}`}
    onDrag={(lat, lon) => setCoords({ lat, lon })}
  />
)}
        </div>
      )}
    </div>
  )
}
