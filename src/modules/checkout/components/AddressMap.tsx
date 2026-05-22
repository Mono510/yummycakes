'use client'
import { useEffect, useRef } from 'react'

interface Props {
  lat: number
  lon: number
  address: string
  onDrag?: (lat: number, lon: number) => void
}

export default function AddressMap({ lat, lon, address, onDrag }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      // Verificar que el contenedor sigue montado después del await
      if (!containerRef.current) return

      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      // Limpiar todo antes de inicializar
      const container = containerRef.current as any
      if (container._leaflet_id) {
        container._leaflet_id = null
      }
      if (mapRef.current) {
        try { mapRef.current.remove() } catch {}
        mapRef.current = null
      }

      const map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([lat, lon], 17)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      const marker = L.marker([lat, lon], { draggable: true })
        .addTo(map)
        .bindPopup(address, { closeButton: false })
        .openPopup()

      marker.on('dragend', () => {
        const pos = marker.getLatLng()
        onDrag?.(pos.lat, pos.lng)
      })

      mapRef.current = map
    }

    initMap()

    return () => {
      // Limpiar tanto la instancia como el ID del DOM
      if (mapRef.current) {
        try { mapRef.current.remove() } catch {}
        mapRef.current = null
      }
      if (containerRef.current) {
        (containerRef.current as any)._leaflet_id = null
      }
    }
  }, [lat, lon, address])

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-stone-500 font-medium">Confirma la ubicación en el mapa</p>
        <p className="text-xs text-stone-400">Puedes arrastrar el pin para ajustar</p>
      </div>
      <div
        ref={containerRef}
        className="w-full h-52 rounded-xl overflow-hidden border border-stone-200 z-0"
      />
    </div>
  )
}
