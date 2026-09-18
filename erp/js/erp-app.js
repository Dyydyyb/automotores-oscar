/**
 * Automotores Os-Car — ERP Application Controller (Enterprise Edition)
 * Controlador de Vistas, Enrutador SPA, Estado Transaccional, Command Palette (Ctrl+K)
 * Florencio Varela, Buenos Aires · 34 Años de Trayectoria
 */

class ERPApp {
  constructor() {
    this.currentView = 'dashboard';
    this.theme = localStorage.getItem('oscar_erp_theme') || 'light';
    this.activePeriod = 'mes';
    this.vehicles = [...window.ERP_DATA.vehicles];
    this.soldVehicles = [...window.ERP_DATA.soldVehicles];
    this.sales = [...window.ERP_DATA.sales];
    this.leads = [...window.ERP_DATA.leads];
    this.tradeIns = [...window.ERP_DATA.tradeIns];
    this.financeMovements = [...window.ERP_DATA.financeMovements];
    this.sellerCommissions = [...window.ERP_DATA.sellerCommissions];

    this.activeStockTab = 'todos'; // 'todos' | 'disponible' | 'reservado' | 'en_preparacion' | 'vendidos'
    this.stockFilter = {
      search: '',
      category: 'todos',
      condition: 'todos',
      status: 'todos'
    };
    this.stockViewMode = 'grid'; // 'grid' (por defecto) | 'table'
    this.selectedVehicle = null;

    this.dateRange = {
      from: '2026-09-01',
      to: '2026-09-17'
    };

    // Asegurar que los gráficos arranquen obligatoriamente en tipo DONA
    if (window.erpCharts) {
      window.erpCharts.salesType = 'dona';
      window.erpCharts.stockChartType = 'dona';
    }
  }

  init() {
    this.applyTheme(this.theme);
    this.initNavigation();
    this.initTopbarActions();
    this.initCommandPalette();
    this.initDashboard();
    this.initStockModule();
    this.initSalesModule();
    this.initFinanceModule();
    this.initCommissionsModule();
    this.initSyncEngine();
    this.initDrawer();

    // Renderizar vista inicial
    this.navigateTo('dashboard');
  }

  // =========================================================================
  // Control de Tema (Modo Claro / Modo Oscuro)
  // =========================================================================
  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('oscar_erp_theme', theme);

