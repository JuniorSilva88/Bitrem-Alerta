import { create } from "zustand";
import { toast } from "sonner";
import {
  DEFAULT_FILTERS,
  DEFAULT_RULE,
  makeLoad,
  matchesFilters,
  matchesRule,
  mulberry32,
  seedBoard,
} from "./generator";
import type { AlertItem, AlertRule, BoardFilters, Load } from "./types";
import { GRAIN_LABEL } from "./types";
import { brl } from "@/lib/utils";

const RULE_KEY = "bitrem-alerta-rule";
const ALERTS_KEY = "bitrem-alerta-queue";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function persistAlerts(alerts: AlertItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts.slice(0, 40)));
}

function pushBrowserNotification(load: Load) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    new Notification("Nova carga bitrem", {
      body: `${GRAIN_LABEL[load.grain]} · ${load.origin.city}/${load.origin.uf} → ${load.dest.city}/${load.dest.uf} · ${brl.format(load.ratePerT)}/t`,
    });
  } catch {
    /* ignore */
  }
}

function toAlert(load: Load): AlertItem {
  return {
    id: `AL${load.id}-${load.postedAt}`,
    loadId: load.id,
    createdAt: Date.now(),
    sent: false,
    snapshot: {
      grain: load.grain,
      volumeT: load.volumeT,
      origin: `${load.origin.city}/${load.origin.uf}`,
      dest: `${load.dest.label}/${load.dest.uf}`,
      ratePerT: load.ratePerT,
      vehicle: load.vehicle,
      km: load.km,
    },
  };
}

type FreightState = {
  ready: boolean;
  loads: Load[];
  filters: BoardFilters;
  selectedId: string | null;
  requestMobileDetail: boolean;
  rule: AlertRule;
  alerts: AlertItem[];
  now: number;
  lastEvent: string | null;
  hydrate: () => void;
  setFilters: (patch: Partial<BoardFilters>) => void;
  toggleUf: (uf: BoardFilters["ufs"][number]) => void;
  setRule: (patch: Partial<AlertRule>) => void;
  select: (id: string | null, opts?: { mobile?: boolean }) => void;
  markSent: (alertId: string) => void;
  markAllSent: () => void;
  clearSent: () => void;
  tick: () => void;
  ingest: (load: Load, announce: boolean) => void;
  spawnLoad: () => Load;
  spawnMatching: () => Load | null;
  closeOldest: () => void;
};

export const useFreight = create<FreightState>((set, get) => ({
  ready: false,
  loads: [],
  filters: DEFAULT_FILTERS,
  selectedId: null,
  requestMobileDetail: false,
  rule: DEFAULT_RULE,
  alerts: [],
  now: Date.now(),
  lastEvent: null,

  hydrate: () => {
    if (get().ready) return;
    const storedRule = readJson(RULE_KEY, {} as Partial<AlertRule>);
    const rule = { ...DEFAULT_RULE, ...storedRule };
    const alerts = readJson<AlertItem[]>(ALERTS_KEY, []);
    const hourSeed = 20260919 + Math.floor(Date.now() / 3_600_000);
    const loads = seedBoard(24, hourSeed);
    set({
      ready: true,
      rule,
      alerts,
      loads,
      now: Date.now(),
      selectedId: loads[0]?.id ?? null,
      requestMobileDetail: false,
    });
  },

  setFilters: (patch) => set((s) => ({ filters: { ...s.filters, ...patch } })),

  toggleUf: (uf) =>
    set((s) => {
      const has = s.filters.ufs.includes(uf);
      return {
        filters: {
          ...s.filters,
          ufs: has ? s.filters.ufs.filter((x) => x !== uf) : [...s.filters.ufs, uf],
        },
      };
    }),

  setRule: (patch) => {
    const rule = { ...get().rule, ...patch };
    set({ rule });
    if (typeof window !== "undefined") {
      localStorage.setItem(RULE_KEY, JSON.stringify(rule));
    }
  },

  select: (id, opts) =>
    set({
      selectedId: id,
      requestMobileDetail: Boolean(id) && Boolean(opts?.mobile),
    }),

  markSent: (alertId) => {
    const alerts = get().alerts.map((a) =>
      a.id === alertId ? { ...a, sent: true } : a,
    );
    set({ alerts });
    persistAlerts(alerts);
  },

  markAllSent: () => {
    const alerts = get().alerts.map((a) => ({ ...a, sent: true }));
    set({ alerts });
    persistAlerts(alerts);
  },

  clearSent: () => {
    const alerts = get().alerts.filter((a) => !a.sent);
    set({ alerts });
    persistAlerts(alerts);
  },

  tick: () => set({ now: Date.now() }),

  ingest: (load, announce) => {
    const openCount = get().loads.filter((l) => l.status !== "fechada").length;
    let loads = [load, ...get().loads];
    if (openCount >= 36) {
      const oldest = [...get().loads]
        .filter((l) => l.status === "aberta")
        .sort((a, b) => a.postedAt - b.postedAt)[0];
      if (oldest) {
        loads = loads.map((l) =>
          l.id === oldest.id ? { ...l, status: "fechada" as const } : l,
        );
      }
    }
    const rule = get().rule;
    const matched = announce && matchesRule(load, rule);
    let alerts = get().alerts;
    if (matched) {
      alerts = [toAlert(load), ...alerts].slice(0, 40);
      toast(`${GRAIN_LABEL[load.grain]} · ${load.origin.city} → ${load.dest.city}`, {
        description: `${brl.format(load.ratePerT)}/t · ${load.volumeT} t · bitrem`,
      });
      if (rule.notifyBrowser) pushBrowserNotification(load);
      persistAlerts(alerts);
    }
    set({
      loads,
      alerts,
      lastEvent: `Nova: ${GRAIN_LABEL[load.grain]} ${load.origin.city}/${load.origin.uf} → ${load.dest.city}`,
    });
  },

  spawnLoad: () => {
    const rand = mulberry32((Date.now() ^ (get().loads.length * 9973)) >>> 0);
    const load = makeLoad(rand, Date.now());
    load.status = "aberta";
    load.postedAt = Date.now();
    load.urgent = rand() < 0.32;
    get().ingest(load, true);
    return load;
  },

  spawnMatching: () => {
    const rule = get().rule;
    const rand = mulberry32((Date.now() ^ 0x9e3779b9) >>> 0);
    for (let i = 0; i < 48; i++) {
      const load = makeLoad(rand, Date.now());
      load.status = "aberta";
      load.postedAt = Date.now();
      if (matchesRule({ ...load, status: "aberta" }, { ...rule, enabled: true })) {
        get().ingest(load, true);
        return load;
      }
    }
    const fallback = makeLoad(rand, Date.now());
    fallback.status = "aberta";
    fallback.postedAt = Date.now();
    get().ingest(fallback, true);
    return fallback;
  },

  closeOldest: () => {
    const open = get()
      .loads.filter((l) => l.status === "aberta")
      .sort((a, b) => a.postedAt - b.postedAt);
    const target = open[0];
    if (!target) return;
    set({
      loads: get().loads.map((l) =>
        l.id === target.id ? { ...l, status: "fechada" as const } : l,
      ),
      lastEvent: `Fechada: ${target.id} · ${target.origin.city}`,
    });
  },
}));

export function useVisibleLoads() {
  const loads = useFreight((s) => s.loads);
  const filters = useFreight((s) => s.filters);
  return loads.filter((l) => matchesFilters(l, filters));
}
