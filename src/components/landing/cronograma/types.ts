export type DeployMode = "saas" | "onpremise";
export type Riesgo = "ALTO" | "MEDIO" | "BAJO";

export interface Fase {
  id: string;
  nombre: string;
  periodo: string;
  barStart: number;
  barEnd: number;
  icon: string;
  color: string;
  bg: string;
  tareas: string[];
  entregables: string[];
  compromisos: string[];
  responsables: string;
  aceleracion: string;
}

export interface Compromiso {
  codigo: string;
  fase: string;
  riesgo: Riesgo;
  area: string;
  titulo: string;
  descripcion: string;
  plazoLimite: string;
  consecuencia: string;
  dependeDe: string[];
}

export interface PhaseSaving {
  grupo: string;
  mesesSaas: number;
  mesesOnprem: number;
  codigos: { saas: string[]; onprem: string[] };
}

export interface Driver {
  label: string;
  value: string;
  icon: string;
}
