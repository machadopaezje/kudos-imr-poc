const directory = {
  'team-imr': {
    name: 'Equipo IMR', initials: 'IMR', area: 'Toda la compañía',
    contexts: ['Equipo IMR', 'Cultura y colaboración interna', 'Trabajo transversal']
  },
  'team-management': {
    name: 'Equipo de Gestión', initials: 'EG', area: 'LDR · MGR · PTR',
    contexts: ['Gestión transversal', 'Liderazgo y acompañamiento', 'Equipo IMR']
  },
  'p-valentina': {
    name: 'Valentina Ríos', initials: 'VR', area: 'Planificación',
    contexts: ['Proyecto Atlas', 'Proyecto Horizonte', 'Entre proyectos']
  },
  'p-nicolas': {
    name: 'Nicolás Paz', initials: 'NP', area: 'Integridad',
    contexts: ['Proyecto Horizonte', 'Proyecto Delta', 'Entre proyectos']
  },
  'p-camila': {
    name: 'Camila Silva', initials: 'CS', area: 'Datos y tecnología',
    contexts: ['GenIA', 'Proyecto Atlas', 'Comunidad interna']
  },
  'p-martin': {
    name: 'Martín Acosta', initials: 'MA', area: 'Confiabilidad',
    contexts: ['Proyecto Horizonte', 'Proyecto Delta', 'Equipo IMR']
  },
  'p-sofia': {
    name: 'Sofía Luna', initials: 'SL', area: 'Administración',
    contexts: ['Iniciativas internas', 'Equipo IMR']
  }
};

const initialKudos = [
  {
    id: 'k1', recipient: 'Valentina Ríos', initials: 'VR', area: 'Planificación',
    sender: 'Mariana Pérez', senderInitials: 'MP', category: 'Hacer que pase',
    context: 'Proyecto Atlas',
    message: 'Cuando cambió la prioridad del cliente, reordenaste el plan y nos ayudaste a llegar con una respuesta clara. Gracias por sostener el foco sin perder de vista al equipo.',
    time: 'Hoy, 09:42', isPublic: true, mine: false
  },
  {
    id: 'k2', recipient: 'Nicolás Paz', initials: 'NP', area: 'Integridad',
    sender: 'Jesús Machado', senderInitials: 'JM', category: 'Dar una mano',
    context: 'Entre proyectos',
    message: 'Te sumaste a revisar la propuesta aunque no era parte de tu proyecto. Tus preguntas nos hicieron ver un riesgo que se nos estaba escapando.',
    time: 'Ayer, 17:18', isPublic: true, mine: true
  },
  {
    id: 'k3', recipient: 'Camila Silva', initials: 'CS', area: 'Datos y tecnología',
    sender: 'Diego Herrera', senderInitials: 'DH', category: 'Compartir lo que sé',
    context: 'GenIA',
    message: 'Explicaste el nuevo tablero con paciencia y usando ejemplos del trabajo real. Lograste que pudiéramos usarlo sin depender de vos para cada paso.',
    time: '28 ago, 14:06', isPublic: true, mine: false
  },
  {
    id: 'k4', recipient: 'Martín Acosta', initials: 'MA', area: 'Confiabilidad',
    sender: 'Sofía Luna', senderInitials: 'SL', category: 'Cuidar el vínculo',
    context: 'Proyecto Horizonte',
    message: 'Notaste que veníamos muy cargados y abriste el espacio para ordenar expectativas antes de seguir. Ese gesto hizo más fácil una conversación que necesitábamos tener.',
    time: '27 ago, 11:35', isPublic: true, mine: false
  },
  {
    id: 'k5', recipient: 'Equipo de Gestión', initials: 'EG', area: 'LDR · MGR · PTR',
    sender: 'Equipo GenIA', senderInitials: 'GI', category: 'Dar una mano',
    context: 'Liderazgo y acompañamiento',
    message: 'Gracias por abrir el espacio para discutir los aprendizajes del piloto y convertirlos en decisiones concretas para el próximo ciclo.',
    time: '26 ago, 16:10', isPublic: true, mine: false
  }
];

const categorySymbols = {
  'Dar una mano': '↗',
  'Hacer que pase': '✓',
  'Compartir lo que sé': '◎',
  'Cuidar el vínculo': '◇'
};

