import { brl, brlCents, nBr, toWhatsAppPhone } from "@/lib/utils";
import type { Load } from "./types";
import { GRAIN_LABEL, VEHICLE_LABEL } from "./types";

function pickupRange(load: Load): string {
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  });
  const a = fmt.format(load.pickupStart);
  const b = fmt.format(load.pickupEnd);
  return a === b ? a : `${a} a ${b}`;
}

export function loadMessage(load: Load): string {
  const lines = [
    `*BITREM ALERTA — carga ${load.id}*`,
    "",
    `Produto: ${GRAIN_LABEL[load.grain]}`,
    `Volume: ${nBr.format(load.volumeT)} t · ${VEHICLE_LABEL[load.vehicle]}`,
    `Rota: ${load.origin.city}/${load.origin.uf} → ${load.dest.label}/${load.dest.uf}`,
    `Distância: ${nBr.format(load.km)} km`,
    `Frete: ${brlCents.format(load.ratePerT)}/t  (${brl.format(load.total)} total)`,
    `Coleta: ${pickupRange(load)}`,
    `Embarcador: ${load.shipper}`,
    `Pedágio: ${load.pedagioIncluso ? "incluso" : "por conta"}`,
    `Obs.: ${load.notes}`,
    "",
    "Carga de bitrem — responder rápido.",
  ];
  return lines.join("\n");
}

export function whatsappUrl(message: string, phone?: string): string {
  const text = encodeURIComponent(message);
  const digits = phone ? toWhatsAppPhone(phone) : null;
  if (digits) {
    return `https://api.whatsapp.com/send?phone=${digits}&text=${text}`;
  }
  return `https://api.whatsapp.com/send?text=${text}`;
}

export function openWhatsApp(message: string, phone?: string) {
  const url = whatsappUrl(message, phone);
  window.open(url, "_blank", "noopener,noreferrer");
}