    const themeBtn = document.getElementById('btnThemeToggle');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }

    if (this.currentView === 'dashboard' && window.erpCharts) {
      this.refreshDashboardCharts();
    }
  }

  // =========================================================================
  // Enrutamiento SPA & Navegación Lateral
  // =========================================================================
  initNavigation() {
    const navButtons = document.querySelectorAll('.nav-item-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.dataset.view;
        if (targetView) {
          this.navigateTo(targetView);
        }
      });
    });

    const mobileMenuBtn = document.getElementById('mobileSidebarToggle');
    const sidebar = document.getElementById('erpSidebar');
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }
  }

  navigateTo(viewId) {
    this.currentView = viewId;

    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      if (btn.dataset.view === viewId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.querySelectorAll('.view-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    const targetPane = document.getElementById(`view-${viewId}`);
    if (targetPane) {
      targetPane.classList.add('active');
    }

    // Acciones específicas por vista
    if (viewId === 'dashboard') {
      setTimeout(() => {
        this.refreshDashboardCharts();
      }, 50);
    } else if (viewId === 'stock') {
      this.renderStockList();
    } else if (viewId === 'ventas') {
      this.renderSalesList();
    } else if (viewId === 'finanzas') {
      this.renderFinanceLedger();
    } else if (viewId === 'comisiones') {
      this.renderCommissionsModule();
    }

    const sidebar = document.getElementById('erpSidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');
  }

  refreshDashboardCharts() {
    if (!window.erpCharts) return;
    window.erpCharts.renderSalesChart('salesChartContainer', window.ERP_DATA);
    window.erpCharts.renderStockDonut('stockDonutContainer', 'stockDonutLegend', window.ERP_DATA);
    window.erpCharts.renderSalesRhythmChart('salesRhythmChartContainer', window.ERP_DATA, this.dateRange.from, this.dateRange.to);
  }

  // =========================================================================
  // Acciones Rápidas del Topbar
  // =========================================================================
  initTopbarActions() {
    document.getElementById('btnThemeToggle')?.addEventListener('click', () => {
      this.applyTheme(this.theme === 'light' ? 'dark' : 'light');
    });

    document.getElementById('btnQuickLead')?.addEventListener('click', () => {
      this.openModal('modalNewLead');
    });

    document.getElementById('btnQuickSale')?.addEventListener('click', () => {
      this.openModal('modalNewSale');
    });

    document.getElementById('btnQuickVehicle')?.addEventListener('click', () => {
      this.openModal('modalNewVehicle');
    });
  }

  // =========================================================================
  // Command Palette Global (Ctrl + K)
  // =========================================================================
  initCommandPalette() {
    const paletteBackdrop = document.getElementById('cmdPaletteBackdrop');
    const searchInput = document.getElementById('cmdSearchInput');

    const openPalette = () => {
      paletteBackdrop?.classList.add('open');
      searchInput?.focus();
      if (searchInput) searchInput.value = '';
      this.renderCommandResults('');
    };

    const closePalette = () => {
      paletteBackdrop?.classList.remove('open');
    };

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (paletteBackdrop?.classList.contains('open')) {
          closePalette();
        } else {
          openPalette();
        }
      }
      if (e.key === 'Escape' && paletteBackdrop?.classList.contains('open')) {
        closePalette();
      }
    });

    document.getElementById('headerSearchBar')?.addEventListener('click', openPalette);

    paletteBackdrop?.addEventListener('click', (e) => {
      if (e.target === paletteBackdrop) closePalette();
    });

    searchInput?.addEventListener('input', (e) => {
      this.renderCommandResults(e.target.value.trim().toLowerCase());
    });
  }

  renderCommandResults(query) {
    const container = document.getElementById('cmdResultsContainer');
    if (!container) return;

    let html = '';

    const matchedVehicles = this.vehicles.filter(v => 
      !query || 
      v.name.toLowerCase().includes(query) || 
      v.brand.toLowerCase().includes(query) || 
      v.patente.toLowerCase().includes(query) ||
      v.vin.toLowerCase().includes(query)
    ).slice(0, 5);

    const matchedSales = this.sales.filter(s =>
      !query ||
      s.clientName.toLowerCase().includes(query) ||
      s.clientDni.includes(query) ||
      s.id.toLowerCase().includes(query)
    ).slice(0, 3);

    if (matchedVehicles.length > 0) {
      html += `<div style="font-size:0.70rem; font-weight:800; text-transform:uppercase; color:var(--text-muted); padding:6px 12px; letter-spacing:0.8px;">Vehículos en Stock</div>`;
      matchedVehicles.forEach(v => {
        html += `
          <div class="cmd-item" onclick="window.erpApp.selectVehicleFromCmd('${v.id}')">
            <div class="cmd-item-left">
              <img src="${v.image}" style="width:36px; height:26px; border-radius:4px; object-fit:cover;">
              <div>
                <div class="cmd-item-title">${v.name} · <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--brand-red);">${v.patente}</span></div>
                <div class="cmd-item-desc">${v.condition.toUpperCase()} · ${v.year} · ${v.status.toUpperCase()}</div>
              </div>
            </div>
            <span class="erp-badge badge-0km">${this.formatCurrency(v.precioLista)}</span>
          </div>
        `;
      });
    }

    if (matchedSales.length > 0) {
      html += `<div style="font-size:0.70rem; font-weight:800; text-transform:uppercase; color:var(--text-muted); padding:10px 12px 6px 12px; letter-spacing:0.8px;">Operaciones & Ventas</div>`;
      matchedSales.forEach(s => {
        html += `
          <div class="cmd-item" onclick="window.erpApp.navigateTo('ventas')">
            <div class="cmd-item-left">
              <div style="width:32px; height:32px; border-radius:6px; background:var(--bg-subtle); display:flex; align-items:center; justify-content:center; color:var(--brand-red); font-weight:800; font-size:0.7rem;">${s.id.split('-')[1]}</div>
              <div>
                <div class="cmd-item-title">${s.clientName} (DNI ${s.clientDni})</div>
                <div class="cmd-item-desc">${s.vehicleName} · ${s.status.toUpperCase()}</div>
              </div>
            </div>
            <span style="font-family:var(--font-mono); font-weight:800; font-size:0.82rem;">${this.formatCurrency(s.montoTotal)}</span>
          </div>
        `;
      });
    }

    if (!html) {
      html = `
        <div style="text-align:center; padding:32px 16px; color:var(--text-muted);">
          <div style="font-weight:700; margin-bottom:4px;">No se encontraron resultados</div>
          <div style="font-size:0.82rem;">Intentá buscando por marca, modelo, patente o nombre del cliente.</div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  selectVehicleFromCmd(vehicleId) {
    document.getElementById('cmdPaletteBackdrop')?.classList.remove('open');
    this.navigateTo('stock');
    this.openVehicleDrawer(vehicleId);
  }

  // =========================================================================
  // MÓDULO 1: Dashboard General con Filtro Libre de Fechas y Gráficos Ampliados
  // =========================================================================
  initDashboard() {
    // Selector de Período Rápido (Día / Semana / Mes / Año)
    const periodButtons = document.querySelectorAll('.segmented-btn[data-period]');
    periodButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        periodButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activePeriod = btn.dataset.period;

        // Auto-calcular fechas para el rango
        if (this.activePeriod === 'dia') {
          this.dateRange.from = '2026-09-17';
          this.dateRange.to = '2026-09-17';
        } else if (this.activePeriod === 'semana') {
          this.dateRange.from = '2026-09-11';
          this.dateRange.to = '2026-09-17';
        } else if (this.activePeriod === 'mes') {
          this.dateRange.from = '2026-09-01';
          this.dateRange.to = '2026-09-17';
        } else if (this.activePeriod === 'ano') {
          this.dateRange.from = '2026-01-01';
          this.dateRange.to = '2026-12-31';
        }

        const fromInput = document.getElementById('dashDateFrom');
        const toInput = document.getElementById('dashDateTo');
        if (fromInput) fromInput.value = this.dateRange.from;
        if (toInput) toInput.value = this.dateRange.to;

        this.updateDashboardMetrics();
      });
    });

    // Selector Libre de Rango de Fechas
    const fromInput = document.getElementById('dashDateFrom');
    const toInput = document.getElementById('dashDateTo');
    const btnApplyDates = document.getElementById('btnApplyDateRange');

    if (fromInput) fromInput.value = this.dateRange.from;
    if (toInput) toInput.value = this.dateRange.to;

    const applyDates = () => {
      if (fromInput && toInput) {
        this.dateRange.from = fromInput.value;
        this.dateRange.to = toInput.value;
        periodButtons.forEach(b => b.classList.remove('active'));
        this.updateDashboardMetrics();
        this.showToast(`Rango de fechas aplicado: ${this.dateRange.from} al ${this.dateRange.to}`);
      }
    };

    fromInput?.addEventListener('change', applyDates);
    toInput?.addEventListener('change', applyDates);
    btnApplyDates?.addEventListener('click', applyDates);

    // Selector de Métrica de Ventas (Montos vs Cantidad)
    document.getElementById('btnMetricMontos')?.addEventListener('click', () => {
      document.getElementById('btnMetricMontos').classList.add('active');
      document.getElementById('btnMetricUnidades').classList.remove('active');
      window.erpCharts.salesMetric = 'montos';
      window.erpCharts.renderSalesChart('salesChartContainer', window.ERP_DATA);
    });

    document.getElementById('btnMetricUnidades')?.addEventListener('click', () => {
      document.getElementById('btnMetricUnidades').classList.add('active');
      document.getElementById('btnMetricMontos').classList.remove('active');
      window.erpCharts.salesMetric = 'unidades';
      window.erpCharts.renderSalesChart('salesChartContainer', window.ERP_DATA);
    });

    // Selector de Tipo de Gráfico de Ventas (DONA [default], TORTA, LÍNEA, ÁREA, BARRA)
    const salesTypeButtons = document.querySelectorAll('.chart-sales-type-btn');
    salesTypeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        salesTypeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        window.erpCharts.salesType = btn.dataset.salesType;
        window.erpCharts.renderSalesChart('salesChartContainer', window.ERP_DATA);
      });
    });

    // Selector de Tipo de Gráfico de Stock (DONA [default], TORTA, BARRA, LÍNEA)
    const stockTypeButtons = document.querySelectorAll('.chart-stock-type-btn');
    stockTypeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        stockTypeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        window.erpCharts.stockChartType = btn.dataset.stockType;
        window.erpCharts.renderStockDonut('stockDonutContainer', 'stockDonutLegend', window.ERP_DATA);
      });
    });

    // Selector de Vista de Stock (Categoría vs Condición)
    document.getElementById('btnDonutCategory')?.addEventListener('click', () => {
      document.getElementById('btnDonutCategory').classList.add('active');
      document.getElementById('btnDonutCondition').classList.remove('active');
      window.erpCharts.donutView = 'categoria';
      window.erpCharts.renderStockDonut('stockDonutContainer', 'stockDonutLegend', window.ERP_DATA);
    });

    document.getElementById('btnDonutCondition')?.addEventListener('click', () => {
      document.getElementById('btnDonutCondition').classList.add('active');
      document.getElementById('btnDonutCategory').classList.remove('active');
      window.erpCharts.donutView = 'condicion';
      window.erpCharts.renderStockDonut('stockDonutContainer', 'stockDonutLegend', window.ERP_DATA);
    });

    this.renderAgingStock();
    this.renderLeadsFunnel();
  }

  updateDashboardMetrics() {
    this.refreshDashboardCharts();
  }

  renderAgingStock() {
    const container = document.getElementById('agingStockTableBody');
    if (!container) return;

    let html = '';
    window.ERP_DATA.agingStock.forEach(item => {
      const isCritical = item.daysInStock >= 45;
      html += `
        <tr>
          <td>
            <div style="font-weight:800; color:var(--text-main);">${item.name}</div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${item.patente} · Año ${item.year}</div>
          </td>
          <td>
            <span class="days-badge ${isCritical ? 'critical' : 'warning'}">${item.daysInStock} días</span>
          </td>
          <td style="font-family:var(--font-mono); font-weight:800;">
            ${this.formatCurrency(item.price)}
          </td>
          <td>
            <button type="button" class="btn-action-quick" style="padding:4px 10px; font-size:0.75rem;" onclick="window.erpApp.triggerCommercialAction('${item.id}', '${item.actionNeeded}')">
              <span>${item.actionNeeded}</span>
            </button>
          </td>
        </tr>
      `;
    });
    container.innerHTML = html;
  }

  renderLeadsFunnel() {
    const container = document.getElementById('leadsChannelsBreakdown');
    if (!container) return;

    const { porCanal, tasaConversion } = window.ERP_DATA.leadsFunnel;
    let html = '<div style="display:flex; flex-direction:column; gap:12px;">';
    
    porCanal.forEach(c => {
      html += `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:var(--bg-subtle); border-radius:8px;">
          <span style="font-size:0.84rem; font-weight:700; color:var(--text-main);">${c.canal}</span>
          <span style="font-family:var(--font-mono); font-weight:900; color:var(--brand-red); font-size:0.92rem;">${c.consultas} leads</span>
        </div>
      `;
    });

    html += `
      <div style="margin-top:10px; padding:12px; background:var(--status-success-bg); border:1px solid var(--status-success-border); border-radius:8px; display:flex; align-items:center; justify-content:space-between;">
        <span style="font-size:0.82rem; font-weight:700; color:var(--status-success-text);">Tasa de Conversión a Ventas:</span>
        <span style="font-size:1.1rem; font-weight:900; color:var(--status-success-text); font-family:var(--font-mono);">${tasaConversion}%</span>
      </div>
    </div>`;

    container.innerHTML = html;
  }

  triggerCommercialAction(vehicleId, action) {
    const v = this.vehicles.find(item => item.id === vehicleId);
    if (!v) return;

    if (action.includes('Destacar')) {
      v.featuredWeb = true;
      this.showToast(`${v.name} marcado como Destacado en Catálogo Web`);
    } else {
      v.precioLista = Math.round(v.precioLista * 0.96);
      this.showToast(`Precio reajustado comercialmente a ${this.formatCurrency(v.precioLista)}`);
    }
    this.renderStockList();
  }

  // =========================================================================
  // MÓDULO 2: Stock de Vehículos & Pestañas de Estado (Vendidos Incluidos)
  // =========================================================================
  initStockModule() {
    const searchInput = document.getElementById('stockSearchInput');
    const catSelect = document.getElementById('stockFilterCategory');
    const condSelect = document.getElementById('stockFilterCondition');
    const statusSelect = document.getElementById('stockFilterStatus');

    searchInput?.addEventListener('input', (e) => {
      this.stockFilter.search = e.target.value.trim().toLowerCase();
      this.renderStockList();
    });

    catSelect?.addEventListener('change', (e) => {
      this.stockFilter.category = e.target.value;
      this.renderStockList();
    });

    condSelect?.addEventListener('change', (e) => {
      this.stockFilter.condition = e.target.value;
      this.renderStockList();
    });

    statusSelect?.addEventListener('change', (e) => {
      this.stockFilter.status = e.target.value;
      this.renderStockList();
    });

    // Pestañas de estado (Todos, Disponibles, Reservados, En Preparación, Vendidos)
    const tabButtons = document.querySelectorAll('.stock-tab-btn');
    tabButtons.forEach(tab => {
      tab.addEventListener('click', () => {
        tabButtons.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeStockTab = tab.dataset.tab;
        this.renderStockList();
      });
    });

    // Toggle de Vista (Tabla vs Grilla)
    document.getElementById('btnStockViewTable')?.addEventListener('click', () => {
      this.stockViewMode = 'table';
      document.getElementById('btnStockViewTable').classList.add('active');
      document.getElementById('btnStockViewGrid').classList.remove('active');
      this.renderStockList();
    });

    document.getElementById('btnStockViewGrid')?.addEventListener('click', () => {
      this.stockViewMode = 'grid';
      document.getElementById('btnStockViewGrid').classList.add('active');
      document.getElementById('btnStockViewTable').classList.remove('active');
      this.renderStockList();
    });
  }

  renderStockList() {
    const tableBody = document.getElementById('stockTableBody');
    const gridContainer = document.getElementById('stockCardsGridContainer');
    const countBadge = document.getElementById('stockFilterCountBadge');
    const isVendidosTab = this.activeStockTab === 'vendidos';

    // Si la pestaña seleccionada es "VENDIDOS"
    if (isVendidosTab) {
      const soldList = this.soldVehicles;
      if (countBadge) countBadge.textContent = `${soldList.length} unidades vendidas`;

      if (this.stockViewMode === 'table') {
        document.getElementById('stockTableViewWrap').style.display = 'block';
        if (gridContainer) gridContainer.style.display = 'none';

        let html = '';
        soldList.forEach(v => {
          html += `
            <tr style="cursor:pointer;" onclick="window.erpApp.printSaleReceipt('${v.comprobanteId}')">
              <td>
                <div class="vehicle-cell-title">
                  <img src="${v.image}" alt="${v.name}" class="vehicle-table-thumb">
                  <div>
                    <div class="vehicle-name-strong">${v.name}</div>
                    <div class="vehicle-subinfo-cell">Patente: <strong>${v.patente}</strong> · ${v.year}</div>
                  </div>
                </div>
              </td>
              <td><span class="erp-badge ${v.condition === '0km' ? 'badge-0km' : 'badge-usado'}">${v.conditionLabel}</span></td>
              <td>
                <div style="font-weight:700;">${v.clienteNombre}</div>
                <div style="font-size:0.75rem; color:var(--text-muted);">Vendedor: ${v.vendedor}</div>
              </td>
              <td>
                <div style="font-family:var(--font-mono); font-weight:900; color:var(--text-main); font-size:0.95rem;">${this.formatCurrency(v.precioVenta)}</div>
                <div style="font-size:0.72rem; color:var(--status-success-text); font-weight:700;">Ganancia: ${this.formatCurrency(v.gananciaNeta)} (${v.margenRentabilidad})</div>
              </td>
              <td><span class="erp-badge badge-status-disponible">Cerrada & Entregada</span></td>
              <td><span style="font-family:var(--font-mono); font-size:0.8rem;">${v.fechaVenta}</span></td>
              <td>
                <button type="button" class="btn-action-quick" style="padding:5px 9px;" onclick="event.stopPropagation(); window.erpApp.printSaleReceipt('${v.comprobanteId}')">
                  Recibo
                </button>
              </td>
            </tr>
          `;
        });
        tableBody.innerHTML = html;
      } else {
        // Tarjetas Grilla para Vendidos
        document.getElementById('stockTableViewWrap').style.display = 'none';
        if (gridContainer) {
          gridContainer.style.display = 'grid';
          let gridHtml = '';
          soldList.forEach(v => {
            gridHtml += `
              <div class="sold-vehicle-card" onclick="window.erpApp.printSaleReceipt('${v.comprobanteId}')">
                <div class="sold-ribbon-bar">
                  <span>Operación Cerrada · ${v.fechaVenta}</span>
                  <span>${v.comprobanteId}</span>
                </div>
                <div style="height:150px; overflow:hidden; position:relative;">
                  <img src="${v.image}" style="width:100%; height:100%; object-fit:cover;">
                  <div style="position:absolute; top:8px; left:8px;">
                    <span class="erp-badge ${v.condition === '0km' ? 'badge-0km' : 'badge-usado'}">${v.conditionLabel}</span>
                  </div>
                </div>
                <div class="sold-card-body">
                  <h4 style="font-size:0.98rem; font-weight:800; line-height:1.2;">${v.name}</h4>
                  <div style="font-size:0.78rem; color:var(--text-muted);">Adquiriente: <strong>${v.clienteNombre}</strong> (DNI ${v.clienteDni})</div>
                  <div style="font-size:0.76rem; color:var(--text-muted);">Asesor: <strong>${v.vendedor}</strong></div>

                  <div class="sold-financial-metrics">
                    <div class="sold-metric-box">
                      <span class="sold-metric-label">Precio Venta</span>
                      <span class="sold-metric-val" style="color:var(--brand-red); font-size:0.85rem;">${this.formatCurrency(v.precioVenta)}</span>
                    </div>
                    <div class="sold-metric-box">
                      <span class="sold-metric-label">Costo + Taller</span>
                      <span class="sold-metric-val" style="font-size:0.82rem;">${this.formatCurrency(v.precioCosto + v.gastosTaller)}</span>
                    </div>
                    <div class="sold-metric-box">
                      <span class="sold-metric-label">Utilidad</span>
                      <span class="sold-metric-val" style="color:var(--status-success-text); font-size:0.85rem;">${v.margenRentabilidad}</span>
                    </div>
                  </div>

                  <div style="margin-top:4px;">
                    <button type="button" class="btn-action-quick" style="width:100%; justify-content:center; padding:7px;" onclick="event.stopPropagation(); window.erpApp.printSaleReceipt('${v.comprobanteId}')">
                      Ver Comprobante Oficial
                    </button>
                  </div>
                </div>
              </div>
            `;
          });
          gridContainer.innerHTML = gridHtml;
        }
      }
      return;
    }

    // Filtrar flota activa (Disponibles, Reservados, En Preparación)
    const filtered = this.vehicles.filter(v => {
      const matchSearch = !this.stockFilter.search || 
        v.name.toLowerCase().includes(this.stockFilter.search) ||
        v.brand.toLowerCase().includes(this.stockFilter.search) ||
        v.patente.toLowerCase().includes(this.stockFilter.search) ||
        v.vin.toLowerCase().includes(this.stockFilter.search);

      const matchCat = (this.stockFilter.category === 'todos') || (v.category === this.stockFilter.category);
      const matchCond = (this.stockFilter.condition === 'todos') || (v.condition === this.stockFilter.condition);
      
      let matchTab = true;
      if (this.activeStockTab === 'disponible') matchTab = v.status === 'disponible';
      else if (this.activeStockTab === 'reservado') matchTab = v.status === 'reservado';
      else if (this.activeStockTab === 'en_preparacion') matchTab = v.status === 'en_preparacion';

      const matchStatus = (this.stockFilter.status === 'todos') || (v.status === this.stockFilter.status);

      return matchSearch && matchCat && matchCond && matchTab && matchStatus;
    });

    if (countBadge) {
      countBadge.textContent = `${filtered.length} de ${this.vehicles.length} unidades`;
    }

    // Modo Tabla
    if (this.stockViewMode === 'table') {
      document.getElementById('stockTableViewWrap').style.display = 'block';
      if (gridContainer) gridContainer.style.display = 'none';

      let html = '';
      filtered.forEach(v => {
        const is0km = v.condition === '0km';
        const condBadgeClass = is0km ? 'badge-0km' : 'badge-usado';
        const statusBadgeClass = `badge-status-${v.status}`;
        const statusText = {
          'disponible': 'Disponible',
          'reservado': 'Reservado',
          'vendido': 'Vendido',
          'en_preparacion': 'En Preparación'
        }[v.status] || v.status;

        html += `
          <tr style="cursor:pointer;" onclick="window.erpApp.openVehicleDrawer('${v.id}')">
            <td>
              <div class="vehicle-cell-title">
                <img src="${v.image}" alt="${v.name}" class="vehicle-table-thumb">
                <div>
                  <div class="vehicle-name-strong">${v.name}</div>
                  <div class="vehicle-subinfo-cell">VIN: ${v.vin} · Patente: <strong>${v.patente}</strong></div>
                </div>
              </div>
            </td>
            <td><span class="erp-badge ${condBadgeClass}">${v.conditionLabel}</span></td>
            <td>
              <div style="font-size:0.84rem; font-weight:700;">${v.categoryLabel}</div>
              <div style="font-size:0.76rem; color:var(--text-muted);">${v.year} · ${v.fuel}</div>
            </td>
            <td>
              <div style="font-family:var(--font-mono); font-weight:800; font-size:0.94rem; color:var(--text-main);">${this.formatCurrency(v.precioLista)}</div>
              <div style="font-size:0.74rem; color:var(--text-muted);">Costo: ${this.formatCurrency(v.precioCosto)}</div>
            </td>
            <td><span class="erp-badge ${statusBadgeClass}">${statusText}</span></td>
            <td>
              <div style="display:flex; align-items:center; gap:6px;">
                ${v.publishedWeb 
                  ? `<span class="erp-badge badge-web-sync">Web ON</span>` 
                  : `<span class="erp-badge" style="background:#E2E8F0; color:#64748B;">Web OFF</span>`}
                ${v.featuredWeb ? `<span class="erp-badge" style="background:var(--brand-red); color:#fff;">Destacado</span>` : ''}
              </div>
            </td>
            <td>
              <button type="button" class="btn-action-quick" style="padding:5px 8px;" onclick="event.stopPropagation(); window.erpApp.openVehicleDrawer('${v.id}')">
                Ficha
              </button>
            </td>
          </tr>
        `;
      });
      tableBody.innerHTML = html;
    } else {
      // Modo Grilla Rediseñada (High-End Luxury)
      document.getElementById('stockTableViewWrap').style.display = 'none';
      if (gridContainer) {
        gridContainer.style.display = 'grid';
        let gridHtml = '';
        filtered.forEach(v => {
          const totalGastosPrep = (v.prepExpenses || []).reduce((sum, item) => sum + item.cost, 0);
          const costoTotal = v.precioCosto + totalGastosPrep;
          const margenNeto = v.precioLista - costoTotal;
          const margenPorc = ((margenNeto / v.precioLista) * 100).toFixed(1);

          gridHtml += `
            <div class="vehicle-card-luxury" onclick="window.erpApp.openVehicleDrawer('${v.id}')">
              <div class="vehicle-card-media-box">
                <img src="${v.image}" alt="${v.name}">
                <div class="vehicle-media-badges-overlay">
                  <span class="erp-badge ${v.condition === '0km' ? 'badge-0km' : 'badge-usado'}">${v.conditionLabel}</span>
                  <span class="erp-badge badge-status-${v.status}">${v.status.toUpperCase()}</span>
                </div>
              </div>
              <div class="vehicle-card-info-content">
                <h3 class="vehicle-card-title">${v.name}</h3>
                <div class="vehicle-card-vin-patente">
                  <span>PAT: <strong>${v.patente}</strong></span>
                  <span>VIN: ${v.vin.slice(0, 10)}...</span>
                </div>

                <div class="vehicle-card-specs-matrix">
                  <div class="spec-matrix-item">
                    <span class="spec-matrix-label">Año & Modelo</span>
                    <span class="spec-matrix-val">${v.year}</span>
                  </div>
                  <div class="spec-matrix-item">
                    <span class="spec-matrix-label">Kilometraje</span>
                    <span class="spec-matrix-val">${v.km}</span>
                  </div>
                  <div class="spec-matrix-item">
                    <span class="spec-matrix-label">Motorización</span>
                    <span class="spec-matrix-val">${v.engine}</span>
                  </div>
                  <div class="spec-matrix-item">
                    <span class="spec-matrix-label">Transmisión</span>
                    <span class="spec-matrix-val">${v.transmission.slice(0, 16)}</span>
                  </div>
                </div>

                <div class="vehicle-card-price-row">
                  <div>
                    <div class="vehicle-card-price-number">${this.formatCurrency(v.precioLista)}</div>
                    <div class="vehicle-card-cost-sub">Costo: ${this.formatCurrency(costoTotal)} · Margen: <strong style="color:var(--status-success-text);">${margenPorc}%</strong></div>
                  </div>
                  <div>
                    ${v.publishedWeb ? `<span class="erp-badge badge-web-sync">Web ON</span>` : ''}
                  </div>
                </div>

                <div class="vehicle-card-actions-row">
                  <button type="button" class="btn-action-quick" style="flex:1; justify-content:center; padding:7px;" onclick="event.stopPropagation(); window.erpApp.openSimulateFromVehicle('${v.id}')">
                    Simular Cuotas
                  </button>
                  <button type="button" class="btn-action-quick btn-primary-red" style="flex:1; justify-content:center; padding:7px;" onclick="event.stopPropagation(); window.erpApp.openSaleModalWithVehicle('${v.id}')">
                    Vender
                  </button>
                </div>
              </div>
            </div>
          `;
        });
        gridContainer.innerHTML = gridHtml;
      }
    }
  }

  // =========================================================================
  // Drawer Lateral de Inspección & Libro de Costos de la Unidad
  // =========================================================================
  initDrawer() {
    const backdrop = document.getElementById('vehicleDrawerBackdrop');
    const closeBtn = document.getElementById('btnVehicleDrawerClose');

    closeBtn?.addEventListener('click', () => {
      backdrop?.classList.remove('open');
    });

    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  }

  openVehicleDrawer(vehicleId) {
    const v = this.vehicles.find(item => item.id === vehicleId);
    if (!v) return;

    this.selectedVehicle = v;
    const backdrop = document.getElementById('vehicleDrawerBackdrop');
    const titleEl = document.getElementById('drawerVehicleTitle');
    const bodyEl = document.getElementById('drawerVehicleBody');

    if (titleEl) titleEl.textContent = v.name;

    const totalGastosPrep = (v.prepExpenses || []).reduce((sum, item) => sum + item.cost, 0);
    const costoTotalReal = v.precioCosto + totalGastosPrep;
    const gananciaEstimada = v.precioLista - costoTotalReal;
    const margenRentabilidad = ((gananciaEstimada / v.precioLista) * 100).toFixed(1);

    if (bodyEl) {
      bodyEl.innerHTML = `
        <div style="position:relative; width:100%; height:220px; border-radius:12px; overflow:hidden; margin-bottom:18px; background:var(--bg-subtle);">
          <img src="${v.image}" alt="${v.name}" style="width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; bottom:12px; left:12px; display:flex; gap:6px;">
            <span class="erp-badge ${v.condition === '0km' ? 'badge-0km' : 'badge-usado'}">${v.conditionLabel}</span>
            <span class="erp-badge badge-status-${v.status}">${v.status.toUpperCase()}</span>
          </div>
        </div>

        <div class="drawer-specs-grid">
          <div class="drawer-spec-box">
            <span class="drawer-spec-label">Precio de Lista</span>
            <div class="drawer-spec-value" style="color:var(--brand-red); font-family:var(--font-mono);">${this.formatCurrency(v.precioLista)}</div>
          </div>
          <div class="drawer-spec-box">
            <span class="drawer-spec-label">Patente Oficial</span>
            <div class="drawer-spec-value" style="font-family:var(--font-mono);">${v.patente}</div>
          </div>
          <div class="drawer-spec-box">
            <span class="drawer-spec-label">Número de Motor</span>
            <div class="drawer-spec-value" style="font-family:var(--font-mono); font-size:0.8rem;">${v.numeroMotor}</div>
          </div>
          <div class="drawer-spec-box">
            <span class="drawer-spec-label">Número de Chasis (VIN)</span>
            <div class="drawer-spec-value" style="font-family:var(--font-mono); font-size:0.8rem;">${v.vin}</div>
          </div>
          <div class="drawer-spec-box">
            <span class="drawer-spec-label">Motor & Potencia</span>
            <div class="drawer-spec-value">${v.engine}</div>
          </div>
          <div class="drawer-spec-box">
            <span class="drawer-spec-label">Transmisión & Tracción</span>
            <div class="drawer-spec-value">${v.transmission} (${v.traction})</div>
          </div>
        </div>

        <div style="background:var(--bg-subtle); border:1px solid var(--border-subtle); border-radius:10px; padding:14px; margin-bottom:20px;">
          <div style="font-family:var(--font-heading); font-weight:800; font-size:0.92rem; margin-bottom:10px; display:flex; align-items:center; justify-content:space-between;">
            <span>Publicación en Catálogo Web</span>
            <span class="erp-badge badge-web-sync">Sincronización Web</span>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
            <span style="font-size:0.84rem; font-weight:600;">Visible en Landing Web:</span>
            <button type="button" class="btn-action-quick" style="padding:4px 10px;" onclick="window.erpApp.toggleVehicleWebVisibility('${v.id}')">
              ${v.publishedWeb ? 'Publicado (Desactivar)' : 'Oculto (Activar)'}
            </button>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <span style="font-size:0.84rem; font-weight:600;">Destacar en Portada:</span>
            <button type="button" class="btn-action-quick ${v.featuredWeb ? 'btn-primary-red' : ''}" style="padding:4px 10px;" onclick="window.erpApp.toggleVehicleFeatured('${v.id}')">
              ${v.featuredWeb ? 'Destacado Activo' : 'Marcar Destacado'}
            </button>
          </div>
        </div>

        <div class="prep-expenses-ledger">
          <div class="prep-ledger-title">
            <span>Gastos de Preparación y Service</span>
            <span style="font-family:var(--font-mono); color:var(--brand-red); font-size:0.95rem;">${this.formatCurrency(totalGastosPrep)}</span>
          </div>
          ${(v.prepExpenses && v.prepExpenses.length > 0) ? v.prepExpenses.map(item => `
            <div class="prep-item-row">
              <div>
                <div style="font-weight:700; color:var(--text-main);">${item.item}</div>
                <div style="font-size:0.72rem; color:var(--text-muted);">${item.date} · ${item.provider}</div>
              </div>
              <div style="font-family:var(--font-mono); font-weight:800;">${this.formatCurrency(item.cost)}</div>
            </div>
          `).join('') : '<div style="font-size:0.8rem; color:var(--text-muted); padding:6px 0;">Sin gastos adicionales registrados.</div>'}

          <div style="margin-top:14px; padding-top:12px; border-top:1.5px dashed var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-size:0.72rem; font-weight:800; text-transform:uppercase; color:var(--text-muted);">Costo Total Real:</div>
              <div style="font-family:var(--font-mono); font-weight:800; font-size:0.9rem;">${this.formatCurrency(costoTotalReal)}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:0.72rem; font-weight:800; text-transform:uppercase; color:var(--text-muted);">Margen Proyectado:</div>
              <div style="font-family:var(--font-mono); font-weight:900; font-size:1rem; color:var(--status-success-text);">${this.formatCurrency(gananciaEstimada)} (${margenRentabilidad}%)</div>
            </div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:24px;">
          <button type="button" class="btn-action-quick" style="justify-content:center; padding:10px;" onclick="window.erpApp.openSimulateFromVehicle('${v.id}')">
            Simular Financiación
          </button>
          <button type="button" class="btn-action-quick btn-primary-red" style="justify-content:center; padding:10px;" onclick="window.erpApp.openSaleModalWithVehicle('${v.id}')">
            Generar Operación de Venta
          </button>
        </div>
      `;
    }

    backdrop?.classList.add('open');
  }

  toggleVehicleWebVisibility(id) {
    const v = this.vehicles.find(item => item.id === id);
    if (!v) return;
    v.publishedWeb = !v.publishedWeb;
    this.showToast(`${v.name}: visibilidad web actualizada a ${v.publishedWeb ? 'Publicado' : 'Oculto'}`);
    this.openVehicleDrawer(id);
    this.renderStockList();
  }

  toggleVehicleFeatured(id) {
    const v = this.vehicles.find(item => item.id === id);
    if (!v) return;
    v.featuredWeb = !v.featuredWeb;
    this.showToast(`${v.name}: estado destacado en portada ${v.featuredWeb ? 'Activado' : 'Desactivado'}`);
    this.openVehicleDrawer(id);
    this.renderStockList();
  }

  // =========================================================================
  // MÓDULO 3: Ventas y Financiación
  // =========================================================================
  initSalesModule() {
    const vehiclePriceInput = document.getElementById('calcVehiclePrice');
    const advanceInput = document.getElementById('calcAdvance');
    const installmentsSelect = document.getElementById('calcInstallments');
    const rateInput = document.getElementById('calcAnnualRate');

    const updateCalculator = () => {
      const price = parseFloat(vehiclePriceInput?.value) || 0;
      const advance = parseFloat(advanceInput?.value) || 0;
      const installments = parseInt(installmentsSelect?.value, 10) || 24;
      const annualRate = parseFloat(rateInput?.value) || 40;

      const capitalToFinance = Math.max(0, price - advance);
      const interestRate = (annualRate / 100) * (installments / 12);
      const totalFinanced = capitalToFinance * (1 + interestRate);
      const monthlyPayment = installments > 0 ? (totalFinanced / installments) : 0;

      const resultEl = document.getElementById('calcResultMonthly');
      const capitalEl = document.getElementById('calcResultCapital');
      const totalRepayEl = document.getElementById('calcResultTotalRepay');

      if (resultEl) resultEl.textContent = this.formatCurrency(monthlyPayment);
      if (capitalEl) capitalEl.textContent = this.formatCurrency(capitalToFinance);
      if (totalRepayEl) totalRepayEl.textContent = this.formatCurrency(totalFinanced);
    };

    vehiclePriceInput?.addEventListener('input', updateCalculator);
    advanceInput?.addEventListener('input', updateCalculator);
    installmentsSelect?.addEventListener('change', updateCalculator);
    rateInput?.addEventListener('input', updateCalculator);

    updateCalculator();
  }

  renderSalesList() {
    const container = document.getElementById('salesTableBody');
    if (!container) return;

    let html = '';
    this.sales.forEach(s => {
      const statusClass = {
        'seña': 'badge-status-reservado',
        'en_documentacion': 'badge-status-preparacion',
        'entregada': 'badge-status-disponible',
        'cancelada': 'badge-status-vendido'
      }[s.status] || 'badge-status-disponible';

      const statusLabel = {
        'seña': 'Seña Recibida',
        'en_documentacion': 'En Gestoría',
        'entregada': 'Entregada y Cerrada',
        'cancelada': 'Cancelada'
      }[s.status] || s.status;

      html += `
        <tr>
          <td>
            <div style="font-family:var(--font-mono); font-weight:800; color:var(--brand-red);">${s.id}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${s.date}</div>
          </td>
          <td>
            <div style="font-weight:800; color:var(--text-main);">${s.clientName}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">DNI ${s.clientDni} · Tel: ${s.clientPhone}</div>
          </td>
          <td>
            <div style="font-weight:700;">${s.vehicleName}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${s.vehicleCondition}</div>
          </td>
          <td>
            <div style="font-family:var(--font-mono); font-weight:900; font-size:0.95rem;">${this.formatCurrency(s.montoTotal)}</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">
              Contado: ${this.formatCurrency(s.montoContado)} | Financiado: ${this.formatCurrency(s.montoFinanciado)}
              ${s.montoPermutaUsado > 0 ? `<br><span style="color:var(--brand-red);">Permuta: -${this.formatCurrency(s.montoPermutaUsado)}</span>` : ''}
            </div>
          </td>
          <td>
            <div style="font-size:0.82rem; font-weight:700;">${s.sellerName}</div>
            <div style="font-size:0.72rem; color:var(--status-success-text); font-family:var(--font-mono); font-weight:700;">Comisión: ${this.formatCurrency(s.comisionVendedorMonto)}</div>
          </td>
          <td>
            <span class="erp-badge ${statusClass}">${statusLabel}</span>
          </td>
          <td>
            <button type="button" class="btn-action-quick" style="padding:4px 8px;" onclick="window.erpApp.printSaleReceipt('${s.id}')">
              <span>Recibo</span>
            </button>
          </td>
        </tr>
      `;
    });

    container.innerHTML = html;
  }

  // =========================================================================
  // MÓDULO 4: Finanzas, Facturación & Registro de Movimientos
  // =========================================================================
  initFinanceModule() {
    const formMovement = document.getElementById('formNewFinanceMovement');
    formMovement?.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('movType')?.value || 'ingreso';
      const category = document.getElementById('movCategory')?.value || 'General';
      const concept = document.getElementById('movConcept')?.value || 'Movimiento sin detalle';
      const amount = parseFloat(document.getElementById('movAmount')?.value) || 0;
      const paymentMethod = document.getElementById('movPaymentMethod')?.value || 'Transferencia';

      const newMov = {
        id: `MOV-2026-${String(this.financeMovements.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        type,
        category,
        concept,
        amount,
        paymentMethod,
        receipt: `MANUAL-${Date.now().toString().slice(-4)}`,
        status: 'conciliado'
      };

      this.financeMovements.unshift(newMov);
      this.closeModal('modalNewFinanceMovement');
      this.renderFinanceLedger();
      this.showToast(`Movimiento ${type.toUpperCase()} de ${this.formatCurrency(amount)} registrado exitosamente`);
    });

    const filterButtons = document.querySelectorAll('.finance-filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderFinanceLedger(btn.dataset.filter);
      });
    });
  }

  renderFinanceLedger(filterType = 'todos') {
    const container = document.getElementById('financeTableBody');
    if (!container) return;

    let list = this.financeMovements;
    if (filterType !== 'todos') {
      list = list.filter(m => m.type === filterType);
    }

    let html = '';
    list.forEach(m => {
      const isIngreso = m.type === 'ingreso';
      html += `
        <tr>
          <td>
            <div style="font-family:var(--font-mono); font-weight:800; font-size:0.82rem;">${m.id}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${m.date}</div>
          </td>
          <td>
            <span class="finance-movement-badge ${isIngreso ? 'badge-mov-ingreso' : 'badge-mov-egreso'}">
              ${isIngreso ? '+ INGRESO' : '- EGRESO'}
            </span>
          </td>
          <td>
            <div style="font-weight:700;">${m.concept}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${m.category} · ${m.paymentMethod}</div>
          </td>
          <td>
            <span style="font-family:var(--font-mono); font-size:0.78rem; background:var(--bg-subtle); padding:2px 6px; border-radius:4px;">${m.receipt}</span>
          </td>
          <td style="text-align:right;">
            <div style="font-family:var(--font-mono); font-weight:900; font-size:0.98rem; color:${isIngreso ? 'var(--status-success-text)' : 'var(--brand-red)'};">
              ${isIngreso ? '+' : '-'}${this.formatCurrency(m.amount)}
            </div>
          </td>
          <td>
            <span class="erp-badge badge-status-disponible">Conciliado</span>
          </td>
        </tr>
      `;
    });

    container.innerHTML = html;

    if (window.erpCharts) {
      window.erpCharts.renderCashFlowChart('cashFlowChartContainer', window.ERP_DATA);
    }
  }

  // =========================================================================
  // MÓDULO 5: Comisiones de Vendedores & Liquidación Interactiva
  // =========================================================================
  initCommissionsModule() {
    const formPayout = document.getElementById('formNewCommissionPayout');
    formPayout?.addEventListener('submit', (e) => {
      e.preventDefault();
      const sellerId = document.getElementById('commSellerSelect')?.value || 'VEND-01';
      const seller = window.ERP_DATA.sellers.find(s => s.id === sellerId);
      const amount = parseFloat(document.getElementById('commAmount')?.value) || 0;
      const period = document.getElementById('commPeriod')?.value || 'Septiembre 2026';

      const newRecord = {
        id: `COM-2026-${Date.now().toString().slice(-4)}`,
        sellerId,
        sellerName: seller ? seller.name : 'Asesor',
        period,
        closedUnits: 1,
        totalVolume: amount * 25,
        commissionEarned: amount,
        paidStatus: 'pagado',
        paidAmount: amount,
        pendingAmount: 0,
        targetUnits: 5,
        targetCompletion: 100,
        policy: 'Liquidación directa aprobada por Dirección'
      };

      this.sellerCommissions.unshift(newRecord);
      this.closeModal('modalNewCommissionPayout');
      this.renderCommissionsModule();
      this.showToast(`Liquidación de ${this.formatCurrency(amount)} abonada a ${newRecord.sellerName}`);
    });
  }

  renderCommissionsModule() {
    const rankingGrid = document.getElementById('sellerRankingGrid');
    const tableBody = document.getElementById('commissionSettlementsTableBody');

    // Tarjetas de rendimiento por asesor comercial
    if (rankingGrid) {
      let gridHtml = '';
      window.ERP_DATA.sellers.filter(s => s.ventasMes > 0).forEach(seller => {
        const perc = ((seller.ventasMes / seller.metaMes) * 100).toFixed(0);
        gridHtml += `
          <div class="seller-card">
            <div class="seller-card-header">
              <div class="seller-big-avatar">${seller.avatar}</div>
              <div>
                <h4 style="font-size:1.05rem; font-weight:800;">${seller.name}</h4>
                <div style="font-size:0.78rem; color:var(--text-muted);">${seller.role}</div>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.82rem;">
              <span style="color:var(--text-muted);">Meta mensual (${seller.ventasMes}/${seller.metaMes} unidades)</span>
              <span style="font-family:var(--font-mono); font-weight:800; color:var(--brand-red);">${perc}%</span>
            </div>

            <div class="target-progress-bar">
              <div class="target-progress-fill" style="width:${Math.min(100, perc)}%;"></div>
            </div>

            <div style="background:var(--bg-subtle); padding:12px; border-radius:8px; display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:8px;">
              <div>
                <span style="font-size:0.68rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Comisión Acumulada</span>
                <div style="font-family:var(--font-mono); font-weight:900; color:var(--status-success-text); font-size:0.95rem;">${this.formatCurrency(seller.comisionAcumulada)}</div>
              </div>
              <div>
                <span style="font-size:0.68rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Operaciones</span>
                <div style="font-family:var(--font-mono); font-weight:800; font-size:0.95rem;">${seller.ventasMes} ventas</div>
              </div>
            </div>

            <div style="margin-top:14px;">
              <button type="button" class="btn-action-quick" style="width:100%; justify-content:center; padding:7px;" onclick="window.erpApp.openCommissionModalFor('${seller.id}')">
                Liquidar Comisión
              </button>
            </div>
          </div>
        `;
      });
      rankingGrid.innerHTML = gridHtml;
    }

    // Tabla histórica de liquidaciones
    if (tableBody) {
      let tableHtml = '';
      this.sellerCommissions.forEach(c => {
        const isPaid = c.paidStatus === 'pagado';
        tableHtml += `
          <tr>
            <td>
              <div style="font-family:var(--font-mono); font-weight:800; font-size:0.84rem;">${c.id}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${c.period}</div>
            </td>
            <td><strong>${c.sellerName}</strong></td>
            <td>${c.closedUnits} unidades (${this.formatCurrency(c.totalVolume)})</td>
            <td><span style="font-size:0.76rem; color:var(--text-muted);">${c.policy}</span></td>
            <td style="font-family:var(--font-mono); font-weight:900; color:var(--status-success-text);">${this.formatCurrency(c.commissionEarned)}</td>
            <td>
              <span class="erp-badge ${isPaid ? 'badge-status-disponible' : 'badge-status-reservado'}">
                ${isPaid ? 'Abonado' : 'Pendiente Pago'}
              </span>
            </td>
          </tr>
        `;
      });
      tableBody.innerHTML = tableHtml;
    }
  }

  openCommissionModalFor(sellerId) {
    this.openModal('modalNewCommissionPayout');
    const sel = document.getElementById('commSellerSelect');
    if (sel) sel.value = sellerId;
  }

  printSaleReceipt(saleId) {
    const s = this.sales.find(item => item.id === saleId) || this.soldVehicles.find(item => item.comprobanteId === saleId);
    if (!s) return;

    const modal = document.getElementById('modalReceiptPreview');
    const content = document.getElementById('receiptPreviewContent');

    const clientName = s.clientName || s.clienteNombre;
    const clientDni = s.clientDni || s.clienteDni;
    const clientPhone = s.clientPhone || '11-4275-1489';
    const vehicleName = s.vehicleName || s.name;
    const sellerName = s.sellerName || s.vendedor;
    const montoTotal = s.montoTotal || s.precioVenta;
    const receiptId = s.id || s.comprobanteId;
    const date = s.date || s.fechaVenta || '2026-09-17';

    if (content) {
      content.innerHTML = `
        <div style="border:2px solid var(--border-subtle); padding:28px; border-radius:12px; background:#fff; color:#0F172A; font-family:var(--font-body);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #0F172A; padding-bottom:18px; margin-bottom:20px;">
            <div>
              <div style="font-family:var(--font-heading); font-size:1.4rem; font-weight:900; text-transform:uppercase;">Automotores <span style="color:var(--brand-red);">Os-Car</span></div>
              <div style="font-size:0.8rem; color:#475569;">Av. San Martín 2840 · Florencio Varela · Bs. As.</div>
              <div style="font-size:0.8rem; color:#475569;">CUIT: 30-68942154-8 · IVA Responsable Inscripto</div>
            </div>
            <div style="text-align:right;">
              <div style="font-family:var(--font-mono); font-weight:900; font-size:1.1rem; color:var(--brand-red);">${receiptId}</div>
              <div style="font-size:0.8rem; color:#64748B;">Fecha: ${date}</div>
              <div style="font-size:0.75rem; font-weight:800; text-transform:uppercase; background:#F1F5F9; padding:2px 8px; border-radius:4px; display:inline-block; margin-top:4px;">Comprobante Oficial de Reserva / Venta</div>
            </div>
          </div>

          <div style="margin-bottom:20px; font-size:0.88rem; line-height:1.6;">
            <div><strong>Adquiriente:</strong> ${clientName} · <strong>DNI/CUIT:</strong> ${clientDni}</div>
            <div><strong>Teléfono:</strong> ${clientPhone}</div>
            <div><strong>Unidad Adquirida:</strong> ${vehicleName}</div>
            <div><strong>Asesor Interviniente:</strong> ${sellerName}</div>
          </div>

          <table style="width:100%; border-collapse:collapse; margin-bottom:24px; font-size:0.85rem;">
            <thead>
              <tr style="background:#0F172A; color:#fff;">
                <th style="padding:8px 12px; text-align:left;">Concepto de Liquidación</th>
                <th style="padding:8px 12px; text-align:right;">Importe (ARS)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:10px 12px;">Valor Total de Venta Acordado</td>
                <td style="padding:10px 12px; text-align:right; font-family:var(--font-mono); font-weight:800;">${this.formatCurrency(montoTotal)}</td>
              </tr>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:10px 12px;">Modalidad de Pago</td>
                <td style="padding:10px 12px; text-align:right; font-family:var(--font-mono);">${s.formaPago || 'Contado / Financiación Cuotas Fijas'}</td>
              </tr>
            </tbody>
          </table>

          <div style="font-size:0.75rem; color:#64748B; border-top:1px solid #CBD5E1; padding-top:12px; display:flex; justify-content:space-between;">
            <span>Automotores Os-Car · Salón y Administración Central</span>
            <span>Firma y Aclaración del Titular Adquiriente</span>
          </div>
        </div>
      `;
    }

    this.openModal('modalReceiptPreview');
  }

  // =========================================================================
  // Motor de Sincronización Web (Landing Page Sync)
  // =========================================================================
  initSyncEngine() {
    const syncButtons = document.querySelectorAll('.btn-sync-landing');
    syncButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.disabled = true;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 0.8s linear infinite; display:inline-block; vertical-align:middle; margin-right:6px;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg> Sincronizando catálogo...`;

        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Sincronizar con Landing Web`;
          this.showToast(`Sincronización exitosa: ${this.vehicles.length} vehículos actualizados en la web pública`);
        }, 800);
      });
    });
  }

  openSimulateFromVehicle(vehicleId) {
    const v = this.vehicles.find(item => item.id === vehicleId);
    if (!v) return;

    document.getElementById('vehicleDrawerBackdrop')?.classList.remove('open');
    this.navigateTo('ventas');

    const priceInput = document.getElementById('calcVehiclePrice');
    const advanceInput = document.getElementById('calcAdvance');

    if (priceInput) priceInput.value = v.precioLista;
    if (advanceInput) advanceInput.value = Math.round(v.precioLista * 0.4);

    const event = new Event('input');
    priceInput?.dispatchEvent(event);
  }

  openSaleModalWithVehicle(vehicleId) {
    document.getElementById('vehicleDrawerBackdrop')?.classList.remove('open');
    this.openModal('modalNewSale');
    const select = document.getElementById('newSaleVehicleSelect');
    if (select) select.value = vehicleId;
  }

  // =========================================================================
  // Control de Modales & Notificaciones Toast
  // =========================================================================
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
  }

  showToast(message) {
    let toast = document.getElementById('erpGlobalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'erpGlobalToast';
      toast.className = 'erp-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--brand-red);"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${message}</span>
    `;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  formatCurrency(value) {
    if (isNaN(value)) return '$0';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.erpApp = new ERPApp();
  window.erpApp.init();
});