const reportProfiles = {
  all: { coverage: '76%', coverageNote: '73 de 96 personas reconocidas', cross: '41%', concentration: '18%', peer: '64%', scope: 'Vista consolidada · 128 kudos analizados' },
  atlas: { coverage: '82%', coverageNote: '18 de 22 personas reconocidas', cross: '48%', concentration: '15%', peer: '68%', scope: 'Proyecto Atlas · 31 kudos analizados' },
  horizonte: { coverage: '64%', coverageNote: '14 de 22 personas reconocidas', cross: '31%', concentration: '27%', peer: '59%', scope: 'Proyecto Horizonte · 24 kudos analizados' },
  equipo: { coverage: '47%', coverageNote: '45 de 96 personas participaron', cross: '100%', concentration: '12%', peer: '71%', scope: 'Equipo IMR · 19 kudos colectivos analizados' }
};

const form = document.querySelector('#kudo-form');
const recipient = document.querySelector('#recipient');
const context = document.querySelector('#context');
const message = document.querySelector('#message');
const charCount = document.querySelector('#char-count');
const publicToggle = document.querySelector('#is-public');
const list = document.querySelector('#kudo-list');
const emptyState = document.querySelector('#empty-state');
const filterButtons = [...document.querySelectorAll('.filter-pill')];
const navButtons = [...document.querySelectorAll('.nav-link')];
const wallTitle = document.querySelector('#wall-title');
const viewEyebrow = document.querySelector('#view-eyebrow');
const recognitionView = document.querySelector('#recognition-view');
const reportingView = document.querySelector('#reporting-view');
const toast = document.querySelector('#toast');
const toastTitle = document.querySelector('#toast-title');
const toastMessage = document.querySelector('#toast-message');

let storedKudos = [];
try {
  storedKudos = JSON.parse(localStorage.getItem('imr-kudos-demo') || '[]');
  if (!Array.isArray(storedKudos)) storedKudos = [];
} catch {
  storedKudos = [];
}

let kudos = [...storedKudos, ...initialKudos];
let activeFilter = 'Todos';
let activeView = 'muro';
let toastTimer;

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderKudos() {
  const visible = kudos.filter((kudo) => {
    const matchesView = activeView === 'muro' ? kudo.isPublic : kudo.mine;
    const matchesFilter = activeFilter === 'Todos' || kudo.category === activeFilter;
    return matchesView && matchesFilter;
  });

  list.innerHTML = visible.map((kudo, index) => `
    <article class="kudo-card" data-category="${escapeHTML(kudo.category)}" style="animation-delay:${Math.min(index * 45, 180)}ms">
      <span class="avatar" aria-hidden="true">${escapeHTML(kudo.initials)}</span>
      <div class="kudo-content">
        <div class="kudo-route"><strong>${escapeHTML(kudo.recipient)}</strong><span> · ${escapeHTML(kudo.area)}</span></div>
        <p class="kudo-message">${escapeHTML(kudo.message)}</p>
        <div class="kudo-meta">
          <span class="category-tag">${categorySymbols[kudo.category] || '•'} ${escapeHTML(kudo.category)}</span>
          <span class="context-tag">${escapeHTML(kudo.context)}</span>
          ${!kudo.isPublic ? '<span class="private-badge">Solo para el destinatario</span>' : ''}
          <span class="sent-by"><i class="sent-by-avatar" aria-hidden="true">${escapeHTML(kudo.senderInitials)}</i> ${escapeHTML(kudo.sender)}</span>
        </div>
      </div>
      <time class="kudo-time">${escapeHTML(kudo.time)}</time>
    </article>
  `).join('');

  emptyState.hidden = visible.length > 0;
}

function setFilter(filter) {
  activeFilter = filter;
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  renderKudos();
}

function showToast(title, detail) {
  clearTimeout(toastTimer);
  toastTitle.textContent = title;
  toastMessage.textContent = detail;
  toast.classList.add('is-visible');
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4200);
}

