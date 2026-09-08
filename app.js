'use strict';

/*
 * Kudos IMR · POC 2.0
 * Datos simulados separados de la lógica de interfaz.
 * Los Kudos son evidencia; ninguna regla activa premios automáticamente.
 */

const STORAGE_KEYS = {
  kudos: 'imr-kudos-demo',
  recognitions: 'imr-kudos-recognitions',
  actions: 'imr-kudos-actions',
  state: 'imr-kudos-demo-state'
};

const CURRENT_USER_ID = 'p-jesus';
const RECOGNITION_STATUSES = ['En evaluación', 'Aprobado', 'Programado', 'Entregado', 'Descartado'];
const ACTION_STATUSES = ['Pendiente', 'En análisis', 'En curso', 'Completada', 'Descartada'];

const categories = [
  { id: 'help', name: 'Dar una mano', symbol: '↗' },
  { id: 'execute', name: 'Hacer que pase', symbol: '✓' },
  { id: 'share', name: 'Compartir lo que sé', symbol: '◎' },
  { id: 'care', name: 'Cuidar el vínculo', symbol: '◇' }
];

const contexts = [
  { id: 'ctx-atlas', name: 'Proyecto Atlas', type: 'project', active: true },
  { id: 'ctx-horizonte', name: 'Proyecto Horizonte', type: 'project', active: true },
  { id: 'ctx-delta', name: 'Proyecto Delta', type: 'project', active: true },
  { id: 'ctx-genia', name: 'GenIA', type: 'internal', active: true },
  { id: 'ctx-company', name: 'Equipo IMR', type: 'company', active: true },
  { id: 'ctx-management', name: 'Equipo de Gestión', type: 'management', active: true },
  { id: 'ctx-cross', name: 'Entre proyectos', type: 'cross-project', active: true },
  { id: 'ctx-internal', name: 'Iniciativas internas', type: 'internal', active: true },
  { id: 'ctx-community', name: 'Comunidad interna', type: 'internal', active: true }
];

const people = [
  {
    id: 'p-jesus',
    name: 'Jesús Machado',
    initials: 'JM',
    area: 'Consultoría GIA',
    level: 'MGR',
    contexts: ['ctx-atlas', 'ctx-horizonte', 'ctx-genia', 'ctx-cross', 'ctx-management', 'ctx-company', 'ctx-internal'],
    active: true
  },
  {
    id: 'p-valentina',
    name: 'Valentina Ríos',
    initials: 'VR',
    area: 'Planificación',
    level: 'CON',
    contexts: ['ctx-atlas', 'ctx-horizonte', 'ctx-cross', 'ctx-company'],
    active: true
  },
  {
    id: 'p-nicolas',
    name: 'Nicolás Paz',
    initials: 'NP',
    area: 'Integridad',
    level: 'CON',
    contexts: ['ctx-horizonte', 'ctx-delta', 'ctx-cross', 'ctx-company'],
    active: true
  },
  {
    id: 'p-camila',
    name: 'Camila Silva',
    initials: 'CS',
    area: 'Datos y tecnología',
    level: 'CON',
    contexts: ['ctx-genia', 'ctx-atlas', 'ctx-community', 'ctx-internal'],
    active: true
  },
  {
    id: 'p-martin',
    name: 'Martín Acosta',
    initials: 'MA',
    area: 'Confiabilidad',
    level: 'CON',
    contexts: ['ctx-horizonte', 'ctx-delta', 'ctx-company'],
    active: true
  },
  {
    id: 'p-sofia',
    name: 'Sofía Luna',
    initials: 'SL',
    area: 'Administración',
    level: 'ANL',
    contexts: ['ctx-internal', 'ctx-company', 'ctx-community'],
    active: true
  },
  {
    id: 'p-mariana',
    name: 'Mariana Pérez',
    initials: 'MP',
    area: 'Proyectos',
    level: 'LDR',
    contexts: ['ctx-atlas', 'ctx-horizonte', 'ctx-cross', 'ctx-management'],
    active: true
  },
  {
    id: 'p-diego',
    name: 'Diego Herrera',
    initials: 'DH',
    area: 'Transformación digital',
    level: 'CON',
    contexts: ['ctx-genia', 'ctx-atlas', 'ctx-community', 'ctx-internal'],
    active: true
  }
];

const teams = [
  {
    id: 'team-imr',
    name: 'Equipo IMR',
    initials: 'IMR',
    area: 'Toda la compañía',
    levels: [],
    contexts: ['ctx-company', 'ctx-cross', 'ctx-internal', 'ctx-community'],
    active: true
  },
  {
    id: 'team-management',
    name: 'Equipo de Gestión',
    initials: 'EG',
    area: 'LDR · MGR · PTR',
    levels: ['LDR', 'MGR', 'PTR'],
    contexts: ['ctx-management', 'ctx-company', 'ctx-internal'],
    active: true
  }
];

const initialKudos = [
  {
    id: 'k-camila-01',
    recipientType: 'person',
    recipientId: 'p-camila',
    senderId: 'p-jesus',
    category: 'Compartir lo que sé',
    contextId: 'ctx-genia',
    message: 'Explicaste el tablero usando casos reales y dejaste una guía breve. El equipo pudo continuar sin depender de vos para cada paso.',
    visibility: 'public',
    createdAt: '2026-09-06T14:30:00Z'
  },
  {
    id: 'k-nicolas-01',
    recipientType: 'person',
    recipientId: 'p-nicolas',
    senderId: 'p-jesus',
    category: 'Dar una mano',
    contextId: 'ctx-cross',
    message: 'Te sumaste a revisar una propuesta fuera de tu proyecto y detectaste un riesgo que no estábamos viendo. Cambió la calidad de la decisión.',
    visibility: 'public',
    createdAt: '2026-09-05T17:18:00Z'
  },
  {
    id: 'k-jesus-01',
    recipientType: 'person',
    recipientId: 'p-jesus',
    senderId: 'p-valentina',
    category: 'Hacer que pase',
    contextId: 'ctx-horizonte',
    message: 'Ordenaste prioridades cuando todo parecía urgente y defendiste con el cliente un plan posible. Eso nos devolvió foco y capacidad de respuesta.',
    visibility: 'public',
    createdAt: '2026-09-04T11:15:00Z'
  },
  {
    id: 'k-valentina-01',
    recipientType: 'person',
    recipientId: 'p-valentina',
    senderId: 'p-jesus',
    category: 'Hacer que pase',
    contextId: 'ctx-atlas',
    message: 'Reordenaste el plan ante el cambio de prioridad y llegamos con una respuesta clara. Sostuviste el resultado sin perder de vista al equipo.',
    visibility: 'public',
    createdAt: '2026-09-03T12:42:00Z'
  },
  {
    id: 'k-martin-01',
    recipientType: 'person',
    recipientId: 'p-martin',
    senderId: 'p-sofia',
    category: 'Cuidar el vínculo',
    contextId: 'ctx-horizonte',
    message: 'Abriste el espacio para ordenar expectativas antes de seguir. Ese gesto hizo posible una conversación difícil sin deteriorar el vínculo.',
    visibility: 'public',
    createdAt: '2026-09-02T14:05:00Z'
  },
  {
    id: 'k-camila-02',
    recipientType: 'person',
    recipientId: 'p-camila',
    senderId: 'p-mariana',
    category: 'Compartir lo que sé',
    contextId: 'ctx-atlas',
    message: 'Convertiste una duda técnica en una explicación que todos pudimos reutilizar. Ahora el equipo resuelve esa tarea con mucha más autonomía.',
    visibility: 'public',
    createdAt: '2026-08-29T16:20:00Z'
  },
  {
    id: 'k-jesus-02',
    recipientType: 'person',
    recipientId: 'p-jesus',
    senderId: 'p-camila',
    category: 'Compartir lo que sé',
    contextId: 'ctx-genia',
    message: 'Compartiste el criterio detrás de la decisión y no solo la respuesta. Eso me permitió entender el problema y proponer mejoras por mi cuenta.',
    visibility: 'private',
    createdAt: '2026-08-28T18:10:00Z'
  },
  {
    id: 'k-sofia-01',
    recipientType: 'person',
    recipientId: 'p-sofia',
    senderId: 'p-jesus',
    category: 'Dar una mano',
    contextId: 'ctx-internal',
    message: 'Anticipaste la información que necesitábamos para cerrar la rendición y evitaste varias idas y vueltas. Fue una ayuda concreta y oportuna.',
    visibility: 'public',
    createdAt: '2026-08-27T10:25:00Z'
  },
  {
    id: 'k-valentina-02',
    recipientType: 'person',
    recipientId: 'p-valentina',
    senderId: 'p-mariana',
    category: 'Hacer que pase',
    contextId: 'ctx-horizonte',
    message: 'Tomaste un cierre trabado, aclaraste responsables y dejaste un próximo paso para cada frente. El equipo volvió a moverse en una tarde.',
    visibility: 'public',
    createdAt: '2026-08-26T19:05:00Z'
  },
  {
    id: 'k-nicolas-02',
    recipientType: 'person',
    recipientId: 'p-nicolas',
    senderId: 'p-camila',
    category: 'Dar una mano',
    contextId: 'ctx-delta',
    message: 'Trajiste experiencia de Integridad para ayudarnos a validar el modelo. Tu mirada conectó dos equipos que venían resolviendo el mismo problema por separado.',
    visibility: 'public',
    createdAt: '2026-08-24T15:40:00Z'
  },
  {
    id: 'k-camila-03',
    recipientType: 'person',
    recipientId: 'p-camila',
    senderId: 'p-diego',
    category: 'Compartir lo que sé',
    contextId: 'ctx-community',
    message: 'Documentaste los errores más frecuentes y la forma de resolverlos. Ese material ya se usa como referencia en más de un equipo.',
    visibility: 'public',
    createdAt: '2026-08-21T13:00:00Z'
  },
  {
    id: 'k-team-management-01',
    recipientType: 'team',
    recipientId: 'team-management',
    senderId: 'p-camila',
    category: 'Cuidar el vínculo',
    contextId: 'ctx-management',
    message: 'Abrieron un espacio directo para conversar sobre carga y prioridades, y volvieron con decisiones concretas. La escucha tuvo una consecuencia visible.',
    visibility: 'public',
    createdAt: '2026-08-20T17:10:00Z'
  },
  {
    id: 'k-jesus-03',
    recipientType: 'person',
    recipientId: 'p-jesus',
    senderId: 'p-nicolas',
    category: 'Hacer que pase',
    contextId: 'ctx-cross',
    message: 'Conectaste a las personas correctas y destrabaste en una reunión lo que llevaba varios días circulando por mensajes sin una definición.',
    visibility: 'public',
    createdAt: '2026-08-18T12:10:00Z'
  },
  {
    id: 'k-camila-04',
    recipientType: 'person',
    recipientId: 'p-camila',
    senderId: 'p-sofia',
    category: 'Compartir lo que sé',
    contextId: 'ctx-genia',
    message: 'Te quedaste después de la demo para explicarme el proceso con paciencia. Pude terminarlo sola al día siguiente y dejarlo documentado.',
    visibility: 'private',
    createdAt: '2026-08-12T16:48:00Z'
  },
  {
    id: 'k-valentina-03',
    recipientType: 'person',
    recipientId: 'p-valentina',
    senderId: 'p-martin',
    category: 'Hacer que pase',
    contextId: 'ctx-atlas',
    message: 'Propusiste una secuencia de cierre simple, con dueños y criterios claros. Nos permitió decidir sin sumar otra reunión de seguimiento.',
    visibility: 'public',
    createdAt: '2026-08-10T09:40:00Z'
  },
  {
    id: 'k-nicolas-03',
    recipientType: 'person',
    recipientId: 'p-nicolas',
    senderId: 'p-valentina',
    category: 'Dar una mano',
    contextId: 'ctx-horizonte',
    message: 'Revisaste los supuestos del plan y explicaste el riesgo sin imponer tu criterio. Pudimos ajustar el enfoque y mantener el compromiso del equipo.',
    visibility: 'public',
    createdAt: '2026-08-08T11:55:00Z'
  },
  {
    id: 'k-jesus-04',
    recipientType: 'person',
    recipientId: 'p-jesus',
    senderId: 'p-sofia',
    category: 'Cuidar el vínculo',
    contextId: 'ctx-internal',
    message: 'Notaste que el equipo estaba saturado y cambiaste el tono de la conversación. Pudimos ordenar el trabajo sin sentir que pedir ayuda era fallar.',
    visibility: 'public',
    createdAt: '2026-08-05T18:20:00Z'
  },
  {
    id: 'k-camila-05',
    recipientType: 'person',
    recipientId: 'p-camila',
    senderId: 'p-nicolas',
    category: 'Compartir lo que sé',
    contextId: 'ctx-atlas',
    message: 'Tradujiste un concepto complejo a una secuencia práctica y nos dejaste ejemplos. La explicación redujo errores en el siguiente ciclo.',
    visibility: 'public',
    createdAt: '2026-07-29T14:35:00Z'
  },
  {
    id: 'k-martin-02',
    recipientType: 'person',
    recipientId: 'p-martin',
    senderId: 'p-jesus',
    category: 'Cuidar el vínculo',
    contextId: 'ctx-company',
    message: 'Interveniste con calma cuando la conversación se estaba tensando y lograste que volviéramos al problema sin personalizar el desacuerdo.',
    visibility: 'public',
    createdAt: '2026-07-25T15:10:00Z'
  },
  {
    id: 'k-valentina-04',
    recipientType: 'person',
    recipientId: 'p-valentina',
    senderId: 'p-diego',
    category: 'Hacer que pase',
    contextId: 'ctx-horizonte',
    message: 'Preparaste una alternativa antes de que el bloqueo se volviera crítico. La anticipación nos permitió sostener la fecha acordada.',
    visibility: 'public',
    createdAt: '2026-07-22T10:15:00Z'
  },
  {
    id: 'k-nicolas-04',
    recipientType: 'person',
    recipientId: 'p-nicolas',
    senderId: 'p-martin',
    category: 'Dar una mano',
    contextId: 'ctx-company',
    message: 'Compartiste una referencia de otro proyecto y te ofreciste a revisar la adaptación. Ahorramos tiempo sin copiar una solución fuera de contexto.',
    visibility: 'public',
    createdAt: '2026-07-18T16:30:00Z'
  },
  {
    id: 'k-camila-06',
    recipientType: 'person',
    recipientId: 'p-camila',
    senderId: 'p-jesus',
    category: 'Compartir lo que sé',
    contextId: 'ctx-community',
    message: 'Facilitaste una conversación abierta sobre lo que no había funcionado y convertiste el aprendizaje en un material útil para todos.',
    visibility: 'public',
    createdAt: '2026-07-10T13:22:00Z'
  },
  {
    id: 'k-jesus-05',
    recipientType: 'person',
    recipientId: 'p-jesus',
    senderId: 'p-martin',
    category: 'Compartir lo que sé',
    contextId: 'ctx-atlas',
    message: 'Explicaste cómo leer el problema desde gestión de activos y conectaste cada decisión con el impacto operativo. Nos quedó un criterio reutilizable.',
    visibility: 'public',
    createdAt: '2026-07-06T12:00:00Z'
  },
  {
    id: 'k-valentina-05',
    recipientType: 'person',
    recipientId: 'p-valentina',
    senderId: 'p-jesus',
    category: 'Hacer que pase',
    contextId: 'ctx-atlas',
    message: 'Cerraste los pendientes con una trazabilidad simple y visible. El equipo pudo concentrarse en resolver, no en reconstruir qué faltaba.',
    visibility: 'public',
    createdAt: '2026-07-02T17:25:00Z'
  },
  {
    id: 'k-nicolas-05',
    recipientType: 'person',
    recipientId: 'p-nicolas',
    senderId: 'p-sofia',
    category: 'Dar una mano',
    contextId: 'ctx-cross',
    message: 'Te ofreciste a revisar la necesidad aunque no era tu especialidad principal y encontraste a quien podía aportar el criterio que faltaba.',
    visibility: 'public',
    createdAt: '2026-06-28T13:15:00Z'
  },
  {
    id: 'k-camila-07',
    recipientType: 'person',
    recipientId: 'p-camila',
    senderId: 'p-mariana',
    category: 'Compartir lo que sé',
    contextId: 'ctx-genia',
    message: 'En lugar de resolver sola, mostraste cómo diagnosticar el problema. Esa forma de acompañar aumentó la autonomía de todo el equipo.',
    visibility: 'public',
    createdAt: '2026-06-18T11:30:00Z'
  },
  {
    id: 'k-nicolas-06',
    recipientType: 'person',
    recipientId: 'p-nicolas',
    senderId: 'p-jesus',
    category: 'Dar una mano',
    contextId: 'ctx-delta',
    message: 'Conectaste hallazgos de dos proyectos y propusiste una revisión conjunta. Evitaste que repitiéramos el mismo análisis por separado.',
    visibility: 'public',
    createdAt: '2026-06-14T09:50:00Z'
  },
  {
    id: 'k-sofia-02',
    recipientType: 'person',
    recipientId: 'p-sofia',
    senderId: 'p-mariana',
    category: 'Cuidar el vínculo',
    contextId: 'ctx-company',
    message: 'Acompañaste una consulta con claridad y sin hacer sentir incómodo a quien no conocía el proceso. Cuidaste el resultado y la relación.',
    visibility: 'public',
    createdAt: '2026-06-10T14:20:00Z'
  },
  {
    id: 'k-team-imr-01',
    recipientType: 'team',
    recipientId: 'team-imr',
    senderId: 'p-jesus',
    category: 'Dar una mano',
    contextId: 'ctx-company',
    message: 'Ante una semana exigente, distintas personas ofrecieron tiempo, información y escucha sin esperar que se los pidieran. La colaboración fue concreta.',
    visibility: 'public',
    createdAt: '2026-06-05T18:00:00Z'
  }
];

