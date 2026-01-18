export interface SlicingPattern {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: 'yellow' | 'blue' | 'green' | 'pink' | 'purple' | 'orange';
  tips: string[];
}

export interface UserStory {
  id: string;
  text: string;
  role: string;
  action: string;
  benefit: string;
}

export interface Level {
  id: number;
  name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  patternId: string;
  epic: UserStory;
  expectedStories: UserStory[];
  hints: string[];
  bonusPoints: number;
}

export const slicingPatterns: SlicingPattern[] = [
  {
    id: 'workflow',
    name: 'Proceso o Workflow',
    description: 'Divide historias que tienen múltiples pasos secuenciales. Comienza con el primer y último paso, luego agrega los intermedios.',
    icon: 'Workflow',
    color: 'blue',
    tips: [
      'Identifica el primer paso que aporta valor',
      'Identifica el último paso esencial',
      'Los pasos intermedios pueden agregarse después',
    ],
  },
  {
    id: 'crud',
    name: 'Operaciones CRUD',
    description: 'Cuando una historia incluye Crear, Leer, Actualizar y Eliminar, comienza con lo estrictamente necesario.',
    icon: 'Database',
    color: 'green',
    tips: [
      'Comienza con la operación más utilizada',
      'Las operaciones menos usadas pueden ser manuales inicialmente',
      'Prioriza por valor de negocio',
    ],
  },
  {
    id: 'business-rules',
    name: 'Reglas de Negocio',
    description: 'Si las reglas de negocio son complejas, crea una historia para cada regla y prioriza por valor.',
    icon: 'Scale',
    color: 'purple',
    tips: [
      'Una regla de negocio por historia',
      'Prioriza las reglas más críticas',
      'Las excepciones pueden venir después',
    ],
  },
  {
    id: 'happy-path',
    name: 'Happy Path vs Edge Cases',
    description: 'Divide en el camino feliz primero, luego agrega historias para validaciones y excepciones.',
    icon: 'Smile',
    color: 'yellow',
    tips: [
      'El happy path primero',
      'Casos de error después',
      'Validaciones como historias separadas',
    ],
  },
  {
    id: 'data-variations',
    name: 'División por Datos',
    description: 'Divide según el tipo o variación de datos, comenzando con los más importantes.',
    icon: 'Layers',
    color: 'orange',
    tips: [
      'Comienza con los datos más críticos',
      'Expande a otros tipos gradualmente',
      'Un tipo de dato por historia',
    ],
  },
  {
    id: 'interfaces',
    name: 'Una Interfaz por Vez',
    description: 'Si requiere múltiples interfaces o plataformas, trabaja con una a la vez.',
    icon: 'Monitor',
    color: 'pink',
    tips: [
      'Una plataforma por historia',
      'Prioriza la más utilizada',
      'Mantén la funcionalidad consistente',
    ],
  },
  {
    id: 'users',
    name: 'Un Usuario por Vez',
    description: 'Si una historia incluye funcionalidad para diversos usuarios, divide por rol o persona.',
    icon: 'Users',
    color: 'blue',
    tips: [
      'Una persona/rol por historia',
      'Comienza con el usuario principal',
      'Los roles secundarios pueden esperar',
    ],
  },
  {
    id: 'spike',
    name: 'Spike de Aprendizaje',
    description: 'Cuando falta conocimiento técnico, comienza con una fase exploratoria con objetivo y tiempo fijo.',
    icon: 'Lightbulb',
    color: 'yellow',
    tips: [
      'Define un objetivo de aprendizaje claro',
      'Establece un tiempo límite',
      'El entregable puede ser conocimiento documentado',
    ],
  },
];

export const investCriteria = [
  { letter: 'I', name: 'Independent', description: 'La historia puede desarrollarse independientemente de otras' },
  { letter: 'N', name: 'Negotiable', description: 'Los detalles pueden negociarse con el equipo' },
  { letter: 'V', name: 'Valuable', description: 'Aporta valor al usuario o negocio' },
  { letter: 'E', name: 'Estimable', description: 'El equipo puede estimar el esfuerzo' },
  { letter: 'S', name: 'Small', description: 'Es lo suficientemente pequeña para completar en un sprint' },
  { letter: 'T', name: 'Testable', description: 'Se puede verificar que funciona correctamente' },
];

