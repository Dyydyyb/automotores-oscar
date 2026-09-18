/**
 * Automotores Os-Car — ERP Advanced SVG Chart Engine
 * Renderizador de gráficos vectoriales interactivos de alto nivel (Dona, Torta, Línea, Contorno/Área, Barra)
 * 100% Interactivo con tooltips dinámicos, selectores de tipo y adaptabilidad responsiva.
 * Florencio Varela, Buenos Aires · 34 Años de Trayectoria
 */

class ERPChartEngine {
  constructor() {
    this.salesMetric = 'montos'; // 'montos' | 'unidades'
    this.salesType = 'dona';     // 'dona' (por defecto) | 'torta' | 'linea' | 'area' | 'barra'
    this.donutView = 'categoria'; // 'categoria' | 'condicion'
    this.stockChartType = 'dona'; // 'dona' (por defecto) | 'torta' | 'barra' | 'linea'
    this.cashFlowType = 'barra';  // 'barra' (por defecto) | 'linea' | 'area' | 'dona' | 'torta'
  }

  // =========================================================================
  // 1. Gráfico Principal de Evolución de Ventas & Facturación
  // =========================================================================
  renderSalesChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { months, montos, unidades } = data.salesEvolution;
    const isMontos = this.salesMetric === 'montos';
    const seriesA = isMontos ? montos.ceroKm : unidades.ceroKm; // 0km
    const seriesB = isMontos ? montos.usados : unidades.usados; // Usados

    // Si el tipo es Dona o Torta, calculamos la distribución total acumulada
    if (this.salesType === 'dona' || this.salesType === 'torta') {
      const sumA = seriesA.reduce((acc, v) => acc + v, 0);
      const sumB = seriesB.reduce((acc, v) => acc + v, 0);
      const total = sumA + sumB;
      const percA = total > 0 ? ((sumA / total) * 100).toFixed(1) : 50;
      const percB = total > 0 ? ((sumB / total) * 100).toFixed(1) : 50;

      const isDonut = this.salesType === 'dona';
      const size = 260;
      const center = size / 2;
      const radius = isDonut ? 85 : 95;
      const strokeWidth = isDonut ? 34 : 95;
      const circumference = 2 * Math.PI * radius;

      const sliceA = (sumA / total) * circumference;
      const gapA = circumference - sliceA;
      const offsetA = circumference * 0.25; // Empezar arriba (-90°)

      const sliceB = (sumB / total) * circumference;
      const gapB = circumference - sliceB;
      const offsetB = offsetA - sliceA;

      const formattedTotal = isMontos ? `$${total.toFixed(0)}M` : `${total} un.`;

      let svg = `
        <div style="display:flex; align-items:center; justify-content:space-around; flex-wrap:wrap; gap:20px; width:100%; min-height:280px; padding:10px 0;">
          <div style="position:relative; width:${size}px; height:${size}px;">
            <svg viewBox="0 0 ${size} ${size}" style="width:100%; height:100%; overflow:visible;">
              <!-- Segmento 0KM -->
              <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="var(--brand-red)" stroke-width="${strokeWidth}"
                stroke-dasharray="${sliceA} ${gapA}" stroke-dashoffset="${offsetA}"
                class="chart-slice-interactive"
                style="transition:stroke-width 0.2s ease, opacity 0.2s; cursor:pointer;"
                data-month="Total Período" data-series="Flota 0KM Oficial" data-val="${isMontos ? '$' + sumA.toFixed(1) + 'M' : sumA + ' un.'}" data-perc="${percA}%" data-color="#A81E24">
                <title>0KM: ${isMontos ? '$' + sumA.toFixed(1) + 'M' : sumA + ' un.'} (${percA}%)</title>
              </circle>
              <!-- Segmento Usados -->
              <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="var(--chart-secondary)" stroke-width="${strokeWidth}"
                stroke-dasharray="${sliceB} ${gapB}" stroke-dashoffset="${offsetB}"
                class="chart-slice-interactive"
                style="transition:stroke-width 0.2s ease, opacity 0.2s; cursor:pointer;"
                data-month="Total Período" data-series="Usados Seleccionados" data-val="${isMontos ? '$' + sumB.toFixed(1) + 'M' : sumB + ' un.'}" data-perc="${percB}%" data-color="#1D4ED8">
                <title>Usados: ${isMontos ? '$' + sumB.toFixed(1) + 'M' : sumB + ' un.'} (${percB}%)</title>
              </circle>
      `;

      if (isDonut) {
        svg += `
              <text x="${center}" y="${center - 6}" text-anchor="middle" font-size="24" font-family="var(--font-heading)" font-weight="900" fill="var(--text-main)">${formattedTotal}</text>
              <text x="${center}" y="${center + 16}" text-anchor="middle" font-size="10" font-family="var(--font-mono)" font-weight="700" letter-spacing="1px" text-transform="uppercase" fill="var(--text-muted)">TOTAL FACTURADO</text>
        `;
      }

      svg += `
            </svg>
          </div>
          <!-- Desglose Lateral -->
          <div style="flex:1; min-width:220px; display:flex; flex-direction:column; gap:12px;">
            <div style="background:var(--bg-subtle); padding:14px; border-radius:10px; border-left:4px solid var(--brand-red); transition:transform 0.2s ease;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.84rem; font-weight:800; color:var(--text-main);">Flota 0KM Oficial</span>
                <span style="font-family:var(--font-mono); font-weight:900; color:var(--brand-red); font-size:1.05rem;">${percA}%</span>
              </div>
              <div style="font-family:var(--font-mono); font-size:0.95rem; font-weight:800; margin-top:2px;">${isMontos ? '$' + sumA.toFixed(1) + 'M' : sumA + ' unidades'}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">Ventas acumuladas en el período</div>
            </div>

            <div style="background:var(--bg-subtle); padding:14px; border-radius:10px; border-left:4px solid var(--chart-secondary); transition:transform 0.2s ease;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.84rem; font-weight:800; color:var(--text-main);">Usados Seleccionados</span>
                <span style="font-family:var(--font-mono); font-weight:900; color:var(--chart-secondary); font-size:1.05rem;">${percB}%</span>
              </div>
              <div style="font-family:var(--font-mono); font-size:0.95rem; font-weight:800; margin-top:2px;">${isMontos ? '$' + sumB.toFixed(1) + 'M' : sumB + ' unidades'}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">Ventas acumuladas en el período</div>
            </div>
          </div>
        </div>
      `;

      container.innerHTML = svg;
      this.attachChartTooltips(container);
      return;
    }