const signals = [
  {
    id: 'sig-rec-camila',
    type: 'recognition',
    subjectType: 'person',
    subjectId: 'p-camila',
    title: 'Comparte conocimiento y desarrolla autonomía',
    description: 'Las personas no solo valoran sus respuestas: señalan que deja criterios, materiales y capacidad instalada.',
    evidenceStrength: 'Fuerte',
    evidence: {
      metrics: [
        { value: '7', label: 'Kudos' },
        { value: '5', label: 'voces' },
        { value: '3', label: 'contextos' },
        { value: '90 días', label: 'recurrencia' }
      ]
    },
    contextIds: ['ctx-genia', 'ctx-atlas', 'ctx-community'],
    supportingKudoIds: ['k-camila-01', 'k-camila-02', 'k-camila-03', 'k-camila-04', 'k-camila-05', 'k-camila-06', 'k-camila-07'],
    reading: 'La contribución aparece reconocida por distintas personas, en más de un contexto y de manera sostenida.',
    suggestedDecision: 'Evaluar una oportunidad de desarrollo que también reconozca el valor que Camila ya está generando.',
    status: 'evaluated',
    createdAt: '2026-09-06T16:00:00Z'
  },
  {
    id: 'sig-rec-valentina',
    type: 'recognition',
    subjectType: 'person',
    subjectId: 'p-valentina',
    title: 'Convierte bloqueos en resultados concretos',
    description: 'Se repite el reconocimiento a su capacidad para ordenar, anticipar y cerrar sin trasladar presión innecesaria al equipo.',
    evidenceStrength: 'Consistente',
    evidence: {
      metrics: [
        { value: '5', label: 'Kudos' },
        { value: '4', label: 'voces' },
        { value: '2', label: 'contextos' },
        { value: '75 días', label: 'recurrencia' }
      ]
    },
    contextIds: ['ctx-atlas', 'ctx-horizonte'],
    supportingKudoIds: ['k-valentina-01', 'k-valentina-02', 'k-valentina-03', 'k-valentina-04', 'k-valentina-05'],
    reading: 'La señal es recurrente y transversal a dos proyectos, con descripciones concretas de impacto.',
    suggestedDecision: 'Revisar si corresponde una valoración puntual, cuidando que la urgencia no sea el único comportamiento premiado.',
    status: 'evaluated',
    createdAt: '2026-09-04T16:00:00Z'
  },
  {
    id: 'sig-rec-nicolas',
    type: 'recognition',
    subjectType: 'person',
    subjectId: 'p-nicolas',
    title: 'Conecta equipos y eleva la calidad de las decisiones',
    description: 'Sus aportes aparecen cuando cruza fronteras de proyecto, suma una mirada de riesgo y ayuda sin apropiarse del resultado.',
    evidenceStrength: 'Fuerte',
    evidence: {
      metrics: [
        { value: '6', label: 'Kudos' },
        { value: '5', label: 'voces' },
        { value: '4', label: 'contextos' },
        { value: '80 días', label: 'recurrencia' }
      ]
    },
    contextIds: ['ctx-cross', 'ctx-delta', 'ctx-horizonte', 'ctx-company'],
    supportingKudoIds: ['k-nicolas-01', 'k-nicolas-02', 'k-nicolas-03', 'k-nicolas-04', 'k-nicolas-05', 'k-nicolas-06'],
    reading: 'La diversidad de voces y contextos reduce la probabilidad de que sea solo una percepción localizada.',
    suggestedDecision: 'Evaluar una experiencia, visibilidad o desarrollo voluntario que reconozca su contribución transversal.',
    status: 'open',
    createdAt: '2026-09-05T18:00:00Z'
  },
  {
    id: 'sig-rec-martin',
    type: 'recognition',
    subjectType: 'person',
    subjectId: 'p-martin',
    title: 'Cuida el vínculo en conversaciones exigentes',
    description: 'Dos voces destacan su capacidad para bajar tensión y devolver foco al problema.',
    evidenceStrength: 'Inicial',
    evidence: {
      metrics: [
        { value: '2', label: 'Kudos' },
        { value: '2', label: 'voces' },
        { value: '2', label: 'contextos' },
        { value: '40 días', label: 'período' }
      ]
    },
    contextIds: ['ctx-horizonte', 'ctx-company'],
    supportingKudoIds: ['k-martin-01', 'k-martin-02'],
    reading: 'La evidencia es valiosa, pero todavía inicial. Conviene observar si el patrón se sostiene antes de activar algo adicional.',
    suggestedDecision: 'No activar por ahora; mantener la señal visible y sumar contexto humano.',
    status: 'evaluated',
    createdAt: '2026-09-03T10:00:00Z'
  },
  {
    id: 'sig-rec-sofia',
    type: 'recognition',
    subjectType: 'person',
    subjectId: 'p-sofia',
    title: 'Hace simple y humano el soporte interno',
    description: 'El aporte combina anticipación operativa con una forma de acompañar que cuida la experiencia de los demás.',
    evidenceStrength: 'Consistente',
    evidence: {
      metrics: [
        { value: '4', label: 'señales' },
        { value: '4', label: 'voces' },
        { value: '2', label: 'contextos' },
        { value: '60 días', label: 'recurrencia' }
      ]
    },
    contextIds: ['ctx-internal', 'ctx-company'],
    supportingKudoIds: ['k-sofia-01', 'k-sofia-02'],
    reading: 'La señal combina impacto operativo y calidad del vínculo, reconocidos por personas de áreas diferentes.',
    suggestedDecision: 'Reconocer la disponibilidad y el cuidado sostenido en una tarea que suele ser poco visible.',
    status: 'evaluated',
    createdAt: '2026-08-27T14:00:00Z'
  },
  {
    id: 'sig-amp-camila',
    type: 'amplification',
    subjectType: 'person',
    subjectId: 'p-camila',
    title: 'Explicaciones y materiales que desarrollan autonomía',
    description: 'Aparecen prácticas reutilizables para explicar, documentar y acompañar sin generar dependencia.',
    evidenceStrength: 'Fuerte',
    evidence: {
      metrics: [
        { value: '8', label: 'voces' },
        { value: '3', label: 'contextos' },
        { value: '4', label: 'personas que replican' },
        { value: '90 días', label: 'recurrencia' }
      ]
    },
    contextIds: ['ctx-genia', 'ctx-atlas', 'ctx-community'],
    supportingKudoIds: ['k-camila-01', 'k-camila-02', 'k-camila-03', 'k-camila-05', 'k-camila-06', 'k-camila-07'],
    reading: 'La oportunidad no es pedirle a Camila que enseñe más, sino capturar una práctica que ya genera autonomía.',
    opportunity: 'Convertir el enfoque en una práctica interna reutilizable.',
    suggestedActions: ['Clínica interna de 30 minutos', 'Documentación de buena práctica', 'Incorporación en onboarding'],
    status: 'action-created',
    createdAt: '2026-09-06T16:10:00Z'
  },
  {
    id: 'sig-amp-nicolas',
    type: 'amplification',
    subjectType: 'person',
    subjectId: 'p-nicolas',
    title: 'Puentes entre equipos con desafíos afines',
    description: 'Los Kudos muestran que conectar experiencias de distintos proyectos evita duplicar análisis y mejora decisiones.',
    evidenceStrength: 'Fuerte',
    evidence: {
      metrics: [
        { value: '7', label: 'voces' },
        { value: '4', label: 'contextos' },
        { value: '3', label: 'equipos' },
        { value: '80 días', label: 'recurrencia' }
      ]
    },
    contextIds: ['ctx-cross', 'ctx-delta', 'ctx-horizonte', 'ctx-company'],
    supportingKudoIds: ['k-nicolas-01', 'k-nicolas-02', 'k-nicolas-03', 'k-nicolas-04', 'k-nicolas-05', 'k-nicolas-06'],
    reading: 'El valor organizacional está en la conexión, no solamente en la persona que la hizo posible.',
    opportunity: 'Crear una rutina liviana para conectar equipos ante problemas similares.',
    suggestedActions: ['Conexión entre equipos', 'Referente interno voluntario', 'Documentación de casos cruzados'],
    status: 'open',
    createdAt: '2026-09-05T18:10:00Z'
  },
  {
    id: 'sig-amp-valentina',
    type: 'amplification',
    subjectType: 'person',
    subjectId: 'p-valentina',
    title: 'Cierres simples, visibles y reutilizables',
    description: 'Se repiten prácticas de orden, responsables claros y trazabilidad mínima para destrabar entregas.',
    evidenceStrength: 'Consistente',
    evidence: {
      metrics: [
        { value: '6', label: 'voces' },
        { value: '2', label: 'contextos' },
        { value: '3', label: 'prácticas repetidas' },
        { value: '75 días', label: 'recurrencia' }
      ]
    },
    contextIds: ['ctx-atlas', 'ctx-horizonte'],
    supportingKudoIds: ['k-valentina-01', 'k-valentina-02', 'k-valentina-03', 'k-valentina-04', 'k-valentina-05'],
    reading: 'La práctica podría documentarse sin convertir a Valentina en dueña permanente de todos los cierres.',
    opportunity: 'Transformar el método de cierre en una pauta compartida.',
    suggestedActions: ['Documentación de buena práctica', 'Microcapacitación', 'Incorporación en onboarding'],
    status: 'action-created',
    createdAt: '2026-09-04T16:10:00Z'
  },
  {
    id: 'sig-att-horizonte',
    type: 'attention',
    subjectType: 'context',
    subjectId: 'ctx-horizonte',
    title: 'Baja cobertura en Proyecto Horizonte',
    description: 'La participación se mantiene por debajo del promedio y pocas voces concentran la mayor parte de los reconocimientos.',
    evidenceStrength: 'Consistente',
    evidence: {
      metrics: [
        { value: '64 %', label: 'cobertura' },
        { value: '-12 pt', label: 'vs. promedio' },
        { value: '27 %', label: 'concentración' },
        { value: '90 días', label: 'período' }
      ]
    },
    contextIds: ['ctx-horizonte'],
    supportingKudoIds: [],
    reading: 'Puede haber barreras de participación o menor visibilidad; el dato no permite afirmar falta de colaboración.',
    opportunity: 'Entender barreras y ampliar voces antes de intervenir.',
    suggestedActions: ['Conversación breve con el equipo', 'Revisar accesibilidad del ritual', 'Invitar reconocimiento específico entre pares'],
    status: 'action-created',
    createdAt: '2026-09-02T12:00:00Z'
  },
  {
    id: 'sig-att-concentration',
    type: 'attention',
    subjectType: 'team',
    subjectId: 'team-imr',
    title: 'Concentración excesiva de visibilidad',
    description: 'Un grupo reducido reúne una proporción relevante de los Kudos del período.',
    evidenceStrength: 'Consistente',
    evidence: {
      metrics: [
        { value: '18 %', label: 'en el 10 % más visible' },
        { value: '9', label: 'personas' },
        { value: '6', label: 'áreas' },
        { value: '90 días', label: 'período' }
      ]
    },
    contextIds: ['ctx-company'],
    supportingKudoIds: [],
    reading: 'La exposición, el rol y el tamaño de los proyectos pueden explicar parte de la concentración.',
    opportunity: 'Revisar si hay contribuciones poco visibles o voces que no están participando.',
    suggestedActions: ['Revisión cualitativa por contexto', 'Conversación con líderes', 'Ajuste de comunicación'],
    status: 'open',
    createdAt: '2026-09-01T12:00:00Z'
  },
  {
    id: 'sig-att-leadership',
    type: 'attention',
    subjectType: 'team',
    subjectId: 'team-management',
    title: 'Baja participación del liderazgo',
    description: 'Los reconocimientos emitidos por LDR, MGR y PTR son inferiores al resto de la organización.',
    evidenceStrength: 'Consistente',
    evidence: {
      metrics: [
        { value: '14 %', label: 'emitidos por Gestión' },
        { value: '-9 pt', label: 'vs. esperado' },
        { value: '3', label: 'niveles' },
        { value: '90 días', label: 'período' }
      ]
    },
    contextIds: ['ctx-management', 'ctx-company'],
    supportingKudoIds: ['k-team-management-01'],
    reading: 'La señal no implica falta de valoración; puede indicar que el reconocimiento no se vuelve visible u oportuno.',
    opportunity: 'Hacer más consistente la devolución concreta desde el liderazgo.',
    suggestedActions: ['Ritual breve en reunión mensual', 'Recordatorio contextual', 'Revisión con Equipo de Gestión'],
    status: 'action-created',
    createdAt: '2026-08-30T12:00:00Z'
  },
  {
    id: 'sig-att-cross',
    type: 'attention',
    subjectType: 'team',
    subjectId: 'team-imr',
    title: 'Escasa transversalidad en algunos contextos',
    description: 'En dos proyectos, la mayoría de los Kudos ocurre dentro del mismo equipo.',
    evidenceStrength: 'Inicial',
    evidence: {
      metrics: [
        { value: '31 %', label: 'reconocimiento cruzado' },
        { value: '2', label: 'proyectos' },
        { value: '69 %', label: 'dentro del equipo' },
        { value: '30 días', label: 'período' }
      ]
    },
    contextIds: ['ctx-horizonte', 'ctx-delta'],
    supportingKudoIds: [],
    reading: 'Puede reflejar el diseño del trabajo, no necesariamente aislamiento cultural.',
    opportunity: 'Observar dónde una conexión entre proyectos agregaría valor real.',
    suggestedActions: ['Mapear desafíos comunes', 'Conexión entre equipos', 'Seguimiento en 30 días'],
    status: 'open',
    createdAt: '2026-08-29T12:00:00Z'
  }
];