export const levels: Level[] = [
  {
    id: 1,
    name: 'Operaciones CRUD',
    difficulty: 'beginner',
    patternId: 'crud',
    epic: {
      id: 'epic-1',
      text: 'Como administrador quiero gestionar usuarios del sistema',
      role: 'administrador',
      action: 'gestionar usuarios del sistema',
      benefit: 'para mantener el control de accesos',
    },
    expectedStories: [
      { id: 's1-1', text: 'Como administrador quiero crear nuevos usuarios para dar acceso al sistema', role: 'administrador', action: 'crear nuevos usuarios', benefit: 'para dar acceso al sistema' },
      { id: 's1-2', text: 'Como administrador quiero ver la lista de usuarios para conocer quiénes tienen acceso', role: 'administrador', action: 'ver la lista de usuarios', benefit: 'para conocer quiénes tienen acceso' },
      { id: 's1-3', text: 'Como administrador quiero editar datos de usuarios para mantener información actualizada', role: 'administrador', action: 'editar datos de usuarios', benefit: 'para mantener información actualizada' },
      { id: 's1-4', text: 'Como administrador quiero eliminar usuarios para revocar accesos', role: 'administrador', action: 'eliminar usuarios', benefit: 'para revocar accesos' },
    ],
    hints: [
      'Piensa en las 4 operaciones básicas: Crear, Leer, Actualizar, Eliminar',
      'Cada operación debería ser una historia independiente',
      'Considera el valor que aporta cada operación',
    ],
    bonusPoints: 100,
  },
  {
    id: 2,
    name: 'Pasos del Workflow',
    difficulty: 'beginner',
    patternId: 'workflow',
    epic: {
      id: 'epic-2',
      text: 'Como comprador quiero realizar una compra online completa',
      role: 'comprador',
      action: 'realizar una compra online completa',
      benefit: 'para adquirir productos desde casa',
    },
    expectedStories: [
      { id: 's2-1', text: 'Como comprador quiero añadir productos al carrito para seleccionar lo que deseo comprar', role: 'comprador', action: 'añadir productos al carrito', benefit: 'para seleccionar lo que deseo comprar' },
      { id: 's2-2', text: 'Como comprador quiero ingresar mis datos de envío para recibir mi pedido', role: 'comprador', action: 'ingresar mis datos de envío', benefit: 'para recibir mi pedido' },
      { id: 's2-3', text: 'Como comprador quiero seleccionar método de pago para completar la transacción', role: 'comprador', action: 'seleccionar método de pago', benefit: 'para completar la transacción' },
      { id: 's2-4', text: 'Como comprador quiero confirmar mi pedido para finalizar la compra', role: 'comprador', action: 'confirmar mi pedido', benefit: 'para finalizar la compra' },
    ],
    hints: [
      'Identifica cada paso del proceso de compra',
      'El orden de los pasos importa',
      'Cada paso debe ser valioso por sí mismo',
    ],
    bonusPoints: 150,
  },
  {
    id: 3,
    name: 'Reglas de Negocio',
    difficulty: 'intermediate',
    patternId: 'business-rules',
    epic: {
      id: 'epic-3',
      text: 'Como usuario quiero pagar mi pedido de diferentes formas',
      role: 'usuario',
      action: 'pagar mi pedido de diferentes formas',
      benefit: 'para tener flexibilidad en el pago',
    },
    expectedStories: [
      { id: 's3-1', text: 'Como usuario quiero pagar con tarjeta de crédito para usar mi método preferido', role: 'usuario', action: 'pagar con tarjeta de crédito', benefit: 'para usar mi método preferido' },
      { id: 's3-2', text: 'Como usuario quiero pagar con PayPal para mayor seguridad', role: 'usuario', action: 'pagar con PayPal', benefit: 'para mayor seguridad' },
      { id: 's3-3', text: 'Como usuario quiero pagar contra entrega para pagar al recibir', role: 'usuario', action: 'pagar contra entrega', benefit: 'para pagar al recibir' },
      { id: 's3-4', text: 'Como usuario quiero pagar a plazos para distribuir el gasto', role: 'usuario', action: 'pagar a plazos', benefit: 'para distribuir el gasto' },
    ],
    hints: [
      'Cada método de pago es una regla de negocio diferente',
      'Prioriza los métodos más utilizados',
      'Cada uno puede tener validaciones distintas',
    ],
    bonusPoints: 200,
  },
  {
    id: 4,
    name: 'Happy Path vs Edge Cases',
    difficulty: 'intermediate',
    patternId: 'happy-path',
    epic: {
      id: 'epic-4',
      text: 'Como usuario quiero iniciar sesión en el sistema',
      role: 'usuario',
      action: 'iniciar sesión en el sistema',
      benefit: 'para acceder a mi cuenta',
    },
    expectedStories: [
      { id: 's4-1', text: 'Como usuario quiero iniciar sesión con credenciales válidas para acceder rápidamente', role: 'usuario', action: 'iniciar sesión con credenciales válidas', benefit: 'para acceder rápidamente' },
      { id: 's4-2', text: 'Como usuario quiero recuperar mi contraseña olvidada para recuperar acceso', role: 'usuario', action: 'recuperar mi contraseña olvidada', benefit: 'para recuperar acceso' },
      { id: 's4-3', text: 'Como usuario quiero ver mensaje cuando mi cuenta está bloqueada para saber qué hacer', role: 'usuario', action: 'ver mensaje cuando mi cuenta está bloqueada', benefit: 'para saber qué hacer' },
      { id: 's4-4', text: 'Como usuario nuevo quiero configurar mi cuenta en primer inicio para personalizar mi experiencia', role: 'usuario nuevo', action: 'configurar mi cuenta en primer inicio', benefit: 'para personalizar mi experiencia' },
    ],
    hints: [
      'El login exitoso es el "happy path"',
      'Contraseña olvidada es un caso común de error',
      'Cuenta bloqueada es un edge case',
      'Primer inicio es un caso especial',
    ],
    bonusPoints: 200,
  },
  {
    id: 5,
    name: 'Variaciones de Datos',
    difficulty: 'intermediate',
    patternId: 'data-variations',
    epic: {
      id: 'epic-5',
      text: 'Como usuario quiero buscar productos en el catálogo',
      role: 'usuario',
      action: 'buscar productos en el catálogo',
      benefit: 'para encontrar lo que necesito',
    },
    expectedStories: [
      { id: 's5-1', text: 'Como usuario quiero buscar por nombre de producto para encontrar items específicos', role: 'usuario', action: 'buscar por nombre de producto', benefit: 'para encontrar items específicos' },
      { id: 's5-2', text: 'Como usuario quiero filtrar por categoría para explorar productos similares', role: 'usuario', action: 'filtrar por categoría', benefit: 'para explorar productos similares' },
      { id: 's5-3', text: 'Como usuario quiero usar búsqueda avanzada con múltiples criterios para refinar resultados', role: 'usuario', action: 'usar búsqueda avanzada con múltiples criterios', benefit: 'para refinar resultados' },
      { id: 's5-4', text: 'Como usuario quiero ver sugerencias mientras escribo para encontrar más rápido', role: 'usuario', action: 'ver sugerencias mientras escribo', benefit: 'para encontrar más rápido' },
    ],
    hints: [
      'Comienza con la búsqueda más simple',
      'Cada tipo de filtro puede ser una historia',
      'El autocompletado es una mejora adicional',
    ],
    bonusPoints: 250,
  },
  {
    id: 6,
    name: 'Interfaces y Plataformas',
    difficulty: 'advanced',
    patternId: 'interfaces',
    epic: {
      id: 'epic-6',
      text: 'Como usuario quiero recibir notificaciones importantes',
      role: 'usuario',
      action: 'recibir notificaciones importantes',
      benefit: 'para estar informado',
    },
    expectedStories: [
      { id: 's6-1', text: 'Como usuario quiero recibir notificaciones en la web para verlas al navegar', role: 'usuario', action: 'recibir notificaciones en la web', benefit: 'para verlas al navegar' },
      { id: 's6-2', text: 'Como usuario quiero recibir notificaciones por email para revisar después', role: 'usuario', action: 'recibir notificaciones por email', benefit: 'para revisar después' },
      { id: 's6-3', text: 'Como usuario quiero recibir push notifications móviles para enterarme al instante', role: 'usuario', action: 'recibir push notifications móviles', benefit: 'para enterarme al instante' },
      { id: 's6-4', text: 'Como usuario quiero recibir SMS para notificaciones críticas aunque no tenga internet', role: 'usuario', action: 'recibir SMS', benefit: 'para notificaciones críticas aunque no tenga internet' },
    ],
    hints: [
      'Cada canal de notificación es una interfaz diferente',
      'Prioriza el canal más utilizado',
      'SMS puede ser solo para urgencias',
    ],
    bonusPoints: 300,
  },
  {
    id: 7,
    name: 'Modo Combinado (SPIDR)',
    difficulty: 'advanced',
    patternId: 'workflow',
    epic: {
      id: 'epic-7',
      text: 'Como gerente quiero generar reportes analíticos del negocio para diferentes áreas',
      role: 'gerente',
      action: 'generar reportes analíticos del negocio para diferentes áreas',
      benefit: 'para tomar decisiones informadas',
    },
    expectedStories: [
      { id: 's7-1', text: 'Como gerente quiero ver un dashboard básico de ventas para monitorear el negocio', role: 'gerente', action: 'ver un dashboard básico de ventas', benefit: 'para monitorear el negocio' },
      { id: 's7-2', text: 'Como gerente quiero exportar reportes en PDF para compartir con stakeholders', role: 'gerente', action: 'exportar reportes en PDF', benefit: 'para compartir con stakeholders' },
      { id: 's7-3', text: 'Como gerente quiero filtrar reportes por fecha para análisis temporal', role: 'gerente', action: 'filtrar reportes por fecha', benefit: 'para análisis temporal' },
      { id: 's7-4', text: 'Como gerente quiero programar envío automático de reportes para recibirlos periódicamente', role: 'gerente', action: 'programar envío automático de reportes', benefit: 'para recibirlos periódicamente' },
    ],
    hints: [
      'Este nivel combina múltiples patrones',
      'Puedes usar workflow + interfaces + datos',
      'Piensa en qué aporta más valor primero',
    ],
    bonusPoints: 400,
  },
];

export const achievements = [
  { id: 'first-slice', name: 'Primera Rebanada', description: 'Completa tu primer nivel', icon: '🎯', unlocked: false },
  { id: 'crud-master', name: 'Maestro CRUD', description: 'Completa todos los niveles CRUD', icon: '📊', unlocked: false },
  { id: 'workflow-wizard', name: 'Mago del Workflow', description: 'Domina los patrones de workflow', icon: '🔮', unlocked: false },
  { id: 'perfect-score', name: 'Puntuación Perfecta', description: 'Obtén 3 estrellas en un nivel', icon: '⭐', unlocked: false },
  { id: 'no-hints', name: 'Sin Ayuda', description: 'Completa un nivel sin usar pistas', icon: '🧠', unlocked: false },
  { id: 'speed-demon', name: 'Demonio de la Velocidad', description: 'Completa un nivel en menos de 2 minutos', icon: '⚡', unlocked: false },
  { id: 'spidr-supreme', name: 'SPIDR Supremo', description: 'Completa el nivel avanzado combinado', icon: '🕷️', unlocked: false },
];
