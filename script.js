// Los datos comerciales y las rutas de fotografías se mantienen en config.js.
const config = window.roma_config;
const header = document.querySelector('#site-header');
const menu_toggle = document.querySelector('.menu-toggle');
const mobile_nav = document.querySelector('#mobile-nav');

function whatsapp_url(room, phone) {
  const detail = config.rooms[room];
  const message = detail
    ? `Hola, estoy interesado(a) en reservar una habitación ${detail} en ${config.name}. ¿Podrían brindarme información sobre disponibilidad y condiciones de reserva?`
    : `Hola, estoy interesado(a) en reservar una habitación en ${config.name}. ¿Podrían brindarme información sobre disponibilidad y condiciones de reserva?`;
  return `https://wa.me/${phone.international}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  const phone = link.dataset.whatsappPhone === 'secondary' ? config.phones[1] : config.phones[0];
  link.href = whatsapp_url(link.dataset.whatsapp, phone);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

document.querySelectorAll('[data-phone]').forEach(link => {
  const phone = link.dataset.phone === 'secondary' ? config.phones[1] : config.phones[0];
  link.textContent = phone.display;
  link.href = `tel:+${phone.international}`;
});
document.querySelectorAll('[data-email]').forEach(link => {
  link.textContent = config.email;
  link.href = `mailto:${config.email}`;
});
document.querySelectorAll('[data-address]').forEach(element => element.textContent = config.address);
document.querySelectorAll('.brand-name').forEach(element => {
  const words = config.name.trim().split(/\s+/);
  const final_word = words.pop();
  const strong = document.createElement('strong');
  strong.textContent = final_word;
  element.replaceChildren(document.createTextNode(words.join(' ')), strong);
});
document.querySelector('.hero .eyebrow').firstChild.textContent = `${config.name} `;
document.querySelectorAll('[data-map]').forEach(link => {
  link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.address)}`;
});
document.querySelector('.map-panel iframe').src = `https://www.google.com/maps?q=${encodeURIComponent(config.address)}&output=embed`;
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#year').nextSibling.textContent = ` ${config.name}. Todos los derechos reservados.`;

// El logotipo solo se muestra cuando se añade el archivo oficial.
if (config.logo) {
  document.querySelectorAll('.brand').forEach(brand => {
    const image = document.createElement('img');
    image.src = config.logo;
    image.alt = '';
    image.className = 'brand-logo';
    brand.prepend(image);
  });
  document.querySelector('link[rel="icon"]').href = config.logo;
}

function close_menu() {
  menu_toggle.setAttribute('aria-expanded', 'false');
  menu_toggle.setAttribute('aria-label', 'Abrir menú');
  mobile_nav.hidden = true;
  header.classList.remove('menu-active');
  document.body.classList.remove('menu-open');
}
menu_toggle.addEventListener('click', () => {
  const open = menu_toggle.getAttribute('aria-expanded') !== 'true';
  menu_toggle.setAttribute('aria-expanded', String(open));
  menu_toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobile_nav.hidden = !open;
  header.classList.toggle('menu-active', open);
  document.body.classList.toggle('menu-open', open);
});
mobile_nav.addEventListener('click', event => {
  if (event.target.closest('a')) close_menu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobile_nav.hidden) close_menu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && !mobile_nav.hidden) close_menu();
});
function update_header() { header.classList.toggle('is-scrolled', window.scrollY > 24); }
window.addEventListener('scroll', update_header, { passive: true });
update_header();

// Las imágenes conceptuales se identifican en cada espacio y en el visor.
const gallery_items = [];
const lightbox = document.querySelector('#lightbox');
const lightbox_image = lightbox.querySelector('img');
const lightbox_caption = lightbox.querySelector('figcaption');
let gallery_index = 0;
let previous_focus = null;

function show_photo(index) {
  gallery_index = (index + gallery_items.length) % gallery_items.length;
  const item = gallery_items[gallery_index];
  lightbox_image.src = item.src;
  lightbox_image.alt = item.label;
  lightbox_caption.textContent = item.conceptual ? `${item.label} · Imagen conceptual` : item.label;
}
function open_photo(index) {
  previous_focus = document.activeElement;
  show_photo(index);
  lightbox.showModal();
  lightbox.querySelector('.lightbox-close').focus();
}
document.querySelectorAll('[data-photo]').forEach(slot => {
  const key = slot.dataset.photo;
  const photo = config.photos[key];
  if (!photo) return;
  const image = new Image();
  image.className = 'photo-image';
  image.alt = photo.alt;
  image.loading = slot.closest('.hero') ? 'eager' : 'lazy';
  image.decoding = 'async';
  if (slot.closest('.hero')) image.fetchPriority = 'high';
  if (slot.classList.contains('gallery-item')) {
    gallery_items.push({ slot, src: photo.src, label: photo.alt, conceptual: photo.conceptual });
    gallery_items.sort((a, b) => a.slot.compareDocumentPosition(b.slot) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
  }
  image.onload = () => {
    slot.classList.add('has-photo');
    slot.removeAttribute('role');
    slot.removeAttribute('aria-label');
    if (photo.conceptual) {
      const note = document.createElement('span');
      note.className = 'photo-disclaimer';
      note.textContent = key === 'naturaleza' ? 'Imagen ilustrativa' : 'Imagen conceptual';
      slot.append(note);
    }
    if (slot.classList.contains('gallery-item')) {
      slot.classList.add('is-ready');
      slot.setAttribute('role', 'button');
      slot.setAttribute('aria-label', `Ampliar: ${photo.alt}`);
      slot.tabIndex = 0;
      slot.addEventListener('click', () => open_photo(gallery_items.findIndex(item => item.slot === slot)));
      slot.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          open_photo(gallery_items.findIndex(item => item.slot === slot));
        }
      });
    }
  };
  image.onerror = () => image.remove();
  slot.prepend(image);
  image.src = photo.src;
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show_photo(gallery_index - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => show_photo(gallery_index + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('close', () => { lightbox_image.removeAttribute('src'); previous_focus?.focus(); });
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') show_photo(gallery_index - 1);
  if (event.key === 'ArrowRight') show_photo(gallery_index + 1);
});

// Entrada discreta, solo cuando el visitante permite movimiento.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveal_targets = document.querySelectorAll('.intro-copy, .intro-photo, .section-top, .room-card, .services-intro, .service-grid, .gallery-grid, .tourism-feature, .tourism-grid, .location-copy, .map-panel, .closing-inner');
  const reveal_observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal_observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  reveal_targets.forEach(target => {
    target.dataset.reveal = '';
    reveal_observer.observe(target);
  });
  document.documentElement.classList.add('motion-ready');
}