const rewardCatalog = [
  {
    id: 'reward-cash',
    name: 'Premio económico puntual',
    family: 'Económico',
    description: 'Reconocimiento monetario extraordinario asociado a una contribución relevante.',
    monetary: true,
    active: true
  },
  {
    id: 'reward-gift-card',
    name: 'Gift card / beneficio económico',
    family: 'Económico',
    description: 'Beneficio de valor definido por IMR para reconocer una contribución concreta.',
    monetary: true,
    active: true
  },
  {
    id: 'reward-day-off',
    name: 'Día libre adicional',
    family: 'Tiempo y flexibilidad',
    description: 'Un día adicional acordado para reconocer el aporte y devolver tiempo personal.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-half-day',
    name: 'Medio día libre',
    family: 'Tiempo y flexibilidad',
    description: 'Medio día adicional acordado con la persona y su proyecto.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-flexibility',
    name: 'Flexibilidad especial acordada',
    family: 'Tiempo y flexibilidad',
    description: 'Una alternativa de flexibilidad definida junto con la persona y el equipo.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-training',
    name: 'Capacitación financiada por IMR',
    family: 'Desarrollo',
    description: 'Formación elegida con la persona y vinculada a su desarrollo.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-certification',
    name: 'Certificación',
    family: 'Desarrollo',
    description: 'Acompañamiento y financiamiento de una certificación relevante.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-congress',
    name: 'Participación en actividad / congreso',
    family: 'Desarrollo',
    description: 'Acceso a una actividad externa alineada con los intereses de desarrollo.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-mentoring',
    name: 'Mentoring o acompañamiento',
    family: 'Desarrollo',
    description: 'Espacio de acompañamiento elegido para potenciar un objetivo profesional.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-lunch',
    name: 'Almuerzo / experiencia',
    family: 'Experiencia',
    description: 'Experiencia elegida como gesto concreto de reconocimiento.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-team-activity',
    name: 'Actividad de equipo',
    family: 'Experiencia',
    description: 'Actividad compartida para reconocer una contribución colectiva.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-experience-benefit',
    name: 'Entrada o beneficio experiencial',
    family: 'Experiencia',
    description: 'Beneficio experiencial acordado según intereses de la persona.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-strategic',
    name: 'Participar en iniciativa estratégica',
    family: 'Oportunidad profesional',
    description: 'Participación voluntaria, con alcance y capacidad acordados; nunca más trabajo como premio.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-internal-reference',
    name: 'Exposición como referente interno',
    family: 'Oportunidad profesional',
    description: 'Visibilidad voluntaria de su experiencia, con apoyo y reconocimiento explícito.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-lead-community',
    name: 'Liderar una clínica / comunidad',
    family: 'Oportunidad profesional',
    description: 'Oportunidad voluntaria de desarrollo, con tiempo protegido y acompañamiento.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-challenge-project',
    name: 'Participación en proyecto desafiante',
    family: 'Oportunidad profesional',
    description: 'Oportunidad voluntaria y acordada, alineada con su desarrollo y sin sobrecarga.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-distinction',
    name: 'Distinción interna',
    family: 'Reconocimiento institucional',
    description: 'Distinción formal que deja registro del aporte realizado.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-leadership-recognition',
    name: 'Reconocimiento de socios / liderazgo',
    family: 'Reconocimiento institucional',
    description: 'Devolución institucional concreta y personal de socios o líderes.',
    monetary: false,
    active: true
  },
  {
    id: 'reward-featured-story',
    name: 'Historia destacada',
    family: 'Reconocimiento institucional',
    description: 'Historia compartida con consentimiento para visibilizar aporte e impacto.',
    monetary: false,
    active: true
  }
];

const initialRecognitionDecisions = [
  {
    id: 'rec-camila-training',
    signalId: 'sig-rec-camila',
    recipientType: 'person',
    recipientId: 'p-camila',
    rewardId: 'reward-training',
    rationale: 'La evidencia muestra una contribución sostenida al desarrollo de autonomía. La capacitación reconoce el valor generado y acompaña su propio crecimiento.',
    amount: null,
    owner: 'Jesús Machado',
    approver: 'Equipo de Gestión (simulado)',
    targetDate: '2026-09-30',
    status: 'Aprobado',
    deliveredAt: null,
    notes: 'Coordinar con Camila una alternativa alineada con sus intereses.',
    outcome: '',
    createdAt: '2026-09-06T18:00:00Z'
  },
  {
    id: 'rec-valentina-cash',
    signalId: 'sig-rec-valentina',
    recipientType: 'person',
    recipientId: 'p-valentina',
    rewardId: 'reward-cash',
    rationale: 'Se evalúa una valoración extraordinaria por impacto sostenido en cierres críticos, sin convertir la urgencia en el único comportamiento reconocido.',
    amount: 150000,
    owner: 'Jesús Machado',
    approver: 'Equipo de Gestión (simulado)',
    targetDate: '2026-09-22',
    status: 'En evaluación',
    deliveredAt: null,
    notes: 'Monto y aprobación exclusivamente simulados para la POC.',
    outcome: '',
    createdAt: '2026-09-04T18:00:00Z'
  },
  {
    id: 'rec-martin-observe',
    signalId: 'sig-rec-martin',
    recipientType: 'person',
    recipientId: 'p-martin',
    rewardId: null,
    rationale: 'La contribución es valiosa, pero la evidencia todavía es inicial. Se decide observar recurrencia y sumar contexto antes de activar una valoración adicional.',
    amount: null,
    owner: 'Jesús Machado',
    approver: 'Equipo de Gestión (simulado)',
    targetDate: '',
    status: 'Descartado',
    deliveredAt: null,
    notes: 'Descartado en esta instancia; no invalida los Kudos recibidos.',
    outcome: 'Continuar observando sin activar reconocimiento tangible.',
    createdAt: '2026-09-03T12:00:00Z'
  },
  {
    id: 'rec-sofia-half-day',
    signalId: 'sig-rec-sofia',
    recipientType: 'person',
    recipientId: 'p-sofia',
    rewardId: 'reward-half-day',
    rationale: 'Reconocer una contribución operativa y humana que suele quedar poco visible.',
    amount: null,
    owner: 'Mariana Pérez',
    approver: 'Equipo de Gestión (simulado)',
    targetDate: '2026-08-29',
    status: 'Entregado',
    deliveredAt: '2026-08-29T12:00:00Z',
    notes: 'Acordado con la persona y su equipo.',
    outcome: 'Medio día utilizado según lo acordado.',
    createdAt: '2026-08-27T18:00:00Z'
  },
  {
    id: 'rec-management-story',
    signalId: 'sig-att-leadership',
    recipientType: 'team',
    recipientId: 'team-management',
    rewardId: 'reward-leadership-recognition',
    rationale: 'Reconocer la apertura de un espacio de escucha que se tradujo en decisiones visibles.',
    amount: null,
    owner: 'Cultura IMR',
    approver: 'Socios (simulado)',
    targetDate: '2026-09-15',
    status: 'Programado',
    deliveredAt: null,
    notes: 'Devolución institucional en próxima reunión ampliada.',
    outcome: '',
    createdAt: '2026-08-31T18:00:00Z'
  }
];

const initialActions = [
  {
    id: 'action-camila-clinic',
    sourceType: 'signal',
    sourceId: 'sig-amp-camila',
    title: 'Organizar clínica interna de 30 minutos',
    description: 'Compartir el enfoque para explicar y documentar de forma que otros desarrollen autonomía.',
    relatedSubject: { type: 'person', id: 'p-camila' },
    owner: 'Camila Silva + Cultura IMR',
    targetDate: '2026-09-18',
    status: 'En curso',
    comments: 'Participación voluntaria confirmada. Cultura protege el tiempo y prepara el material con Camila.',
    outcome: '',
    createdAt: '2026-09-06T18:10:00Z'
  },
  {
    id: 'action-horizonte-coverage',
    sourceType: 'signal',
    sourceId: 'sig-att-horizonte',
    title: 'Revisar barreras de participación en Horizonte',
    description: 'Conversar con el equipo antes de proponer un ritual o campaña de reconocimiento.',
    relatedSubject: { type: 'context', id: 'ctx-horizonte' },
    owner: 'Líder de Proyecto Horizonte',
    targetDate: '2026-09-05',
    status: 'Pendiente',
    comments: 'Acción vencida en la demo para mostrar el seguimiento.',
    outcome: '',
    createdAt: '2026-09-02T13:00:00Z'
  },
  {
    id: 'action-leadership-ritual',
    sourceType: 'signal',
    sourceId: 'sig-att-leadership',
    title: 'Revisar el reconocimiento desde Equipo de Gestión',
    description: 'Validar si un espacio breve y concreto en la reunión mensual ayuda a hacer visible la valoración del liderazgo.',
    relatedSubject: { type: 'team', id: 'team-management' },
    owner: 'Cultura IMR',
    targetDate: '2026-09-25',
    status: 'En análisis',
    comments: 'Evitar convertirlo en una obligación o una ronda vacía.',
    outcome: '',
    createdAt: '2026-08-30T13:00:00Z'
  },
  {
    id: 'action-valentina-practice',
    sourceType: 'signal',
    sourceId: 'sig-amp-valentina',
    title: 'Documentar práctica de cierre visible',
    description: 'Capturar una pauta simple de responsables, próximos pasos y trazabilidad mínima.',
    relatedSubject: { type: 'person', id: 'p-valentina' },
    owner: 'Equipo de Planificación',
    targetDate: '2026-08-28',
    status: 'Completada',
    comments: 'La práctica se documentó sin asignar a Valentina como dueña permanente.',
    outcome: 'Guía breve incorporada al espacio de trabajo del equipo.',
    createdAt: '2026-08-10T12:00:00Z'
  }
];