function showView(view) {
  activeView = view;
  const isReporting = view === 'reportes';
  recognitionView.hidden = isReporting;
  reportingView.hidden = !isReporting;
  navButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.view === view));

  if (!isReporting) {
    if (view === 'mios') {
      wallTitle.textContent = 'Reconocimientos que enviaste';
      viewEyebrow.textContent = 'Tu historia con otros';
    } else {
      wallTitle.textContent = 'Lo que estamos valorando';
      viewEyebrow.textContent = 'Historias, no rankings';
    }
    setFilter('Todos');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

filterButtons.forEach((button) => button.addEventListener('click', () => setFilter(button.dataset.filter)));
navButtons.forEach((button) => button.addEventListener('click', () => showView(button.dataset.view)));

message.addEventListener('input', () => {
  charCount.textContent = `${message.value.length} / 320`;
  message.closest('.field-group').classList.remove('has-error');
});

recipient.addEventListener('change', () => {
  recipient.closest('.field-group').classList.remove('has-error');
  context.closest('.field-group').classList.remove('has-error');
  const entry = directory[recipient.value];

  if (!entry) {
    context.innerHTML = '<option value="">Primero elegí una persona o equipo</option>';
    context.disabled = true;
    return;
  }

  context.innerHTML = '<option value="">Elegí el proyecto o contexto</option>' + entry.contexts
    .map((item) => `<option value="${escapeHTML(item)}">${escapeHTML(item)}</option>`)
    .join('');
  context.disabled = false;
});

context.addEventListener('change', () => context.closest('.field-group').classList.remove('has-error'));

document.querySelector('#toast-close').addEventListener('click', () => {
  clearTimeout(toastTimer);
  toast.classList.remove('is-visible');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const recipientValid = Boolean(directory[recipient.value]);
  const contextValid = Boolean(context.value);
  const messageValid = message.value.trim().length >= 20;

  recipient.closest('.field-group').classList.toggle('has-error', !recipientValid);
  context.closest('.field-group').classList.toggle('has-error', !contextValid);
  message.closest('.field-group').classList.toggle('has-error', !messageValid);

  if (!recipientValid || !contextValid || !messageValid) {
    (recipientValid ? (contextValid ? message : context) : recipient).focus();
    return;
  }

  const selected = directory[recipient.value];
  const category = new FormData(form).get('category');
  const now = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
  const newKudo = {
    id: `user-${Date.now()}`,
    recipient: selected.name,
    initials: selected.initials,
    area: selected.area,
    sender: 'Jesús Machado',
    senderInitials: 'JM',
    category,
    context: context.value,
    message: message.value.trim(),
    time: `Hoy, ${now}`,
    isPublic: publicToggle.checked,
    mine: true
  };

  kudos.unshift(newKudo);
  storedKudos.unshift(newKudo);
  localStorage.setItem('imr-kudos-demo', JSON.stringify(storedKudos));
  showView(newKudo.isPublic ? 'muro' : 'mios');
  showToast('Reconocimiento enviado', newKudo.isPublic ? 'Tu tarjeta ya es parte del muro.' : 'La recibirá solamente el destinatario.');

  form.reset();
  document.querySelector('input[name="category"][value="Dar una mano"]').checked = true;
  context.innerHTML = '<option value="">Primero elegí una persona o equipo</option>';
  context.disabled = true;
  publicToggle.checked = true;
  charCount.textContent = '0 / 320';

  if (window.innerWidth <= 820) {
    document.querySelector('.wall').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

document.querySelector('#mobile-compose').addEventListener('click', () => {
  document.querySelector('#reconocer').scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => recipient.focus(), 420);
});

document.querySelector('#report-context').addEventListener('change', (event) => {
  const profile = reportProfiles[event.target.value] || reportProfiles.all;
  document.querySelector('#metric-coverage').textContent = profile.coverage;
  document.querySelector('#metric-coverage-note').textContent = profile.coverageNote;
  document.querySelector('#metric-cross').textContent = profile.cross;
  document.querySelector('#metric-concentration').textContent = profile.concentration;
  document.querySelector('#metric-peer').textContent = profile.peer;
  document.querySelector('#report-scope').textContent = profile.scope;
});

document.querySelector('#report-period').addEventListener('change', (event) => {
  showToast('Período actualizado', `La consola ahora muestra: ${event.target.value.toLowerCase()}.`);
});

document.querySelectorAll('.action-button').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.add('is-created');
    button.textContent = 'Acción creada';
    button.disabled = true;
    showToast('Acción creada', `${button.dataset.action} quedó registrada para seguimiento.`);
  });
});

setFilter('Todos');