    // Renderizado en Barras, Línea o Contorno/Área
    const width = container.clientWidth || 700;
    const height = 280;
    const padding = { top: 30, right: 30, bottom: 40, left: 65 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    let maxVal = Math.max(...seriesA, ...seriesB) * 1.25;
    if (maxVal === 0) maxVal = 100;

    const getX = (index) => padding.left + (index + 0.5) * (chartW / months.length);
    const getY = (val) => padding.top + chartH - (val / maxVal) * chartH;
    const formatY = (val) => isMontos ? `$${val.toFixed(0)}M` : `${Math.round(val)} un.`;

    let svg = `<svg viewBox="0 0 ${width} ${height}" class="chart-svg" style="width:100%; height:${height}px; overflow:visible;">`;

    // Grilla horizontal
    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
      const yVal = (maxVal / gridSteps) * i;
      const yPos = getY(yVal);
      svg += `
        <line x1="${padding.left}" y1="${yPos}" x2="${width - padding.right}" y2="${yPos}" stroke="var(--chart-grid)" stroke-width="1" stroke-dasharray="${i === 0 ? '0' : '4,4'}" />
        <text x="${padding.left - 10}" y="${yPos + 4}" font-size="11" font-family="var(--font-mono, monospace)" fill="var(--chart-axis-text)" text-anchor="end">${formatY(yVal)}</text>
      `;
    }

