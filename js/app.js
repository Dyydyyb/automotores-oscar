/**
 * Automotores Os-Car — Florencio Varela, Buenos Aires
 * Frontend Application Controller
 * Manejo de Catálogo desacoplado, Filtros, Modal de Ficha Técnica,
 * Buscador Rápido, Asistente Wizard, Contadores y Animaciones.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHeroSlider();
  initCatalog();
  initQuickSearch();
  initVehicleModal();
  initStatsCounters();
  initWizard();
  initContactForm();
  initScrollReveals();
});

/* ==========================================================================
   1. Header & Mobile Navigation
   ========================================================================== */
function initHeader() {
  const header = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  // Sticky header background transition
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu on backdrop click
    navLinks.addEventListener('click', (e) => {
      if (e.target === navLinks) {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu on Escape key
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

/* ==========================================================================
   1b. Hero Image Slider (Autoplay + Arrows + Dots + Touch)
   ========================================================================== */
function initHeroSlider() {
  const slider    = document.getElementById('heroSlider');
  if (!slider) return;

  const slides    = slider.querySelectorAll('.hero-slide');
  const dots      = slider.querySelectorAll('.slider-dot');
  const prevBtn   = document.getElementById('sliderPrev');
  const nextBtn   = document.getElementById('sliderNext');

  let current     = 0;
  let autoplayTimer = null;
  const INTERVAL  = 3000; // ms between slides (faster, dynamic autoplay)

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (idx + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goTo(current - 1);
      startAutoplay(); // restart timer after manual interaction
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goTo(current + 1);
      startAutoplay();
    });
  }

  // Dot buttons
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goTo(idx);
      startAutoplay();
    });
  });

  // Touch / swipe support
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) goTo(current + 1);
      else goTo(current - 1);
      startAutoplay();
    }
  }, { passive: true });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Keyboard navigation
  slider.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); startAutoplay(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAutoplay(); }
  });

  // Init
  startAutoplay();
}

/* ==========================================================================
   2. Catálogo de Vehículos (Renderizado & Filtros)
   ========================================================================== */
let activeCategory = 'todos';

function initCatalog() {
  updateCategoryCounts();
  renderVehicles(VEHICLES_DATA);

  // Tab buttons click listener
  const filterTabs = document.querySelectorAll('.tab-filter-btn');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category || 'todos';
      setFilterCategory(category);
    });
  });

  // Expose global filter function for footer / external links
  window.filterCatalog = function(category) {
    setFilterCategory(category);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };
}

function updateCategoryCounts() {
  if (typeof VEHICLES_DATA === 'undefined') return;

  const countTodos = document.getElementById('countTodos');
  const countAutos = document.getElementById('countAutos');
  const countCamionetas = document.getElementById('countCamionetas');
  const countCamiones = document.getElementById('countCamiones');
  const countMotos = document.getElementById('countMotos');
  const countFinanciados = document.getElementById('countFinanciados');

  if (countTodos) countTodos.textContent = VEHICLES_DATA.length;
  if (countAutos) countAutos.textContent = VEHICLES_DATA.filter(v => v.category === 'autos').length;
  if (countCamionetas) countCamionetas.textContent = VEHICLES_DATA.filter(v => v.category === 'camionetas').length;
  if (countCamiones) countCamiones.textContent = VEHICLES_DATA.filter(v => v.category === 'camiones').length;
  if (countMotos) countMotos.textContent = VEHICLES_DATA.filter(v => v.category === 'motos').length;
  if (countFinanciados) countFinanciados.textContent = VEHICLES_DATA.filter(v => v.isFinanced).length;
}

