// Datos reales por país (precios actuales del Anexo 2 SaaS)
export type CountryPricing = {
  country: string;
  loans: number;        // créditos activos vigentes
  unitPrice: number;    // USD / crédito / mes (tarifa real actual)
  minMonthly: number;   // mínimo mensual aplicable según tramo
};

// Fuente: saasRaw + costingTiers en annexDataI18n.ts
// El mínimo se determina según el tramo del costing model:
// 1–100k → $2,500 ; 100k–200k → $7,000 ; 200k–450k → $8,000 ; ≥500k → $15,000
const minForVolume = (loans: number): number => {
  if (loans <= 100000) return 2500;
  if (loans <= 200000) return 7000;
  if (loans <= 450000) return 8000;
  return 15000;
};

// Tarifa unitaria por país, tomada exactamente de saasRaw (sin promedios)
export const countryPricing: CountryPricing[] = [
  { country: "Honduras",          loans: 338360, unitPrice: 0.04, minMonthly: minForVolume(338360) },
  { country: "Nicaragua",         loans: 79360,  unitPrice: 0.10, minMonthly: minForVolume(79360)  },
  { country: "Guyana",            loans: 65176,  unitPrice: 0.10, minMonthly: minForVolume(65176)  },
  { country: "Ecuador",           loans: 144688, unitPrice: 0.07, minMonthly: minForVolume(144688) },
  { country: "Trinidad & Tobago", loans: 117295, unitPrice: 0.07, minMonthly: minForVolume(117295) },
  { country: "Jamaica",           loans: 186000, unitPrice: 0.07, minMonthly: minForVolume(186000) },
  { country: "Guatemala",         loans: 91536,  unitPrice: 0.10, minMonthly: minForVolume(91536)  },
  { country: "El Salvador",       loans: 419494, unitPrice: 0.04, minMonthly: minForVolume(419494) },
  { country: "Costa Rica",        loans: 708591, unitPrice: 0.03, minMonthly: minForVolume(708591) },
];

// Tabla de tramos (idéntica a costingTiers)
export type Tier = { from: number; to: number | null; price: number; min: number };
export const costingTiers: Tier[] = [
  { from: 1,      to: 100000,  price: 0.10, min: 2500  },
  { from: 100001, to: 200000,  price: 0.07, min: 7000  },
  { from: 200001, to: 450000,  price: 0.04, min: 8000  },
  { from: 500000, to: null,    price: 0.03, min: 15000 },
];

export const tierForVolume = (loans: number): Tier => {
  for (const t of costingTiers) {
    if (t.to === null) {
      if (loans >= t.from) return t;
    } else if (loans >= t.from && loans <= t.to) {
      return t;
    }
  }
  return costingTiers[costingTiers.length - 1];
};

// Total grupo actual (suma exacta)
export const groupTotalLoans = countryPricing.reduce((s, c) => s + c.loans, 0);

// Implementación única (referencia para Cláusula 3)
export const implementationOneTime = 1205000;
