const initialKudos = [
  {
    id: 'k1',
    recipient: 'Valentina Ríos',
    initials: 'VR',
    area: 'Planificación',
    sender: 'Mariana Pérez',
    senderInitials: 'MP',
    category: 'Hacer que pase',
    context: 'Proyecto Delta',
    message: 'Cuando cambió la prioridad del cliente, reordenaste el plan y nos ayudaste a llegar con una respuesta clara. Gracias por sostener el foco sin perder de vista al equipo.',
    time: 'Hoy, 09:42',
    isPublic: true,
    mine: false
  },
  {
    id: 'k2',
    recipient: 'Nicolás Paz',
    initials: 'NP',
    area: 'Integridad',
    sender: 'Jesús Machado',
    senderInitials: 'JM',
    category: 'Dar una mano',
    context: 'Entre proyectos',
    message: 'Te sumaste a revisar la propuesta aunque no era parte de tu proyecto. Tus preguntas nos hicieron ver un riesgo que se nos estaba escapando.',
    time: 'Ayer, 17:18',
    isPublic: true,
    mine: true
  },
  {
    id: 'k3',
    recipient: 'Camila Silva',
    initials: 'CS',
    area: 'Datos y tecnología',
    sender: 'Diego Herrera',
    senderInitials: 'DH',
    category: 'Compartir lo que sé',
    context: 'Comunidad interna',
    message: 'Explicaste el nuevo tablero con paciencia y usando ejemplos del trabajo real. Lograste que pudiéramos usarlo sin depender de vos para cada paso.',
    time: '28 ago, 14:06',
    isPublic: true,
    mine: false
  },
  {
    id: 'k4',
    recipient: 'Martín Acosta',
    initials: 'MA',
    area: 'Confiabilidad',
    sender: 'Sofía Luna',
    senderInitials: 'SL',
    category: 'Cuidar el vínculo',
    context: 'Equipo IMR',
    message: 'Notaste que veníamos muy cargados y abriste el espacio para ordenar expectativas antes de seguir. Ese gesto hizo más fácil una conversación que necesitábamos tener.',
    time: '27 ago, 11:35',
    isPublic: true,
    mine: false
  }
];

const categorySymbols = {
  'Dar una mano': '↗',
  'Hacer que pase': '✓',
  'Compartir lo que sé': '◎',
  'Cuidar el vínculo': '◇'
};

const form = document.querySelector('#kudo-form');
const recipient = document.querySelector('#recipient');
const message = document.querySelector('#message');
const charCount = document.querySelector('#char-count');
const publicToggle = document.querySelector('#is-public');
const list = document.querySelector('#kudo-list');
const emptyState = document.querySelector('#empty-state');
const filterButtons = [...document.querySelectorAll('.filter-pill')];
const navButtons = [...document.querySelectorAll('.nav-link')];
const wallTitle = document.querySelector('#wall-title');
const viewEyebrow = document.querySelector('#view-eyebrow');
const toast = document.querySelector('#toast');
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
        <div class="kudo-route">
          <strong>${escapeHTML(kudo.recipient)}</strong>
          <span>· ${escapeHTML(kudo.area)}</span>
        </div>
        <p class="kudo-message">${escapeHTML(kudo.message)}</p>
        <div class="kudo-meta">
          <span class="category-tag">${categorySymbols[kudo.category] || '•'} ${escapeHTML(kudo.category)}</span>
          <span class="context-tag">${escapeHTML(kudo.context)}</span>
          ${!kudo.isPublic ? '<span class="private-badge">Solo para la persona</span>' : ''}
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

filterButtons.forEach((button) => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeView = button.dataset.view;
    navButtons.forEach((navButton) => navButton.classList.toggle('is-active', navButton === button));
    if (activeView === 'mios') {
      wallTitle.textContent = 'Reconocimientos que enviaste';
      viewEyebrow.textContent = 'Tu historia con otros';
    } else {
      wallTitle.textContent = 'Lo que estamos valorando';
      viewEyebrow.textContent = 'Historias, no rankings';
    }
    setFilter('Todos');
  });
});

message.addEventListener('input', () => {
  charCount.textContent = `${message.value.length} / 320`;
  message.closest('.field-group').classList.remove('has-error');
});

recipient.addEventListener('change', () => {
  recipient.closest('.field-group').classList.remove('has-error');
});

function showToast(isPublic) {
  clearTimeout(toastTimer);
  toastMessage.textContent = isPublic
    ? 'Tu tarjeta ya es parte del muro.'
    : 'La recibirá solamente la persona.';
  toast.classList.add('is-visible');
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4200);
}

document.querySelector('#toast-close').addEventListener('click', () => {
  clearTimeout(toastTimer);
  toast.classList.remove('is-visible');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const recipientValid = Boolean(recipient.value);
  const messageValid = message.value.trim().length >= 20;
  recipient.closest('.field-group').classList.toggle('has-error', !recipientValid);
  message.closest('.field-group').classList.toggle('has-error', !messageValid);

  if (!recipientValid || !messageValid) {
    (!recipientValid ? recipient : message).focus();
    return;
  }

  const [name, initials, area] = recipient.value.split('|');
  const category = new FormData(form).get('category');
  const now = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
  const newKudo = {
    id: `user-${Date.now()}`,
    recipient: name,
    initials,
    area,
    sender: 'Jesús Machado',
    senderInitials: 'JM',
    category,
    context: 'Equipo IMR',
    message: message.value.trim(),
    time: `Hoy, ${now}`,
    isPublic: publicToggle.checked,
    mine: true
  };

  kudos.unshift(newKudo);
  storedKudos.unshift(newKudo);
  localStorage.setItem('imr-kudos-demo', JSON.stringify(storedKudos));
  activeView = newKudo.isPublic ? 'muro' : 'mios';
  navButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.view === activeView));
  wallTitle.textContent = newKudo.isPublic ? 'Lo que estamos valorando' : 'Reconocimientos que enviaste';
  viewEyebrow.textContent = newKudo.isPublic ? 'Historias, no rankings' : 'Tu historia con otros';
  setFilter('Todos');
  showToast(newKudo.isPublic);
  form.reset();
  document.querySelector('input[name="category"][value="Dar una mano"]').checked = true;
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

setFilter('Todos');