const reportProfiles = {
  all: {
    name: 'Toda IMR',
    count: 128,
    coverage: 76,
    coverageNote: '73 de 96 personas reconocidas',
    cross: 41,
    concentration: 18,
    peer: 64,
    quality: 84,
    diversity: 3.8,
    activated: 3,
    categories: { 'Hacer que pase': 38, 'Dar una mano': 29, 'Compartir lo que sé': 21, 'Cuidar el vínculo': 12 },
    contexts: { 'Proyecto Atlas': 82, GenIA: 78, 'Proyecto Delta': 71, 'Proyecto Horizonte': 64 }
  },
  atlas: {
    name: 'Proyecto Atlas',
    count: 31,
    coverage: 82,
    coverageNote: '18 de 22 personas reconocidas',
    cross: 48,
    concentration: 15,
    peer: 68,
    quality: 88,
    diversity: 4.1,
    activated: 1,
    categories: { 'Hacer que pase': 42, 'Dar una mano': 22, 'Compartir lo que sé': 27, 'Cuidar el vínculo': 9 },
    contexts: { 'Proyecto Atlas': 82, GenIA: 78, 'Equipo IMR': 76, 'Proyecto Horizonte': 64 }
  },
  horizonte: {
    name: 'Proyecto Horizonte',
    count: 24,
    coverage: 64,
    coverageNote: '14 de 22 personas reconocidas',
    cross: 31,
    concentration: 27,
    peer: 59,
    quality: 77,
    diversity: 2.6,
    activated: 0,
    categories: { 'Hacer que pase': 44, 'Dar una mano': 24, 'Compartir lo que sé': 11, 'Cuidar el vínculo': 21 },
    contexts: { 'Proyecto Horizonte': 64, 'Proyecto Delta': 71, 'Equipo IMR': 76, 'Proyecto Atlas': 82 }
  },
  delta: {
    name: 'Proyecto Delta',
    count: 22,
    coverage: 71,
    coverageNote: '15 de 21 personas reconocidas',
    cross: 36,
    concentration: 21,
    peer: 66,
    quality: 82,
    diversity: 3.2,
    activated: 1,
    categories: { 'Hacer que pase': 32, 'Dar una mano': 39, 'Compartir lo que sé': 17, 'Cuidar el vínculo': 12 },
    contexts: { 'Proyecto Delta': 71, 'Proyecto Atlas': 82, GenIA: 78, 'Proyecto Horizonte': 64 }
  },
  genia: {
    name: 'GenIA',
    count: 19,
    coverage: 78,
    coverageNote: '14 de 18 personas reconocidas',
    cross: 46,
    concentration: 17,
    peer: 72,
    quality: 91,
    diversity: 4.4,
    activated: 1,
    categories: { 'Hacer que pase': 24, 'Dar una mano': 18, 'Compartir lo que sé': 49, 'Cuidar el vínculo': 9 },
    contexts: { GenIA: 78, 'Proyecto Atlas': 82, 'Equipo IMR': 76, 'Proyecto Horizonte': 64 }
  },
  team: {
    name: 'Equipo IMR',
    count: 19,
    coverage: 47,
    coverageNote: '45 de 96 personas participaron',
    cross: 100,
    concentration: 12,
    peer: 71,
    quality: 80,
    diversity: 4.8,
    activated: 1,
    categories: { 'Hacer que pase': 18, 'Dar una mano': 36, 'Compartir lo que sé': 16, 'Cuidar el vínculo': 30 },
    contexts: { 'Equipo IMR': 76, GenIA: 78, 'Proyecto Atlas': 82, 'Proyecto Horizonte': 64 }
  }
};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function escapeHTML(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function uid(prefix) {
  return prefix + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}

function todayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function formatDate(value, withTime) {
  if (!value) return 'Sin fecha';
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const parsed = isDateOnly
    ? new Date(Number(value.slice(0, 4)), Number(value.slice(5, 7)) - 1, Number(value.slice(8, 10)), 12)
    : new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  if (withTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  return new Intl.DateTimeFormat('es-AR', options).format(parsed).replace('.', '');
}

function formatMoney(value) {
  const numeric = Number(value || 0);
  return '$ ' + Math.round(numeric).toLocaleString('es-AR');
}

function plural(value, singular, pluralText) {
  return value === 1 ? singular : pluralText;
}

function getPerson(id) {
  return people.find(function (person) { return person.id === id; });
}

function getTeam(id) {
  return teams.find(function (team) { return team.id === id; });
}

function getContext(id) {
  return contexts.find(function (item) { return item.id === id; });
}

function getSignal(id) {
  return signals.find(function (signal) { return signal.id === id; });
}

function getReward(id) {
  return rewardCatalog.find(function (reward) { return reward.id === id; });
}

function getSubject(type, id) {
  if (type === 'person') return getPerson(id);
  if (type === 'team') return getTeam(id);
  if (type === 'context') {
    const contextItem = getContext(id);
    if (!contextItem) return null;
    return {
      id: contextItem.id,
      name: contextItem.name,
      initials: contextItem.name.split(' ').map(function (word) { return word.charAt(0); }).join('').slice(0, 3),
      area: 'Proyecto o contexto'
    };
  }
  return null;
}

function getDecisionForSignal(signalId) {
  return recognitionDecisions.find(function (decision) { return decision.signalId === signalId; });
}

function getActionForSignal(signalId) {
  return actions.find(function (action) { return action.sourceType === 'signal' && action.sourceId === signalId; });
}

function categorySymbol(categoryName) {
  const category = categories.find(function (item) { return item.name === categoryName; });
  return category ? category.symbol : '•';
}

function readArray(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return deepClone(fallback);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : deepClone(fallback);
  } catch (error) {
    return deepClone(fallback);
  }
}

function normalizeStoredKudo(kudo) {
  if (!kudo || typeof kudo !== 'object') return null;
  if (kudo.recipientType && kudo.recipientId && kudo.senderId && kudo.contextId) {
    return {
      id: kudo.id || uid('kudo'),
      recipientType: kudo.recipientType,
      recipientId: kudo.recipientId,
      senderId: kudo.senderId,
      category: kudo.category,
      contextId: kudo.contextId,
      message: String(kudo.message || ''),
      visibility: kudo.visibility === 'private' ? 'private' : 'public',
      createdAt: kudo.createdAt || new Date().toISOString()
    };
  }

  const legacyRecipient = people.find(function (person) { return person.name === kudo.recipient; })
    || teams.find(function (team) { return team.name === kudo.recipient; });
  const legacySender = people.find(function (person) { return person.name === kudo.sender; }) || getPerson(CURRENT_USER_ID);
  const legacyContext = contexts.find(function (item) { return item.name === kudo.context; }) || getContext('ctx-company');
  if (!legacyRecipient || !legacySender || !legacyContext || !kudo.message) return null;

  return {
    id: kudo.id || uid('kudo'),
    recipientType: getTeam(legacyRecipient.id) ? 'team' : 'person',
    recipientId: legacyRecipient.id,
    senderId: legacySender.id,
    category: kudo.category || 'Dar una mano',
    contextId: legacyContext.id,
    message: String(kudo.message),
    visibility: kudo.isPublic === false ? 'private' : 'public',
    createdAt: kudo.createdAt || new Date().toISOString()
  };
}

let customKudos = readArray(STORAGE_KEYS.kudos, [])
  .map(normalizeStoredKudo)
  .filter(Boolean);
let kudos = customKudos.concat(deepClone(initialKudos));
let recognitionDecisions = readArray(STORAGE_KEYS.recognitions, initialRecognitionDecisions);
let actions = readArray(STORAGE_KEYS.actions, initialActions);

let activeView = 'muro';
let activeMyView = 'received';
let activeWallCategory = 'Todos';
let activeWallContext = 'all';
let activeAdminTab = 'panorama';
let activeSignalFilter = 'recognition';
let activeRecognitionFilter = 'Todos';
let activeActionFilter = 'Todas';
let lastFocusedElement = null;
let toastTimer = null;

const dom = {
  viewPanels: Array.from(document.querySelectorAll('[data-view-panel]')),
  navControls: Array.from(document.querySelectorAll('[data-nav]')),
  headerRecognize: document.querySelector('#header-recognize'),
  form: document.querySelector('#kudo-form'),
  recipient: document.querySelector('#recipient'),
  context: document.querySelector('#context'),
  message: document.querySelector('#message'),
  charCount: document.querySelector('#char-count'),
  publicToggle: document.querySelector('#is-public'),
  visibilityCopy: document.querySelector('#visibility-copy'),
  wallCategoryButtons: Array.from(document.querySelectorAll('[data-wall-category]')),
  wallContextFilter: document.querySelector('#wall-context-filter'),
  wallKudoList: document.querySelector('#wall-kudo-list'),
  wallEmptyState: document.querySelector('#wall-empty-state'),
  myTabs: Array.from(document.querySelectorAll('[data-my-view]')),
  myContent: document.querySelector('#my-content'),
  myInsightPanel: document.querySelector('#my-insight-panel'),
  myBehaviorSummary: document.querySelector('#my-behavior-summary'),
  myDiversityNote: document.querySelector('#my-diversity-note'),
  myFeedEyebrow: document.querySelector('#my-feed-eyebrow'),
  myFeedTitle: document.querySelector('#my-feed-title'),
  myKudoList: document.querySelector('#my-kudo-list'),
  myEmptyState: document.querySelector('#my-empty-state'),
  adminTabs: Array.from(document.querySelectorAll('[data-admin-tab]')),
  adminPanels: Array.from(document.querySelectorAll('.admin-panel')),
  reportToolbar: document.querySelector('#report-toolbar'),
  reportPeriod: document.querySelector('#report-period'),
  reportContext: document.querySelector('#report-context'),
  reportScope: document.querySelector('#report-scope'),
  metricGrid: document.querySelector('#metric-grid'),
  patternsCount: document.querySelector('#patterns-count'),
  categoryChart: document.querySelector('#category-chart'),
  categoryReading: document.querySelector('#category-reading'),
  contextChart: document.querySelector('#context-chart'),
  contextReading: document.querySelector('#context-reading'),
  measurementGrid: document.querySelector('#measurement-grid'),
  signalFilterButtons: Array.from(document.querySelectorAll('[data-signal-filter]')),
  signalExplainer: document.querySelector('#signal-explainer'),
  signalList: document.querySelector('#signal-list'),
  recognitionSummary: document.querySelector('#recognition-summary'),
  recognitionFilterButtons: Array.from(document.querySelectorAll('[data-recognition-filter]')),
  recognitionList: document.querySelector('#recognition-list'),
  recognitionEmpty: document.querySelector('#recognition-empty'),
  actionSummary: document.querySelector('#action-summary'),
  actionFilterButtons: Array.from(document.querySelectorAll('[data-action-filter]')),
  actionList: document.querySelector('#action-list'),
  actionEmpty: document.querySelector('#action-empty'),
  resetDemo: document.querySelector('#reset-demo'),
  newAction: document.querySelector('#new-action'),
  modalBackdrop: document.querySelector('#modal-backdrop'),
  modal: document.querySelector('#modal'),
  modalEyebrow: document.querySelector('#modal-eyebrow'),
  modalTitle: document.querySelector('#modal-title'),
  modalBody: document.querySelector('#modal-body'),
  toast: document.querySelector('#toast'),
  toastTitle: document.querySelector('#toast-title'),
  toastMessage: document.querySelector('#toast-message'),
  toastClose: document.querySelector('#toast-close')
};

function persistKudos() {
  localStorage.setItem(STORAGE_KEYS.kudos, JSON.stringify(customKudos));
}

function persistRecognitions() {
  localStorage.setItem(STORAGE_KEYS.recognitions, JSON.stringify(recognitionDecisions));
}

function persistActions() {
  localStorage.setItem(STORAGE_KEYS.actions, JSON.stringify(actions));
}

function sortNewest(first, second) {
  return new Date(second.createdAt || 0).getTime() - new Date(first.createdAt || 0).getTime();
}

function subjectAvatar(subject) {
  if (!subject) return '<span class="avatar" aria-hidden="true">?</span>';
  return '<span class="avatar" aria-hidden="true">' + escapeHTML(subject.initials || 'IMR') + '</span>';
}

function kudoCardHTML(kudo, index) {
  const recipientSubject = getSubject(kudo.recipientType, kudo.recipientId) || {
    name: 'Destinatario de demo',
    initials: '—',
    area: 'Datos simulados'
  };
  const sender = getPerson(kudo.senderId) || {
    name: 'Persona de demo',
    initials: '—'
  };
  const contextItem = getContext(kudo.contextId) || { name: 'Contexto no disponible' };
  const privateBadge = kudo.visibility === 'private'
    ? '<span class="private-badge">Privado · destinatario y administradores</span>'
    : '';

  return [
    '<article class="kudo-card" data-category="', escapeHTML(kudo.category), '" style="animation-delay:',
    String(Math.min(index * 35, 160)), 'ms">',
    subjectAvatar(recipientSubject),
    '<div class="kudo-content">',
    '<div class="kudo-route"><strong>', escapeHTML(recipientSubject.name), '</strong><span> · ',
    escapeHTML(recipientSubject.area || ''), '</span></div>',
    '<p class="kudo-message">', escapeHTML(kudo.message), '</p>',
    '<div class="kudo-meta">',
    '<span class="category-tag">', escapeHTML(categorySymbol(kudo.category)), ' ', escapeHTML(kudo.category), '</span>',
    '<span class="context-tag">', escapeHTML(contextItem.name), '</span>',
    privateBadge,
    '<span class="sent-by"><i class="sent-by-avatar" aria-hidden="true">', escapeHTML(sender.initials),
    '</i> ', escapeHTML(sender.name), '</span>',
    '</div></div>',
    '<time class="kudo-time" datetime="', escapeHTML(kudo.createdAt), '">', escapeHTML(formatDate(kudo.createdAt, false)), '</time>',
    '</article>'
  ].join('');
}

function renderRecipientOptions() {
  const teamOptions = teams
    .filter(function (team) { return team.active; })
    .map(function (team) {
      return '<option value="team:' + escapeHTML(team.id) + '">' + escapeHTML(team.name) + ' · ' + escapeHTML(team.area) + '</option>';
    })
    .join('');

  const peopleOptions = people
    .filter(function (person) { return person.active && person.id !== CURRENT_USER_ID; })
    .sort(function (first, second) { return first.name.localeCompare(second.name, 'es'); })
    .map(function (person) {
      return '<option value="person:' + escapeHTML(person.id) + '">' + escapeHTML(person.name) + ' · ' + escapeHTML(person.area) + '</option>';
    })
    .join('');

  dom.recipient.innerHTML = [
    '<option value="">Elegí a quién reconocer</option>',
    '<optgroup label="Reconocimiento colectivo">', teamOptions, '</optgroup>',
    '<optgroup label="Personas · datos simulados">', peopleOptions, '</optgroup>'
  ].join('');
}

function parseRecipientValue(value) {
  const separatorIndex = String(value).indexOf(':');
  if (separatorIndex < 1) return null;
  const type = value.slice(0, separatorIndex);
  const id = value.slice(separatorIndex + 1);
  const subject = getSubject(type, id);
  return subject ? { type: type, id: id, subject: subject } : null;
}

function renderContextOptions(recipientValue) {
  const selection = parseRecipientValue(recipientValue);
  if (!selection) {
    dom.context.innerHTML = '<option value="">Primero elegí una persona o equipo</option>';
    dom.context.disabled = true;
    return;
  }

  const available = (selection.subject.contexts || [])
    .map(getContext)
    .filter(function (item) { return item && item.active; });

  const projectOptions = available
    .filter(function (item) { return item.type === 'project'; })
    .map(function (item) { return '<option value="' + escapeHTML(item.id) + '">' + escapeHTML(item.name) + '</option>'; })
    .join('');
  const globalOptions = available
    .filter(function (item) { return item.type !== 'project'; })
    .map(function (item) { return '<option value="' + escapeHTML(item.id) + '">' + escapeHTML(item.name) + '</option>'; })
    .join('');

  dom.context.innerHTML = [
    '<option value="">Elegí el proyecto o contexto</option>',
    projectOptions ? '<optgroup label="Proyectos">' + projectOptions + '</optgroup>' : '',
    globalOptions ? '<optgroup label="Contextos globales">' + globalOptions + '</optgroup>' : ''
  ].join('');
  dom.context.disabled = false;
}

function renderWallContextOptions() {
  const currentValue = activeWallContext;
  const availableIds = Array.from(new Set(kudos
    .filter(function (kudo) { return kudo.visibility === 'public'; })
    .map(function (kudo) { return kudo.contextId; })));
  const options = availableIds
    .map(getContext)
    .filter(Boolean)
    .sort(function (first, second) { return first.name.localeCompare(second.name, 'es'); })
    .map(function (item) {
      return '<option value="' + escapeHTML(item.id) + '">' + escapeHTML(item.name) + '</option>';
    })
    .join('');
  dom.wallContextFilter.innerHTML = '<option value="all">Todos los contextos</option>' + options;
  dom.wallContextFilter.value = availableIds.includes(currentValue) ? currentValue : 'all';
  activeWallContext = dom.wallContextFilter.value;
}

function renderWall() {
  renderWallContextOptions();
  const visible = kudos
    .filter(function (kudo) {
      const categoryMatches = activeWallCategory === 'Todos' || kudo.category === activeWallCategory;
      const contextMatches = activeWallContext === 'all' || kudo.contextId === activeWallContext;
      return kudo.visibility === 'public' && categoryMatches && contextMatches;
    })
    .sort(sortNewest);

  dom.wallKudoList.innerHTML = visible.map(kudoCardHTML).join('');
  dom.wallEmptyState.hidden = visible.length > 0;
}

function renderMyInsights(received) {
  const groups = {};
  received.forEach(function (kudo) {
    if (!groups[kudo.category]) {
      groups[kudo.category] = { items: [], voices: new Set(), contexts: new Set() };
    }
    groups[kudo.category].items.push(kudo);
    groups[kudo.category].voices.add(kudo.senderId);
    groups[kudo.category].contexts.add(kudo.contextId);
  });

  const summary = Object.keys(groups)
    .map(function (categoryName) {
      return {
        category: categoryName,
        count: groups[categoryName].items.length,
        voices: groups[categoryName].voices.size,
        contexts: groups[categoryName].contexts.size
      };
    })
    .sort(function (first, second) {
      if (second.voices !== first.voices) return second.voices - first.voices;
      return second.count - first.count;
    })
    .slice(0, 3);

  dom.myBehaviorSummary.innerHTML = summary.length
    ? summary.map(function (item) {
      return [
        '<div class="behavior-row"><strong>', escapeHTML(item.category), '</strong><span>',
        String(item.voices), ' ', plural(item.voices, 'voz', 'voces'), ' · ',
        String(item.contexts), ' ', plural(item.contexts, 'contexto', 'contextos'),
        '</span></div>'
      ].join('');
    }).join('')
    : '<div class="behavior-row"><strong>Aún sin patrón</strong><span>Hace falta más evidencia para sintetizar comportamientos.</span></div>';

  const voices = new Set(received.map(function (kudo) { return kudo.senderId; })).size;
  const contextsCount = new Set(received.map(function (kudo) { return kudo.contextId; })).size;
  dom.myDiversityNote.innerHTML = [
    '<strong>Diversidad de voces</strong><br>',
    escapeHTML(String(voices)), ' ', plural(voices, 'persona distinta', 'personas distintas'),
    ' en ', escapeHTML(String(contextsCount)), ' ', plural(contextsCount, 'contexto', 'contextos'),
    '. La variedad aporta perspectiva; no crea un score.'
  ].join('');
}

function renderMyKudos() {
  const received = kudos
    .filter(function (kudo) { return kudo.recipientType === 'person' && kudo.recipientId === CURRENT_USER_ID; })
    .sort(sortNewest);
  const sent = kudos
    .filter(function (kudo) { return kudo.senderId === CURRENT_USER_ID; })
    .sort(sortNewest);
  const visible = activeMyView === 'received' ? received : sent;

  dom.myInsightPanel.hidden = activeMyView !== 'received';
  dom.myContent.classList.toggle('sent-only', activeMyView === 'sent');
  dom.myContent.setAttribute('aria-labelledby', activeMyView === 'received' ? 'my-tab-received' : 'my-tab-sent');
  dom.myFeedEyebrow.textContent = activeMyView === 'received' ? 'Recibidos' : 'Enviados';
  dom.myFeedTitle.textContent = activeMyView === 'received' ? 'Reconocimientos para vos' : 'Reconocimientos que enviaste';
  dom.myKudoList.innerHTML = visible.map(kudoCardHTML).join('');
  dom.myEmptyState.hidden = visible.length > 0;
  renderMyInsights(received);
}

function showToast(title, messageText) {
  window.clearTimeout(toastTimer);
  dom.toastTitle.textContent = title;
  dom.toastMessage.textContent = messageText;
  dom.toast.classList.add('is-visible');
  toastTimer = window.setTimeout(function () {
    dom.toast.classList.remove('is-visible');
  }, 4200);
}

function showView(view, updateHash) {
  activeView = ['muro', 'mios', 'reportes'].includes(view) ? view : 'muro';
  dom.viewPanels.forEach(function (panel) {
    panel.hidden = panel.dataset.viewPanel !== activeView;
  });
  dom.navControls.forEach(function (control) {
    const isActive = control.dataset.nav === activeView;
    control.classList.toggle('is-active', isActive);
    if (control.matches('button')) {
      if (isActive) control.setAttribute('aria-current', 'page');
      else control.removeAttribute('aria-current');
    }
  });

  if (activeView === 'muro') renderWall();
  if (activeView === 'mios') renderMyKudos();
  if (activeView === 'reportes') renderAdmin();
  if (updateHash !== false) history.replaceState(null, '', '#' + activeView);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMyView(view) {
  activeMyView = view === 'sent' ? 'sent' : 'received';
  dom.myTabs.forEach(function (button) {
    const isActive = button.dataset.myView === activeMyView;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
  renderMyKudos();
}

function getReportData() {
  const contextKey = reportProfiles[dom.reportContext.value] ? dom.reportContext.value : 'all';
  const profile = deepClone(reportProfiles[contextKey]);
  const period = dom.reportPeriod.value;

  if (period === '30') {
    profile.count = Math.max(4, Math.round(profile.count * 0.39));
    profile.coverage = Math.max(0, profile.coverage - 8);
    profile.cross = Math.max(0, profile.cross - 2);
    profile.concentration = Math.min(100, profile.concentration + 3);
    profile.peer = Math.max(0, profile.peer - 1);
    profile.quality = Math.max(0, profile.quality - 2);
    profile.diversity = Math.max(1, profile.diversity - 0.4);
    profile.activated = Math.min(profile.activated, 1);
    Object.keys(profile.contexts).forEach(function (name) {
      profile.contexts[name] = Math.max(0, profile.contexts[name] - 7);
    });
  } else if (period === 'year') {
    profile.count = Math.round(profile.count * 2.45);
    profile.coverage = Math.min(96, profile.coverage + 8);
    profile.cross = Math.min(100, profile.cross + 4);
    profile.concentration = Math.max(8, profile.concentration - 3);
    profile.peer = Math.min(100, profile.peer + 2);
    profile.quality = Math.min(95, profile.quality + 3);
    profile.diversity += 0.6;
    profile.activated += contextKey === 'all' ? 4 : 1;
    Object.keys(profile.contexts).forEach(function (name) {
      profile.contexts[name] = Math.min(96, profile.contexts[name] + 6);
    });
  }
  return profile;
}

function barRowsHTML(values) {
  return Object.keys(values).map(function (name) {
    const value = values[name];
    return [
      '<div class="bar-row"><div><span>', escapeHTML(name), '</span><strong>', escapeHTML(String(value)),
      ' %</strong></div><i aria-hidden="true"><b style="width:', escapeHTML(String(value)), '%"></b></i></div>'
    ].join('');
  }).join('');
}

function renderPanorama() {
  const profile = getReportData();
  const conversion = profile.count > 0 ? ((profile.activated / profile.count) * 100).toFixed(1).replace('.', ',') : '0,0';
  const metrics = [
    { title: 'Cobertura', value: profile.coverage + ' %', note: profile.coverageNote, className: 'primary' },
    { title: 'Reconocimiento cruzado', value: profile.cross + ' %', note: 'entre proyectos o áreas diferentes', className: '' },
    { title: 'Concentración', value: profile.concentration + ' %', note: 'de los Kudos en el 10 % más visible', className: '' },
    { title: 'Entre pares', value: profile.peer + ' %', note: 'sin relación jerárquica directa', className: '' },
    { title: 'Reconocimientos tangibles activados', value: String(profile.activated), note: conversion + ' % de los Kudos analizados derivó en valoración adicional', className: 'tangible' }
  ];

  dom.metricGrid.innerHTML = metrics.map(function (metric) {
    return [
      '<article class="metric-card ', metric.className, '"><span>', escapeHTML(metric.title), '</span><strong>',
      escapeHTML(metric.value), '</strong><p>', escapeHTML(metric.note), '</p></article>'
    ].join('');
  }).join('');

  dom.reportScope.textContent = profile.name + ' · ' + profile.count + ' Kudos analizados';
  dom.patternsCount.textContent = profile.count + ' Kudos';
  dom.categoryChart.innerHTML = barRowsHTML(profile.categories);
  dom.contextChart.innerHTML = barRowsHTML(profile.contexts);

  const sortedCategories = Object.keys(profile.categories).sort(function (first, second) {
    return profile.categories[second] - profile.categories[first];
  });
  dom.categoryReading.textContent = 'La ejecución y la colaboración concentran hoy la mayor parte de las señales observadas. '
    + sortedCategories[0] + ' aparece primero; la lectura requiere revisar el contexto antes de concluir.';

  const lowestContext = Object.keys(profile.contexts).sort(function (first, second) {
    return profile.contexts[first] - profile.contexts[second];
  })[0];
  dom.contextReading.textContent = lowestContext + ' presenta la cobertura más baja del alcance seleccionado. Es una invitación a indagar barreras, no una evaluación del equipo.';

  const evaluatedSignals = recognitionDecisions.length;
  const activeActions = actions.filter(function (action) {
    return ['Pendiente', 'En análisis', 'En curso'].includes(action.status);
  }).length;
  const measurements = [
    { title: 'Adopción', value: profile.coverage + ' %', note: 'personas alcanzadas' },
    { title: 'Calidad', value: profile.quality + ' %', note: 'Kudos específicos y contextualizados' },
    { title: 'Diversidad', value: profile.diversity.toFixed(1).replace('.', ','), note: 'voces promedio por señal' },
    { title: 'Conversión a valoración', value: String(evaluatedSignals), note: 'señales evaluadas' },
    { title: 'Amplificación', value: String(activeActions), note: 'acciones activas' }
  ];
  dom.measurementGrid.innerHTML = measurements.map(function (item) {
    return [
      '<div class="measurement-item"><strong>', escapeHTML(item.title), '</strong><span>',
      escapeHTML(item.value), '</span><small>', escapeHTML(item.note), '</small></div>'
    ].join('');
  }).join('');
}

function evidenceMetricsHTML(signal, className) {
  const metrics = signal && signal.evidence && Array.isArray(signal.evidence.metrics)
    ? signal.evidence.metrics
    : [];
  return '<div class="' + (className || 'evidence-grid') + '">' + metrics.map(function (metric) {
    return [
      '<div class="evidence-chip"><strong>', escapeHTML(metric.value), '</strong><span>',
      escapeHTML(metric.label), '</span></div>'
    ].join('');
  }).join('') + '</div>';
}

function signalSubjectHTML(signal) {
  const subject = getSubject(signal.subjectType, signal.subjectId) || {
    name: 'Señal organizacional',
    initials: 'IMR',
    area: 'Datos simulados'
  };
  return [
    '<div class="signal-person">', subjectAvatar(subject), '<span><strong>', escapeHTML(subject.name),
    '</strong><small>', escapeHTML(subject.area || 'Señal organizacional'), '</small></span></div>'
  ].join('');
}

function signalCardHTML(signal) {
  const decision = getDecisionForSignal(signal.id);
  const linkedAction = getActionForSignal(signal.id);
  let actionButtons = '';

  if (signal.type === 'recognition') {
    actionButtons = decision
      ? '<button class="secondary-button" type="button" data-view-decision="' + escapeHTML(decision.id) + '">Ver decisión</button>'
      : '<button class="secondary-button" type="button" data-evaluate-signal="' + escapeHTML(signal.id) + '">Evaluar reconocimiento</button>';
  } else {
    actionButtons = linkedAction
      ? '<button class="secondary-button" type="button" data-view-action="' + escapeHTML(linkedAction.id) + '">Ver acción</button>'
      : '<button class="secondary-button" type="button" data-create-action="' + escapeHTML(signal.id) + '">Crear acción</button>';
  }

  const signalClass = signal.type === 'amplification' ? 'amplification' : signal.type === 'attention' ? 'attention' : 'recognition';
  const opportunityCopy = signal.type === 'recognition'
    ? signal.suggestedDecision
    : signal.opportunity;

  return [
    '<article class="signal-card ', signalClass, '">',
    '<div class="signal-topline"><span class="mini-label">',
    escapeHTML(signal.type === 'recognition' ? 'Contribución para reconocer' : signal.type === 'amplification' ? 'Contribución para amplificar' : 'Atención cultural'),
    '</span><span class="strength-badge strength-', slugify(signal.evidenceStrength), '">', escapeHTML(signal.evidenceStrength), '</span></div>',
    signalSubjectHTML(signal),
    '<h3>', escapeHTML(signal.title), '</h3>',
    '<p class="signal-description">', escapeHTML(signal.description), '</p>',
    evidenceMetricsHTML(signal),
    '<p class="signal-reading">', escapeHTML(signal.reading), '</p>',
    opportunityCopy ? '<div class="catalog-preview"><strong>' + escapeHTML(signal.type === 'recognition' ? 'Lectura para decidir' : 'Oportunidad') + '</strong><span>' + escapeHTML(opportunityCopy) + '</span></div>' : '',
    '<div class="signal-actions"><button class="link-button" type="button" data-open-signal="', escapeHTML(signal.id), '">Ver evidencia</button>',
    actionButtons,
    '</div></article>'
  ].join('');
}

function signalMatchesReportContext(signal) {
  const map = {
    atlas: 'ctx-atlas',
    horizonte: 'ctx-horizonte',
    delta: 'ctx-delta',
    genia: 'ctx-genia',
    team: 'ctx-company'
  };
  const selected = map[dom.reportContext.value];
  if (!selected) return true;
  return Array.isArray(signal.contextIds) && signal.contextIds.includes(selected);
}

function renderSignals() {
  const explainers = {
    recognition: {
      title: '¿Quién está generando aportes cuya evidencia amerita evaluar una valoración adicional?',
      detail: 'Recurrencia, diversidad de voces, transversalidad e impacto ayudan a detectar la señal. La decisión sigue siendo humana.'
    },
    amplification: {
      title: '¿Qué estamos viendo que valdría la pena multiplicar en IMR?',
      detail: 'La práctica puede convertirse en aprendizaje organizacional sin convertir a la persona reconocida en dueña obligatoria de más trabajo.'
    },
    attention: {
      title: '¿Qué condiciones culturales conviene comprender o corregir?',
      detail: 'Cobertura, concentración, liderazgo y transversalidad pueden generar acciones; no generan recompensas.'
    }
  };
  const explainer = explainers[activeSignalFilter];
  dom.signalExplainer.innerHTML = '<strong>' + escapeHTML(explainer.title) + '</strong><p>' + escapeHTML(explainer.detail) + '</p>';

  const visible = signals
    .filter(function (signal) { return signal.type === activeSignalFilter && signalMatchesReportContext(signal); })
    .sort(sortNewest);
  dom.signalList.innerHTML = visible.length
    ? visible.map(signalCardHTML).join('')
    : '<div class="empty-state" style="grid-column:1/-1"><span aria-hidden="true">○</span><h3>No hay señales en este alcance</h3><p>Probá con otro contexto o tipo de señal.</p></div>';
}

function statusClass(status) {
  return 'status-' + slugify(status).replace('en-', '');
}

function isRecognitionActivated(decision) {
  return ['Aprobado', 'Programado', 'Entregado'].includes(decision.status);
}

function renderRecognitionSummary() {
  const evaluationCount = recognitionDecisions.filter(function (item) { return item.status === 'En evaluación'; }).length;
  const approvedCount = recognitionDecisions.filter(function (item) { return ['Aprobado', 'Programado'].includes(item.status); }).length;
  const deliveredCount = recognitionDecisions.filter(function (item) { return item.status === 'Entregado'; }).length;
  const economicValue = recognitionDecisions.reduce(function (total, item) {
    const reward = getReward(item.rewardId);
    return total + (reward && reward.monetary && item.status !== 'Descartado' ? Number(item.amount || 0) : 0);
  }, 0);
  const cards = [
    { title: 'En evaluación', value: String(evaluationCount), note: 'requieren criterio y contexto' },
    { title: 'Aprobados / programados', value: String(approvedCount), note: 'tienen una valoración definida' },
    { title: 'Entregados', value: String(deliveredCount), note: 'permanecen en el historial' }
  ];
  if (economicValue > 0) {
    cards.push({ title: 'Valor económico simulado', value: formatMoney(economicValue), note: 'sin transacciones reales · POC' });
  }
  dom.recognitionSummary.innerHTML = cards.map(function (card) {
    return [
      '<article class="summary-card"><span>', escapeHTML(card.title), '</span><strong>',
      escapeHTML(card.value), '</strong><small>', escapeHTML(card.note), '</small></article>'
    ].join('');
  }).join('');
}

function recognitionCardHTML(decision) {
  const subject = getSubject(decision.recipientType, decision.recipientId) || {
    name: 'Destinatario de demo',
    initials: '—',
    area: 'Datos simulados'
  };
  const signal = getSignal(decision.signalId);
  const reward = getReward(decision.rewardId);
  const canDeliver = ['Aprobado', 'Programado'].includes(decision.status);
  const amountCopy = reward && reward.monetary && decision.amount
    ? '<span><b>Valor simulado:</b> ' + escapeHTML(formatMoney(decision.amount)) + '</span>'
    : '';

  return [
    '<article class="record-card">',
    '<div class="record-person">', subjectAvatar(subject), '<span><strong>', escapeHTML(subject.name),
    '</strong><small>', escapeHTML(subject.area || ''), '</small></span></div>',
    '<div class="record-title"><span class="record-family">', escapeHTML(reward ? reward.family : 'Sin activar'),
    '</span><strong>', escapeHTML(reward ? reward.name : 'No activar reconocimiento'), '</strong><small>',
    escapeHTML(signal ? signal.title : 'Decisión administrativa'), '</small></div>',
    '<div class="record-meta"><span class="status-badge ', statusClass(decision.status), '">', escapeHTML(decision.status),
    '</span><span><b>Responsable:</b> ', escapeHTML(decision.owner || 'Sin asignar'), '</span><span><b>Fecha objetivo:</b> ',
    escapeHTML(decision.targetDate ? formatDate(decision.targetDate, false) : 'No definida'), '</span>', amountCopy, '</div>',
    '<div class="record-actions">',
    canDeliver ? '<button class="secondary-button" type="button" data-deliver-recognition="' + escapeHTML(decision.id) + '">Marcar como entregado</button>' : '',
    '<button class="link-button" type="button" data-view-decision="', escapeHTML(decision.id), '">Ver detalle</button>',
    '</div></article>'
  ].join('');
}

function renderRecognitions() {
  renderRecognitionSummary();
  const visible = recognitionDecisions
    .filter(function (decision) {
      return activeRecognitionFilter === 'Todos' || decision.status === activeRecognitionFilter;
    })
    .sort(sortNewest);
  dom.recognitionList.innerHTML = visible.map(recognitionCardHTML).join('');
  dom.recognitionEmpty.hidden = visible.length > 0;
}

function isActionOverdue(action) {
  if (!action.targetDate || ['Completada', 'Descartada'].includes(action.status)) return false;
  return action.targetDate < todayISO();
}

function renderActionSummary() {
  const activeCount = actions.filter(function (item) { return ['Pendiente', 'En análisis', 'En curso'].includes(item.status); }).length;
  const overdueCount = actions.filter(isActionOverdue).length;
  const completeCount = actions.filter(function (item) { return item.status === 'Completada'; }).length;
  const cards = [
    { title: 'Acciones activas', value: String(activeCount), note: 'pendientes, en análisis o en curso' },
    { title: 'Vencidas', value: String(overdueCount), note: 'requieren revisión de fecha o alcance' },
    { title: 'Completadas', value: String(completeCount), note: 'conservan resultado e historial' }
  ];
  dom.actionSummary.innerHTML = cards.map(function (card) {
    return [
      '<article class="summary-card"><span>', escapeHTML(card.title), '</span><strong>',
      escapeHTML(card.value), '</strong><small>', escapeHTML(card.note), '</small></article>'
    ].join('');
  }).join('');
}

function actionCardHTML(action) {
  const sourceSignal = action.sourceType === 'signal' ? getSignal(action.sourceId) : null;
  const related = action.relatedSubject ? getSubject(action.relatedSubject.type, action.relatedSubject.id) : null;
  const overdue = isActionOverdue(action);
  return [
    '<article class="record-card ', overdue ? 'is-overdue' : '', '">',
    '<div class="record-person">', subjectAvatar(related || { initials: 'IMR' }), '<span><strong>',
    escapeHTML(related ? related.name : 'IMR'), '</strong><small>',
    escapeHTML(sourceSignal ? 'Originada en una señal' : 'Acción creada manualmente'), '</small></span></div>',
    '<div class="record-title"><strong>', escapeHTML(action.title), '</strong><small>',
    escapeHTML(action.description), '</small></div>',
    '<div class="record-meta"><span class="status-badge ', statusClass(action.status), '">', escapeHTML(action.status),
    '</span><span><b>Responsable:</b> ', escapeHTML(action.owner || 'Sin asignar'), '</span><span><b>Fecha objetivo:</b> ',
    escapeHTML(action.targetDate ? formatDate(action.targetDate, false) : 'No definida'),
    overdue ? ' · Vencida' : '', '</span></div>',
    '<div class="record-actions"><button class="secondary-button" type="button" data-view-action="',
    escapeHTML(action.id), '">Actualizar</button></div>',
    '</article>'
  ].join('');
}

function actionMatchesFilter(action) {
  if (activeActionFilter === 'Todas') return true;
  if (activeActionFilter === 'Activas') return ['Pendiente', 'En análisis', 'En curso'].includes(action.status);
  if (activeActionFilter === 'Vencidas') return isActionOverdue(action);
  if (activeActionFilter === 'Completadas') return action.status === 'Completada';
  if (activeActionFilter === 'Descartadas') return action.status === 'Descartada';
  return true;
}

function renderActions() {
  renderActionSummary();
  const visible = actions.filter(actionMatchesFilter).sort(sortNewest);
  dom.actionList.innerHTML = visible.map(actionCardHTML).join('');
  dom.actionEmpty.hidden = visible.length > 0;
}

function showAdminTab(tabName, shouldScroll) {
  activeAdminTab = ['panorama', 'signals', 'recognitions', 'actions'].includes(tabName) ? tabName : 'panorama';
  dom.reportToolbar.hidden = ['recognitions', 'actions'].includes(activeAdminTab);
  dom.adminTabs.forEach(function (button) {
    const isActive = button.dataset.adminTab === activeAdminTab;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
  dom.adminPanels.forEach(function (panel) {
    panel.hidden = panel.id !== 'admin-panel-' + activeAdminTab;
  });

  if (activeAdminTab === 'panorama') renderPanorama();
  if (activeAdminTab === 'signals') renderSignals();
  if (activeAdminTab === 'recognitions') renderRecognitions();
  if (activeAdminTab === 'actions') renderActions();

  if (shouldScroll) {
    dom.adminTabs.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderAdmin() {
  renderPanorama();
  renderSignals();
  renderRecognitions();
  renderActions();
  showAdminTab(activeAdminTab);
}

function renderAll() {
  renderWall();
  renderMyKudos();
  renderAdmin();
}

function openModal(eyebrow, title, bodyHTML, onReady) {
  lastFocusedElement = document.activeElement;
  dom.modalEyebrow.textContent = eyebrow || '';
  dom.modalTitle.textContent = title || '';
  dom.modalBody.innerHTML = bodyHTML;
  dom.modalBackdrop.hidden = false;
  document.body.classList.add('modal-open');
  Array.from(dom.modal.querySelectorAll('[data-modal-close]')).forEach(function (button) {
    button.addEventListener('click', closeModal);
  });
  if (typeof onReady === 'function') onReady();
  window.setTimeout(function () {
    const firstControl = dom.modal.querySelector('button:not([disabled]), select:not([disabled]), input:not([disabled]), textarea:not([disabled])');
    (firstControl || dom.modal).focus();
  }, 0);
}

function closeModal() {
  dom.modalBackdrop.hidden = true;
  dom.modalBody.innerHTML = '';
  document.body.classList.remove('modal-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
  lastFocusedElement = null;
}

function subjectBannerHTML(type, id) {
  const subject = getSubject(type, id) || {
    name: 'Sujeto de demo',
    initials: 'IMR',
    area: 'Datos simulados'
  };
  return [
    '<div class="subject-banner">', subjectAvatar(subject), '<span><strong>', escapeHTML(subject.name),
    '</strong><small>', escapeHTML(subject.area || ''), '</small></span></div>'
  ].join('');
}

function supportingKudosHTML(signal) {
  const supported = (signal.supportingKudoIds || [])
    .map(function (id) { return kudos.find(function (kudo) { return kudo.id === id; }); })
    .filter(Boolean)
    .slice(0, 7);
  if (!supported.length) {
    return '<div class="warning-callout">Esta señal usa un dataset resumido para reportes. En un MVP, cada indicador debería permitir volver a la evidencia de origen.</div>';
  }
  return '<div class="supporting-kudos">' + supported.map(function (kudo) {
    const sender = getPerson(kudo.senderId) || { name: 'Persona de demo' };
    const contextItem = getContext(kudo.contextId) || { name: 'Sin contexto' };
    return [
      '<article class="supporting-kudo"><p>', escapeHTML(kudo.message), '</p><span>',
      escapeHTML(sender.name), ' · ', escapeHTML(contextItem.name), ' · ', escapeHTML(formatDate(kudo.createdAt, false)),
      kudo.visibility === 'private' ? ' · Privado' : '', '</span></article>'
    ].join('');
  }).join('') + '</div>';
}

function openSignalDetails(signalId) {
  const signal = getSignal(signalId);
  if (!signal) return;
  const decision = getDecisionForSignal(signal.id);
  const linkedAction = getActionForSignal(signal.id);
  const contextsCopy = (signal.contextIds || []).map(getContext).filter(Boolean).map(function (item) { return item.name; }).join(' · ');
  let primaryAction = '';
  if (signal.type === 'recognition') {
    primaryAction = decision
      ? '<button class="primary-button" type="button" id="modal-view-decision">Ver decisión registrada</button>'
      : '<button class="primary-button" type="button" id="modal-evaluate-signal">Evaluar reconocimiento</button>';
  } else {
    primaryAction = linkedAction
      ? '<button class="primary-button" type="button" id="modal-view-action">Ver acción creada</button>'
      : '<button class="primary-button" type="button" id="modal-create-action">Crear acción</button>';
  }

  const body = [
    subjectBannerHTML(signal.subjectType, signal.subjectId),
    '<section class="modal-section"><h3>', escapeHTML(signal.title), '</h3><p>', escapeHTML(signal.description), '</p>',
    evidenceMetricsHTML(signal, 'modal-evidence'),
    '<div class="catalog-preview"><strong>Lectura</strong><span>', escapeHTML(signal.reading), '</span></div></section>',
    '<section class="modal-section"><h3>Contextos observados</h3><p>', escapeHTML(contextsCopy || 'Alcance organizacional'), '</p></section>',
    '<section class="modal-section"><h3>Kudos que sustentan la señal</h3>', supportingKudosHTML(signal), '</section>',
    '<div class="privacy-callout">Uso administrativo · La fuerza de evidencia, las decisiones y los datos privados no se publican en el Muro.</div>',
    '<div class="modal-actions"><button class="link-button" type="button" data-modal-close>Cerrar</button>', primaryAction, '</div>'
  ].join('');

  openModal(
    signal.type === 'recognition' ? 'Contribución para reconocer' : signal.type === 'amplification' ? 'Contribución para amplificar' : 'Atención cultural',
    'Evidencia de la señal',
    body,
    function () {
      const evaluateButton = document.querySelector('#modal-evaluate-signal');
      const decisionButton = document.querySelector('#modal-view-decision');
      const createActionButton = document.querySelector('#modal-create-action');
      const viewActionButton = document.querySelector('#modal-view-action');
      if (evaluateButton) evaluateButton.addEventListener('click', function () { openDecisionFlow(signal.id); });
      if (decisionButton) decisionButton.addEventListener('click', function () { openRecognitionDetail(decision.id); });
      if (createActionButton) createActionButton.addEventListener('click', function () { openActionForm(null, signal.id); });
      if (viewActionButton) viewActionButton.addEventListener('click', function () { openActionForm(linkedAction.id); });
    }
  );
}

function rewardOptionsHTML() {
  const families = [];
  rewardCatalog.filter(function (reward) { return reward.active; }).forEach(function (reward) {
    if (!families.includes(reward.family)) families.push(reward.family);
  });
  return '<option value="">Elegí un reconocimiento del catálogo</option>' + families.map(function (family) {
    const options = rewardCatalog
      .filter(function (reward) { return reward.active && reward.family === family; })
      .map(function (reward) {
        return '<option value="' + escapeHTML(reward.id) + '">' + escapeHTML(reward.name) + '</option>';
      }).join('');
    return '<optgroup label="' + escapeHTML(family) + '">' + options + '</optgroup>';
  }).join('');
}

function openDecisionFlow(signalId) {
  const signal = getSignal(signalId);
  if (!signal) return;
  const existing = getDecisionForSignal(signal.id);
  if (existing) {
    openRecognitionDetail(existing.id);
    return;
  }

  const subject = getSubject(signal.subjectType, signal.subjectId);
  const body = [
    subjectBannerHTML(signal.subjectType, signal.subjectId),
    '<section class="modal-section"><h3>Contribución observada</h3><p>', escapeHTML(signal.title), '</p>',
    evidenceMetricsHTML(signal, 'modal-evidence'),
    '<div class="catalog-preview"><strong>Lectura administrativa</strong><span>', escapeHTML(signal.reading), '</span></div></section>',
    '<section class="modal-section"><form class="dialog-form" id="decision-form">',
    '<div><span class="form-label">Decisión</span><div class="choice-grid">',
    '<label class="radio-panel"><input type="radio" name="decision" value="activate" checked><strong>Activar reconocimiento</strong><small>Seleccionar una valoración concreta del catálogo.</small></label>',
    '<label class="radio-panel"><input type="radio" name="decision" value="none"><strong>No activar reconocimiento</strong><small>Registrar la revisión sin invalidar los Kudos.</small></label>',
    '</div></div>',
    '<div id="activation-fields">',
    '<label>Reconocimiento del catálogo <select id="reward-select" required>', rewardOptionsHTML(), '</select></label>',
    '<div class="catalog-preview" id="reward-preview"><strong>Catálogo diverso</strong><span>Elegí una alternativa para ver su descripción.</span></div>',
    '<div id="amount-field" hidden><label>Monto o valor opcional <span class="simulated-label">Simulado</span><div class="amount-wrap"><input id="reward-amount" type="number" min="0" step="1000" inputmode="numeric" placeholder="150000"></div></label></div>',
    '<div class="warning-callout" id="opportunity-warning" hidden>Una oportunidad profesional debe ser voluntaria, acordada y contar con tiempo protegido. Buen desempeño no se premia con más trabajo.</div>',
    '<label>Justificación <textarea id="decision-rationale" required maxlength="500" placeholder="Explicá por qué esta respuesta es coherente con la contribución observada."></textarea></label>',
    '<div class="form-grid"><label>Responsable <input id="decision-owner" required value="Jesús Machado"></label>',
    '<label>Aprobador simulado <input id="decision-approver" required value="Equipo de Gestión (simulado)"></label></div>',
    '<div class="form-grid"><label>Fecha objetivo <input id="decision-target" type="date" required value="', escapeHTML(todayISO()), '"></label>',
    '<label>Estado inicial <select id="decision-status">', RECOGNITION_STATUSES.slice(0, 3).map(function (status) {
      return '<option value="' + escapeHTML(status) + '">' + escapeHTML(status) + '</option>';
    }).join(''), '</select></label></div>',
    '<label>Comentarios <textarea id="decision-notes" maxlength="500" placeholder="Condiciones, próximos pasos o acuerdos de la POC."></textarea></label>',
    '</div>',
    '<div id="no-activation-fields" hidden><label>Motivo opcional <textarea id="no-recognition-reason" maxlength="500" placeholder="Por ejemplo: evidencia todavía inicial; continuar observando."></textarea></label></div>',
    '<div class="privacy-callout">La decisión queda en la consola administrativa. No se publica en el Muro ni se ejecuta ningún pago real.</div>',
    '<div class="modal-actions"><button class="link-button" type="button" data-modal-close>Cancelar</button><button class="primary-button" type="submit">Registrar decisión</button></div>',
    '</form></section>'
  ].join('');

  openModal('Decisión humana', 'Evaluar reconocimiento', body, function () {
    const form = document.querySelector('#decision-form');
    const activationFields = document.querySelector('#activation-fields');
    const noActivationFields = document.querySelector('#no-activation-fields');
    const rewardSelect = document.querySelector('#reward-select');
    const rewardPreview = document.querySelector('#reward-preview');
    const amountField = document.querySelector('#amount-field');
    const opportunityWarning = document.querySelector('#opportunity-warning');
    const rationale = document.querySelector('#decision-rationale');

    function syncDecisionChoice() {
      const choice = new FormData(form).get('decision');
      const activating = choice === 'activate';
      activationFields.hidden = !activating;
      noActivationFields.hidden = activating;
      rewardSelect.required = activating;
      rationale.required = activating;
    }

    function syncReward() {
      const reward = getReward(rewardSelect.value);
      if (!reward) {
        rewardPreview.innerHTML = '<strong>Catálogo diverso</strong><span>Elegí una alternativa para ver su descripción.</span>';
        amountField.hidden = true;
        opportunityWarning.hidden = true;
        return;
      }
      rewardPreview.innerHTML = '<strong>' + escapeHTML(reward.family + ' · ' + reward.name) + '</strong><span>' + escapeHTML(reward.description) + '</span>';
      amountField.hidden = !reward.monetary;
      opportunityWarning.hidden = reward.family !== 'Oportunidad profesional';
    }

    Array.from(form.querySelectorAll('input[name="decision"]')).forEach(function (radio) {
      radio.addEventListener('change', syncDecisionChoice);
    });
    rewardSelect.addEventListener('change', syncReward);
    syncDecisionChoice();
    syncReward();

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const choice = new FormData(form).get('decision');
      if (choice === 'none') {
        const reason = document.querySelector('#no-recognition-reason').value.trim();
        recognitionDecisions.unshift({
          id: uid('rec'),
          signalId: signal.id,
          recipientType: signal.subjectType,
          recipientId: signal.subjectId,
          rewardId: null,
          rationale: reason || 'No activar reconocimiento en esta instancia.',
          amount: null,
          owner: 'Jesús Machado',
          approver: 'Equipo de Gestión (simulado)',
          targetDate: '',
          status: 'Descartado',
          deliveredAt: null,
          notes: reason,
          outcome: 'Señal revisada sin activar valoración adicional.',
          createdAt: new Date().toISOString()
        });
        persistRecognitions();
        closeModal();
        renderAdmin();
        showToast('Decisión registrada', 'La señal seguirá visible como evidencia; no se activó un reconocimiento.');
        return;
      }

      if (!form.reportValidity()) return;
      const reward = getReward(rewardSelect.value);
      if (!reward || !subject) return;
      const status = document.querySelector('#decision-status').value;
      recognitionDecisions.unshift({
        id: uid('rec'),
        signalId: signal.id,
        recipientType: signal.subjectType,
        recipientId: signal.subjectId,
        rewardId: reward.id,
        rationale: rationale.value.trim(),
        amount: reward.monetary ? Number(document.querySelector('#reward-amount').value || 0) : null,
        owner: document.querySelector('#decision-owner').value.trim(),
        approver: document.querySelector('#decision-approver').value.trim(),
        targetDate: document.querySelector('#decision-target').value,
        status: status,
        deliveredAt: null,
        notes: document.querySelector('#decision-notes').value.trim(),
        outcome: '',
        createdAt: new Date().toISOString()
      });
      persistRecognitions();
      closeModal();
      renderAdmin();
      showToast(
        status === 'En evaluación' ? 'Señal enviada a evaluación' : 'Reconocimiento activado',
        reward.name + ' quedó registrado para ' + subject.name + '.'
      );
    });
  });
}

function recognitionDetailsHTML(decision) {
  const signal = getSignal(decision.signalId);
  const reward = getReward(decision.rewardId);
  const monetary = reward && reward.monetary && decision.amount;
  return [
    subjectBannerHTML(decision.recipientType, decision.recipientId),
    '<section class="modal-section"><h3>Aporte reconocido</h3><p>',
    escapeHTML(signal ? signal.title : 'Decisión administrativa registrada'), '</p></section>',
    '<section class="modal-section"><h3>Valoración definida</h3>',
    '<div class="catalog-preview"><strong>', escapeHTML(reward ? reward.family + ' · ' + reward.name : 'No activar reconocimiento'),
    '</strong><span>', escapeHTML(reward ? reward.description : 'La evidencia fue revisada y no derivó en una valoración adicional.'), '</span></div>',
    monetary ? '<p><span class="simulated-label">Simulado</span> <strong>' + escapeHTML(formatMoney(decision.amount)) + '</strong></p>' : '',
    '</section>',
    '<section class="modal-section"><div class="detail-grid">',
    '<div class="detail-item"><span>Estado</span><strong>', escapeHTML(decision.status), '</strong></div>',
    '<div class="detail-item"><span>Responsable</span><strong>', escapeHTML(decision.owner || 'Sin asignar'), '</strong></div>',
    '<div class="detail-item"><span>Aprobador</span><strong>', escapeHTML(decision.approver || 'No definido'), '</strong></div>',
    '<div class="detail-item"><span>Fecha objetivo</span><strong>', escapeHTML(decision.targetDate ? formatDate(decision.targetDate, false) : 'No definida'), '</strong></div>',
    '<div class="detail-item"><span>Fecha de entrega</span><strong>', escapeHTML(decision.deliveredAt ? formatDate(decision.deliveredAt, false) : 'Pendiente'), '</strong></div>',
    '<div class="detail-item"><span>ID</span><strong>', escapeHTML(decision.id), '</strong></div>',
    '</div></section>',
    '<section class="modal-section"><h3>Justificación</h3><p>', escapeHTML(decision.rationale || 'Sin detalle'), '</p>',
    decision.notes ? '<div class="catalog-preview"><strong>Comentarios</strong><span>' + escapeHTML(decision.notes) + '</span></div>' : '',
    decision.outcome ? '<div class="catalog-preview"><strong>Resultado</strong><span>' + escapeHTML(decision.outcome) + '</span></div>' : '',
    '</section>'
  ].join('');
}

function openRecognitionDetail(decisionId) {
  const decision = recognitionDecisions.find(function (item) { return item.id === decisionId; });
  if (!decision) return;
  const reward = getReward(decision.rewardId);
  const canDeliver = reward && ['Aprobado', 'Programado'].includes(decision.status);
  const statusOptions = reward
    ? RECOGNITION_STATUSES
    : ['Descartado'];
  const body = [
    recognitionDetailsHTML(decision),
    '<section class="modal-section"><form class="dialog-form" id="recognition-status-form">',
    '<label>Actualizar estado <select id="recognition-status">', statusOptions.map(function (status) {
      return '<option value="' + escapeHTML(status) + '"' + (status === decision.status ? ' selected' : '') + '>' + escapeHTML(status) + '</option>';
    }).join(''), '</select></label>',
    '<div class="modal-actions"><button class="link-button" type="button" data-modal-close>Cerrar</button>',
    '<button class="secondary-button" type="submit">Guardar estado</button>',
    canDeliver ? '<button class="primary-button" type="button" id="detail-deliver">Marcar como entregado</button>' : '',
    '</div></form></section>',
    '<div class="privacy-callout">Información administrativa y simulada. No se muestra en el Muro.</div>'
  ].join('');

  openModal('Reconocimiento administrativo', reward ? reward.name : 'Decisión registrada', body, function () {
    const form = document.querySelector('#recognition-status-form');
    const deliverButton = document.querySelector('#detail-deliver');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const nextStatus = document.querySelector('#recognition-status').value;
      if (nextStatus === 'Entregado' && decision.status !== 'Entregado') {
        openDeliveryFlow(decision.id);
        return;
      }
      decision.status = nextStatus;
      persistRecognitions();
      closeModal();
      renderAdmin();
      showToast('Reconocimiento actualizado', 'El estado ahora es ' + nextStatus.toLowerCase() + '.');
    });
    if (deliverButton) {
      deliverButton.addEventListener('click', function () { openDeliveryFlow(decision.id); });
    }
  });
}

function openDeliveryFlow(decisionId) {
  const decision = recognitionDecisions.find(function (item) { return item.id === decisionId; });
  if (!decision) return;
  const reward = getReward(decision.rewardId);
  const body = [
    recognitionDetailsHTML(decision),
    '<section class="modal-section"><form class="dialog-form" id="delivery-form">',
    '<div class="warning-callout">Confirmar la entrega no elimina el registro. Lo mueve al historial administrativo.</div>',
    '<label>Fecha de entrega <input id="delivery-date" type="date" required value="', escapeHTML(todayISO()), '"></label>',
    '<label>Resultado <input id="delivery-outcome" required maxlength="250" value="Entregado según lo acordado"></label>',
    '<label>Comentario <textarea id="delivery-comment" maxlength="500" placeholder="Ajustes, aceptación o detalle útil para la trazabilidad."></textarea></label>',
    '<div class="modal-actions"><button class="link-button" type="button" data-modal-close>Cancelar</button><button class="primary-button" type="submit">Confirmar entrega</button></div>',
    '</form></section>'
  ].join('');

  openModal('Confirmar entrega', reward ? reward.name : 'Reconocimiento', body, function () {
    document.querySelector('#delivery-form').addEventListener('submit', function (event) {
      event.preventDefault();
      if (!event.currentTarget.reportValidity()) return;
      const date = document.querySelector('#delivery-date').value;
      const comment = document.querySelector('#delivery-comment').value.trim();
      decision.status = 'Entregado';
      decision.deliveredAt = date + 'T12:00:00Z';
      decision.outcome = document.querySelector('#delivery-outcome').value.trim();
      if (comment) decision.notes = decision.notes ? decision.notes + ' · ' + comment : comment;
      persistRecognitions();
      closeModal();
      renderAdmin();
      showToast('Reconocimiento marcado como entregado', 'La entrega quedó registrada y permanece en el historial.');
    });
  });
}

function addDaysISO(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}

function relatedSubjectOptionsHTML(selectedValue) {
  const peopleOptions = people
    .filter(function (person) { return person.active; })
    .map(function (person) {
      const value = 'person:' + person.id;
      return '<option value="' + escapeHTML(value) + '"' + (value === selectedValue ? ' selected' : '') + '>' + escapeHTML(person.name) + '</option>';
    }).join('');
  const teamOptions = teams
    .filter(function (team) { return team.active; })
    .map(function (team) {
      const value = 'team:' + team.id;
      return '<option value="' + escapeHTML(value) + '"' + (value === selectedValue ? ' selected' : '') + '>' + escapeHTML(team.name) + '</option>';
    }).join('');
  const contextOptions = contexts
    .filter(function (contextItem) { return contextItem.active; })
    .map(function (contextItem) {
      const value = 'context:' + contextItem.id;
      return '<option value="' + escapeHTML(value) + '"' + (value === selectedValue ? ' selected' : '') + '>' + escapeHTML(contextItem.name) + '</option>';
    }).join('');
  return [
    '<option value="">Sin persona o equipo asociado</option>',
    '<optgroup label="Personas">', peopleOptions, '</optgroup>',
    '<optgroup label="Equipos">', teamOptions, '</optgroup>',
    '<optgroup label="Contextos">', contextOptions, '</optgroup>'
  ].join('');
}

function parseRelatedSubject(value) {
  if (!value) return null;
  const separator = value.indexOf(':');
  if (separator < 1) return null;
  const type = value.slice(0, separator);
  const id = value.slice(separator + 1);
  return getSubject(type, id) ? { type: type, id: id } : null;
}

function openActionForm(actionId, signalId) {
  const existing = actionId ? actions.find(function (item) { return item.id === actionId; }) : null;
  const sourceSignal = signalId ? getSignal(signalId) : existing && existing.sourceType === 'signal' ? getSignal(existing.sourceId) : null;
  const related = existing && existing.relatedSubject
    ? existing.relatedSubject
    : sourceSignal
      ? { type: sourceSignal.subjectType, id: sourceSignal.subjectId }
      : null;
  const relatedValue = related ? related.type + ':' + related.id : '';
  const suggestedTitle = sourceSignal && sourceSignal.suggestedActions && sourceSignal.suggestedActions.length
    ? sourceSignal.suggestedActions[0]
    : '';
  const title = existing ? existing.title : suggestedTitle;
  const description = existing
    ? existing.description
    : sourceSignal
      ? (sourceSignal.opportunity || sourceSignal.description)
      : '';
  const body = [
    sourceSignal ? '<div class="catalog-preview"><strong>Origen · ' + escapeHTML(sourceSignal.title) + '</strong><span>' + escapeHTML(sourceSignal.reading) + '</span></div>' : '<div class="catalog-preview"><strong>Origen manual</strong><span>Esta acción no queda asociada a una señal precalculada.</span></div>',
    '<section class="modal-section"><form class="dialog-form" id="action-form">',
    '<label>Título <input id="action-title" required maxlength="120" value="', escapeHTML(title || ''), '" placeholder="Acción concreta y verificable"></label>',
    '<label>Descripción <textarea id="action-description" required maxlength="600" placeholder="Qué hará IMR y para qué.">', escapeHTML(description || ''), '</textarea></label>',
    '<label>Persona, equipo o contexto relacionado <select id="action-related">', relatedSubjectOptionsHTML(relatedValue), '</select></label>',
    '<div class="form-grid"><label>Responsable <input id="action-owner" required maxlength="120" value="', escapeHTML(existing ? existing.owner : 'Cultura IMR'), '"></label>',
    '<label>Fecha objetivo <input id="action-target" type="date" required value="', escapeHTML(existing ? existing.targetDate : addDaysISO(14)), '"></label></div>',
    '<label>Estado <select id="action-status">', ACTION_STATUSES.map(function (status) {
      const selected = status === (existing ? existing.status : 'Pendiente') ? ' selected' : '';
      return '<option value="' + escapeHTML(status) + '"' + selected + '>' + escapeHTML(status) + '</option>';
    }).join(''), '</select></label>',
    '<label>Comentarios <textarea id="action-comments" maxlength="500" placeholder="Acuerdos, riesgos o próximos pasos.">', escapeHTML(existing ? existing.comments : ''), '</textarea></label>',
    '<label id="action-outcome-label">Resultado <textarea id="action-outcome" maxlength="500" placeholder="Qué cambió o qué se aprendió.">', escapeHTML(existing ? existing.outcome : ''), '</textarea></label>',
    '<div class="privacy-callout">La acción permanece en esta POC. No se envía a Planner, Teams, Humand ni Power Automate.</div>',
    '<div class="modal-actions"><button class="link-button" type="button" data-modal-close>Cancelar</button><button class="primary-button" type="submit">',
    existing ? 'Actualizar acción' : 'Crear acción', '</button></div>',
    '</form></section>'
  ].join('');

  openModal(existing ? 'Seguimiento' : 'Aprendizaje organizacional', existing ? 'Actualizar acción' : 'Crear acción', body, function () {
    const form = document.querySelector('#action-form');
    const statusSelect = document.querySelector('#action-status');
    const outcome = document.querySelector('#action-outcome');
    const outcomeLabel = document.querySelector('#action-outcome-label');

    function syncOutcome() {
      const completed = statusSelect.value === 'Completada';
      outcome.required = completed;
      outcomeLabel.firstChild.textContent = completed ? 'Resultado *' : 'Resultado';
    }

    statusSelect.addEventListener('change', syncOutcome);
    syncOutcome();

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const values = {
        title: document.querySelector('#action-title').value.trim(),
        description: document.querySelector('#action-description').value.trim(),
        relatedSubject: parseRelatedSubject(document.querySelector('#action-related').value),
        owner: document.querySelector('#action-owner').value.trim(),
        targetDate: document.querySelector('#action-target').value,
        status: statusSelect.value,
        comments: document.querySelector('#action-comments').value.trim(),
        outcome: outcome.value.trim()
      };

      if (existing) {
        Object.assign(existing, values);
      } else {
        actions.unshift({
          id: uid('action'),
          sourceType: sourceSignal ? 'signal' : 'manual',
          sourceId: sourceSignal ? sourceSignal.id : null,
          title: values.title,
          description: values.description,
          relatedSubject: values.relatedSubject,
          owner: values.owner,
          targetDate: values.targetDate,
          status: values.status,
          comments: values.comments,
          outcome: values.outcome,
          createdAt: new Date().toISOString()
        });
      }

      persistActions();
      closeModal();
      renderAdmin();
      showToast(existing ? 'Acción actualizada' : 'Acción creada', values.title + ' quedó registrada para seguimiento.');
    });
  });
}

function openResetConfirmation() {
  const body = [
    '<div class="warning-callout"><strong>Esto restaura la POC a su estado inicial.</strong><br>Se eliminarán únicamente los Kudos, reconocimientos y acciones creados o modificados en este navegador.</div>',
    '<p>No se modifica el código publicado ni ningún dato externo. Los casos simulados de Camila, Valentina, Nicolás, Martín y Sofía volverán a su versión original.</p>',
    '<div class="modal-actions"><button class="link-button" type="button" data-modal-close>Cancelar</button><button class="danger-button" id="confirm-reset" type="button">Restablecer datos</button></div>'
  ].join('');
  openModal('Acción de demo', 'Restablecer datos de demo', body, function () {
    document.querySelector('#confirm-reset').addEventListener('click', function () {
      localStorage.removeItem(STORAGE_KEYS.kudos);
      localStorage.removeItem(STORAGE_KEYS.recognitions);
      localStorage.removeItem(STORAGE_KEYS.actions);
      localStorage.removeItem(STORAGE_KEYS.state);
      customKudos = [];
      kudos = deepClone(initialKudos);
      recognitionDecisions = deepClone(initialRecognitionDecisions);
      actions = deepClone(initialActions);
      persistRecognitions();
      persistActions();
      activeWallCategory = 'Todos';
      activeWallContext = 'all';
      activeRecognitionFilter = 'Todos';
      activeActionFilter = 'Todas';
      activeSignalFilter = 'recognition';
      dom.reportPeriod.value = '90';
      dom.reportContext.value = 'all';
      dom.wallCategoryButtons.forEach(function (button) {
        const selected = button.dataset.wallCategory === 'Todos';
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      dom.signalFilterButtons.forEach(function (button) {
        const selected = button.dataset.signalFilter === 'recognition';
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      dom.recognitionFilterButtons.forEach(function (button) {
        const selected = button.dataset.recognitionFilter === 'Todos';
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      dom.actionFilterButtons.forEach(function (button) {
        const selected = button.dataset.actionFilter === 'Todas';
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      closeModal();
      renderAll();
      showAdminTab('panorama');
      showToast('Datos de demo restablecidos', 'La POC volvió a su estado inicial.');
    });
  });
}

function setFieldValidity(fieldGroupId, control, valid) {
  const group = document.querySelector('#' + fieldGroupId);
  group.classList.toggle('has-error', !valid);
  control.setAttribute('aria-invalid', String(!valid));
}

function resetKudoForm() {
  dom.form.reset();
  renderContextOptions('');
  dom.charCount.textContent = '0 / 320';
  dom.visibilityCopy.textContent = 'Visible para toda IMR';
  ['recipient-field', 'context-field', 'message-field'].forEach(function (id) {
    document.querySelector('#' + id).classList.remove('has-error');
  });
  [dom.recipient, dom.context, dom.message].forEach(function (control) {
    control.removeAttribute('aria-invalid');
  });
}

function handleKudoSubmit(event) {
  event.preventDefault();
  const recipientSelection = parseRecipientValue(dom.recipient.value);
  const contextItem = getContext(dom.context.value);
  const messageText = dom.message.value.trim();
  const recipientValid = Boolean(recipientSelection);
  const contextValid = Boolean(contextItem && recipientSelection && (recipientSelection.subject.contexts || []).includes(contextItem.id));
  const messageValid = messageText.length >= 20 && messageText.length <= 320;

  setFieldValidity('recipient-field', dom.recipient, recipientValid);
  setFieldValidity('context-field', dom.context, contextValid);
  setFieldValidity('message-field', dom.message, messageValid);
  if (!recipientValid || !contextValid || !messageValid) {
    if (!recipientValid) dom.recipient.focus();
    else if (!contextValid) dom.context.focus();
    else dom.message.focus();
    return;
  }

  const category = new FormData(dom.form).get('category');
  const newKudo = {
    id: uid('kudo'),
    recipientType: recipientSelection.type,
    recipientId: recipientSelection.id,
    senderId: CURRENT_USER_ID,
    category: category,
    contextId: contextItem.id,
    message: messageText,
    visibility: dom.publicToggle.checked ? 'public' : 'private',
    createdAt: new Date().toISOString()
  };
  customKudos.unshift(newKudo);
  kudos = customKudos.concat(deepClone(initialKudos));
  persistKudos();
  const isPublic = newKudo.visibility === 'public';
  resetKudoForm();
  if (isPublic) {
    showView('muro');
  } else {
    showView('mios');
    showMyView('sent');
  }
  showToast(
    'Reconocimiento enviado',
    isPublic ? 'El Kudo ya forma parte del Muro.' : 'Quedó privado para el destinatario y los administradores.'
  );
}

function focusComposer() {
  showView('muro');
  window.setTimeout(function () {
    document.querySelector('#reconocer').scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(function () { dom.recipient.focus(); }, 350);
  }, 80);
}

function activateFilter(buttons, clicked, attributeName) {
  buttons.forEach(function (button) {
    const isActive = button === clicked;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  return clicked.getAttribute(attributeName);
}

function enableArrowNavigation(buttons, callback) {
  buttons.forEach(function (button, index) {
    button.addEventListener('keydown', function (event) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = buttons.length - 1;
      buttons[nextIndex].focus();
      callback(buttons[nextIndex]);
    });
  });
}

dom.navControls.forEach(function (control) {
  control.addEventListener('click', function (event) {
    if (control.tagName === 'A') event.preventDefault();
    showView(control.dataset.nav);
  });
});

dom.headerRecognize.addEventListener('click', focusComposer);
dom.form.addEventListener('submit', handleKudoSubmit);

dom.recipient.addEventListener('change', function () {
  renderContextOptions(dom.recipient.value);
  setFieldValidity('recipient-field', dom.recipient, Boolean(parseRecipientValue(dom.recipient.value)));
  document.querySelector('#context-field').classList.remove('has-error');
  dom.context.removeAttribute('aria-invalid');
});

dom.context.addEventListener('change', function () {
  setFieldValidity('context-field', dom.context, Boolean(getContext(dom.context.value)));
});

dom.message.addEventListener('input', function () {
  dom.charCount.textContent = dom.message.value.length + ' / 320';
  if (dom.message.value.trim().length >= 20) setFieldValidity('message-field', dom.message, true);
});

dom.publicToggle.addEventListener('change', function () {
  dom.visibilityCopy.textContent = dom.publicToggle.checked
    ? 'Visible para toda IMR'
    : 'Solo destinatario y administradores';
});

dom.wallCategoryButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    activeWallCategory = activateFilter(dom.wallCategoryButtons, button, 'data-wall-category');
    renderWall();
  });
});

dom.wallContextFilter.addEventListener('change', function () {
  activeWallContext = dom.wallContextFilter.value;
  renderWall();
});

dom.myTabs.forEach(function (button) {
  button.addEventListener('click', function () { showMyView(button.dataset.myView); });
});
enableArrowNavigation(dom.myTabs, function (button) { showMyView(button.dataset.myView); });

dom.adminTabs.forEach(function (button) {
  button.addEventListener('click', function () { showAdminTab(button.dataset.adminTab, true); });
});
enableArrowNavigation(dom.adminTabs, function (button) { showAdminTab(button.dataset.adminTab, true); });

dom.reportPeriod.addEventListener('change', function () {
  renderPanorama();
  showToast('Período actualizado', 'La consola ahora muestra ' + dom.reportPeriod.options[dom.reportPeriod.selectedIndex].text.toLowerCase() + '.');
});

dom.reportContext.addEventListener('change', function () {
  renderPanorama();
  renderSignals();
  showToast('Contexto actualizado', 'Las señales y métricas reflejan el alcance seleccionado.');
});

dom.signalFilterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    activeSignalFilter = activateFilter(dom.signalFilterButtons, button, 'data-signal-filter');
    renderSignals();
  });
});

dom.signalList.addEventListener('click', function (event) {
  const openButton = event.target.closest('[data-open-signal]');
  const evaluateButton = event.target.closest('[data-evaluate-signal]');
  const createActionButton = event.target.closest('[data-create-action]');
  const decisionButton = event.target.closest('[data-view-decision]');
  const actionButton = event.target.closest('[data-view-action]');
  if (openButton) openSignalDetails(openButton.dataset.openSignal);
  if (evaluateButton) openDecisionFlow(evaluateButton.dataset.evaluateSignal);
  if (createActionButton) openActionForm(null, createActionButton.dataset.createAction);
  if (decisionButton) openRecognitionDetail(decisionButton.dataset.viewDecision);
  if (actionButton) openActionForm(actionButton.dataset.viewAction);
});

dom.recognitionFilterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    activeRecognitionFilter = activateFilter(dom.recognitionFilterButtons, button, 'data-recognition-filter');
    renderRecognitions();
  });
});