    if (this.salesType === 'barra') {
      const groupW = (chartW / months.length) * 0.65;
      const barW = groupW / 2 - 2;

      months.forEach((m, idx) => {
        const cx = getX(idx);
        const valA = seriesA[idx];
        const valB = seriesB[idx];
        const yA = getY(valA);
        const yB = getY(valB);
        const hA = Math.max(2, padding.top + chartH - yA);
        const hB = Math.max(2, padding.top + chartH - yB);

        const xA = cx - barW - 1;
        const xB = cx + 1;

        svg += `
          <rect x="${xA}" y="${yA}" width="${barW}" height="${hA}" rx="4" fill="var(--brand-red)" class="chart-bar-interactive" data-month="${m}" data-series="0KM Oficial" data-val="${valA}" data-unit="${isMontos ? '$M' : 'unidades'}" data-color="#A81E24" style="cursor:pointer; transition:opacity 0.2s;">
            <title>${m} · 0KM: ${isMontos ? '$' + valA + 'M' : valA + ' un.'}</title>
          </rect>
          <rect x="${xB}" y="${yB}" width="${barW}" height="${hB}" rx="4" fill="var(--chart-secondary)" class="chart-bar-interactive" data-month="${m}" data-series="Usados Seleccionados" data-val="${valB}" data-unit="${isMontos ? '$M' : 'unidades'}" data-color="#1D4ED8" style="cursor:pointer; transition:opacity 0.2s;">
            <title>${m} · Usados: ${isMontos ? '$' + valB + 'M' : valB + ' un.'}</title>
          </rect>
        `;
      });
    } else {
      // Línea o Contorno/Área
      const pointsA = seriesA.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');
      const pointsB = seriesB.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');

      if (this.salesType === 'area') {
        const zeroY = padding.top + chartH;
        const areaPathA = `M ${getX(0)},${zeroY} L ${pointsA} L ${getX(months.length - 1)},${zeroY} Z`;
        const areaPathB = `M ${getX(0)},${zeroY} L ${pointsB} L ${getX(months.length - 1)},${zeroY} Z`;

        svg += `<path d="${areaPathA}" fill="rgba(168, 30, 36, 0.22)" />`;
        svg += `<path d="${areaPathB}" fill="rgba(30, 41, 59, 0.16)" />`;
      }

      svg += `<polyline points="${pointsA}" fill="none" stroke="var(--brand-red)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />`;
      svg += `<polyline points="${pointsB}" fill="none" stroke="var(--chart-secondary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />`;

      seriesA.forEach((v, i) => {
        svg += `
          <circle cx="${getX(i)}" cy="${getY(v)}" r="5.5" fill="#FFFFFF" stroke="var(--brand-red)" stroke-width="3" class="chart-point-interactive" data-month="${months[i]}" data-series="0KM Oficial" data-val="${v}" data-unit="${isMontos ? '$M' : 'unidades'}" data-color="#A81E24" style="cursor:pointer; transition:transform 0.2s ease;">
            <title>${months[i]} · 0KM: ${isMontos ? '$' + v + 'M' : v + ' un.'}</title>
          </circle>
        `;
      });

      seriesB.forEach((v, i) => {
        svg += `
          <circle cx="${getX(i)}" cy="${getY(v)}" r="5.5" fill="#FFFFFF" stroke="var(--chart-secondary)" stroke-width="2.5" class="chart-point-interactive" data-month="${months[i]}" data-series="Usados Seleccionados" data-val="${v}" data-unit="${isMontos ? '$M' : 'unidades'}" data-color="#1D4ED8" style="cursor:pointer; transition:transform 0.2s ease;">
            <title>${months[i]} · Usados: ${isMontos ? '$' + v + 'M' : v + ' un.'}</title>
          </circle>
        `;
      });
    }

    // Eje X
    months.forEach((m, idx) => {
      svg += `<text x="${getX(idx)}" y="${height - 12}" font-size="12" font-family="var(--font-heading)" font-weight="700" fill="var(--chart-axis-text)" text-anchor="middle">${m}</text>`;
    });

