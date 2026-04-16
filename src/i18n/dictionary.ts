// Diccionario global ES/EN para el landing SYSDE
// Clave única → { es, en }. Si falta una clave, se devuelve la clave.

export type DictEntry = { es: string; en: string };

export const dictionary: Record<string, DictEntry> = {
  // ==== Navbar ====
  "nav.summary": { es: "Resumen", en: "Overview" },
  "nav.modules": { es: "Módulos", en: "Modules" },
  "nav.unlimited": { es: "Ilimitado", en: "Unlimited" },
  "nav.twoworlds": { es: "Dos Mundos", en: "Two Worlds" },
  "nav.pricing": { es: "Pricing", en: "Pricing" },
  "nav.whysysde": { es: "¿Por qué SYSDE?", en: "Why SYSDE?" },
  "nav.service": { es: "Servicio", en: "Service" },
  "nav.rfp": { es: "RFP", en: "RFP" },
  "lang.toggle": { es: "EN", en: "ES" },
  "lang.tooltip": { es: "Switch to English", en: "Cambiar a español" },

  // ==== Hero ====
  "hero.tagline": { es: "Core Crediticio · Clase Mundial", en: "Credit Core · World-Class" },
  "hero.title.1": { es: "La", en: "The" },
  "hero.title.2": { es: "nueva", en: "new" },
  "hero.title.3": { es: "era de la", en: "era of" },
  "hero.title.4": { es: "abundancia", en: "abundance" },
  "hero.title.5": { es: "para Unicomer.", en: "for Unicomer." },
  "hero.subtitle": {
    es: "Todos los países donde operen. Ilimitado. Sin costo adicional.",
    en: "Every country where they operate. Unlimited. At no additional cost.",
  },
  "hero.link.modules": { es: "Módulos", en: "Modules" },
  "hero.link.unlimited": { es: "Modelo Ilimitado", en: "Unlimited Model" },
  "hero.link.price": { es: "Precio", en: "Pricing" },
  "hero.explore": { es: "Explorar", en: "Explore" },

  // ==== Pricing — header ====
  "pricing.eyebrow": { es: "Inversión", en: "Investment" },
  "pricing.title": { es: "Un precio fijo. Sin sorpresas.", en: "One fixed price. No surprises." },
  "pricing.subtitle": {
    es: "Inversión total a 5 años, escalable a todos los países donde Unicomer opere.",
    en: "Total 5-year investment, scalable to every country where Unicomer operates.",
  },

  // ==== Pricing — included / comparison ====
  "pricing.included.title": { es: "Todo incluido en cada licencia", en: "Everything included in each license" },
  "pricing.included.1": { es: "Usuarios ilimitados", en: "Unlimited users" },
  "pricing.included.2": { es: "Sin costo por usuario, transacción, país adicional o instancia", en: "No charge per user, transaction, additional country, or instance" },
  "pricing.included.3": { es: "Clientes ilimitados", en: "Unlimited customers" },
  "pricing.included.4": { es: "Territorio: Ilimitado — BIG 9 + todos los países donde Unicomer opere", en: "Territory: Unlimited — BIG 9 + every country where Unicomer operates" },
  "pricing.included.5": { es: "Soporte incluido", en: "Support included" },
  "pricing.included.6": { es: "Capacitación incluida", en: "Training included" },
  "pricing.included.7": { es: "Implementación 100% remota", en: "100% remote implementation" },

  "pricing.compare.title": { es: "¿Cómo se compara?", en: "How does it compare?" },
  "pricing.compare.them": { es: "ELLOS COBRAN POR:", en: "THEY CHARGE FOR:" },
  "pricing.compare.us": { es: "SYSDE INCLUYE:", en: "SYSDE INCLUDES:" },
  "pricing.compare.them.1": { es: "Por usuario", en: "Per user" },
  "pricing.compare.them.2": { es: "Por país", en: "Per country" },
  "pricing.compare.them.3": { es: "Por transacción", en: "Per transaction" },
  "pricing.compare.them.4": { es: "Por módulo extra", en: "Per extra module" },
  "pricing.compare.them.5": { es: "Soporte con topes de horas", en: "Support with hour caps" },
  "pricing.compare.us.1": { es: "Usuarios ilimitados", en: "Unlimited users" },
  "pricing.compare.us.2": { es: "Todos los países incluidos", en: "All countries included" },
  "pricing.compare.us.3": { es: "Transacciones ilimitadas", en: "Unlimited transactions" },
  "pricing.compare.us.4": { es: "Todos los módulos incluidos", en: "All modules included" },
  "pricing.compare.us.5": { es: "Soporte ilimitado", en: "Unlimited support" },
  "pricing.hint.cta": { es: "¿Dudas sobre precios? Pregunta a SYSDE IA", en: "Questions about pricing? Ask SYSDE AI" },

  // ==== Annex 2 ====
  "annex.eyebrow": { es: "Anexo 2 Oficial", en: "Official Annex 2" },
  "annex.title": { es: "Anexo 2 — Respuesta detallada al modelo económico", en: "Annex 2 — Detailed response to the economic model" },
  "annex.subtitle": {
    es: "Respuesta completa al formato económico oficial de Unicomer, descargable como Excel idéntico al original.",
    en: "Complete response to Unicomer's official economic format, downloadable as Excel identical to the original.",
  },
  "annex.cardTitle": { es: "Anexo 2 — Respuesta SYSDE", en: "Annex 2 — SYSDE Response" },
  "annex.meta": { es: "v2026-01-23 · 6 hojas · USD · SIN IVA", en: "v2026-01-23 · 6 sheets · USD · EXCL. VAT" },
  "annex.download": { es: "Descargar Excel", en: "Download Excel" },

  "annex.tab.instructions": { es: "Instrucciones", en: "Instructions" },
  "annex.tab.baseline": { es: "Línea base", en: "Baseline" },
  "annex.tab.onpremise": { es: "On-Premise", en: "On-Premise" },
  "annex.tab.saas": { es: "SaaS Cloud", en: "SaaS Cloud" },
  "annex.tab.implementation": { es: "Implementación", en: "Implementation" },
  "annex.tab.other": { es: "Otros costos", en: "Other Costs" },

  "annex.col.category": { es: "Categoría", en: "Category" },
  "annex.col.rule": { es: "Regla / Requisito", en: "Rule / Requirement" },
  "annex.totals": { es: "Totales", en: "Totals" },
  "annex.totalsCaps": { es: "TOTALES:", en: "TOTALS:" },

  "annex.section.onpremise": { es: "On-Premise — Licencias y soporte recurrentes", en: "On-Premise — Recurring Licensing & Support Fees" },
  "annex.section.saas": { es: "SaaS (Cloud) — Licencias y soporte recurrentes", en: "SaaS (Cloud) — Recurring Licensing & Support Fees" },
  "annex.section.implementation": { es: "Servicios de implementación", en: "Implementation Services" },
  "annex.section.other": { es: "Otros costos", en: "Other Costs" },

  // Annex instructions title
  "annex.instructions.title": { es: "INSTRUCCIONES", en: "INSTRUCTIONS" },
  "annex.baseline.title": { es: "ESCENARIOS DE LÍNEA BASE", en: "BASELINE SCENARIOS" },
  "annex.baseline.subtitle": { es: "ESTANDARIZACIÓN PARA EVALUACIÓN", en: "STANDARDIZATION FOR EVALUATION" },
  "annex.baseline.note": {
    es: "Los volúmenes listados a continuación son estimaciones provistas con fines de referencia y no constituyen un compromiso de compra. Los volúmenes reales pueden variar al alza o a la baja durante la ejecución. Por favor utilice estas cifras específicas para poblar los modelos de pricing en la pestaña 3, asegurando que todas las propuestas estén alineadas a los mismos supuestos.",
    en: "The volumes listed below are estimates provided for reference purposes and do not constitute a commitment to purchase. Actual volumes may vary upwards or downwards during execution. Please use these specific figures to populate the pricing models in Tab 3, ensuring all proposals are aligned to the same assumptions.",
  },
  "annex.implementation.footer": {
    es: "Nota: El costo es cero para servicios profesionales bajo soporte activo.",
    en: "Note: The cost is zero for professional services under active support.",
  },

  // Footer
  "footer.copy": { es: "Hecho con precisión por SYSDE", en: "Crafted with precision by SYSDE" },
};
