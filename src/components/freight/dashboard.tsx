import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Bell, Filter, RefreshCw, Search, Wheat } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { LoadCard } from "@/components/freight/load-card";
import { AlertPanel } from "@/components/freight/alerts";
import { useFreight, useVisibleLoads } from "@/lib/freight/store";
import { loadMessage, openWhatsApp } from "@/lib/freight/whatsapp";
import {
  ALL_GRAINS,
  ALL_UFS,
  DEST_KIND_LABEL,
  GRAIN_LABEL,
  UF_LABEL,
  VEHICLE_LABEL,
  type DestKind,
  type Grain,
  type Load,
  type Uf,
  type Vehicle,
} from "@/lib/freight/types";
import { brl, cn, nBr, relativeTime } from "@/lib/utils";

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <rect width="32" height="32" rx="7" className="fill-secondary" />
      <rect x="4" y="18" width="11" height="6" rx="1.2" className="fill-primary" />
      <rect x="16.5" y="18" width="11" height="6" rx="1.2" className="fill-primary" />
      <rect x="14.2" y="20" width="3.6" height="2" rx="0.4" className="fill-muted-foreground" />
      <circle cx="7.2" cy="25.2" r="1.5" className="fill-muted-foreground" />
      <circle cx="11.8" cy="25.2" r="1.5" className="fill-muted-foreground" />
      <circle cx="19.6" cy="25.2" r="1.5" className="fill-muted-foreground" />
      <circle cx="24.4" cy="25.2" r="1.5" className="fill-muted-foreground" />
      <rect x="17.5" y="8" width="9" height="8" rx="1" className="fill-primary" />
    </svg>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Kpi({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="min-w-40 shrink-0 rounded-xl bg-card px-4 py-3 shadow-[var(--shadow-border)]">
      <p className="text-xs tracking-wide text-muted-foreground">{label}</p>
      <p className="font-display mt-1 text-2xl font-semibold leading-none tabular-nums tracking-tight">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function CorridorStrip({ loads }: { loads: Load[] }) {
  const rows = useMemo(() => {
    const map = new Map<
      string,
      { label: string; uf: Uf; count: number; avg: number }
    >();
    for (const load of loads) {
      if (load.status === "fechada") continue;
      const key = `${load.origin.uf}-${load.dest.label}`;
      const cur = map.get(key) ?? {
        label: `${load.origin.uf} · ${load.dest.label}`,
        uf: load.origin.uf,
        count: 0,
        avg: 0,
      };
      cur.count += 1;
      cur.avg += load.ratePerT;
      map.set(key, cur);
    }
    return [...map.values()]
      .map((r) => ({ ...r, avg: r.avg / r.count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [loads]);

  const max = rows[0]?.count ?? 1;
  if (!rows.length) return null;

  return (
    <section className="rounded-xl bg-card p-4 shadow-[var(--shadow-border)]">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-display text-lg font-semibold tracking-tight">
          Corredores quentes
        </h2>
        <p className="text-xs text-muted-foreground">MS · SP · PR · bitrem</p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {rows.map((row) => (
          <li key={row.label}>
            <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
              <span className="truncate">{row.label}</span>
              <span className="shrink-0 tabular-nums text-muted-foreground">
                {row.count} · {brl.format(row.avg)}/t
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary/80"
                style={{ width: `${Math.max(12, (row.count / max) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Detail({ load, now }: { load: Load; now: number }) {
  const phone = useFreight((s) => s.rule.phone);
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs tracking-wide text-muted-foreground">{load.id}</p>
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          {GRAIN_LABEL[load.grain]}
        </h2>
        <p className="text-sm text-muted-foreground">
          {VEHICLE_LABEL[load.vehicle]} · {nBr.format(load.volumeT)} t
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-secondary px-3 py-2">
          <p className="text-xs text-muted-foreground">Frete</p>
          <p className="font-display text-xl font-semibold tabular-nums">
            {brl.format(load.ratePerT)}/t
          </p>
        </div>
        <div className="rounded-lg bg-secondary px-3 py-2">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="font-display text-xl font-semibold tabular-nums">
            {brl.format(load.total)}
          </p>
        </div>
      </div>

      <div className="rounded-lg bg-secondary px-3 py-3">
        <p className="text-sm font-medium">
          {load.origin.city}/{load.origin.uf}
        </p>
        <p className="text-xs text-muted-foreground">{nBr.format(load.km)} km</p>
        <p className="mt-2 text-sm font-medium">
          {load.dest.label}/{load.dest.uf}
        </p>
        <p className="text-xs text-muted-foreground">
          {DEST_KIND_LABEL[load.dest.kind]}
        </p>
      </div>

      <dl className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Embarcador</dt>
          <dd>{load.shipper}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Coleta</dt>
          <dd className="text-right">
            {fmt.format(load.pickupStart)} — {fmt.format(load.pickupEnd)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Pedágio</dt>
          <dd>{load.pedagioIncluso ? "Incluso" : "Por conta"}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Publicada</dt>
          <dd>{relativeTime(load.postedAt, now)}</dd>
        </div>
      </dl>

      <p className="text-sm text-muted-foreground">{load.notes}</p>

      <Button
        variant="whatsapp"
        disabled={load.status === "fechada"}
        onClick={() => openWhatsApp(loadMessage(load), phone)}
      >
        Enviar no WhatsApp
      </Button>
    </div>
  );
}

function GrainAndVehicleFilters() {
  const filters = useFreight((s) => s.filters);
  const setFilters = useFreight((s) => s.setFilters);

  return (
    <>
      {ALL_GRAINS.map((g: Grain) => (
        <Chip
          key={g}
          active={filters.grains.includes(g)}
          onClick={() => {
            const has = filters.grains.includes(g);
            setFilters({
              grains: has
                ? filters.grains.filter((x) => x !== g)
                : [...filters.grains, g],
            });
          }}
        >
          {GRAIN_LABEL[g]}
        </Chip>
      ))}
      <Chip
        active={filters.onlyUrgent}
        onClick={() => setFilters({ onlyUrgent: !filters.onlyUrgent })}
      >
        Urgente
      </Chip>
      {(
        [
          ["todos", "Qualquer bitrem"],
          ["bitrem_7", "7 eixos"],
          ["bitrem_9", "9 eixos"],
        ] as const
      ).map(([key, label]) => (
        <Chip
          key={key}
          active={filters.vehicle === key}
          onClick={() => setFilters({ vehicle: key as "todos" | Vehicle })}
        >
          {label}
        </Chip>
      ))}
      {(
        [
          ["todos", "Todos destinos"],
          ["porto", "Porto"],
          ["industria", "Indústria"],
        ] as const
      ).map(([key, label]) => (
        <Chip
          key={key}
          active={filters.destKind === key}
          onClick={() => setFilters({ destKind: key as "todos" | DestKind })}
        >
          {label}
        </Chip>
      ))}
    </>
  );
}

function LiveClock() {
  const hydrate = useFreight((s) => s.hydrate);
  const spawnLoad = useFreight((s) => s.spawnLoad);
  const closeOldest = useFreight((s) => s.closeOldest);
  const tick = useFreight((s) => s.tick);

  useEffect(() => {
    hydrate();
    const t = window.setInterval(() => tick(), 30000);
    const spawn = window.setInterval(() => spawnLoad(), 22000);
    const close = window.setInterval(() => closeOldest(), 48000);
    return () => {
      window.clearInterval(t);
      window.clearInterval(spawn);
      window.clearInterval(close);
    };
  }, [hydrate, spawnLoad, closeOldest, tick]);

  return null;
}

export function Dashboard() {
  const ready = useFreight((s) => s.ready);
  const loads = useFreight((s) => s.loads);
  const visible = useVisibleLoads();
  const filters = useFreight((s) => s.filters);
  const setFilters = useFreight((s) => s.setFilters);
  const toggleUf = useFreight((s) => s.toggleUf);
  const selectedId = useFreight((s) => s.selectedId);
  const requestMobileDetail = useFreight((s) => s.requestMobileDetail);
  const select = useFreight((s) => s.select);
  const now = useFreight((s) => s.now);
  const lastEvent = useFreight((s) => s.lastEvent);
  const spawnLoad = useFreight((s) => s.spawnLoad);
  const pending = useFreight((s) => s.alerts.filter((a) => !a.sent).length);
  const enabled = useFreight((s) => s.rule.enabled);
  const [filterOpen, setFilterOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const selected = loads.find((l) => l.id === selectedId) ?? null;

  const openLoads = loads.filter((l) => l.status !== "fechada");
  const avg =
    openLoads.length === 0
      ? 0
      : Math.round(openLoads.reduce((s, l) => s + l.ratePerT, 0) / openLoads.length);
  const byUf = ALL_UFS.map((uf) => ({
    uf,
    n: openLoads.filter((l) => l.origin.uf === uf).length,
  }));

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <LiveClock />
      <Toaster />

      <header className="sticky top-0 z-30 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <LogoMark />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                Bitrem Alerta
              </h1>
              <Badge variant="live" className="gap-1.5">
                <span className="live-dot size-1.5 rounded-full bg-live" />
                Ao vivo
              </Badge>
            </div>
            <p className="truncate text-xs text-muted-foreground">
              Grãos para bitrem · MS, SP e PR
            </p>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="lg:hidden"
            onClick={() => setFilterOpen(true)}
            aria-label="Filtros"
          >
            <Filter className="size-4" />
          </Button>
          <Button
            variant={enabled ? "whatsapp" : "secondary"}
            className="relative"
            onClick={() => setAlertOpen(true)}
          >
            <Bell className="size-4" />
            <span className="hidden sm:inline">Alertas</span>
            {pending > 0 ? (
              <span className="absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {pending}
              </span>
            ) : null}
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-6 lg:py-6">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {byUf.map((row) => (
              <Kpi
                key={row.uf}
                label={UF_LABEL[row.uf]}
                value={`${row.n}`}
                hint={`cargas abertas · ${row.uf}`}
              />
            ))}
            <Kpi label="Frete médio" value={brl.format(avg)} hint="R$ por tonelada" />
            <Kpi
              label="Praça bitrem"
              value={`${openLoads.length}`}
              hint={lastEvent ?? "quadro ao vivo"}
            />
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-card p-3 shadow-[var(--shadow-border)] sm:p-4">
            <div className="flex items-center gap-2">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={filters.query}
                  onChange={(e) => setFilters({ query: e.target.value })}
                  placeholder="Cidade, porto, embarcador ou código"
                  className="pl-9"
                />
              </div>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => spawnLoad()}
                aria-label="Buscar novas cargas"
              >
                <RefreshCw className="size-4" />
              </Button>
            </div>

            <div className="flex gap-2 overflow-x-auto">
              <Chip active={filters.ufs.length === 0} onClick={() => setFilters({ ufs: [] })}>
                Todos
              </Chip>
              {ALL_UFS.map((uf) => (
                <Chip
                  key={uf}
                  active={filters.ufs.includes(uf)}
                  onClick={() => toggleUf(uf)}
                >
                  {uf}
                </Chip>
              ))}
            </div>

            <div className="hidden flex-wrap gap-2 lg:flex">
              <GrainAndVehicleFilters />
            </div>
          </div>

          <CorridorStrip loads={visible.length ? visible : loads} />

          <section>
            <div className="mb-3 flex items-end justify-between">
              <h2 className="font-display text-lg font-semibold tracking-tight">
                Cargas disponíveis
              </h2>
              <p className="text-xs text-muted-foreground tabular-nums">
                {visible.length} no filtro
              </p>
            </div>

            {!ready ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-52 animate-pulse rounded-xl bg-card shadow-[var(--shadow-border)]"
                  />
                ))}
              </div>
            ) : visible.length === 0 ? (
              <div className="rounded-xl bg-card px-5 py-10 text-center shadow-[var(--shadow-border)]">
                <Wheat className="mx-auto size-6 text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Nenhuma carga de bitrem neste recorte. Limpe os filtros ou
                  aguarde a próxima publicação da praça.
                </p>
                <Button
                  className="mt-4"
                  variant="secondary"
                  onClick={() =>
                    setFilters({
                      ufs: [],
                      grains: [],
                      vehicle: "todos",
                      destKind: "todos",
                      minRate: 0,
                      query: "",
                      onlyUrgent: false,
                      onlyOpen: true,
                    })
                  }
                >
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {visible.map((load, i) => (
                  <div
                    key={load.id}
                    className="board-enter"
                    style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                  >
                    <LoadCard load={load} now={now} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="hidden lg:flex lg:flex-col">
          <div className="rounded-xl bg-card shadow-[var(--shadow-border)]">
            <div className="p-5 pb-0">
              <p className="text-xs tracking-wide text-muted-foreground">Como rastrear</p>
              <h2 className="font-display text-lg font-semibold tracking-tight">
                Bitrem em MS, SP e PR
              </h2>
              <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-muted-foreground">
                <li>Filtre o estado de origem e o grão.</li>
                <li>Ative o alerta e, se quiser, informe o WhatsApp.</li>
                <li>Quando entrar carga compatível, a mensagem é montada.</li>
                <li>Toque em Enviar — o WhatsApp abre com o texto pronto.</li>
              </ol>
            </div>
            <Separator className="mt-4" />
            {selected ? (
              <div className="p-5">
                <Detail load={selected} now={now} />
              </div>
            ) : (
              <p className="p-5 text-sm text-muted-foreground">
                Selecione uma carga para ver o detalhe.
              </p>
            )}
          </div>
        </aside>
      </main>

      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
            <SheetDescription>Recorte a praça de bitrem</SheetDescription>
          </SheetHeader>
          <div className="flex flex-wrap gap-2 px-5 pb-8">
            <GrainAndVehicleFilters />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={alertOpen} onOpenChange={setAlertOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Alertas WhatsApp</SheetTitle>
            <SheetDescription>
              Mensagem pronta para enviar. Sem API do WhatsApp Business — o envio
              é no seu aplicativo, com um toque.
            </SheetDescription>
          </SheetHeader>
          <AlertPanel />
        </SheetContent>
      </Sheet>

      <Sheet
        open={requestMobileDetail && Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) select(selectedId, { mobile: false });
        }}
      >
        {selected ? (
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Carga {selected.id}</SheetTitle>
              <SheetDescription>
                {GRAIN_LABEL[selected.grain]} para bitrem
              </SheetDescription>
            </SheetHeader>
            <div className="overflow-y-auto px-5 pb-8">
              <Detail load={selected} now={now} />
            </div>
          </SheetContent>
        ) : null}
      </Sheet>

      <p className="mx-auto max-w-7xl px-4 pb-8 text-center text-xs text-muted-foreground">
        Praça ilustrativa com corredores reais de grãos em MS, SP e PR. Confira
        sempre no embarcador antes de fechar o frete.
      </p>
    </div>
  );
}
