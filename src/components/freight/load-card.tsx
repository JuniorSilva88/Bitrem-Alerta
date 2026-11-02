import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, brl, nBr, relativeTime } from "@/lib/utils";
import type { Load } from "@/lib/freight/types";
import { GRAIN_LABEL, VEHICLE_LABEL } from "@/lib/freight/types";
import { loadMessage, openWhatsApp } from "@/lib/freight/whatsapp";
import { useFreight } from "@/lib/freight/store";

function pickupLabel(load: Load) {
  const fmt = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });
  const a = fmt.format(load.pickupStart);
  const b = fmt.format(load.pickupEnd);
  return a === b ? a : `${a} – ${b}`;
}

export function LoadCard({ load, now }: { load: Load; now: number }) {
  const selected = useFreight((s) => s.selectedId === load.id);
  const select = useFreight((s) => s.select);
  const phone = useFreight((s) => s.rule.phone);
  const isNew = now - load.postedAt < 8 * 60000;
  const closed = load.status === "fechada";

  function openDetail() {
    const mobile =
      typeof window !== "undefined" &&
      !window.matchMedia("(min-width: 1024px)").matches;
    select(load.id, { mobile });
  }

  return (
    <article
      className={cn(
        "rounded-xl bg-card p-4 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 ease-out",
        selected && "shadow-[var(--shadow-border-hover)] ring-1 ring-ring/40",
        closed && "opacity-55",
      )}
    >
      <button
        type="button"
        onClick={openDetail}
        className="flex w-full flex-col gap-3 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                {GRAIN_LABEL[load.grain]}
              </h3>
              {isNew && !closed ? <Badge variant="live">Nova</Badge> : null}
              {load.urgent && !closed ? <Badge variant="warn">Urgente</Badge> : null}
              {load.status === "negociando" ? (
                <Badge variant="outline">Em negociação</Badge>
              ) : null}
              {closed ? <Badge>Fechada</Badge> : null}
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {VEHICLE_LABEL[load.vehicle]} · {nBr.format(load.volumeT)} t · {load.id}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl font-semibold leading-none tabular-nums tracking-tight">
              {brl.format(load.ratePerT)}
              <span className="text-sm font-medium text-muted-foreground">/t</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground tabular-nums">
              {brl.format(load.total)} total
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg bg-secondary/80 px-3 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{load.origin.city}</p>
            <p className="text-xs text-muted-foreground">{load.origin.uf}</p>
          </div>
          <div className="flex flex-col items-center text-muted-foreground">
            <span className="text-xs tabular-nums">{nBr.format(load.km)} km</span>
            <ArrowRight className="size-3.5" />
          </div>
          <div className="min-w-0 text-right">
            <p className="truncate text-sm font-medium">{load.dest.label}</p>
            <p className="text-xs text-muted-foreground">{load.dest.uf}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock3 className="size-3.5" />
            Coleta {pickupLabel(load)}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" />
            {load.shipper}
          </span>
          <span className="tabular-nums">{relativeTime(load.postedAt, now)}</span>
        </div>
      </button>

      <div className="mt-3 flex gap-2">
        <Button
          variant="whatsapp"
          size="sm"
          className="flex-1"
          disabled={closed}
          onClick={() => openWhatsApp(loadMessage(load), phone)}
        >
          WhatsApp
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={openDetail}
        >
          Detalhe
        </Button>
      </div>
    </article>
  );
}
