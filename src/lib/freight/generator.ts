import { CORRIDORS, GRAIN_PREMIUM, GRAIN_WEIGHT, NOTES, SHIPPERS } from "./catalog";
import type {
  AlertRule,
  BoardFilters,
  Grain,
  Load,
  LoadStatus,
  Vehicle,
} from "./types";
import { ALL_GRAINS } from "./types";

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, list: readonly T[]): T {
  return list[Math.floor(rand() * list.length)] as T;
}

function pickWeighted<T extends string>(
  rand: () => number,
  weights: Record<T, number>,
): T {
  const entries = Object.entries(weights) as [T, number][];
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = rand() * total;
  for (const [key, w] of entries) {
    r -= w;
    if (r <= 0) return key;
  }
  return entries[0]![0];
}

function rateFor(km: number, grain: Grain, rand: () => number): number {
  const base = 52 + km * 0.168 + GRAIN_PREMIUM[grain];
  const noise = (rand() - 0.45) * 36;
  return Math.round(Math.min(320, Math.max(72, base + noise)));
}

function volumeFor(vehicle: Vehicle, rand: () => number): number {
  if (vehicle === "bitrem_7") return pick(rand, [32, 34, 36, 37]);
  return pick(rand, [40, 42, 43, 45]);
}

let seq = 48000;

export function makeLoad(rand: () => number, now = Date.now()): Load {
  const corridor = pick(rand, CORRIDORS);
  const grain = pickWeighted(rand, GRAIN_WEIGHT);
  const vehicle: Vehicle = rand() < 0.62 ? "bitrem_7" : "bitrem_9";
  const volumeT = volumeFor(vehicle, rand);
  const ratePerT = rateFor(corridor.km, grain, rand);
  const ageMin = Math.floor(rand() * 280);
  const postedAt = now - ageMin * 60000;
  const startOffsetH = rand() < 0.28 ? 0 : Math.floor(rand() * 36) + 4;
  const windowH = pick(rand, [18, 24, 36, 48]);
  const pickupStart = now + startOffsetH * 3600000;
  const pickupEnd = pickupStart + windowH * 3600000;
  const urgent = startOffsetH < 8 && rand() < 0.55;
  seq += 1;
  const id = `BT${corridor.origin.uf}${seq}`;
  const statusRoll = rand();
  const status: LoadStatus =
    statusRoll > 0.92 ? "negociando" : statusRoll > 0.97 ? "fechada" : "aberta";

  return {
    id,
    grain,
    volumeT,
    vehicle,
    origin: corridor.origin,
    dest: corridor.dest,
    km: corridor.km,
    ratePerT,
    total: ratePerT * volumeT,
    shipper: pick(rand, SHIPPERS),
    pickupStart,
    pickupEnd,
    postedAt,
    status,
    pedagioIncluso: rand() > 0.35,
    notes: pick(rand, NOTES),
    urgent,
  };
}

export function seedBoard(count = 22, seed = 20260919): Load[] {
  const rand = mulberry32(seed);
  const loads: Load[] = [];
  for (let i = 0; i < count; i++) {
    const load = makeLoad(rand);
    load.status = i < 2 ? "negociando" : "aberta";
    loads.push(load);
  }
  return loads.sort((a, b) => b.postedAt - a.postedAt);
}

export function matchesFilters(load: Load, f: BoardFilters): boolean {
  if (f.onlyOpen && load.status === "fechada") return false;
  if (f.ufs.length && !f.ufs.includes(load.origin.uf)) return false;
  if (f.grains.length && !f.grains.includes(load.grain)) return false;
  if (f.vehicle !== "todos" && load.vehicle !== f.vehicle) return false;
  if (f.destKind !== "todos" && load.dest.kind !== f.destKind) return false;
  if (load.ratePerT < f.minRate) return false;
  if (f.onlyUrgent && !load.urgent) return false;
  if (f.query.trim()) {
    const q = f.query.trim().toLowerCase();
    const hay = [
      load.origin.city,
      load.dest.city,
      load.dest.label,
      load.shipper,
      load.id,
      load.origin.uf,
      load.dest.uf,
    ]
      .join(" ")
      .toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

export function matchesRule(load: Load, rule: AlertRule): boolean {
  if (!rule.enabled) return false;
  if (load.status === "fechada") return false;
  if (rule.ufs.length && !rule.ufs.includes(load.origin.uf)) return false;
  if (rule.grains.length && !rule.grains.includes(load.grain)) return false;
  if (load.ratePerT < rule.minRate) return false;
  if (rule.destKind !== "todos" && load.dest.kind !== rule.destKind) {
    return false;
  }
  return true;
}

export const DEFAULT_FILTERS: BoardFilters = {
  ufs: [],
  grains: [],
  vehicle: "todos",
  destKind: "todos",
  minRate: 0,
  query: "",
  onlyUrgent: false,
  onlyOpen: true,
};

export const DEFAULT_RULE: AlertRule = {
  enabled: false,
  phone: "",
  ufs: [],
  grains: [...ALL_GRAINS],
  minRate: 0,
  destKind: "todos",
  notifyBrowser: false,
};
