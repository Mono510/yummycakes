// Base de conocimiento del chatbot de Yummy Cakes.
// No usa IA: hace coincidencia por palabras clave. Si no encuentra respuesta,
// el widget deriva al contacto de WhatsApp.

export const WHATSAPP_PHONE = '56964743032'

export type QA = {
  id: string
  // Palabras/frases clave que activan esta respuesta (en minúsculas, sin tildes)
  keywords: string[]
  // Pregunta representativa (se usa como sugerencia)
  question: string
  answer: string
  // Si true, aparece como chip de sugerencia rápida
  suggested?: boolean
}

export const KNOWLEDGE_BASE: QA[] = [
  // ── Saludos ──
  {
    id: 'saludo',
    keywords: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'holi', 'que tal'],
    question: 'Hola',
    answer: '¡Hola! 👋 Bienvenid@ a Yummy Cakes. Puedo ayudarte con precios, sabores, cómo pedir, retiro y más. ¿Qué te gustaría saber?',
  },
  {
    id: 'gracias',
    keywords: ['gracias', 'muchas gracias', 'genial', 'perfecto', 'excelente'],
    question: 'Gracias',
    answer: '¡De nada! 🤍 Si necesitas algo más, aquí estoy. ¡Que tengas un lindo día!',
  },
  {
    id: 'despedida',
    keywords: ['chao', 'adios', 'nos vemos', 'hasta luego', 'bye'],
    question: 'Chao',
    answer: '¡Que estés muy bien! Cualquier cosa nos escribes. 🎂',
  },

  // ── Productos ──
  {
    id: 'productos',
    keywords: ['que venden', 'que hacen', 'productos', 'que ofrecen', 'catalogo', 'que tienen', 'menu'],
    question: '¿Qué productos tienen?',
    answer: 'Hacemos tortas (de bizcocho, de panqueques, torta amor y personalizadas) y mesa dulce: mini pies de limón, mini cuchuflís, mini alfajores, empolvados, pop cakes y mix dulce chileno. Puedes verlo todo en el catálogo 🎂',
    suggested: true,
  },
  {
    id: 'tortas',
    keywords: ['tortas', 'torta', 'que tortas', 'tipos de torta'],
    question: '¿Qué tortas tienen?',
    answer: 'Tenemos Torta de Bizcocho, Torta de Panqueques, Torta Amor (hojarasca con manjar y frambuesa) y Tortas Personalizadas. Las de bizcocho y panqueques puedes elegir el relleno 😋',
  },
  {
    id: 'mesa-dulce',
    keywords: ['mesa dulce', 'coctel', 'cocteleria', 'bocaditos', 'dulces', 'pie', 'pies', 'cuchufli', 'cuchuflis', 'alfajor', 'alfajores', 'empolvado', 'empolvados', 'pop cakes', 'mix'],
    question: '¿Qué tienen para mesa dulce?',
    answer: 'Para mesa dulce tenemos: mini pies de limón, mini cuchuflís, mini alfajores, empolvados, pop cakes y mix dulce chileno. Se venden por cantidad (por ejemplo, cajas de 12, 40 o 50 unidades según el producto).',
  },

  // ── Precios ──
  {
    id: 'precio-tortas',
    keywords: ['precio torta', 'cuanto cuesta torta', 'valor torta', 'precio de las tortas', 'cuanto vale torta'],
    question: '¿Cuánto cuestan las tortas?',
    answer: 'Las tortas parten desde $21.000 (Bizcocho, 10 porciones) y varían según el tamaño. Por ejemplo, Bizcocho: 10 porciones $21.000, 15 $28.000, 20 $34.000, 25 $40.000, 30 $47.000. Cada producto tiene su tabla de precios en el catálogo.',
    suggested: true,
  },
  {
    id: 'precio-mesa-dulce',
    keywords: ['precio mesa dulce', 'precio pie', 'precio alfajor', 'precio cuchufli', 'cuanto cuesta la mesa', 'valor mesa dulce'],
    question: '¿Cuánto cuesta la mesa dulce?',
    answer: 'Algunos ejemplos: Mini alfajores 12u $8.000 · Mini cuchuflís 40u $8.000 · Mini pies de limón 50u $22.500. Cada producto tiene sus tramos por cantidad en el catálogo.',
  },
  {
    id: 'precio-general',
    keywords: ['precio', 'precios', 'cuanto cuesta', 'cuanto vale', 'valor', 'valores', 'cuanto sale'],
    question: '¿Cuáles son los precios?',
    answer: 'Los precios dependen del producto y el tamaño. Puedes ver el precio de cada uno en el catálogo, donde aparece el detalle por porciones o por unidades. ¿Te interesa alguna torta o mesa dulce en particular?',
  },

  // ── Rellenos / sabores ──
  {
    id: 'rellenos',
    keywords: ['relleno', 'rellenos', 'sabor', 'sabores', 'que sabores', 'de que son', 'que relleno'],
    question: '¿Qué rellenos / sabores tienen?',
    answer: 'En las tortas de bizcocho puedes elegir rellenos como: manjar con frambuesa, lúcuma manjar nuez, manjar oreo, selva negra, durazno crema y manjar, piña crema y manjar, entre otros. En panqueques hay opciones con chocolate, manjar y naranja. ¡Eliges el relleno al momento de pedir! 😋',
    suggested: true,
  },
  {
    id: 'personalizar-sabor',
    keywords: ['elegir sabor', 'elegir relleno', 'puedo elegir', 'personalizar sabor'],
    question: '¿Puedo elegir el relleno?',
    answer: '¡Sí! En las tortas de bizcocho y panqueques eliges el relleno al agregar la torta al carrito. También puedes dejar un mensaje/dedicatoria para que vaya escrito en la torta.',
  },

  // ── Tamaños ──
  {
    id: 'tamanos',
    keywords: ['tamano', 'tamanos', 'porciones', 'cuantas personas', 'para cuantos', 'que tamano'],
    question: '¿Qué tamaños hay?',
    answer: 'Las tortas van desde 10 hasta 30 porciones según el tipo. Al elegir la torta puedes seleccionar el tamaño y ver su precio. Si no sabes qué tamaño te conviene, cuéntame para cuántas personas es. 🎂',
  },

  // ── Cómo pedir ──
  {
    id: 'como-pedir',
    keywords: ['como pedir', 'como comprar', 'como hago un pedido', 'como encargar', 'hacer pedido', 'quiero pedir', 'como ordeno'],
    question: '¿Cómo hago un pedido?',
    answer: 'Es fácil: 1) Elige tu producto en el catálogo, 2) selecciona tamaño y relleno, 3) agrégalo al carrito y ve al checkout, 4) elige la fecha de retiro y paga en línea. ¡Y listo! 🛒',
    suggested: true,
  },
  {
    id: 'anticipacion',
    keywords: ['anticipacion', 'con cuanto tiempo', 'cuanto antes', 'para cuando', 'mismo dia', 'urgente', 'cuando pedir', 'cuanto tiempo antes'],
    question: '¿Con cuánta anticipación debo pedir?',
    answer: 'Te recomendamos pedir con al menos 24 horas de anticipación. Para pedidos más grandes (más de 30 personas) o decoraciones personalizadas, lo ideal es 48 a 72 horas. 📅',
  },

  // ── Pago ──
  {
    id: 'pago',
    keywords: ['pago', 'pagar', 'como pago', 'medios de pago', 'formas de pago', 'metodo de pago', 'transferencia', 'tarjeta', 'efectivo', 'mercado pago', 'mercadopago', 'debito', 'credito'],
    question: '¿Cómo puedo pagar?',
    answer: 'El pago es en línea a través de Mercado Pago, donde puedes usar tarjeta de crédito, débito y otros medios. El pago se realiza al confirmar tu pedido en el checkout. 💳',
    suggested: true,
  },

  // ── Retiro ──
  {
    id: 'retiro',
    keywords: ['retiro', 'retirar', 'donde retiro', 'donde queda', 'direccion', 'ubicacion', 'donde estan', 'donde los ubico', 'local', 'tienda'],
    question: '¿Dónde retiro mi pedido?',
    answer: 'El retiro es en Sotaqui 9237, La Granja (Región Metropolitana). Al hacer el pedido eliges la fecha y horario de retiro. 🏪',
    suggested: true,
  },
  {
    id: 'horario',
    keywords: ['horario', 'horarios', 'a que hora', 'hasta que hora', 'cuando abren', 'atienden', 'dias de atencion'],
    question: '¿Cuál es el horario?',
    answer: 'Horario de atención: Lunes a Viernes 10:00–20:30, Sábado 10:00–19:00 y Domingo cerrado. El horario de retiro lo eliges al hacer tu pedido. 🕒',
  },

  // ── Delivery ──
  {
    id: 'delivery',
    keywords: ['delivery', 'despacho', 'envio', 'envian', 'reparto', 'a domicilio', 'llevan', 'domicilio'],
    question: '¿Hacen delivery?',
    answer: 'Por ahora solo trabajamos con retiro en tienda (Sotaqui 9237, La Granja). El delivery a domicilio estará disponible próximamente. 🚗',
    suggested: true,
  },

  // ── Personalizadas ──
  {
    id: 'personalizada',
    keywords: ['torta personalizada', 'tortas personalizadas', 'personalizada', 'personalizado', 'personalizar', 'diseno', 'tematica', 'tematico', 'cumpleanos personalizado', 'torta especial', 'a pedido', 'diseno especial', 'foto en la torta'],
    question: '¿Hacen tortas personalizadas?',
    answer: '¡Sí! Las tortas personalizadas (temática, colores y diseño a tu gusto) se coordinan directamente por WhatsApp para cotizar según lo que necesites. Escríbenos y lo vemos juntos. 🎨',
  },
  {
    id: 'decoracion',
    keywords: ['decoracion', 'decoracion especial', 'topper', 'flores', 'costo adicional', 'extra'],
    question: '¿La decoración tiene costo extra?',
    answer: 'Las decoraciones especiales pueden tener un costo adicional según el diseño. Para eso lo mejor es coordinar el detalle por WhatsApp. ✨',
  },

  // ── Contacto ──
  {
    id: 'contacto',
    keywords: ['contacto', 'telefono', 'whatsapp', 'numero', 'como los contacto', 'hablar con alguien', 'instagram', 'redes'],
    question: '¿Cómo los contacto?',
    answer: 'Puedes escribirnos por WhatsApp al +56 9 6474 3032 o por Instagram @yummycakes.cl. ¡Con gusto te ayudamos! 📱',
    suggested: true,
  },

  // ── Otros ──
  {
    id: 'cambio-fecha',
    keywords: ['cambiar fecha', 'cambiar el pedido', 'modificar pedido', 'reprogramar', 'cambiar dia'],
    question: '¿Puedo cambiar la fecha de mi pedido?',
    answer: 'Sí, con al menos 12 horas de anticipación. Escríbenos por WhatsApp o Instagram y lo coordinamos sin problema. 📅',
  },
  {
    id: 'ingredientes',
    keywords: ['ingredientes', 'fresco', 'frescos', 'calidad', 'con que hacen', 'materia prima'],
    question: '¿Qué ingredientes usan?',
    answer: 'Usamos ingredientes frescos y de calidad: mantequilla real, chocolate de cobertura y frutas de temporada. Todo se hornea bajo pedido, sin stock previo. 🧈',
  },
  {
    id: 'dietas',
    keywords: ['vegano', 'sin azucar', 'sin gluten', 'celiaco', 'diabetico', 'sin lactosa', 'apto', 'dieta'],
    question: '¿Tienen opciones sin azúcar / veganas?',
    answer: 'Para consultas sobre opciones especiales (sin azúcar, veganas, sin gluten, etc.) lo mejor es escribirnos por WhatsApp y te confirmamos la disponibilidad según tu pedido. 🌱',
  },
]