dom.recognitionList.addEventListener('click', function (event) {
  const detailButton = event.target.closest('[data-view-decision]');
  const deliverButton = event.target.closest('[data-deliver-recognition]');
  if (detailButton) openRecognitionDetail(detailButton.dataset.viewDecision);
  if (deliverButton) openDeliveryFlow(deliverButton.dataset.deliverRecognition);
});

dom.actionFilterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    activeActionFilter = activateFilter(dom.actionFilterButtons, button, 'data-action-filter');
    renderActions();
  });
});

dom.actionList.addEventListener('click', function (event) {
  const button = event.target.closest('[data-view-action]');
  if (button) openActionForm(button.dataset.viewAction);
});

dom.newAction.addEventListener('click', function () { openActionForm(); });
dom.resetDemo.addEventListener('click', openResetConfirmation);
dom.toastClose.addEventListener('click', function () {
  window.clearTimeout(toastTimer);
  dom.toast.classList.remove('is-visible');
});

dom.modalBackdrop.addEventListener('click', function (event) {
  if (event.target === dom.modalBackdrop) closeModal();
});

document.addEventListener('keydown', function (event) {
  if (dom.modalBackdrop.hidden) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
    return;
  }
  if (event.key !== 'Tab') return;
  const focusable = Array.from(dom.modal.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter(function (element) { return !element.closest('[hidden]'); });
  if (!focusable.length) {
    event.preventDefault();
    dom.modal.focus();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

renderRecipientOptions();
renderContextOptions('');
renderAll();
showMyView('received');
showAdminTab('panorama');

const initialHash = window.location.hash.replace('#', '');
showView(['muro', 'mios', 'reportes'].includes(initialHash) ? initialHash : 'muro', false);
