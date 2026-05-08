import { createClient } from '@/lib/supabase/server'

export default async function TestDB() {
  const supabase = await createClient()

  // Hacemos una consulta ultra básica sin filtros
  const { data, error } = await supabase
    .from('products')
    .select('*')

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Debug de Supabase</h1>
      
      <h2 className="font-bold mt-4">¿Hubo algún error de conexión?</h2>
      <pre className="bg-stone-900 text-green-400 p-4 rounded-lg overflow-auto mt-2">
        {JSON.stringify(error, null, 2) || "No hubo errores. La conexión es exitosa."}
      </pre>

      <h2 className="font-bold mt-8">Datos recibidos:</h2>
      <pre className="bg-stone-900 text-blue-400 p-4 rounded-lg overflow-auto mt-2">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
