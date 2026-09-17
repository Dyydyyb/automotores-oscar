# Automotores Os-Car · Concesionaria & Sistema ERP Integral

> **Florencio Varela, Buenos Aires · Más de 34 años de trayectoria**  
> Solución completa compuesta por la **Web Comercial / Catálogo Público** y el **Sistema ERP Integral de Gestión**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDyydyyb%2Fautomotores-oscar)

---

## 🚗 Estructura del Proyecto

Este repositorio contiene las dos plataformas conectadas de Automotores Os-Car:

```text
automotores-oscar/
├── index.html            # Landing Web Comercial y Buscador Inteligente
├── vehiculo.html         # Ficha Técnica y Detalle del Vehículo para Clientes
├── vercel.json           # Configuración de despliegue y ruteo limpio para Vercel
├── css/                  # Estilos de la Web Comercial
├── js/                   # Buscador, filtros y wizards de la Web
├── assets/               # Fotografías de vehículos HD, logos y banners
└── erp/                  # Sistema ERP Integral de Gestión Concesionaria
    ├── index.html        # Panel de Control ERP (SPA)
    ├── css/erp.css       # Sistema de diseño B2B (Linear / Notion style)
    ├── js/app.js         # Controlador SPA, Command Palette (Ctrl+K)
    ├── js/charts.js      # Motor SVG (Dona, Torta, Línea, Contorno, Barra)
    ├── js/data.js        # Base de datos local, catálogo, ventas y finanzas
    └── assets/           # Recursos gráficos del ERP
```

---

## 🎯 Plataformas Incluidas

### 1. Web Comercial (`/`)
- **Catálogo de Unidades 0KM y Usados**: Filtros por categoría (Autos, Camionetas, Camiones, Motos) y condición.
- **Ficha Técnica Detallada**: Equipamiento de confort, seguridad y especificaciones mecánicas completas.
- **Wizard de Financiación**: Cuotas fijas en pesos solo con DNI y contacto directo por WhatsApp.
- **Acceso directo al ERP**: Botón superior integrado en el header para dirección y asesores comerciales.

### 2. Sistema ERP Integral (`/erp/`)
- **Dashboard de Dirección**:
  - 6 KPIs consolidados con márgenes y balance neto operativo.
  - **Gráfico de Evolución de Ventas**: Conmutador dinámico entre **Dona** (por defecto), **Torta**, **Línea**, **Contorno/Área** y **Barra**.
  - **Gráfico de Composición del Stock**: Desglose por categoría o condición (**Dona** por defecto, Torta, Barra, Línea).
  - **Ritmo & Volumen de Ventas**: Con selector libre de fechas personalizadas (`Fecha Desde` y `Fecha Hasta`).
- **Stock de Vehículos**:
  - Pestañas de estado rápido: *Todos*, *Disponibles*, *Reservados*, *En Taller* y ***Vehículos Vendidos***.
  - Grilla *Luxury B2B* con matriz técnica, costo real y margen neto estimado.
  - Subsección de unidades vendidas con rentabilidad obtenida y reimpresión de comprobante.
  - Drawer lateral con Libro de Gastos de Taller y controles de sincronización web.
- **Ventas & Financiación**:
  - Simulador de cuotas fijas en pesos (Línea prendaria DNI).
  - Emisión de Comprobante Oficial de Reserva/Venta imprimible.
- **Finanzas & Facturación**:
  - Registro interactivo de nuevos movimientos financieros (`+ Ingreso / - Egreso`).
  - Gráfico comparativo de Flujo de Fondos (Cash Flow).
  - Libro diario contable con filtros y conciliación.
- **Comisiones de Vendedores**:
  - Ranking de rendimiento por asesor comercial y barra de cumplimiento de metas.
  - Modal para liquidar pagos de comisión y registro histórico.
- **Command Palette Global**: Búsqueda universal instantánea con `Ctrl + K`.

---

## 🚀 Despliegue en Vercel (Paso a Paso)

1. Ingresá a tu cuenta de **[Vercel](https://vercel.com/)**.
2. Hacé click en **"Add New..."** $\rightarrow$ **"Project"**.
3. Seleccioná el repositorio **`Dyydyyb/automotores-oscar`**.
4. En la configuración del proyecto:
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (directorio raíz)
   - **Build & Output Settings**: Dejar por defecto (no requiere build step ya que está optimizado en Vanilla JS/CSS estático ultraliviano).
5. Hacé click en **"Deploy"**.

### Enlaces una vez desplegado:
- **Web Comercial:** `https://tu-proyecto.vercel.app/`
- **Panel ERP:** `https://tu-proyecto.vercel.app/erp/`

---

## 🛠️ Tecnologías Utilizadas

- **Frontend Core**: HTML5 Semántico, Vanilla JavaScript (ES6+ Modular).
- **Estilos**: Vanilla CSS con variables semánticas, arquitectura responsive para desktop, tablet y móvil.
- **Visualización de Datos**: Motor propio vectorial SVG sin librerías externas pesadas.
- **Identidad de Marca**: Negro carbón, blanco técnico y rojo sobrio corporativo (`#A81E24`). Cero emojis y cero colores fluorescentes.
