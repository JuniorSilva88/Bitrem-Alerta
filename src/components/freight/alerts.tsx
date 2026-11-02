import { useState, type ReactNode } from "react";
import { Bell, Check, MessageCircle, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useFreight } from "@/lib/freight/store";
import {
  ALL_GRAINS,
  ALL_UFS,
  GRAIN_LABEL,
  type DestKind,
  type Grain,
  type Uf,
} from "@/lib/freight/types";
import { loadMessage, openWhatsApp, whatsappUrl } from "@/lib/freight/whatsapp";
import { brl, cn, formatPhoneBr, nBr } from "@/lib/utils";

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
        "h-9 rounded-full px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function AlertForm() {
  const rule = useFreight((s) => s.rule);
  const setRule = useFreight((s) => s.setRule);
  const spawnMatching = useFreight((s) => s.spawnMatching);
  const [testing, setTesting] = useState(false);

  function toggleUf(uf: Uf) {
    const has = rule.ufs.includes(uf);
    setRule({ ufs: has ? rule.ufs.filter((x) => x !== uf) : [...rule.ufs, uf] });
  }

  function toggleGrain(g: Grain) {
    const has = rule.grains.includes(g);
    const next = has ? rule.grains.filter((x) => x !== g) : [...rule.grains, g];
    setRule({ grains: next.length ? next : [...ALL_GRAINS] });
  }

  async function toggleEnabled(on: boolean) {
    setRule({ enabled: on });
    if (on) {
      setTesting(true);
      window.setTimeout(() => {
        spawnMatching();
        setTesting(false);
      }, 400);
    }
  }

  async function toggleNotify(on: boolean) {
    if (on && "Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }
    setRule({ notifyBrowser: on && Notification.permission === "granted" });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3 rounded-lg bg-secondary px-3 py-3">
        <div>
          <p className="text-sm font-medium">Alertas ativos</p>
          <p className="text-xs text-muted-foreground">
            Nova carga que bater a regra entra na fila do WhatsApp
          </p>
        </div>
        <Switch
          checked={rule.enabled}
          onCheckedChange={toggleEnabled}
          aria-label="Ativar alertas"
        />
      </div>

      <label className="block space-y-1.5">
        <span className="text-xs font-medium tracking-wide text-muted-foreground">
          WhatsApp (seu número ou do despachante)
        </span>
        <Input
          inputMode="tel"
          autoComplete="tel"
          placeholder="(67) 99999-0000"
          value={formatPhoneBr(rule.phone)}
          onChange={(e) => setRule({ phone: e.target.value })}
        />
        <span className="block text-xs text-muted-foreground">
          Vazio: o WhatsApp abre para você escolher o contato ou o grupo.
        </span>
      </label>

      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground">
          Origem
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_UFS.map((uf) => (
            <Chip
              key={uf}
              active={rule.ufs.length === 0 || rule.ufs.includes(uf)}
              onClick={() => toggleUf(uf)}
            >
              {uf}
            </Chip>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {rule.ufs.length === 0 ? "Todos os estados (MS, SP e PR)" : rule.ufs.join(" · ")}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground">Grão</p>
        <div className="flex flex-wrap gap-2">
          {ALL_GRAINS.map((g) => (
            <Chip key={g} active={rule.grains.includes(g)} onClick={() => toggleGrain(g)}>
              {GRAIN_LABEL[g]}
            </Chip>
          ))}
        </div>
      </div>

      <label className="block space-y-1.5">
        <span className="text-xs font-medium tracking-wide text-muted-foreground">
          Frete mínimo (R$/t)
        </span>
        <Input
          type="number"
          min={0}
          step={10}
          value={rule.minRate || ""}
          placeholder="0"
          onChange={(e) => setRule({ minRate: Number(e.target.value) || 0 })}
        />
      </label>

      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground">Destino</p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["todos", "Todos"],
              ["porto", "Porto"],
              ["industria", "Indústria"],
            ] as const
          ).map(([key, label]) => (
            <Chip
              key={key}
              active={rule.destKind === key}
              onClick={() => setRule({ destKind: key as "todos" | DestKind })}
            >
              {label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Aviso no navegador</p>
          <p className="text-xs text-muted-foreground">Quando a aba estiver em segundo plano</p>
        </div>
        <Switch
          checked={rule.notifyBrowser}
          onCheckedChange={toggleNotify}
          aria-label="Aviso no navegador"
        />
      </div>

      <Button
        variant="outline"
        disabled={testing}
        onClick={() => {
          setTesting(true);
          setRule({ enabled: true });
          spawnMatching();
          setTesting(false);
        }}
      >
        <Bell className="size-4" />
        Testar alerta agora
      </Button>
    </div>
  );
}

export function AlertQueue() {
  const alerts = useFreight((s) => s.alerts);
  const loads = useFreight((s) => s.loads);
  const phone = useFreight((s) => s.rule.phone);
  const markSent = useFreight((s) => s.markSent);
  const markAllSent = useFreight((s) => s.markAllSent);
  const clearSent = useFreight((s) => s.clearSent);
  const pending = alerts.filter((a) => !a.sent);
  const sent = alerts.filter((a) => a.sent);

  function send(alertId: string, loadId: string) {
    const load = loads.find((l) => l.id === loadId);
    const alert = alerts.find((a) => a.id === alertId);
    if (load) {
      openWhatsApp(loadMessage(load), phone);
    } else if (alert) {
      const msg = [
        `*BITREM ALERTA*`,
        `${GRAIN_LABEL[alert.snapshot.grain]} · ${nBr.format(alert.snapshot.volumeT)} t`,
        `${alert.snapshot.origin} → ${alert.snapshot.dest}`,
        `${nBr.format(alert.snapshot.km)} km · ${brl.format(alert.snapshot.ratePerT)}/t`,
      ].join("\n");
      openWhatsApp(msg, phone);
    }
    markSent(alertId);
  }

  function sendAll() {
    if (!pending.length) return;
    const first = pending[0]!;
    send(first.id, first.loadId);
    markAllSent();
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-lg font-semibold tracking-tight">
          Fila WhatsApp
          {pending.length ? (
            <Badge variant="live" className="ml-2 align-middle">
              {pending.length}
            </Badge>
          ) : null}
        </p>
        <div className="flex gap-1">
          {pending.length > 1 ? (
            <Button variant="whatsapp" size="sm" onClick={sendAll}>
              Enviar 1ª
            </Button>
          ) : null}
          {sent.length ? (
            <Button variant="ghost" size="icon-sm" onClick={clearSent} aria-label="Limpar enviados">
              <Trash2 className="size-4" />
            </Button>
          ) : null}
        </div>
      </div>

      {!alerts.length ? (
        <p className="rounded-lg bg-secondary px-3 py-4 text-sm text-muted-foreground">
          Nenhuma mensagem na fila. Ative os alertas e aguarde uma carga de bitrem
          que combine — ou toque em Testar alerta agora.
        </p>
      ) : (
        <ul className="flex flex-col gap-2 overflow-y-auto pb-4">
          {alerts.map((a) => (
            <li
              key={a.id}
              className="rounded-lg bg-secondary px-3 py-3 shadow-[var(--shadow-border)]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {GRAIN_LABEL[a.snapshot.grain]} · {nBr.format(a.snapshot.volumeT)} t
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {a.snapshot.origin} → {a.snapshot.dest}
                  </p>
                  <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                    {brl.format(a.snapshot.ratePerT)}/t
                  </p>
                </div>
                {a.sent ? (
                  <Badge variant="outline">
                    <Check className="mr-1 size-3" />
                    Enviada
                  </Badge>
                ) : (
                  <Button size="sm" variant="whatsapp" onClick={() => send(a.id, a.loadId)}>
                    <MessageCircle className="size-3.5" />
                    Enviar
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AlertPanel() {
  const pending = useFreight((s) => s.alerts.some((a) => !a.sent));
  return (
    <div className="flex h-full min-h-0 flex-col gap-6 overflow-y-auto p-5">
      {pending ? (
        <>
          <AlertQueue />
          <Separator />
          <AlertForm />
        </>
      ) : (
        <>
          <AlertForm />
          <Separator />
          <AlertQueue />
        </>
      )}
    </div>
  );
}

export function shareHref(message: string, phone: string) {
  return whatsappUrl(message, phone);
}
