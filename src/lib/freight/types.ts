export type Uf = "MS" | "SP" | "PR";

export type Grain = "soja" | "milho" | "farelo_soja" | "trigo" | "sorgo";

export type Vehicle = "bitrem_7" | "bitrem_9";

export type DestKind = "porto" | "industria" | "armazem";

export type LoadStatus = "aberta" | "negociando" | "fechada";

export type Place = {
  city: string;
  uf: Uf;
};

export type Destination = Place & {
  kind: DestKind;
  label: string;
};

export type Corridor = {
  origin: Place;
  dest: Destination;
  km: number;
};

export type Load = {
  id: string;
  grain: Grain;
  volumeT: number;
  vehicle: Vehicle;
  origin: Place;
  dest: Destination;
  km: number;
  ratePerT: number;
  total: number;
  shipper: string;
  pickupStart: number;
  pickupEnd: number;
  postedAt: number;
  status: LoadStatus;
  pedagioIncluso: boolean;
  notes: string;
  urgent: boolean;
};

export type BoardFilters = {
  ufs: Uf[];
  grains: Grain[];
  vehicle: "todos" | Vehicle;
  destKind: "todos" | DestKind;
  minRate: number;
  query: string;
  onlyUrgent: boolean;
  onlyOpen: boolean;
};

export type AlertRule = {
  enabled: boolean;
  phone: string;
  ufs: Uf[];
  grains: Grain[];
  minRate: number;
  destKind: "todos" | DestKind;
  notifyBrowser: boolean;
};

export type AlertItem = {
  id: string;
  loadId: string;
  createdAt: number;
  sent: boolean;
  snapshot: {
    grain: Grain;
    volumeT: number;
    origin: string;
    dest: string;
    ratePerT: number;
    vehicle: Vehicle;
    km: number;
  };
};

export const GRAIN_LABEL: Record<Grain, string> = {
  soja: "Soja",
  milho: "Milho",
  farelo_soja: "Farelo de soja",
  trigo: "Trigo",
  sorgo: "Sorgo",
};

export const VEHICLE_LABEL: Record<Vehicle, string> = {
  bitrem_7: "Bitrem 7 eixos",
  bitrem_9: "Bitrem 9 eixos",
};

export const VEHICLE_CAP: Record<Vehicle, string> = {
  bitrem_7: "até 37 t",
  bitrem_9: "até 45 t",
};

export const UF_LABEL: Record<Uf, string> = {
  MS: "Mato Grosso do Sul",
  SP: "São Paulo",
  PR: "Paraná",
};

export const DEST_KIND_LABEL: Record<DestKind, string> = {
  porto: "Porto",
  industria: "Indústria",
  armazem: "Armazém",
};

export const ALL_UFS: Uf[] = ["MS", "SP", "PR"];
export const ALL_GRAINS: Grain[] = [
  "soja",
  "milho",
  "farelo_soja",
  "trigo",
  "sorgo",
];