    svg += `</svg>`;
    container.innerHTML = svg;
    this.attachChartTooltips(container);
  }

  // =========================================================================
  // 2. Gráfico de Composición del Stock (Dona por Defecto, Torta, Barra, Línea)
  // =========================================================================
  renderStockDonut(containerId, legendContainerId, data) {
    const container = document.getElementById(containerId);
    const legendContainer = document.getElementById(legendContainerId);
    if (!container) return;

    const isCategory = this.donutView === 'categoria';
    const items = isCategory ? data.stockComposition.byCategory : data.stockComposition.byCondition;
    const totalCount = items.reduce((acc, curr) => acc + curr.count, 0);

    // Si es tipo Barra o Línea
    if (this.stockChartType === 'barra' || this.stockChartType === 'linea') {
      const width = container.clientWidth || 340;
      const height = 210;
      const padLeft = 90;
      const padRight = 30;
      const padTop = 15;
      const padBottom = 20;
      const barH = 22;
      const maxCount = Math.max(...items.map(i => i.count)) * 1.25 || 10;

      let svg = `<svg viewBox="0 0 ${width} ${height}" style="width:100%; height:auto; overflow:visible;">`;

      items.forEach((item, idx) => {
        const y = padTop + idx * 46;
        const availableW = width - padLeft - padRight;
        const w = (item.count / maxCount) * availableW;
        const label = item.category || item.condition;

        svg += `
          <text x="${padLeft - 10}" y="${y + 16}" font-size="11" font-weight="700" fill="var(--text-main)" text-anchor="end">${label}</text>
          <rect x="${padLeft}" y="${y}" width="${availableW}" height="${barH}" rx="4" fill="var(--bg-subtle)" />
          <rect x="${padLeft}" y="${y}" width="${w}" height="${barH}" rx="4" fill="${item.color}" class="chart-bar-interactive"
            data-month="Stock" data-series="${label}" data-val="${item.count} unidades" data-perc="${item.percentage}%" data-color="${item.color}" style="cursor:pointer;">
            <title>${label}: ${item.count} unidades (${item.percentage}%)</title>
          </rect>
          <text x="${padLeft + w + 8}" y="${y + 16}" font-size="11" font-family="var(--font-mono)" font-weight="800" fill="var(--text-main)">${item.count} (${item.percentage}%)</text>
        `;
      });

      svg += `</svg>`;
      container.innerHTML = svg;
      if (legendContainer) legendContainer.innerHTML = '';
      this.attachChartTooltips(container);
      return;
    }

    // Si es Dona o Torta
    const isDonut = this.stockChartType === 'dona';
    const size = 200;
    const center = size / 2;
    const radius = isDonut ? 76 : 85;
    const strokeWidth = isDonut ? 26 : 85;

    let accumulatedAngle = -90;
    const circumference = 2 * Math.PI * radius;

    let svg = `<svg viewBox="0 0 ${size} ${size}" class="donut-svg" style="width:100%; max-width:200px; height:auto; display:block; margin:0 auto; overflow:visible;">`;

    if (isDonut) {
      svg += `<circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="var(--border-subtle)" stroke-width="${strokeWidth}" opacity="0.15" />`;
    }

    items.forEach((item) => {
      const slicePercentage = item.count / totalCount;
      const strokeDash = slicePercentage * circumference;
      const strokeGap = circumference - strokeDash;
      const label = item.category || item.condition;

      svg += `
        <circle 
          cx="${center}" 
          cy="${center}" 
          r="${radius}" 
          fill="none" 
          stroke="${item.color}" 
          stroke-width="${strokeWidth}" 
          stroke-dasharray="${strokeDash} ${strokeGap}" 
          stroke-dashoffset="${-((accumulatedAngle + 90) / 360) * circumference}" 
          class="donut-segment chart-slice-interactive"
          data-month="Composición Stock"
          data-series="${label}"
          data-val="${item.count} unidades"
          data-perc="${item.percentage}%"
          data-color="${item.color}"
          style="transition: stroke-width 0.2s ease, opacity 0.2s ease; cursor:pointer;"
        >
          <title>${label}: ${item.count} unidades (${item.percentage}%)</title>
        </circle>
      `;

      accumulatedAngle += slicePercentage * 360;
    });

    if (isDonut) {
      svg += `
        <text x="${center}" y="${center - 6}" text-anchor="middle" font-size="28" font-family="var(--font-heading)" font-weight="900" fill="var(--text-main)">${totalCount}</text>
        <text x="${center}" y="${center + 16}" text-anchor="middle" font-size="11" font-family="var(--font-heading)" font-weight="700" letter-spacing="1px" text-transform="uppercase" fill="var(--text-muted)">EN STOCK</text>
      `;
    }

    svg += `</svg>`;
    container.innerHTML = svg;

    // Leyenda
    if (legendContainer) {
      let legendHtml = `<div class="donut-legend-grid">`;
      items.forEach(item => {
        const label = item.category || item.condition;
        legendHtml += `
          <div class="legend-item" style="display:flex; align-items:center; justify-content:space-between; padding:6px 0; border-bottom:1px solid var(--border-light);">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="width:10px; height:10px; border-radius:50%; background-color:${item.color}; flex-shrink:0;"></span>
              <span style="font-size:0.84rem; font-weight:600; color:var(--text-main);">${label}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:0.84rem; font-weight:800; color:var(--text-main); font-family:var(--font-mono);">${item.count}</span>
              <span style="font-size:0.75rem; font-weight:600; color:var(--text-muted); width:40px; text-align:right;">${item.percentage}%</span>
            </div>
          </div>
        `;
      });
      legendHtml += `</div>`;
      legendContainer.innerHTML = legendHtml;
    }

    this.attachChartTooltips(container);
  }

  // =========================================================================
  // 3. Tercer Gráfico: Ritmo & Volumen de Ventas (Día / Semana / Mes / Rango Libre)
  // =========================================================================
  renderSalesRhythmChart(containerId, data, fromDate, toDate) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let timeline = [...data.salesTimeline];

    // Filtrar por rango de fechas si se especifica
    if (fromDate) {
      timeline = timeline.filter(t => t.date >= fromDate);
    }
    if (toDate) {
      timeline = timeline.filter(t => t.date <= toDate);
    }

    if (timeline.length === 0) {
      container.innerHTML = `
        <div style="padding:40px; text-align:center; color:var(--text-muted);">
          <div style="font-weight:700; margin-bottom:4px;">Sin operaciones registradas en el rango seleccionado</div>
          <div style="font-size:0.82rem;">Modificá el filtro de fechas desde el panel superior.</div>
        </div>
      `;
      return;
    }

    const width = container.clientWidth || 700;
    const height = 240;
    const padding = { top: 30, right: 30, bottom: 40, left: 65 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxUnits = Math.max(...timeline.map(t => t.units)) * 1.5 || 5;

    const getX = (idx) => padding.left + (idx + 0.5) * (chartW / timeline.length);
    const getY = (v) => padding.top + chartH - (v / maxUnits) * chartH;

    let svg = `<svg viewBox="0 0 ${width} ${height}" style="width:100%; height:${height}px; overflow:visible;">`;

    // Grilla
    for (let i = 0; i <= 3; i++) {
      const v = Math.round((maxUnits / 3) * i);
      const yPos = getY(v);
      svg += `
        <line x1="${padding.left}" y1="${yPos}" x2="${width - padding.right}" y2="${yPos}" stroke="var(--chart-grid)" stroke-dasharray="3,3" />
        <text x="${padding.left - 10}" y="${yPos + 4}" font-size="11" font-family="var(--font-mono)" fill="var(--chart-axis-text)" text-anchor="end">${v} un.</text>
      `;
    }

    const barWidth = Math.min(36, (chartW / timeline.length) * 0.5);

    timeline.forEach((item, idx) => {
      const cx = getX(idx);
      const y = getY(item.units);
      const h = Math.max(2, padding.top + chartH - y);
      const is0km = item.condition === '0km';
      const color = is0km ? 'var(--brand-red)' : 'var(--chart-secondary)';

      svg += `
        <rect x="${cx - barWidth / 2}" y="${y}" width="${barWidth}" height="${h}" rx="5" fill="${color}" class="chart-bar-interactive"
          data-month="${item.date}" data-series="${item.model} (${item.condition.toUpperCase()})" data-val="${item.units} un. ($${(item.volume / 1000000).toFixed(1)}M)" data-color="${is0km ? '#A81E24' : '#1D4ED8'}" style="cursor:pointer;">
          <title>${item.date}: ${item.model} (${item.condition.toUpperCase()}) · $${(item.volume / 1000000).toFixed(1)}M</title>
        </rect>
        <text x="${cx}" y="${y - 6}" font-size="11" font-family="var(--font-mono)" font-weight="900" fill="${color}" text-anchor="middle">${item.units}</text>
        <text x="${cx}" y="${height - 12}" font-size="11" font-family="var(--font-mono)" font-weight="700" fill="var(--chart-axis-text)" text-anchor="middle">${item.date.slice(5)}</text>
      `;
    });

    svg += `</svg>`;
    container.innerHTML = svg;
    this.attachChartTooltips(container);
  }

  // =========================================================================
  // 4. Cuarto Gráfico: Flujo de Fondos Interactivo (Dona, Torta, Barra, Línea, Área)
  // =========================================================================
  renderCashFlowChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const cf = data.cashFlowData || {
      months: ["May", "Jun", "Jul", "Ago", "Sep"],
      ingresos: [162.2, 159.6, 173.0, 172.8, 184.5],
      egresos: [135.0, 131.2, 142.5, 148.0, 150.8],
      breakdown: [
        { category: "Venta Flota 0KM", amount: 126.8, type: "ingreso", percentage: 68.7, color: "#166E30" },
        { category: "Venta Usados", amount: 57.7, type: "ingreso", percentage: 31.3, color: "#1D4ED8" },
        { category: "Tomas de Usados", amount: 112.4, type: "egreso", percentage: 74.5, color: "#A81E24" },
        { category: "Mecánica & Detailing", amount: 14.8, type: "egreso", percentage: 9.8, color: "#D97706" },
        { category: "Comisiones Asesores", amount: 8.6, type: "egreso", percentage: 5.7, color: "#64748B" },
        { category: "Impuestos & Fijos", amount: 15.0, type: "egreso", percentage: 10.0, color: "#475569" }
      ]
    };

    const { months, ingresos, egresos, breakdown } = cf;
    const chartType = this.cashFlowType || 'barra';

    // 1. MODO DONA o TORTA (Composición de Fondos / Ingresos vs Egresos)
    if (chartType === 'dona' || chartType === 'torta') {
      const totalIng = ingresos[ingresos.length - 1]; // Mes actual
      const totalEg = egresos[egresos.length - 1];
      const superavit = totalIng - totalEg;
      const totalVol = totalIng + totalEg;
      const percIng = ((totalIng / totalVol) * 100).toFixed(1);
      const percEg = ((totalEg / totalVol) * 100).toFixed(1);

      const isDonut = chartType === 'dona';
      const size = 260;
      const center = size / 2;
      const radius = isDonut ? 85 : 95;
      const strokeWidth = isDonut ? 34 : 95;
      const circumference = 2 * Math.PI * radius;

      const sliceIng = (totalIng / totalVol) * circumference;
      const gapIng = circumference - sliceIng;
      const offsetIng = circumference * 0.25;

      const sliceEg = (totalEg / totalVol) * circumference;
      const gapEg = circumference - sliceEg;
      const offsetEg = offsetIng - sliceIng;

      let svg = `
        <div style="display:flex; align-items:center; justify-content:space-around; flex-wrap:wrap; gap:20px; width:100%; min-height:240px; padding:10px 0;">
          <div style="position:relative; width:${size}px; height:${size}px;">
            <svg viewBox="0 0 ${size} ${size}" style="width:100%; height:100%; overflow:visible;">
              <!-- Ingresos -->
              <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="#166E30" stroke-width="${strokeWidth}"
                stroke-dasharray="${sliceIng} ${gapIng}" stroke-dashoffset="${offsetIng}"
                class="chart-slice-interactive"
                data-month="Septiembre 2026" data-series="Ingresos Percibidos" data-val="$${totalIng.toFixed(1)}M" data-perc="${percIng}%" data-color="#166E30"
                style="transition:stroke-width 0.2s ease; cursor:pointer;">
                <title>Ingresos: $${totalIng.toFixed(1)}M (${percIng}%)</title>
              </circle>
              <!-- Egresos -->
              <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="#A81E24" stroke-width="${strokeWidth}"
                stroke-dasharray="${sliceEg} ${gapEg}" stroke-dashoffset="${offsetEg}"
                class="chart-slice-interactive"
                data-month="Septiembre 2026" data-series="Egresos Operativos" data-val="$${totalEg.toFixed(1)}M" data-perc="${percEg}%" data-color="#A81E24"
                style="transition:stroke-width 0.2s ease; cursor:pointer;">
                <title>Egresos: $${totalEg.toFixed(1)}M (${percEg}%)</title>
              </circle>
      `;

      if (isDonut) {
        svg += `
              <text x="${center}" y="${center - 6}" text-anchor="middle" font-size="22" font-family="var(--font-heading)" font-weight="900" fill="#166E30">+$${superavit.toFixed(1)}M</text>
              <text x="${center}" y="${center + 16}" text-anchor="middle" font-size="9" font-family="var(--font-mono)" font-weight="700" letter-spacing="1px" text-transform="uppercase" fill="var(--text-muted)">SUPERÁVIT NETO</text>
        `;
      }

      svg += `
            </svg>
          </div>

          <!-- Desglose por Partidas -->
          <div style="flex:1; min-width:240px; display:flex; flex-direction:column; gap:10px;">
            <div style="background:var(--bg-subtle); padding:12px; border-radius:8px; border-left:4px solid #166E30;">
              <div style="display:flex; justify-content:space-between; font-size:0.82rem; font-weight:800;">
                <span>Total Ingresos (Cobranzas)</span>
                <span style="font-family:var(--font-mono); color:#166E30;">$${totalIng.toFixed(1)}M (${percIng}%)</span>
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">Ventas 0km de contado y anticipos + usados</div>
            </div>

            <div style="background:var(--bg-subtle); padding:12px; border-radius:8px; border-left:4px solid #A81E24;">
              <div style="display:flex; justify-content:space-between; font-size:0.82rem; font-weight:800;">
                <span>Total Egresos & Compras</span>
                <span style="font-family:var(--font-mono); color:#A81E24;">$${totalEg.toFixed(1)}M (${percEg}%)</span>
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">Tomas de flota + Taller mecánico + Comisiones</div>
            </div>

            <div style="background:var(--bg-subtle); padding:12px; border-radius:8px; border-left:4px solid #1D4ED8;">
              <div style="display:flex; justify-content:space-between; font-size:0.82rem; font-weight:800;">
                <span>Resultado Neto Operativo</span>
                <span style="font-family:var(--font-mono); color:#1D4ED8; font-size:0.95rem;">+$${superavit.toFixed(1)}M</span>
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">Caja libre del ejercicio (Margen neto: 18.2%)</div>
            </div>
          </div>
        </div>
      `;

      container.innerHTML = svg;
      this.attachChartTooltips(container);
      return;
    }

    // 2. MODO BARRAS, LÍNEA O ÁREA (Temporal meses May a Sep)
    const width = container.clientWidth || 600;
    const height = 240;
    const padding = { top: 25, right: 30, bottom: 35, left: 65 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = Math.max(...ingresos, ...egresos) * 1.25;

    const getX = (idx) => padding.left + (idx + 0.5) * (chartW / months.length);
    const getY = (v) => padding.top + chartH - (v / maxVal) * chartH;

    let svg = `<svg viewBox="0 0 ${width} ${height}" style="width:100%; height:${height}px; overflow:visible;">`;

    // Grilla
    for (let i = 0; i <= 3; i++) {
      const v = (maxVal / 3) * i;
      const yPos = getY(v);
      svg += `
        <line x1="${padding.left}" y1="${yPos}" x2="${width - padding.right}" y2="${yPos}" stroke="var(--chart-grid)" stroke-dasharray="3,3" />
        <text x="${padding.left - 8}" y="${yPos + 4}" font-size="10" font-family="var(--font-mono)" fill="var(--chart-axis-text)" text-anchor="end">$${v.toFixed(0)}M</text>
      `;
    }

    if (chartType === 'barra') {
      const groupW = (chartW / months.length) * 0.65;
      const barW = groupW / 2 - 2;

      months.forEach((m, idx) => {
        const cx = getX(idx);
        const valIng = ingresos[idx];
        const valEg = egresos[idx];
        const yIng = getY(valIng);
        const yEg = getY(valEg);
        const hIng = Math.max(2, padding.top + chartH - yIng);
        const hEg = Math.max(2, padding.top + chartH - yEg);

        const xIng = cx - barW - 1;
        const xEg = cx + 1;

        svg += `
          <rect x="${xIng}" y="${yIng}" width="${barW}" height="${hIng}" rx="4" fill="#166E30" class="chart-bar-interactive"
            data-month="${m}" data-series="Ingresos Efectivos" data-val="$${valIng.toFixed(1)}M" data-color="#166E30" style="cursor:pointer; transition:opacity 0.2s;">
            <title>${m} · Ingresos: $${valIng}M</title>
          </rect>
          <rect x="${xEg}" y="${yEg}" width="${barW}" height="${hEg}" rx="4" fill="#A81E24" class="chart-bar-interactive"
            data-month="${m}" data-series="Egresos Totales" data-val="$${valEg.toFixed(1)}M" data-color="#A81E24" style="cursor:pointer; transition:opacity 0.2s;">
            <title>${m} · Egresos: $${valEg}M</title>
          </rect>
        `;
      });
    } else {
      // Línea o Contorno/Área
      const ptsIng = ingresos.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');
      const ptsEg = egresos.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');

      if (chartType === 'area') {
        const zeroY = padding.top + chartH;
        const areaIng = `M ${getX(0)},${zeroY} L ${ptsIng} L ${getX(months.length - 1)},${zeroY} Z`;
        const areaEg = `M ${getX(0)},${zeroY} L ${ptsEg} L ${getX(months.length - 1)},${zeroY} Z`;

        svg += `<path d="${areaIng}" fill="rgba(22, 110, 48, 0.20)" />`;
        svg += `<path d="${areaEg}" fill="rgba(168, 30, 36, 0.18)" />`;
      }

      svg += `<polyline points="${ptsIng}" fill="none" stroke="#166E30" stroke-width="3" stroke-linecap="round" />`;
      svg += `<polyline points="${ptsEg}" fill="none" stroke="#A81E24" stroke-width="3" stroke-linecap="round" stroke-dasharray="4,4" />`;

      ingresos.forEach((v, i) => {
        svg += `
          <circle cx="${getX(i)}" cy="${getY(v)}" r="5" fill="#FFFFFF" stroke="#166E30" stroke-width="2.5" class="chart-point-interactive"
            data-month="${months[i]}" data-series="Ingresos Efectivos" data-val="$${v}M" data-color="#166E30" style="cursor:pointer;">
            <title>${months[i]} Ingresos: $${v}M</title>
          </circle>
        `;
      });

      egresos.forEach((v, i) => {
        svg += `
          <circle cx="${getX(i)}" cy="${getY(v)}" r="5" fill="#FFFFFF" stroke="#A81E24" stroke-width="2.5" class="chart-point-interactive"
            data-month="${months[i]}" data-series="Egresos Totales" data-val="$${v}M" data-color="#A81E24" style="cursor:pointer;">
            <title>${months[i]} Egresos: $${v}M</title>
          </circle>
        `;
      });
    }

    months.forEach((m, idx) => {
      svg += `<text x="${getX(idx)}" y="${height - 10}" font-size="11" font-weight="700" fill="var(--chart-axis-text)" text-anchor="middle">${m}</text>`;
    });

    svg += `</svg>`;
    container.innerHTML = svg;
    this.attachChartTooltips(container);
  }

  // =========================================================================
  // Motor de Tooltips Flotantes Dinámicos Universales
  // =========================================================================
  attachChartTooltips(container) {
    let tooltip = document.getElementById('erpChartTooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'erpChartTooltip';
      tooltip.className = 'chart-tooltip-floating';
      document.body.appendChild(tooltip);
    }

    const interactiveElements = container.querySelectorAll('.chart-bar-interactive, .chart-point-interactive, .chart-slice-interactive, .donut-segment');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', (e) => {
        const month = el.dataset.month || 'Período 2026';
        const series = el.dataset.series || el.dataset.label || 'Métrica';
        const val = el.dataset.val || el.dataset.count || '0';
        const perc = el.dataset.perc ? `(${el.dataset.perc})` : '';
        const color = el.dataset.color || '#A81E24';

        tooltip.innerHTML = `
          <div style="font-size:0.72rem; font-weight:700; color:#94A3B8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px;">${month}</div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="width:10px; height:10px; border-radius:50%; background:${color}; flex-shrink:0;"></span>
            <span style="font-weight:700; font-size:0.85rem; color:#FFFFFF;">${series}:</span>
            <span style="font-family:var(--font-mono); font-weight:900; font-size:0.92rem; color:#FFFFFF;">${val} ${perc}</span>
          </div>
        `;
        tooltip.style.opacity = '1';
        tooltip.style.display = 'block';
        el.style.opacity = '0.82';
      });

      el.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.pageX + 14}px`;
        tooltip.style.top = `${e.pageY - 42}px`;
      });

      el.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.display = 'none';
        el.style.opacity = '1';
      });
    });
  }
}

if (typeof window !== 'undefined') {
  window.erpCharts = new ERPChartEngine();
}
