/**
 * Automotores Os-Car — ERP Data Engine
 * Base de datos operativa y transaccional para la gestión comercial y operativa
 * Florencio Varela, Buenos Aires · 34 Años de Trayectoria
 */

const ERP_DATA = {
  // Configuración institucional
  company: {
    name: "Automotores Os-Car",
    tradeName: "Os-Car Automotores S.R.L.",
    cuit: "30-68942154-8",
    address: "Av. San Martín 2840, Florencio Varela, Bs. As.",
    phone: "011 4275-1489 / 4275-0302",
    whatsapp: "+54 9 11 6248-4394",
    email: "ventas@automotoresoscar.com.ar",
    website: "https://baddgroup.com/os-cars-ejemplo/",
    version: "ERP v1.0 Enterprise"
  },

  // Períodos disponibles
  periods: [
    { id: "dia", label: "Hoy" },
    { id: "semana", label: "Esta Semana" },
    { id: "mes", label: "Septiembre 2026" },
    { id: "anio", label: "Año 2026" }
  ],

  // Métricas de KPIs consolidadas del período actual (Mes)
  kpis: {
    stock: {
      total: 18,
      disponibles: 12,
      reservados: 3,
      enPreparacion: 3,
      valorTotalInventario: 489500000, // ARS
      delta: "+2 unidades este mes"
    },
    ventas: {
      unidades: 8,
      montoTotal: 184500000, // ARS
      deltaVsMesAnterior: "+14.2%",
      ticketPromedio: 23062500
    },
    financiacion: {
      montoFinanciado: 112400000,
      montoContado: 72100000,
      porcentajeFinanciado: 60.9,
      planesActivos: 46
    },
    costos: {
      tomasUsados: 142800000,
      gastosTallerPrep: 4350000,
      comisionesDevengadas: 3690000,
      totalCostosPeriodo: 150840000
    },
    balanceNeto: {
      resultadoNeto: 33660000,
      margenNetoPorc: 18.2,
      estado: "superavit"
    },
    rentabilidadMedia: {
      porcentaje: 21.8,
      margenPromedioPorUnidad: 4208000,
      delta: "+1.6% vs mes ant."
    }
  },

  // Series históricas para el gráfico de evolución de ventas
  salesEvolution: {
    months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"],
    // Valores en Millones de Pesos ($)
    montos: {
      ceroKm: [62.4, 78.1, 84.5, 92.0, 105.4, 98.2, 115.0, 108.6, 126.8],
      usados: [38.2, 45.0, 52.1, 48.6, 56.8, 61.4, 58.0, 64.2, 57.7]
    },
    // Valores en Cantidad de unidades físicas vendidas
    unidades: {
      ceroKm: [3, 4, 4, 4, 5, 4, 5, 5, 5],
      usados: [3, 4, 4, 3, 4, 4, 4, 4, 3]
    }
  },

  // Composición de stock para el gráfico tipo dona
  stockComposition: {
    byCategory: [
      { category: "Autos", count: 7, percentage: 38.9, color: "#A81E24" },
      { category: "Camionetas / Pick-ups", count: 7, percentage: 38.9, color: "#1D4ED8" },
      { category: "Camiones / Utilitarios", count: 2, percentage: 11.1, color: "#D97706" },
      { category: "Motos", count: 2, percentage: 11.1, color: "#475569" }
    ],
    byCondition: [
      { condition: "0km Oficial", count: 10, percentage: 55.6, color: "#A81E24" },
      { condition: "Usado Seleccionado", count: 8, percentage: 44.4, color: "#1D4ED8" }
    ]
  },

  // Embudo de conversión de leads
  leadsFunnel: {
    totalConsultas: 142,
    porCanal: [
      { canal: "Buscador / Web Os-Car", consultas: 68, icon: "globe" },
      { canal: "WhatsApp Directo", consultas: 48, icon: "message-circle" },
      { canal: "Visitas en Salón", consultas: 18, icon: "map-pin" },
      { canal: "Email / Teléfono", consultas: 8, icon: "phone" }
    ],
    enSeguimiento: 42,
    visitasPactadas: 19,
    cerradasVenta: 8,
    tasaConversion: 17.6
  },

  // Alerta de unidades con mayor tiempo en stock (Aging stock)
  agingStock: [
    {
      id: "toyota-sw4-2012",
      name: "Toyota SW4 4x4 7 Asientos",
      year: 2012,
      condition: "Usado",
      daysInStock: 58,
      patente: "MNP 429",
      price: 26500000,
      costo: 21800000,
      gastosPrep: 620000,
      actionNeeded: "Ajustar Precio / Destacar Web",
      suggestedDiscount: 5
    },
    {
      id: "ford-ranger-usado",
      name: "Ford Ranger XLT 3.2 4x4",
      year: 2018,
      condition: "Usado",
      daysInStock: 46,
      patente: "AC 821 LM",
      price: 28900000,
      costo: 24100000,
      gastosPrep: 480000,
      actionNeeded: "Lanzar Promoción Financiada",
      suggestedDiscount: 3
    },
    {
      id: "peugeot-2008-usado",
      name: "Peugeot 2008 Feline 1.6",
      year: 2019,
      condition: "Usado",
      daysInStock: 41,
      patente: "AD 304 TR",
      price: 18900000,
      costo: 15300000,
      gastosPrep: 310000,
      actionNeeded: "Renovar Fotos en Web",
      suggestedDiscount: 0
    }
  ],

  // Inventario Completo de Vehículos (Stock Master)
  vehicles: [
    {
      id: "honda-hrv-ex-cvt",
      vin: "8A3HRV671TN940122",
      numeroMotor: "R18Z9-482019",
      patente: "0KM (Sin Rodar)",
      name: "Honda HR-V EX CVT",
      brand: "Honda",
      model: "HR-V",
      version: "EX CVT 1.8 2WD",
      year: 2026,
      category: "camionetas",
      categoryLabel: "Camioneta / SUV",
      condition: "0km",
      conditionLabel: "0KM",
      km: "0 km",
      engine: "1.8 i-VTEC 140 CV",
      transmission: "CVT Automática",
      fuel: "Nafta",
      traction: "Delantera (4x2)",
      color: "Gris Grafito Metalizado",
      precioCosto: 31500000,
      precioLista: 38200000,
      precioMinimo: 36500000,
      status: "disponible",
      publishedWeb: true,
      featuredWeb: true,
      entryDate: "2026-08-14",
      daysInStock: 34,
      image: "assets/vehicles/honda-hrv.png",
      prepExpenses: [
        { item: "Control de Entrega & Alistamiento 0KM", cost: 180000, date: "2026-08-15", provider: "Taller Os-Car" },
        { item: "Tratamiento Cerámico de Carrocería", cost: 240000, date: "2026-08-16", provider: "Detailing Varela" }
      ],
      description: "SUV urbano de referencia en versión EX con caja CVT. Climatizador, cámara de retroceso, pantalla de 7 pulgadas, ISOFIX y 6 airbags."
    },
    {
      id: "fiat-cronos-drive-pack",
      vin: "8APCRON18TN719402",
      numeroMotor: "F13GSE-394011",
      patente: "0KM (Sin Rodar)",
      name: "Fiat Cronos Drive Pack Conect",
      brand: "Fiat",
      model: "Cronos",
      version: "Drive 1.3 GSE Pack Conect",
      year: 2026,
      category: "autos",
      categoryLabel: "Auto / Sedán",
      condition: "0km",
      conditionLabel: "0KM",
      km: "0 km",
      engine: "1.3 Firefly 99 CV",
      transmission: "Manual 5 Vel.",
      fuel: "Nafta",
      traction: "Delantera",
      color: "Rojo Montecarlo Metalizado",
      precioCosto: 19800000,
      precioLista: 24500000,
      precioMinimo: 23200000,
      status: "disponible",
      publishedWeb: true,
      featuredWeb: true,
      entryDate: "2026-08-28",
      daysInStock: 20,
      image: "assets/vehicles/fiat-cronos.png",
      prepExpenses: [
        { item: "Revisión PDI y Kit de Alfombras", cost: 120000, date: "2026-08-29", provider: "Taller Os-Car" }
      ],
      description: "El sedán más vendido de Argentina. Motor Firefly cadenero ultra confiable, pantalla multimedia 7 pulg, pack eléctrico y sensores traseros."
    },
    {
      id: "peugeot-208-like",
      vin: "8AW208LK2TN820491",
      numeroMotor: "EB2F-501923",
      patente: "0KM (Sin Rodar)",
      name: "Peugeot 208 Like 1.2L",
      brand: "Peugeot",
      model: "208",
      version: "Like 1.2 Puretech",
      year: 2026,
      category: "autos",
      categoryLabel: "Auto / Hatchback",
      condition: "0km",
      conditionLabel: "0KM",
      km: "0 km",
      engine: "1.2 PureTech 82 CV",
      transmission: "Manual 5 Vel.",
      fuel: "Nafta",
      traction: "Delantera",
      color: "Blanco Nacré",
      precioCosto: 18400000,
      precioLista: 22800000,
      precioMinimo: 21500000,
      status: "reservado",
      publishedWeb: true,
      featuredWeb: false,
      entryDate: "2026-09-02",
      daysInStock: 15,
      image: "assets/vehicles/peugeot-208.png",
      prepExpenses: [
        { item: "Alistamiento de Entrega & Batería", cost: 95000, date: "2026-09-03", provider: "Taller Os-Car" }
      ],
      description: "Hatchback compacto de diseño europeo premiado con plataforma CMP. Pantalla táctil i-Cockpit, 4 airbags y control de estabilidad ESP."
    },
    {
      id: "toyota-sw4-2012",
      vin: "8AJTE59G4C5019384",
      numeroMotor: "1KD-FTV-894012",
      patente: "MNP 429",
      name: "Toyota SW4 4x4 7 Asientos",
      brand: "Toyota",
      model: "SW4",
      version: "SRV 3.0 D-4D 4x4 Cuero",
      year: 2012,
      category: "camionetas",
      categoryLabel: "Camioneta / SUV",
      condition: "usado",
      conditionLabel: "USADO",
      km: "148.000 km",
      engine: "3.0 Turbo Diesel Intercooler 171 CV",
      transmission: "Automática 5 Vel.",
      fuel: "Diesel Grado 3",
      traction: "4x4 Integral con Alta y Baja",
      color: "Gris Plata Metalizado",
      precioCosto: 21800000,
      precioLista: 26500000,
      precioMinimo: 25200000,
      status: "disponible",
      publishedWeb: true,
      featuredWeb: true,
      entryDate: "2026-07-21",
      daysInStock: 58,
      image: "assets/vehicles/toyota-sw4.png",
      prepExpenses: [
        { item: "Service Completo (Aceite sintético, filtros, refrigerante)", cost: 280000, date: "2026-07-23", provider: "Taller Os-Car" },
        { item: "Pastillas de freno delanteras y traseras", cost: 190000, date: "2026-07-24", provider: "Frenos Varela" },
        { item: "Limpieza integral de tapizados de cuero", cost: 150000, date: "2026-07-25", provider: "Detailing Varela" }
      ],
      description: "Ícono indiscutido de robustez mecánica y valor de reventa. 3 filas de asientos (7 plazas reales), climatizador bizona, tracción 4x4 y estado inmaculado."
    },
    {
      id: "chevrolet-onix-premier",
      vin: "8AGKL48T1TN394810",
      numeroMotor: "CSS3-204918",
      patente: "0KM (Sin Rodar)",
      name: "Chevrolet Onix Premier 1.0 Turbo A/T",
      brand: "Chevrolet",
      model: "Onix",
      version: "Premier 1.0T Automático",
      year: 2026,
      category: "autos",
      categoryLabel: "Auto / Hatchback",
      condition: "0km",
      conditionLabel: "0KM",
      km: "0 km",
      engine: "1.0 Turbo 116 CV 160 Nm",
      transmission: "Automática 6 Vel.",
      fuel: "Nafta",
      traction: "Delantera",
      color: "Azul Seeker Metalizado",
      precioCosto: 22100000,
      precioLista: 27400000,
      precioMinimo: 26000000,
      status: "disponible",
      publishedWeb: true,
      featuredWeb: true,
      entryDate: "2026-08-19",
      daysInStock: 29,
      image: "assets/vehicles/chevrolet-onix.png",
      prepExpenses: [
        { item: "Inspección de pre-entrega", cost: 110000, date: "2026-08-20", provider: "Taller Os-Car" }
      ],
      description: "Máxima tecnología del segmento: Wi-Fi nativo a bordo, asistente de estacionamiento semi-autónomo, alerta de punto ciego, 6 airbags y motor turbo eficiente."
    },
    {
      id: "renault-alaskan-iconic",
      vin: "8A1D23000TN948102",
      numeroMotor: "YS23DDT-492019",
      patente: "0KM (Sin Rodar)",
      name: "Renault Alaskan Iconic 4x4",
      brand: "Renault",
      model: "Alaskan",
      version: "Iconic 2.3 Bi-Turbo 4x4 AT",
      year: 2026,
      category: "camionetas",
      categoryLabel: "Camioneta / Pick-up",
      condition: "0km",
      conditionLabel: "0KM",
      km: "0 km",
      engine: "2.3 Bi-Turbo Diesel 190 CV 450 Nm",
      transmission: "Automática 7 Vel.",
      fuel: "Diesel Grado 3",
      traction: "4x4 Electrónica con Reductora",
      color: "Gris Cuarzo",
      precioCosto: 39500000,
      precioLista: 48900000,
      precioMinimo: 46800000,
      status: "disponible",
      publishedWeb: true,
      featuredWeb: false,
      entryDate: "2026-08-10",
      daysInStock: 38,
      image: "assets/vehicles/renault-alaskan.png",
      prepExpenses: [
        { item: "Instalación de Cobertor de Caja y Lona Marina", cost: 380000, date: "2026-08-12", provider: "Equipamientos Zona Sur" }
      ],
      description: "Pick-up de alta gama con suspensión trasera multilink independiente para máximo confort de marcha. Cámaras 360°, tapizados de cuero, techo solar corredizo."
    },
    {
      id: "toyota-hilux-srv-2021",
      vin: "8AJBA3CD8M2049182",
      numeroMotor: "1GD-FTV-394812",
      patente: "AF 192 BC",
      name: "Toyota Hilux SRV 2.8 4x4 AT",
      brand: "Toyota",
      model: "Hilux",
      version: "SRV 2.8 TDI 4x4 Automática",
      year: 2021,
      category: "camionetas",
      categoryLabel: "Camioneta / Pick-up",
      condition: "usado",
      conditionLabel: "USADO",
      km: "68.500 km",
      engine: "2.8 Turbo Diesel 204 CV 500 Nm",
      transmission: "Automática 6 Vel.",
      fuel: "Diesel Grado 3",
      traction: "4x4",
      color: "Blanco Perlado",
      precioCosto: 33200000,
      precioLista: 39800000,
      precioMinimo: 38200000,
      status: "vendido",
      publishedWeb: false,
      featuredWeb: false,
      entryDate: "2026-08-01",
      daysInStock: 25,
      image: "assets/vehicles/toyota-hilux.jpg",
      prepExpenses: [
        { item: "Service Oficial 70.000km", cost: 340000, date: "2026-08-03", provider: "Toyota Kansai" },
        { item: "Pulido 3 pasos y limpieza de chasis", cost: 180000, date: "2026-08-04", provider: "Detailing Varela" }
      ],
      description: "La pick-up más vendida del país. Motor de 204 CV, audio JBL con subwoofer, 7 airbags y bloqueo de diferencial trasero."
    },
    {
      id: "vw-amarok-highline-2020",
      vin: "8AW2H42A4LA094812",
      numeroMotor: "DDXB-294810",
      patente: "AD 892 XQ",
      name: "Volkswagen Amarok V6 Highline",
      brand: "Volkswagen",
      model: "Amarok",
      version: "Highline V6 3.0 258 CV 4Motion",
      year: 2020,
      category: "camionetas",
      categoryLabel: "Camioneta / Pick-up",
      condition: "usado",
      conditionLabel: "USADO",
      km: "74.000 km",
      engine: "3.0 V6 TDI 258 CV 580 Nm",
      transmission: "Automática ZF 8 Vel.",
      fuel: "Diesel Grado 3",
      traction: "4Motion Integral Permanente",
      color: "Gris Indium Metalizado",
      precioCosto: 34800000,
      precioLista: 42500000,
      precioMinimo: 40900000,
      status: "en_preparacion",
      publishedWeb: false,
      featuredWeb: false,
      entryDate: "2026-09-12",
      daysInStock: 5,
      image: "assets/vehicles/vw-amarok.jpg",
      prepExpenses: [
        { item: "Reemplazo de pastillas y discos de freno", cost: 360000, date: "2026-09-13", provider: "Taller Os-Car" },
        { item: "Pintura de paragolpes delantero por raspones de estacionamiento", cost: 240000, date: "2026-09-14", provider: "Chapa Varela" }
      ],
      description: "Potencia brutal y aceleración inigualable. Motor V6 de 258 CV con función Overboost a 272 CV. Frenos a disco en las 4 ruedas."
    },
    {
      id: "iveco-daily-chasis",
      vin: "8AP35C15TN948102",
      numeroMotor: "F1C-394810",
      patente: "0KM (Sin Rodar)",
      name: "Iveco Daily 35-150 Chasis Cabina",
      brand: "Iveco",
      model: "Daily",
      version: "35-150 Chasis Cabina Rodado Simple",
      year: 2026,
      category: "camiones",
      categoryLabel: "Camión / Utilitario",
      condition: "0km",
      conditionLabel: "0KM",
      km: "0 km",
      engine: "3.0 FPT 150 CV",
      transmission: "Manual 6 Vel.",
      fuel: "Diesel",
      traction: "Trasera 4x2",
      color: "Blanco Polar",
      precioCosto: 43000000,
      precioLista: 52900000,
      precioMinimo: 50500000,
      status: "disponible",
      publishedWeb: true,
      featuredWeb: false,
      entryDate: "2026-08-20",
      daysInStock: 28,
      image: "assets/vehicles/iveco-daily.jpg",
      prepExpenses: [
        { item: "Alistamiento de chasis y baterías", cost: 210000, date: "2026-08-22", provider: "Taller Os-Car" }
      ],
      description: "Utilitario pesado para transporte de cargas con carnet de conducir B1 estándar. Capacidad de carrozado hasta 4.20 metros."
    },
    {
      id: "honda-xr-250-tornado",
      vin: "8A2MD3800TN948102",
      numeroMotor: "MD38E-492019",
      patente: "0KM (Sin Rodar)",
      name: "Honda XR 250 Tornado",
      brand: "Honda",
      model: "XR 250",
      version: "Tornado On-Off",
      year: 2026,
      category: "motos",
      categoryLabel: "Moto / Enduro",
      condition: "0km",
      conditionLabel: "0KM",
      km: "0 km",
      engine: "249 cc DOHC 4 Válvulas",
      transmission: "Manual 6 Vel.",
      fuel: "Nafta",
      traction: "Cadena",
      color: "Rojo Rally Oficial Honda",
      precioCosto: 6100000,
      precioLista: 7850000,
      precioMinimo: 7400000,
      status: "disponible",
      publishedWeb: true,
      featuredWeb: false,
      entryDate: "2026-09-05",
      daysInStock: 12,
      image: "assets/vehicles/honda-tornado.jpg",
      prepExpenses: [
        { item: "Armado de cajón y puesta en marcha", cost: 65000, date: "2026-09-06", provider: "Motos Varela" }
      ],
      description: "La moto On-Off líder indiscutida en Argentina. Suspensiones de largo recorrido Pro-Link, frenos a disco y máxima confiabilidad."
    }
  ],

  // Operaciones de Venta y Financiación
  sales: [
    {
      id: "VTA-2026-089",
      date: "2026-09-14",
      vehicleId: "toyota-hilux-srv-2021",
      vehicleName: "Toyota Hilux SRV 2.8 4x4 AT",
      vehicleCondition: "Usado 2021",
      clientId: "CLI-4029",
      clientName: "Esteban Marcos Bianchi",
      clientDni: "28.491.802",
      clientPhone: "11-4829-1049",
      sellerId: "VEND-01",
      sellerName: "Martín Benítez",
      montoTotal: 39800000,
      montoContado: 15800000,
      montoFinanciado: 14000000,
      montoPermutaUsado: 10000000,
      permutaDetalle: "Chevrolet Celta 1.4 Advantage 2014 (Patente OPI 924)",
      financiera: "Directa Os-Car",
      cuotasCantidad: 24,
      cuotaMontoFijo: 895000,
      tasaInteresAnual: 42.0,
      comisionVendedorMonto: 796000,
      status: "en_documentacion",
      entregaEstimada: "2026-09-22",
      documentacionEstado: "Pendiente F08 y Verificación"
    },
    {
      id: "VTA-2026-088",
      date: "2026-09-11",
      vehicleId: "fiat-cronos-drive-pack",
      vehicleName: "Fiat Cronos Drive Pack Conect 0KM",
      vehicleCondition: "0km 2026",
      clientId: "CLI-4028",
      clientName: "Silvia Noemí Giménez",
      clientDni: "34.192.481",
      clientPhone: "11-6849-3019",
      sellerId: "VEND-02",
      sellerName: "Gonzalo Peralta",
      montoTotal: 24500000,
      montoContado: 6500000,
      montoFinanciado: 18000000,
      montoPermutaUsado: 0,
      permutaDetalle: null,
      financiera: "Banco Santander / Prendario",
      cuotasCantidad: 36,
      cuotaMontoFijo: 865000,
      tasaInteresAnual: 39.5,
      comisionVendedorMonto: 490000,
      status: "entregada",
      entregaEstimada: "2026-09-16",
      documentacionEstado: "Completada y Patentado"
    },
    {
      id: "VTA-2026-087",
      date: "2026-09-08",
      vehicleId: "peugeot-208-like",
      vehicleName: "Peugeot 208 Like 1.2L 0KM",
      vehicleCondition: "0km 2026",
      clientId: "CLI-4027",
      clientName: "Matías Javier Romero",
      clientDni: "39.401.829",
      clientPhone: "11-5049-2819",
      sellerId: "VEND-01",
      sellerName: "Martín Benítez",
      montoTotal: 22800000,
      montoContado: 10800000,
      montoFinanciado: 12000000,
      montoPermutaUsado: 0,
      permutaDetalle: null,
      financiera: "Directa Os-Car (Solo DNI)",
      cuotasCantidad: 18,
      cuotaMontoFijo: 940000,
      tasaInteresAnual: 38.0,
      comisionVendedorMonto: 456000,
      status: "sena",
      entregaEstimada: "2026-09-25",
      documentacionEstado: "A la espera de liquidación bancaria"
    }
  ],

  // CRM & Leads Entrantes
  leads: [
    {
      id: "LEAD-1049",
      fullName: "Carlos Eduardo Mendoza",
      phone: "11-6284-9102",
      email: "carlos.mendoza@gmail.com",
      channel: "Buscador Web",
      vehicleInterest: "Toyota SW4 4x4 7 Asientos (2012)",
      status: "en_negociacion",
      sellerAssigned: "Martín Benítez",
      date: "2026-09-16",
      notes: "Tiene un Corolla 2017 para entregar en parte de pago. Quiere simular cuotas fijas por $10M restantes."
    },
    {
      id: "LEAD-1048",
      fullName: "Florencia Belén Castro",
      phone: "11-4829-1093",
      email: "flor.castro@hotmail.com",
      channel: "WhatsApp Directo",
      vehicleInterest: "Fiat Cronos Drive Pack Conect 0km",
      status: "nuevo",
      sellerAssigned: "Gonzalo Peralta",
      date: "2026-09-17",
      notes: "Consulta por anticipo mínimo y entrega inmediata. Solo DNI."
    },
    {
      id: "LEAD-1047",
      fullName: "Jorge Luis Domínguez",
      phone: "11-3948-2019",
      email: "jorgedominguez_transp@yahoo.com.ar",
      channel: "Visita Salón",
      vehicleInterest: "Iveco Daily 35-150 Chasis Cabina",
      status: "contactado",
      sellerAssigned: "Martín Benítez",
      date: "2026-09-15",
      notes: "Transportista de Florencio Varela. Busca financiar con factura A y plazo a 36 meses."
    },
    {
      id: "LEAD-1046",
      fullName: "Romina Soledad Varela",
      phone: "11-7193-4029",
      email: "romina.varela@outlook.com",
      channel: "Web Wizard",
      vehicleInterest: "Chevrolet Onix Premier 1.0T",
      status: "en_negociacion",
      sellerAssigned: "Gonzalo Peralta",
      date: "2026-09-14",
      notes: "Aprobada pre-calificación crediticia por Banco Santander. Seña programada para el viernes."
    }
  ],

  // Tomas de Usados / Permutas
  tradeIns: [
    {
      id: "TOMA-042",
      date: "2026-09-14",
      relatedSaleId: "VTA-2026-089",
      clientName: "Esteban Marcos Bianchi",
      vehicleDesc: "Chevrolet Celta 1.4 Advantage 5P",
      year: 2014,
      km: "112.000 km",
      patente: "OPI 924",
      valorTasadoOfrecido: 9800000,
      valorTasadoAprobado: 10000000,
      status: "aprobada",
      observacionesMecanicas: "Distribución recién hecha. Detalles menores de chapa en guardabarros trasero izquierdo. Pasa a taller para service de ingreso."
    },
    {
      id: "TOMA-041",
      date: "2026-09-16",
      relatedSaleId: null,
      clientName: "Carlos Eduardo Mendoza",
      vehicleDesc: "Toyota Corolla 1.8 XEI Manual",
      year: 2017,
      km: "89.000 km",
      patente: "AB 491 QZ",
      valorTasadoOfrecido: 17200000,
      valorTasadoAprobado: 16800000,
      status: "pendiente",
      observacionesMecanicas: "Excelente estado de chapa y pintura. Cubiertas al 80%. Documentación completa al día con verificación policial."
    }
  ],

  // Vendedores & Personal
  sellers: [
    { id: "VEND-01", name: "Martín Benítez", role: "Vendedor Senior", ventasMes: 5, comisionAcumulada: 2180000, metaMes: 6, avatar: "MB", email: "martin.b@automotoresoscar.com.ar", phone: "11-4521-8899" },
    { id: "VEND-02", name: "Gonzalo Peralta", role: "Vendedor 0km & Usados", ventasMes: 3, comisionAcumulada: 1510000, metaMes: 5, avatar: "GP", email: "gonzalo.p@automotoresoscar.com.ar", phone: "11-6622-3344" },
    { id: "ADM-01", name: "Laura Danesi", role: "Jefa de Administración y Gestoría", ventasMes: 0, comisionAcumulada: 0, metaMes: 0, avatar: "LD", email: "administracion@automotoresoscar.com.ar", phone: "11-4275-1489" },
    { id: "DIR-01", name: "Oscar Varela", role: "Director General / Titular", ventasMes: 0, comisionAcumulada: 0, metaMes: 0, avatar: "OV", email: "direccion@automotoresoscar.com.ar", phone: "11-4275-0302" }
  ],

  // Flota de Vehículos Vendidos con Historial de Rentabilidad
  soldVehicles: [
    {
      id: "ford-ranger-limited-vendida",
      name: "Ford Ranger Limited 3.2 TDCi 4x4 AT",
      brand: "Ford",
      model: "Ranger",
      version: "Limited 4x4 AT",
      year: 2021,
      category: "camioneta",
      categoryLabel: "Camioneta / Pick-Up",
      condition: "usado",
      conditionLabel: "USADO SELECCIONADO",
      km: "62.000 km",
      engine: "3.2 TDCi Puma 200 CV",
      transmission: "Automática 6 Vel.",
      fuel: "Diesel",
      color: "Gris Mercurio",
      patente: "AF 192 LL",
      vin: "8AF9XR210MT558192",
      numeroMotor: "SA2R9812903",
      image: "assets/vehicles/ford-ranger.jpg",
      precioCosto: 31200000,
      gastosTaller: 780000,
      precioVenta: 38900000,
      gananciaNeta: 6920000,
      margenRentabilidad: "17.8%",
      fechaVenta: "2026-09-12",
      clienteNombre: "Carlos D. Bustos",
      clienteDni: "24.912.801",
      vendedor: "Martín Benítez",
      formaPago: "Anticipo $18.900.000 + 24 Cuotas Fijas Solo DNI",
      status: "vendido",
      comprobanteId: "REC-2026-081"
    },
    {
      id: "vw-gol-trend-vendido",
      name: "Volkswagen Gol Trend Comfortline 1.6 MSI",
      brand: "Volkswagen",
      model: "Gol Trend",
      version: "Comfortline 5P",
      year: 2019,
      category: "auto",
      categoryLabel: "Auto / Hatchback",
      condition: "usado",
      conditionLabel: "USADO SELECCIONADO",
      km: "78.000 km",
      engine: "1.6 MSI 101 CV",
      transmission: "Manual 5 Vel.",
      fuel: "Nafta",
      color: "Blanco Cristal",
      patente: "AD 412 PK",
      vin: "9BWAB45U9KT109281",
      numeroMotor: "CFZ8491209",
      image: "assets/vehicles/vw-gol.jpg",
      precioCosto: 12100000,
      gastosTaller: 350000,
      precioVenta: 15400000,
      gananciaNeta: 2950000,
      margenRentabilidad: "19.2%",
      fechaVenta: "2026-09-08",
      clienteNombre: "Mariana Soledad Sosa",
      clienteDni: "34.192.839",
      vendedor: "Gonzalo Peralta",
      formaPago: "100% Contado Transferencia Bancaria",
      status: "vendido",
      comprobanteId: "REC-2026-078"
    },
    {
      id: "toyota-corolla-xli-vendido",
      name: "Toyota Corolla XLI 2.0 Dynamic Force CVT",
      brand: "Toyota",
      model: "Corolla",
      version: "XLI CVT",
      year: 2022,
      category: "auto",
      categoryLabel: "Auto / Sedán",
      condition: "usado",
      conditionLabel: "USADO SELECCIONADO",
      km: "41.000 km",
      engine: "2.0 Dynamic Force 170 CV",
      transmission: "Direct Shift CVT 10 Vel.",
      fuel: "Nafta",
      color: "Gris Plata Metálico",
      patente: "AF 610 BB",
      vin: "9BRBL3HE2NP401928",
      numeroMotor: "M20A7718290",
      image: "assets/vehicles/toyota-corolla.jpg",
      precioCosto: 22800000,
      gastosTaller: 410000,
      precioVenta: 27900000,
      gananciaNeta: 4690000,
      margenRentabilidad: "16.8%",
      fechaVenta: "2026-09-04",
      clienteNombre: "Esteban Marcos Bianchi",
      clienteDni: "28.491.092",
      vendedor: "Martín Benítez",
      formaPago: "Toma de Chevrolet Celta ($10.000.000) + Saldo Financiado",
      status: "vendido",
      comprobanteId: "REC-2026-074"
    },
    {
      id: "peugeot-2008-active-vendido",
      name: "Peugeot 2008 Allure 1.6 Tiptronic 0km",
      brand: "Peugeot",
      model: "2008",
      version: "Allure 1.6 Tiptronic",
      year: 2026,
      category: "auto",
      categoryLabel: "Auto / SUV Compacto",
      condition: "0km",
      conditionLabel: "0KM OFICIAL",
      km: "0 km",
      engine: "1.6 VTi 115 CV",
      transmission: "Automática Tiptronic 6 Vel.",
      fuel: "Nafta",
      color: "Gris Artense",
      patente: "0KM (Sin Rodar)",
      vin: "8ADCU5FP2RT001928",
      numeroMotor: "EC59102839",
      image: "assets/vehicles/peugeot-2008.png",
      precioCosto: 24500000,
      gastosTaller: 180000,
      precioVenta: 29800000,
      gananciaNeta: 5120000,
      margenRentabilidad: "17.2%",
      fechaVenta: "2026-08-29",
      clienteNombre: "Luciana Beatriz Rossi",
      clienteDni: "31.209.481",
      vendedor: "Martín Benítez",
      formaPago: "50% Anticipo + 18 Cuotas Fijas en Pesos",
      status: "vendido",
      comprobanteId: "REC-2026-069"
    },
    {
      id: "citroen-c4-cactus-vendido",
      name: "Citroën C4 Cactus Feel Pack 1.6 AT",
      brand: "Citroën",
      model: "C4 Cactus",
      version: "Feel Pack VTi AT",
      year: 2023,
      category: "auto",
      categoryLabel: "Auto / Crossover",
      condition: "usado",
      conditionLabel: "USADO SELECCIONADO",
      km: "29.000 km",
      engine: "1.6 VTi 115 CV",
      transmission: "Automática 6 Vel.",
      fuel: "Nafta",
      color: "Blanco Banquise / Techo Negro",
      patente: "AF 891 ZQ",
      vin: "8A3CU5FP6PT391029",
      numeroMotor: "EC58491029",
      image: "assets/vehicles/citroen-c4.png",
      precioCosto: 18400000,
      gastosTaller: 320000,
      precioVenta: 22600000,
      gananciaNeta: 3880000,
      margenRentabilidad: "17.1%",
      fechaVenta: "2026-08-20",
      clienteNombre: "Guillermo Horacio Varela",
      clienteDni: "22.840.192",
      vendedor: "Gonzalo Peralta",
      formaPago: "Anticipo $11.000.000 + 36 Cuotas Fijas Solo DNI",
      status: "vendido",
      comprobanteId: "REC-2026-063"
    }
  ],

  // Libro de Movimientos Financieros (Ingresos, Egresos, Cobranzas)
  financeMovements: [
    {
      id: "MOV-2026-001",
      date: "2026-09-17",
      type: "ingreso",
      category: "Seña de Venta",
      concept: "Seña Reserva Fiat Cronos Drive 0km (Luciana Fernández)",
      amount: 4900000,
      paymentMethod: "Transferencia Bancaria",
      receipt: "REC-2026-004",
      status: "conciliado"
    },
    {
      id: "MOV-2026-002",
      date: "2026-09-16",
      type: "egreso",
      category: "Taller & Service",
      concept: "Factura A-819 Taller Os-Car: amortiguadores SW4 y fluidos",
      amount: 1150000,
      paymentMethod: "Cheque Echeq 30d",
      receipt: "FAC-TALLER-819",
      status: "conciliado"
    },
    {
      id: "MOV-2026-003",
      date: "2026-09-15",
      type: "ingreso",
      category: "Cobranza de Cuotas",
      concept: "Liquidación cuotas fijas en pesos (Lote Santander DNI - 18 cuotas)",
      amount: 14850000,
      paymentMethod: "Débito Automático",
      receipt: "LQ-STNDR-992",
      status: "conciliado"
    },
    {
      id: "MOV-2026-004",
      date: "2026-09-14",
      type: "egreso",
      category: "Toma de Usado",
      concept: "Pago diferencia permuta Chevrolet Celta (Esteban Bianchi)",
      amount: 9800000,
      paymentMethod: "Transferencia Inmediata",
      receipt: "COMP-TOMA-042",
      status: "conciliado"
    },
    {
      id: "MOV-2026-005",
      date: "2026-09-12",
      type: "ingreso",
      category: "Venta de Contado",
      concept: "Cobro total saldo Ford Ranger Limited 4x4 (Carlos Bustos)",
      amount: 18900000,
      paymentMethod: "Transferencia Bancaria",
      receipt: "REC-2026-081",
      status: "conciliado"
    },
    {
      id: "MOV-2026-006",
      date: "2026-09-10",
      type: "egreso",
      category: "Gastos Generales",
      concept: "Alquiler Salón y Playa Casa Central Av. San Martín",
      amount: 3200000,
      paymentMethod: "Transferencia",
      receipt: "ALQ-SEP-2026",
      status: "conciliado"
    },
    {
      id: "MOV-2026-007",
      date: "2026-09-08",
      type: "egreso",
      category: "Comisiones",
      concept: "Anticipo liquidación de comisiones período Agosto 2026",
      amount: 2500000,
      paymentMethod: "Transferencia",
      receipt: "LIQ-COM-AGO",
      status: "conciliado"
    }
  ],

  // Comisiones de Vendedores y Liquidaciones
  sellerCommissions: [
    {
      id: "COM-2026-09-01",
      sellerId: "VEND-01",
      sellerName: "Martín Benítez",
      period: "Septiembre 2026",
      closedUnits: 5,
      totalVolume: 124800000,
      commissionEarned: 2180000,
      paidStatus: "parcial",
      paidAmount: 1000000,
      pendingAmount: 1180000,
      targetUnits: 6,
      targetCompletion: 83.3,
      policy: "1.75% s/ precio de lista + $50.000 por 0km"
    },
    {
      id: "COM-2026-09-02",
      sellerId: "VEND-02",
      sellerName: "Gonzalo Peralta",
      period: "Septiembre 2026",
      closedUnits: 3,
      totalVolume: 82500000,
      commissionEarned: 1510000,
      paidStatus: "pendiente",
      paidAmount: 0,
      pendingAmount: 1510000,
      targetUnits: 5,
      targetCompletion: 60.0,
      policy: "1.75% s/ precio de lista + $50.000 por 0km"
    },
    {
      id: "COM-2026-08-01",
      sellerId: "VEND-01",
      sellerName: "Martín Benítez",
      period: "Agosto 2026",
      closedUnits: 6,
      totalVolume: 141200000,
      commissionEarned: 2470000,
      paidStatus: "pagado",
      paidAmount: 2470000,
      pendingAmount: 0,
      targetUnits: 6,
      targetCompletion: 100.0,
      policy: "1.75% s/ precio de lista + $50.000 por 0km"
    },
    {
      id: "COM-2026-08-02",
      sellerId: "VEND-02",
      sellerName: "Gonzalo Peralta",
      period: "Agosto 2026",
      closedUnits: 5,
      totalVolume: 118400000,
      commissionEarned: 2070000,
      paidStatus: "pagado",
      paidAmount: 2070000,
      pendingAmount: 0,
      targetUnits: 5,
      targetCompletion: 100.0,
      policy: "1.75% s/ precio de lista + $50.000 por 0km"
    }
  ],

  // Línea de tiempo diaria/semanal para el Gráfico de Ritmo y Volumen de Ventas
  salesTimeline: [
    { date: "2026-09-01", units: 1, volume: 22400000, model: "Peugeot 208", condition: "usado" },
    { date: "2026-09-04", units: 1, volume: 27900000, model: "Toyota Corolla", condition: "usado" },
    { date: "2026-09-06", units: 1, volume: 34500000, model: "Honda HR-V", condition: "0km" },
    { date: "2026-09-08", units: 1, volume: 15400000, model: "VW Gol Trend", condition: "usado" },
    { date: "2026-09-10", units: 1, volume: 46200000, model: "Renault Alaskan", condition: "0km" },
    { date: "2026-09-12", units: 1, volume: 38900000, model: "Ford Ranger", condition: "usado" },
    { date: "2026-09-14", units: 1, volume: 26800000, model: "Fiat Cronos", condition: "0km" },
    { date: "2026-09-17", units: 1, volume: 38500000, model: "Toyota SW4", condition: "usado" }
  ],

  // Desglose de Flujo de Fondos para Gráfico Interactivo de Finanzas
  cashFlowData: {
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
  },

  // Flujo Operativo de Taller & Preparación de Unidades (Checklist y Service)
  workshopJobs: [
    {
      id: "TLR-2026-01",
      vehicleId: "toyota-sw4-2012",
      vehicleName: "Toyota SW4 4x4 7 Asientos",
      patente: "MNP 429",
      year: 2012,
      stage: "detailing", // ingreso | mecanica | chapa_pintura | detailing | listo
      stageLabel: "Detailing & Lustrado",
      mechanic: "Marcos Medina",
      priority: "alta",
      entryDate: "2026-09-12",
      estimatedDelivery: "2026-09-19",
      costTotal: 620000,
      tasks: [
        { desc: "Cambio de fluidos y kit de distribución", status: "completado", cost: 380000 },
        { desc: "Pulido ópticas delanteras y cerámico 3M", status: "en_proceso", cost: 240000 }
      ]
    },
    {
      id: "TLR-2026-02",
      vehicleId: "ford-ranger-usado",
      vehicleName: "Ford Ranger XLT 3.2 4x4",
      patente: "AC 821 LM",
      year: 2018,
      stage: "mecanica",
      stageLabel: "Mecánica Ligera",
      mechanic: "Esteban Roldán",
      priority: "media",
      entryDate: "2026-09-14",
      estimatedDelivery: "2026-09-20",
      costTotal: 480000,
      tasks: [
        { desc: "Reemplazo de pastillas de freno y alineación", status: "completado", cost: 180000 },
        { desc: "Service 60.000 km con bujías y filtros", status: "en_proceso", cost: 300000 }
      ]
    },
    {
      id: "TLR-2026-03",
      vehicleId: "peugeot-208-feline",
      vehicleName: "Peugeot 208 Feline Tiptronic",
      patente: "0KM (Sin Rodar)",
      year: 2026,
      stage: "listo",
      stageLabel: "Listo para Salón",
      mechanic: "Marcos Medina",
      priority: "normal",
      entryDate: "2026-09-15",
      estimatedDelivery: "2026-09-17",
      costTotal: 210000,
      tasks: [
        { desc: "Control de entrega oficial 0KM y colocación de alfombras", status: "completado", cost: 90000 },
        { desc: "Sellado acrílico de pintura para showroom", status: "completado", cost: 120000 }
      ]
    },
    {
      id: "TLR-2026-04",
      vehicleId: "iveco-daily-chasis",
      vehicleName: "Iveco Daily 70C17 Chasis",
      patente: "0KM (Sin Rodar)",
      year: 2026,
      stage: "ingreso",
      stageLabel: "Ingreso & Peritaje",
      mechanic: "Esteban Roldán",
      priority: "alta",
      entryDate: "2026-09-17",
      estimatedDelivery: "2026-09-22",
      costTotal: 340000,
      tasks: [
        { desc: "Desparafinado y chequeo de batería", status: "pendiente", cost: 140000 },
        { desc: "Instalación de tacógrafo homologado", status: "pendiente", cost: 200000 }
      ]
    }
  ],

  // Control Registral, Gestoría y Transferencias DNRPA
  transfers: [
    {
      id: "TRF-2026-101",
      vehicleName: "Toyota Hilux DX 2.4 4x4",
      patente: "AF 392 PK",
      condition: "usado",
      titular: "Carlos Eduardo Gómez",
      dni: "29.481.029",
      buyer: "Transportes El Halcón S.A.",
      buyerCuit: "30-71492011-4",
      gestor: "Dra. Lorena Peralta",
      registroSeccional: "DNRPA Seccional N° 2 F. Varela",
      f08Status: "firmado", // firmado | pendiente | observado
      f12Verificacion: "aprobado", // aprobado | pendiente
      dominioDnrpa: "limpio", // limpio | con_prenda | observado
      patentesStatus: "al_dia", // al_dia | con_deuda
      infraccionesStatus: "al_dia",
      cedulaStatus: "emitida", // emitida | en_tramite
      stage: "finalizado", // ingresado | documentando | presentado | finalizado
      daysInProcess: 5,
      estimatedFinishDate: "2026-09-15"
    },
    {
      id: "TRF-2026-102",
      vehicleName: "Honda HR-V EX CVT",
      patente: "0KM (Inscripción Inicial)",
      condition: "0km",
      titular: "Automotores Os-Car S.R.L.",
      dni: "30-68942154-8",
      buyer: "Dr. Marcelo Damián Russo",
      buyerCuit: "20-33819402-9",
      gestor: "Dra. Lorena Peralta",
      registroSeccional: "DNRPA Seccional N° 1 F. Varela",
      f08Status: "firmado",
      f12Verificacion: "aprobado",
      dominioDnrpa: "limpio",
      patentesStatus: "al_dia",
      infraccionesStatus: "al_dia",
      cedulaStatus: "en_tramite",
      stage: "presentado",
      daysInProcess: 3,
      estimatedFinishDate: "2026-09-21"
    },
    {
      id: "TRF-2026-103",
      vehicleName: "VW Gol Trend Comfortline",
      patente: "AD 491 MN",
      condition: "usado",
      titular: "Mariana Soledad Díaz",
      dni: "34.192.833",
      buyer: "Gonzalo Javier Nieva",
      buyerCuit: "20-38491022-3",
      gestor: "Estudio Mandatarios Sur",
      registroSeccional: "DNRPA Quilmes N° 4",
      f08Status: "firmado",
      f12Verificacion: "aprobado",
      dominioDnrpa: "limpio",
      patentesStatus: "con_deuda", // alerta patentes pendientes
      infraccionesStatus: "al_dia",
      cedulaStatus: "en_tramite",
      stage: "documentando",
      daysInProcess: 8,
      estimatedFinishDate: "2026-09-24"
    },
    {
      id: "TRF-2026-104",
      vehicleName: "Renault Alaskan Comfort 4x4",
      patente: "0KM (Inscripción Inicial)",
      condition: "0km",
      titular: "Automotores Os-Car S.R.L.",
      dni: "30-68942154-8",
      buyer: "Agropecuaria Los Manantiales",
      buyerCuit: "30-64810294-7",
      gestor: "Dra. Lorena Peralta",
      registroSeccional: "DNRPA Seccional N° 3 F. Varela",
      f08Status: "firmado",
      f12Verificacion: "aprobado",
      dominioDnrpa: "limpio",
      patentesStatus: "al_dia",
      infraccionesStatus: "al_dia",
      cedulaStatus: "emitida",
      stage: "finalizado",
      daysInProcess: 4,
      estimatedFinishDate: "2026-09-16"
    }
  ],

  // Auditoría Multimedia & Canales de Publicación Web
  webPublications: [
    {
      vehicleId: "honda-hrv-ex-cvt",
      name: "Honda HR-V EX CVT",
      patente: "0KM",
      condition: "0km",
      photosCount: 16,
      photosTarget: 16,
      has360: true,
      hasVideo: true,
      channels: { web: true, mercadolibre: true, facebook: true, instagram: true },
      viewsCount: 684,
      leadsCount: 18,
      lastSync: "Hoy 11:20 hs",
      status: "activo"
    },
    {
      vehicleId: "fiat-cronos-drive-pack",
      name: "Fiat Cronos Drive Pack Conect",
      patente: "0KM",
      condition: "0km",
      photosCount: 14,
      photosTarget: 16,
      has360: true,
      hasVideo: false,
      channels: { web: true, mercadolibre: true, facebook: true, instagram: false },
      viewsCount: 890,
      leadsCount: 26,
      lastSync: "Hoy 09:45 hs",
      status: "activo"
    },
    {
      vehicleId: "peugeot-208-feline",
      name: "Peugeot 208 Feline Tiptronic",
      patente: "0KM",
      condition: "0km",
      photosCount: 16,
      photosTarget: 16,
      has360: true,
      hasVideo: true,
      channels: { web: true, mercadolibre: true, facebook: true, instagram: true },
      viewsCount: 540,
      leadsCount: 15,
      lastSync: "Ayer 18:30 hs",
      status: "activo"
    },
    {
      vehicleId: "toyota-sw4-2012",
      name: "Toyota SW4 4x4 7 Asientos",
      patente: "MNP 429",
      condition: "usado",
      photosCount: 12,
      photosTarget: 16,
      has360: false,
      hasVideo: false,
      channels: { web: true, mercadolibre: true, facebook: true, instagram: false },
      viewsCount: 1120,
      leadsCount: 31,
      lastSync: "Hoy 10:15 hs",
      status: "pausado" // En preparación de fotos
    },
    {
      vehicleId: "renault-alaskan-comfort",
      name: "Renault Alaskan Comfort 4x4",
      patente: "0KM",
      condition: "0km",
      photosCount: 16,
      photosTarget: 16,
      has360: true,
      hasVideo: true,
      channels: { web: true, mercadolibre: true, facebook: true, instagram: true },
      viewsCount: 430,
      leadsCount: 12,
      lastSync: "Hoy 08:30 hs",
      status: "activo"
    }
  ],

  // Agenda de Turnos & Entregas en Salón
  appointments: [
    {
      id: "TUR-901",
      type: "entrega", // entrega | test_drive | peritaje | firma
      typeLabel: "Ceremonia Entrega Llave 0KM",
      date: "2026-09-18",
      time: "11:00 hs",
      client: "Martín Alejandro Benítez",
      phone: "+54 9 11 4912-3841",
      vehicle: "Honda HR-V EX CVT 0KM",
      seller: "Roberto Páez",
      status: "confirmado",
      notes: "Unidad con pulido cerámico listo, entrega en tarima de showroom con obsequio Os-Car."
    },
    {
      id: "TUR-902",
      type: "test_drive",
      typeLabel: "Test Drive en Autopista",
      date: "2026-09-18",
      time: "15:30 hs",
      client: "Gonzalo Javier Nieva",
      phone: "+54 9 11 3849-1022",
      vehicle: "Fiat Cronos Drive Pack 0KM",
      seller: "Carlos Gómez",
      status: "confirmado",
      notes: "Interesado en línea prendaria 24 cuotas fijas con DNI. Copia de registro cargada."
    },
    {
      id: "TUR-903",
      type: "peritaje",
      typeLabel: "Peritaje Técnico de Permuta",
      date: "2026-09-19",
      time: "10:00 hs",
      client: "Dr. Marcelo Damián Russo",
      phone: "+54 9 11 5820-9411",
      vehicle: "Ford Focus SE Plus 2017 (Toma Usado)",
      seller: "Lucía Varela",
      status: "confirmado",
      notes: "Chequeo de pintura con micrómetro y verificación de compresión de motor."
    },
    {
      id: "TUR-904",
      type: "firma",
      typeLabel: "Firma de Boleto & Certificación 08",
      date: "2026-09-19",
      time: "12:30 hs",
      client: "Transportes El Halcón S.A.",
      phone: "+54 9 11 4287-1902",
      vehicle: "Iveco Daily 70C17 Chasis",
      seller: "Roberto Páez",
      status: "pendiente",
      notes: "Presenta apoderado de la firma con poder notarial y constancia CUIT."
    }
  ],

  // Personal, RRHH & Equipo de Salón Os-Car
  employees: [
    {
      id: "EMP-01",
      name: "Roberto Páez",
      role: "Asesor Comercial Senior",
      department: "Ventas",
      phone: "+54 9 11 5491-3829",
      email: "rpaez@automotoresoscar.com.ar",
      shift: "Lunes a Sábado 09:00 a 18:30",
      rating: 4.9,
      closedUnits: 4,
      totalVolume: 89400000,
      status: "activo"
    },
    {
      id: "EMP-02",
      name: "Carlos Gómez",
      role: "Asesor Comercial Flota & Utilitarios",
      department: "Ventas",
      phone: "+54 9 11 6392-1049",
      email: "cgomez@automotoresoscar.com.ar",
      shift: "Lunes a Sábado 09:00 a 18:30",
      rating: 4.8,
      closedUnits: 3,
      totalVolume: 68100000,
      status: "activo"
    },
    {
      id: "EMP-03",
      name: "Lucía Varela",
      role: "Ejecutiva de Créditos & Seguros",
      department: "Finanzas & CRM",
      phone: "+54 9 11 4920-5810",
      email: "lvarela@automotoresoscar.com.ar",
      shift: "Lunes a Viernes 08:30 a 17:30",
      rating: 5.0,
      closedUnits: 2,
      totalVolume: 27000000,
      status: "activo"
    },
    {
      id: "EMP-04",
      name: "Marcos Medina",
      role: "Jefe Técnico de Taller & Peritajes",
      department: "Taller & Preparación",
      phone: "+54 9 11 5912-3849",
      email: "taller@automotoresoscar.com.ar",
      shift: "Lunes a Viernes 08:00 a 17:00",
      rating: 4.9,
      closedUnits: 8,
      totalVolume: 0,
      status: "activo"
    },
    {
      id: "EMP-05",
      name: "Dra. Lorena Peralta",
      role: "Mandataria Nacional DNRPA",
      department: "Gestoría Registral",
      phone: "+54 9 11 4829-1029",
      email: "gestoria@automotoresoscar.com.ar",
      shift: "Lunes a Viernes 08:30 a 14:30",
      rating: 4.9,
      closedUnits: 12,
      totalVolume: 0,
      status: "activo"
    },
    {
      id: "EMP-06",
      name: "Esteban Roldán",
      role: "Mecánico Especialista & Detailing",
      department: "Taller & Preparación",
      phone: "+54 9 11 6849-2011",
      email: "mecanica@automotoresoscar.com.ar",
      shift: "Lunes a Viernes 08:00 a 17:00",
      rating: 4.7,
      closedUnits: 6,
      totalVolume: 0,
      status: "activo"
    }
  ],

  // Registro de Auditoría Inmutable del Sistema
  auditLogs: [
    {
      id: "AUD-849",
      timestamp: "2026-09-17 18:42:15",
      user: "Dirección General (OC)",
      module: "Finanzas",
      action: "Liquidación de Comisiones",
      detail: "Liquidada comisión COM-2026-001 a Roberto Páez por $1.480.000 vía transferencia",
      ip: "192.168.1.10"
    },
    {
      id: "AUD-848",
      timestamp: "2026-09-17 16:15:30",
      user: "Carlos Gómez",
      module: "Ventas",
      action: "Nueva Operación Cerrada",
      detail: "Registrada venta VNT-2026-008 (Peugeot 2008 Allure) por $28.900.000",
      ip: "192.168.1.14"
    },
    {
      id: "AUD-847",
      timestamp: "2026-09-17 14:20:00",
      user: "Dirección General (OC)",
      module: "Stock",
      action: "Ajuste de Precio de Lista",
      detail: "Honda HR-V EX CVT: $37.500.000 -> $38.200.000 por actualización terminal",
      ip: "192.168.1.10"
    },
    {
      id: "AUD-846",
      timestamp: "2026-09-17 11:05:44",
      user: "Lucía Varela",
      module: "CRM",
      action: "Cambio de Estado de Lead",
      detail: "Lead LD-002 (Carlos Martínez) movido de 'Contactado' a 'Test Drive Pactado'",
      ip: "192.168.1.15"
    },
    {
      id: "AUD-845",
      timestamp: "2026-09-16 17:30:12",
      user: "Dra. Lorena Peralta",
      module: "Documentación",
      action: "Cierre de Transferencia DNRPA",
      detail: "Trámite TRF-2026-101 (Toyota Hilux AF 392 PK) marcado como 'Finalizado'",
      ip: "192.168.1.18"
    },
    {
      id: "AUD-844",
      timestamp: "2026-09-16 10:12:00",
      user: "Sistema Automático",
      module: "Web Sync",
      action: "Sincronización Catálogo Web",
      detail: "10 unidades activas sincronizadas con automotoresoscar.com.ar",
      ip: "127.0.0.1"
    }
  ]
};

if (typeof window !== "undefined") {
  window.ERP_DATA = ERP_DATA;
}

