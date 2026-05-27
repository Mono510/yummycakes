@AGENTS.md

# Yummy Cakes — Contexto del Proyecto

## Qué es esto
E-commerce de pastelería artesanal para una clienta llamada **Yuliana**, ubicada en Santiago, Chile.
El proyecto fue iniciado por un amigo de Benjamín; él tomó el código de GitHub junto con las llaves de Supabase.
Benjamín actúa como desarrollador del proyecto, no como dueño del negocio.

## Stack técnico
- **Next.js 16.2.6** con App Router y Turbopack (`next dev`)
- **Supabase** (PostgreSQL + Auth) — proyecto `jmcwnlahznmtfolpgqav`
- **Tailwind CSS v4** — sin `tailwind.config.ts`. Fuentes y colores se definen en `globals.css` con `@theme`
- **Zustand** con `persist` para el carrito (localStorage)
- **TypeScript** estricto

## Reglas críticas de Next.js 16

### Middleware se llama `proxy.ts`, no `middleware.ts`
El archivo `src/proxy.ts` exporta `proxy` (no `middleware`) y `config`. Esta es una convención propia de esta versión — no usar el nombre estándar.

### Auth en servidor
Siempre usar `createClient` desde `@/lib/supabase/server` (async, con cookies).
Para el cliente usar `@/lib/supabase/client` (sincrónico, sin await).

### Server Actions
Archivos con `'use server'` en `src/app/**/actions.ts`.
Después de mutaciones usar `revalidatePath()` y/o `redirect()`.

## Fuentes (Tailwind v4)
```css
/* globals.css */
@theme {
  --font-display: var(--font-cormorant), 'Cormorant Garamond', serif;
  --font-sans: var(--font-dm-sans), 'DM Sans', sans-serif;
  --color-chocolate: #2C1810;
}
```
```tsx
// layout.tsx
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
```
Usar `font-display` para títulos (serif elegante) y `font-sans` para cuerpo.

## Paleta de colores
| Token | Hex | Uso |
|-------|-----|-----|
| `bg-[#2C1810]` | chocolate oscuro | Fondo hero, bestsellers, footer |
| `rose-400` / `rose-500` | rosado | Acentos, CTAs, admin badge |
| `stone-800` | casi negro | Texto principal |
| `stone-400` | gris | Texto secundario |

## Estructura de carpetas relevante
```
src/
  app/
    page.tsx              — Home (Server Component, fetches products)
    layout.tsx            — Root layout con fuentes y AuthProvider
    checkout/
      page.tsx            — Formulario de checkout
      actions.ts          — createOrder() → tabla orders + order_items
    cuenta/
      login/page.tsx      — Login con email/password
      registro/page.tsx   — Registro nuevo usuario
      dashboard/page.tsx  — Perfil del usuario logueado
    admin/
      page.tsx            — Panel admin (solo ADMIN_EMAIL)
      productos/          — CRUD productos
      ordenes/page.tsx    — Gestión de órdenes
    nosotros/page.tsx     — Página estática
    retiro-delivery/      — Info de retiro y delivery
  components/layout/
    Header.tsx            — Sticky header con auth status + carrito
    Footer.tsx            — Footer chocolate con nav
  modules/
    auth/AuthProvider.tsx — Context de sesión (useAuth hook)
    cart/hooks/useCartStore.ts — Zustand store del carrito
    catalog/components/
      HeroSlider.tsx      — Hero editorial asimétrico (fondo chocolate)
      ProductCard.tsx     — Tarjeta portrait 3/4 con hover overlay
      BestsellerSection.tsx — Carrusel automático (rota cada 3.5s)
      FAQ.tsx             — Acordeón editorial con números grandes
  types/database.ts       — Types: Product, Order, OrderItem, Profile, Category
  proxy.ts                — Middleware de auth (rutas /cuenta/*)
```

## Base de datos Supabase

### Tablas principales
- `products` — `id, name, slug, description, price, stock, category_id, images[], is_active, is_bestseller`
- `categories` — `id, name, slug`
- `orders` — `id, user_id, guest_name, guest_email, guest_phone, status, total, delivery_type, delivery_address, commune, scheduled_date, scheduled_time_slot, payment_method, notes`
- `order_items` — `id, order_id, product_id, quantity, unit_price`
- `profiles` — `id, full_name, phone, address`

### Estados de orden
`pending → paid → preparing → ready → delivered | cancelled`

### Admin
El admin se determina por email: `NEXT_PUBLIC_ADMIN_EMAIL=benjamin.salinas@mail.udp.cl`
Se compara con `user.email` en el Header y en las páginas `/admin/*`.

## Auth — patrones importantes

### Hydration del carrito
El store de Zustand usa `persist`, que solo existe en el cliente. Usar siempre el patrón:
```tsx
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
// render: mounted ? count() : 0
```

### Sincronización tras login/logout
`onAuthStateChange` no siempre detecta cambios de cookie server-side. Por eso AuthProvider llama `router.refresh()` dentro del listener para re-renderizar Server Components.

### Rutas protegidas
`proxy.ts` redirige:
- `/cuenta/dashboard` → `/cuenta/login` si no hay sesión
- `/cuenta/login` y `/cuenta/registro` → `/cuenta/dashboard` si ya hay sesión

## Componentes — comportamientos clave

### BestsellerSection
- Recibe todos los productos (`products` del home)
- `products[0]` = destacado grande (izquierda)
- `products.slice(1)` = rota automáticamente cada 3.5s
- La rotación requiere `secondary.length >= 2` — con menos de 2 el interval no corre
- Dots de navegación manual incluidos

### Header
- Skeleton animado mientras `loading === true`
- Si hay sesión: avatar circular con inicial + nombre + "● Conectado"
- Si no hay sesión: ícono de usuario + "Ingresar" + "○ Sin sesión"
- El botón Admin solo aparece si `user.email === NEXT_PUBLIC_ADMIN_EMAIL`

## Pendientes conocidos
1. **Mercado Pago** — comentado en `checkout/actions.ts` como `RF-04`. Necesita credenciales de Yuliana
2. **Chatbot Gemini** — pendiente API key
3. **Fotos reales** — actualmente se usan URLs de Unsplash como placeholder en `images[]`
4. **Precios por tamaño** — se planea agregar `price_15` y `price_25` a la tabla `products`

## Variables de entorno requeridas
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_EMAIL
NEXT_PUBLIC_ADMIN_EMAIL
```

## Dev server
```bash
npm run dev   # corre en http://localhost:3000
```
Si el puerto 3000 está ocupado sube a 3001. Verificar siempre cuál está activo.