function setFilterCategory(category) {
  activeCategory = category;

  // Update tabs UI
  const filterTabs = document.querySelectorAll('.tab-filter-btn');
  filterTabs.forEach(tab => {
    if (tab.dataset.category === category) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Filter items
  let filtered = VEHICLES_DATA;
  if (category === 'financiados') {
    filtered = VEHICLES_DATA.filter(v => v.isFinanced);
  } else if (category !== 'todos') {
    filtered = VEHICLES_DATA.filter(v => v.category === category);
  }

  renderVehicles(filtered);
}

function renderVehicles(vehicles) {
  const grid = document.getElementById('vehiclesGrid');
  if (!grid) return;

  grid.innerHTML = '';

  if (!vehicles || vehicles.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty-state">
        <h3 class="catalog-empty-title">No se encontraron unidades disponibles</h3>
        <p class="catalog-empty-desc">
          No tenemos stock publicado actualmente bajo los filtros seleccionados, pero podemos conseguir la unidad que buscás o asesorarte con ingresos próximos.
        </p>
        <div style="display:inline-flex; gap:12px; flex-wrap:wrap; justify-content:center;">
          <button type="button" class="btn-card-detail" style="background:var(--brand-red);" onclick="window.filterCatalog('todos')">
            Ver Todo el Catálogo
          </button>
          <a href="https://wa.me/5491562484394?text=Hola%20Automotores%20Os-Car%2C%20estoy%20buscando%20un%20veh%C3%ADculo%20espec%C3%ADfico%20y%20quisiera%20consultarles" target="_blank" rel="noopener noreferrer" class="btn-financing-wa">
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    `;
    return;
  }

  vehicles.forEach(vehicle => {
    const card = document.createElement('article');
    card.className = 'vehicle-card revealed active';
    card.setAttribute('data-id', vehicle.id);

    const is0km = vehicle.condition === '0km';
    const conditionBadgeClass = is0km ? 'badge-condition c-0km' : 'badge-condition c-usado';
    const conditionText = is0km ? '0km' : `Usado • ${vehicle.year}`;

    const financingBadgeHtml = vehicle.isFinanced
      ? `<span class="badge-financing">Financiación en Cuotas</span>`
      : '';

    card.innerHTML = `
      <div class="vehicle-photo-wrap" style="cursor: pointer;" title="Hacé clic para ver todos los detalles de ${vehicle.name}">
        <img 
          src="${vehicle.image}" 
          alt="${vehicle.name} en exhibición en Automotores Os-Car" 
          class="vehicle-card-img" 
          loading="lazy"
        >
        <div class="card-badges-top">
          <span class="${conditionBadgeClass}">${conditionText}</span>
          ${financingBadgeHtml}
        </div>
      </div>

      <div class="vehicle-card-body">
        <div class="vehicle-card-year-brand">
          <span>${vehicle.brand}</span>
          <span>Año ${vehicle.year}</span>
        </div>

        <h3 class="vehicle-card-name">
          <a href="vehiculo.html?id=${vehicle.id}" style="color:inherit; text-decoration:none;">${vehicle.name}</a>
        </h3>

        <div class="vehicle-card-specs">
          <div class="card-spec-item">
            <span class="card-spec-label">Kilometraje</span>
            <span class="card-spec-value">${vehicle.km}</span>
          </div>
          <div class="card-spec-item">
            <span class="card-spec-label">Motor</span>
            <span class="card-spec-value" title="${vehicle.engine}">${vehicle.engine}</span>
          </div>
          <div class="card-spec-item">
            <span class="card-spec-label">Transmisión</span>
            <span class="card-spec-value" title="${vehicle.transmission}">${vehicle.transmission.split(' ')[0]}</span>
          </div>
        </div>

        <div class="vehicle-card-footer">
          <div class="vehicle-card-price-block">
            <span class="card-price-title">Precio Estimado</span>
            <span class="card-price-value">${vehicle.price}</span>
          </div>

          <a href="vehiculo.html?id=${vehicle.id}" class="btn-card-detail" aria-label="Ver ficha técnica completa de ${vehicle.name}">
            <span>Ver Ficha</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </div>
      </div>
    `;

    // Click triggers: clicking the photo wrap enters the vehicle page
    const photoWrap = card.querySelector('.vehicle-photo-wrap');
    photoWrap?.addEventListener('click', () => {
      window.location.href = `vehiculo.html?id=${vehicle.id}`;
    });

    grid.appendChild(card);
  });
}

/* ==========================================================================
   3. Quick Search Bar en Hero
   ========================================================================== */
function initQuickSearch() {
  const searchBtn = document.getElementById('btnQuickSearch');
  const searchCategory = document.getElementById('searchCategory');
  const searchCondition = document.getElementById('searchCondition');
  const searchBrand = document.getElementById('searchBrand');

  const executeSearch = () => {
    const cat = searchCategory?.value || 'todos';
    const cond = searchCondition?.value || 'todos';
    const brand = searchBrand?.value || 'todos';

    let results = VEHICLES_DATA.filter(v => {
      let matchesCat = (cat === 'todos') || (v.category === cat);
      let matchesCond = (cond === 'todos') || 
        (cond === '0km' && v.condition === '0km') || 
        (cond === 'usado' && v.condition !== '0km');
      let matchesBrand = (brand === 'todos') || (v.brand.toLowerCase() === brand.toLowerCase());

      return matchesCat && matchesCond && matchesBrand;
    });

    // Update Tab UI if category matched
    const filterTabs = document.querySelectorAll('.tab-filter-btn');
    filterTabs.forEach(tab => {
      if (tab.dataset.category === cat) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    renderVehicles(results);

    // Smooth scroll to catalog
    const catalogSection = document.getElementById('catalogo');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  searchBtn?.addEventListener('click', executeSearch);
}

/* ==========================================================================
   4. Ficha de Detalle de Vehículo (Modal Full-Screen / Lightbox)
   ========================================================================== */
function initVehicleModal() {
  const modal = document.getElementById('vehicleModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modal) return;

  // Close handlers
  closeBtn?.addEventListener('click', closeVehicleModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeVehicleModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeVehicleModal();
    }
  });
}

function openVehicleModal(vehicleId) {
  const modal = document.getElementById('vehicleModal');
  if (!modal || typeof VEHICLES_DATA === 'undefined') return;

  const vehicle = VEHICLES_DATA.find(v => v.id === vehicleId);
  if (!vehicle) return;

  // Elements
  const modalMainImg = document.getElementById('modalMainImg');
  const modalThumbnailsRow = document.getElementById('modalThumbnailsRow');
  const modalConditionTag = document.getElementById('modalConditionTag');
  const modalVehicleTitle = document.getElementById('modalVehicleTitle');
  const modalVehiclePrice = document.getElementById('modalVehiclePrice');
  const modalFinancingText = document.getElementById('modalFinancingText');
  const modalSpecBrand = document.getElementById('modalSpecBrand');
  const modalSpecYear = document.getElementById('modalSpecYear');
  const modalSpecKm = document.getElementById('modalSpecKm');
  const modalSpecEngine = document.getElementById('modalSpecEngine');
  const modalSpecTrans = document.getElementById('modalSpecTrans');
  const modalSpecFuel = document.getElementById('modalSpecFuel');
  const modalDescriptionText = document.getElementById('modalDescriptionText');
  const modalWaBtn = document.getElementById('modalWaBtn');

  // Fill contents
  if (modalMainImg) {
    modalMainImg.src = vehicle.image;
    modalMainImg.alt = `${vehicle.name} - Automotores Os-Car`;
  }

  // Thumbnails gallery
  if (modalThumbnailsRow) {
    modalThumbnailsRow.innerHTML = '';
    const imagesList = vehicle.gallery && vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.image];

    imagesList.forEach((imgSrc, idx) => {
      const thumbBtn = document.createElement('button');
      thumbBtn.className = `modal-thumb-btn ${idx === 0 ? 'active' : ''}`;
      thumbBtn.setAttribute('type', 'button');
      thumbBtn.setAttribute('aria-label', `Ver foto ${idx + 1} de ${vehicle.name}`);
      thumbBtn.innerHTML = `<img src="${imgSrc}" alt="Miniatura ${vehicle.name}">`;

      thumbBtn.addEventListener('click', () => {
        if (modalMainImg) modalMainImg.src = imgSrc;
        modalThumbnailsRow.querySelectorAll('.modal-thumb-btn').forEach(btn => btn.classList.remove('active'));
        thumbBtn.classList.add('active');
      });

      modalThumbnailsRow.appendChild(thumbBtn);
    });
  }

  const is0km = vehicle.condition === '0km';
  if (modalConditionTag) {
    modalConditionTag.textContent = is0km
      ? `0km Oficial • Año ${vehicle.year}`
      : `Usado Seleccionado y Verificado • Año ${vehicle.year}`;
  }

  if (modalVehicleTitle) modalVehicleTitle.textContent = vehicle.name;
  if (modalVehiclePrice) modalVehiclePrice.textContent = vehicle.price;
  if (modalFinancingText) {
    modalFinancingText.textContent = vehicle.financeNote || 
      'Financiación en cuotas fijas en pesos. Presentás únicamente tu DNI. Tomamos tu vehículo usado en parte de pago llave contra llave.';
  }

  if (modalSpecBrand) modalSpecBrand.textContent = vehicle.brand;
  if (modalSpecYear) modalSpecYear.textContent = vehicle.year;
  if (modalSpecKm) modalSpecKm.textContent = vehicle.km;
  if (modalSpecEngine) modalSpecEngine.textContent = vehicle.engine;
  if (modalSpecTrans) modalSpecTrans.textContent = vehicle.transmission;
  if (modalSpecFuel) modalSpecFuel.textContent = `${vehicle.fuel} (${vehicle.traction || '4x2'})`;
  if (modalDescriptionText) modalDescriptionText.textContent = vehicle.description;

  // Custom WhatsApp message
  if (modalWaBtn) {
    const waText = `Hola Automotores Os-Car, me interesa el ${vehicle.name} ${is0km ? '0km' : vehicle.year} que vi en la web. ¿Podrían informarme sobre disponibilidad y condiciones de financiación?`;
    modalWaBtn.href = `https://wa.me/5491562484394?text=${encodeURIComponent(waText)}`;
  }

  // Open & block body scroll
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeVehicleModal() {
  const modal = document.getElementById('vehicleModal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ==========================================================================
   5. Contadores de Trayectoria Animados
   ========================================================================== */
function initStatsCounters() {
  const statsContainer = document.getElementById('statsCounters');
  if (!statsContainer) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateAllCounters();
        observer.unobserve(statsContainer);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(statsContainer);
}

function animateAllCounters() {
  const counterElements = document.querySelectorAll('.stat-number-wrap');

  counterElements.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const initialText = el.textContent || '';
    const hasPlus = initialText.includes('+');
    const hasPercent = initialText.includes('%');

    let current = 0;
    const duration = 1600; // ms
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      let formatted = Math.floor(current).toLocaleString('es-AR');
      if (hasPlus) formatted = `+${formatted}`;
      if (hasPercent) formatted = `${formatted}%`;

      el.textContent = formatted;
    }, stepTime);
  });
}

/* ==========================================================================
   6. Asistente Paso a Paso (Wizard) para Generar Leads Calificados
   ========================================================================== */
function initWizard() {
  const wizard = document.getElementById('wizard');
  if (!wizard) return;

  let currentStep = 1;
  const wizardData = {
    type: 'Auto',
    finance: 'Sí, me interesa financiar en cuotas',
    name: '',
    budget: ''
  };

  const bar = document.getElementById('wizardBar');
  const tabs = [
    document.getElementById('wizardTab1'),
    document.getElementById('wizardTab2'),
    document.getElementById('wizardTab3')
  ];
  const panes = [
    document.getElementById('wizardPane1'),
    document.getElementById('wizardPane2'),
    document.getElementById('wizardPane3')
  ];

  const btnBack = document.getElementById('btnWizardBack');
  const btnNext = document.getElementById('btnWizardNext');
  const submitGroup = document.getElementById('wizardSubmitGroup');
  const btnWa = document.getElementById('btnWizardWa');
  const btnEmail = document.getElementById('btnWizardEmail');

  const inputName = document.getElementById('wizardInputName');
  const inputBudget = document.getElementById('wizardInputBudget');
  const msgPreview = document.getElementById('wizardMessagePreview');

  // Option card selections for step 1 & step 2
  const optCards = wizard.querySelectorAll('.wizard-opt-card');
  optCards.forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      const value = card.dataset.value;

      // Unselect siblings
      const siblingCards = card.parentElement.querySelectorAll('.wizard-opt-card');
      siblingCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      if (type === 'type') {
        wizardData.type = value;
      } else if (type === 'finance') {
        wizardData.finance = value;
      }

      updateMessagePreview();
    });
  });

  // Inputs in step 3
  inputName?.addEventListener('input', (e) => {
    wizardData.name = e.target.value.trim();
    updateMessagePreview();
  });

  inputBudget?.addEventListener('input', (e) => {
    wizardData.budget = e.target.value.trim();
    updateMessagePreview();
  });

  function updateMessagePreview() {
    let greeting = 'Hola Automotores Os-Car';
    if (wizardData.name) {
      greeting += `, soy ${wizardData.name}`;
    }
    greeting += '.';

    let message = `${greeting} Estoy buscando: ${wizardData.type}. Modalidad preferida: ${wizardData.finance}.`;
    if (wizardData.budget) {
      message += ` Cuento con anticipo / presupuesto aprox: ${wizardData.budget}.`;
    }
    message += ' ¿Podrían asesorarme con las opciones disponibles en la concesionaria?';

    if (msgPreview) {
      msgPreview.textContent = `"${message}"`;
    }

    // Update WA and Email links
    if (btnWa) {
      btnWa.href = `https://wa.me/5491562484394?text=${encodeURIComponent(message)}`;
    }
    if (btnEmail) {
      const subject = wizardData.name 
        ? `Consulta de ${wizardData.name} - Automotores Os-Car` 
        : 'Consulta desde la web - Automotores Os-Car';
      btnEmail.href = `mailto:automotoresos-car@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    }
  }

  function goToStep(step) {
    if (step < 1) step = 1;
    if (step > 3) step = 3;
    currentStep = step;

    // Progress bar
    if (bar) {
      bar.style.width = `${(currentStep / 3) * 100}%`;
    }

    // Tabs
    tabs.forEach((tab, idx) => {
      if (tab) {
        if (idx + 1 === currentStep) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      }
    });

    // Panes
    panes.forEach((pane, idx) => {
      if (pane) {
        if (idx + 1 === currentStep) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      }
    });

    // Buttons visibility
    if (btnBack) {
      btnBack.style.visibility = currentStep > 1 ? 'visible' : 'hidden';
    }

    if (currentStep === 3) {
      if (btnNext) btnNext.style.display = 'none';
      if (submitGroup) submitGroup.style.display = 'flex';
      updateMessagePreview();
    } else {
      if (btnNext) btnNext.style.display = 'inline-flex';
      if (submitGroup) submitGroup.style.display = 'none';
    }
  }

  btnNext?.addEventListener('click', () => {
    goToStep(currentStep + 1);
  });

  btnBack?.addEventListener('click', () => {
    goToStep(currentStep - 1);
  });

  // Direct Tab clicks
  tabs.forEach((tab, idx) => {
    tab?.addEventListener('click', () => {
      goToStep(idx + 1);
    });
  });

  updateMessagePreview();
}

/* ==========================================================================
   7. Formulario de Contacto Directo
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactDirectForm');
  const successMsg = document.getElementById('formSuccessMessage');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName')?.value.trim() || '';
    const phone = document.getElementById('formPhone')?.value.trim() || '';
    const vehicle = document.getElementById('formVehicle')?.value || 'Consulta General';
    const notes = document.getElementById('formMessage')?.value.trim() || '';

    if (!name || !phone) {
      alert('Por favor, completá tu nombre y teléfono para que podamos comunicarnos.');
      return;
    }

    const messageText = `Hola Automotores Os-Car, mi nombre es ${name} (Tel: ${phone}). Quisiera consultar por: ${vehicle}.${notes ? ' Detalle: ' + notes : ''}`;

    if (successMsg) {
      successMsg.style.display = 'block';
      successMsg.innerHTML = `
        ¡Gracias por tu mensaje, ${name}!<br>
        Nos comunicaremos al <strong>${phone}</strong> a la brevedad.<br>
        <span style="font-size:0.85rem; font-weight:normal; margin-top:8px; display:block;">
          Si querés respuesta inmediata, también podés 
          <a href="https://wa.me/5491562484394?text=${encodeURIComponent(messageText)}" target="_blank" rel="noopener noreferrer" style="color:var(--brand-red); text-decoration:underline; font-weight:bold;">
            abrir esta consulta por WhatsApp directo
          </a>.
        </span>
      `;
    }

    form.reset();
  });
}

/* ==========================================================================
   8. Scroll Reveals (Micro-animaciones elegantes)
   ========================================================================== */
function initScrollReveals() {
  // Elements in Hero should show immediately without waiting for scroll
  const heroReveals = document.querySelectorAll('#inicio .reveal, #inicio .reveal-left, #inicio .reveal-right');
  heroReveals.forEach(el => {
    el.classList.add('revealed', 'active');
  });

  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed', 'active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    reveals.forEach(el => {
      // Check if already in viewport
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('revealed', 'active');
      } else {
        observer.observe(el);
      }
    });
  } else {
    reveals.forEach(el => el.classList.add('revealed', 'active'));
  }
}
