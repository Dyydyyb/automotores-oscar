/**
 * Automotores Os-Car — Controlador de Ficha Técnica Completa de Vehículo
 * Carga dinámica desde VEHICLES_DATA basada en el parámetro URL (?id=...)
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initVehicleDetailPage();
});

function initVehicleDetailPage() {
  if (typeof VEHICLES_DATA === 'undefined' || !VEHICLES_DATA.length) {
    console.error('VEHICLES_DATA no encontrado');
    return;
  }

  // Parse ID from URL query param ?id=... or default to first
  const urlParams = new URLSearchParams(window.location.search);
  let vehicleId = urlParams.get('id');

  let vehicle = VEHICLES_DATA.find(v => v.id === vehicleId);
  if (!vehicle) {
    vehicle = VEHICLES_DATA[0]; // Default to Honda HR-V
  }

  // Update Page Title
  document.title = `${vehicle.name} (${vehicle.condition.toUpperCase()}) | Automotores Os-Car Florencio Varela`;

  // Breadcrumbs
  const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = vehicle.name;

  // Badges
  const badgeCondition = document.getElementById('vehicleBadgeCondition');
  if (badgeCondition) {
    const is0km = vehicle.condition === '0km';
    badgeCondition.textContent = is0km ? '0km' : `Usado • ${vehicle.year}`;
    badgeCondition.className = `badge-v-condition ${is0km ? 'badge-v-0km' : 'badge-v-usado'}`;
  }

  const badgeCategory = document.getElementById('vehicleBadgeCategory');
  if (badgeCategory) {
    badgeCategory.textContent = vehicle.category === 'camionetas' ? 'Camioneta / SUV' : 'Auto / Sedán';
  }

  // Title & Subtitle
  const mainTitle = document.getElementById('vehicleMainTitle');
  if (mainTitle) mainTitle.textContent = vehicle.name;

  const subTitle = document.getElementById('vehicleSubTitle');
  if (subTitle) {
    subTitle.textContent = `${vehicle.brand} • Año ${vehicle.year} • ${vehicle.condition.toUpperCase()} • Disponible en Salón de Ventas Florencio Varela`;
  }

  // Main Image
  const mainImg = document.getElementById('vehicleMainImg');
  if (mainImg) {
    mainImg.src = vehicle.image;
    mainImg.alt = `${vehicle.name} en exhibición en Automotores Os-Car`;
  }

  // Price & Sidebar Values
  const sidebarPrice = document.getElementById('sidebarPriceVal');
  if (sidebarPrice) sidebarPrice.textContent = vehicle.price;

  // Overview Specs Grid
  const specYear = document.getElementById('overviewYear');
  if (specYear) specYear.textContent = vehicle.year;

  const specKm = document.getElementById('overviewKm');
  if (specKm) specKm.textContent = vehicle.km;

  const specEngine = document.getElementById('overviewEngine');
  if (specEngine) specEngine.textContent = vehicle.engine;

  const specTrans = document.getElementById('overviewTrans');
  if (specTrans) specTrans.textContent = vehicle.transmission;

  const specFuel = document.getElementById('overviewFuel');
  if (specFuel) specFuel.textContent = vehicle.fuel;

  const specTraction = document.getElementById('overviewTraction');
  if (specTraction) specTraction.textContent = vehicle.traction || 'Delantera';

  // Description
  const descText = document.getElementById('vehicleDescText');
  if (descText) descText.textContent = vehicle.description;

  // More Info / Financing note
  const financeNote = document.getElementById('vehicleFinanceNote');
  if (financeNote && vehicle.moreInfo) {
    financeNote.textContent = vehicle.moreInfo;
  }

  // Render Full Technical Sheet (Equipamiento)
  renderEquipmentSheet(vehicle);

  // Configure CTAs (WhatsApp, Tel, Share)
  setupActionButtons(vehicle);

  // Render Related Vehicles
  renderRelatedVehicles(vehicle);
}

function renderEquipmentSheet(vehicle) {
  const container = document.getElementById('equipmentCategoriesContainer');
  if (!container) return;

  container.innerHTML = '';

  const equip = vehicle.equipamiento;
  if (!equip) return;

  const categories = [
    { key: 'confort', title: 'Confort y Habitáculo', icon: 'confort' },
    { key: 'seguridad', title: 'Seguridad y Asistencias', icon: 'seguridad' },
    { key: 'exterior', title: 'Diseño Exterior y Carrocería', icon: 'exterior' },
    { key: 'multimedia', title: 'Audio, Multimedia y Conectividad', icon: 'multimedia' }
  ];

  categories.forEach(cat => {
    const items = equip[cat.key];
    if (!items || !items.length) return;

    const group = document.createElement('div');
    group.className = 'equip-category-group';

    let itemsHtml = items.map(item => `
      <div class="equip-item-row">
        <svg class="equip-item-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${item}</span>
      </div>
    `).join('');

    group.innerHTML = `
      <div class="equip-cat-header">
        <span>${cat.title}</span>
        <span class="equip-cat-badge">${items.length} ítems</span>
      </div>
      <div class="equip-items-grid">
        ${itemsHtml}
      </div>
    `;

    container.appendChild(group);
  });
}

function setupActionButtons(vehicle) {
  const conditionLabel = vehicle.condition === '0km' ? '0km' : `usado año ${vehicle.year}`;
  const rawMsg = `Hola Automotores Os-Car! Quisiera consultar por el vehículo en stock: *${vehicle.name}* (${conditionLabel}). ¿Tienen disponibilidad y cómo son los planes de financiación en cuotas fijas en pesos?`;
  const waUrl = `https://wa.me/5491562484394?text=${encodeURIComponent(rawMsg)}`;

  // Sidebar WA
  const sidebarWa = document.getElementById('sidebarWaBtn');
  if (sidebarWa) {
    sidebarWa.href = waUrl;
  }

  // Finance Banner WA
  const financeWa = document.getElementById('financeAlertWaBtn');
  if (financeWa) {
    financeWa.href = waUrl;
  }

  // Floating WA
  const floatingWa = document.getElementById('floatingWa');
  if (floatingWa) {
    floatingWa.href = waUrl;
  }

  // Share Button
  const shareBtn = document.getElementById('sidebarShareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: `${vehicle.name} en Automotores Os-Car`,
        text: `Mirá este ${vehicle.name} en Automotores Os-Car Florencio Varela:`,
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          // User cancelled or unsupported, fallback to copy
        }
      }

      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('¡Enlace copiado al portapapeles!');
      } catch (e) {
        showToast('Enlace listo para compartir');
      }
    });
  }
}

function renderRelatedVehicles(currentVehicle) {
  const relatedGrid = document.getElementById('relatedVehiclesGrid');
  if (!relatedGrid) return;

  relatedGrid.innerHTML = '';

  const others = VEHICLES_DATA.filter(v => v.id !== currentVehicle.id).slice(0, 3);

  others.forEach(v => {
    const is0km = v.condition === '0km';
    const card = document.createElement('article');
    card.className = 'vehicle-card';
    card.innerHTML = `
      <div class="vehicle-photo-wrap" style="cursor: pointer;" onclick="window.location.href='vehiculo.html?id=${v.id}'">
        <img src="${v.image}" alt="${v.name}" class="vehicle-card-img" loading="lazy">
        <div class="card-badges-top">
          <span class="badge-condition ${is0km ? 'c-0km' : 'c-usado'}">${is0km ? '0km' : `Usado • ${v.year}`}</span>
        </div>
      </div>
      <div class="vehicle-card-body">
        <div class="vehicle-card-year-brand">
          <span>${v.brand}</span>
          <span>Año ${v.year}</span>
        </div>
        <h3 class="vehicle-card-name" style="font-size:1.15rem;">
          <a href="vehiculo.html?id=${v.id}" style="color:inherit; text-decoration:none;">${v.name}</a>
        </h3>
        <div class="vehicle-card-specs">
          <div class="card-spec-item">
            <span class="card-spec-label">Kilometraje</span>
            <span class="card-spec-value">${v.km}</span>
          </div>
          <div class="card-spec-item">
            <span class="card-spec-label">Combustible</span>
            <span class="card-spec-value">${v.fuel}</span>
          </div>
        </div>
        <div class="vehicle-card-footer" style="padding-top:12px;">
          <div class="vehicle-card-price-block">
            <span class="card-price-title">Precio</span>
            <span class="card-price-value" style="font-size:1.15rem;">${v.price}</span>
          </div>
          <a href="vehiculo.html?id=${v.id}" class="btn-card-detail" style="text-decoration:none;">
            <span>Ver Ficha</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </div>
      </div>
    `;

    relatedGrid.appendChild(card);
  });
}

function showToast(message) {
  let toast = document.getElementById('shareToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'shareToast';
    toast.className = 'share-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function initHeader() {
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target === navLinks) {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}
