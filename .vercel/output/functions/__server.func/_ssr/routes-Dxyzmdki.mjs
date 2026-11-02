import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Search, c as MapPin, d as Check, f as Bell, i as Trash2, l as Funnel, n as Wheat, o as RefreshCw, p as ArrowRight, s as MessageCircle, t as X, u as Clock3 } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogOverlay, f as Slot, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dxyzmdki.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var brl = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
	maximumFractionDigits: 0
});
var brlCents = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
	minimumFractionDigits: 2
});
var nBr = new Intl.NumberFormat("pt-BR");
function relativeTime(ts, now = Date.now()) {
	const diff = Math.max(0, now - ts);
	const min = Math.floor(diff / 6e4);
	if (min < 1) return "agora";
	if (min < 60) return `há ${min} min`;
	const h = Math.floor(min / 60);
	if (h < 24) return `há ${h} h`;
	return `há ${Math.floor(h / 24)} d`;
}
function onlyDigits(value) {
	return value.replace(/\D/g, "");
}
function formatPhoneBr(value) {
	const d = onlyDigits(value).slice(0, 11);
	if (d.length <= 2) return d;
	if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
	if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
	return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
function toWhatsAppPhone(value) {
	const d = onlyDigits(value);
	if (d.length === 10 || d.length === 11) return `55${d}`;
	if (d.length === 12 || d.length === 13) return d.startsWith("55") ? d : null;
	return null;
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-secondary text-muted-foreground",
		outline: "shadow-[var(--shadow-border)] text-muted-foreground",
		live: "bg-live/15 text-live",
		warn: "bg-warn/20 text-warn",
		solid: "bg-primary/12 text-primary"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-[scale,background-color,color,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[var(--shadow-border)]",
			outline: "bg-transparent text-foreground shadow-[var(--shadow-border)] hover:bg-accent",
			ghost: "bg-transparent text-foreground hover:bg-accent",
			whatsapp: "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md bg-secondary px-3 text-sm text-foreground shadow-[var(--shadow-border)] outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/70 disabled:opacity-50", className),
		...props
	});
}
function Separator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "separator",
		className: cn("h-px w-full bg-border", className),
		...props
	});
}
var Sheet = Dialog;
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
		className: cn("fixed inset-0 z-50 bg-background/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex flex-col overflow-hidden bg-card text-card-foreground shadow-[var(--shadow-border)] outline-none data-[state=open]:animate-in data-[state=closed]:animate-out", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", side === "bottom" && "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				className: "absolute top-3 right-3",
				"aria-label": "Fechar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("space-y-1 p-5 pr-12", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-xl font-semibold tracking-tight", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function Toaster$1() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme: "dark",
		position: "top-center",
		toastOptions: { classNames: {
			toast: "bg-card text-card-foreground shadow-[var(--shadow-border)] border-0",
			title: "text-foreground",
			description: "text-muted-foreground"
		} }
	});
}
var GRAIN_LABEL = {
	soja: "Soja",
	milho: "Milho",
	farelo_soja: "Farelo de soja",
	trigo: "Trigo",
	sorgo: "Sorgo"
};
var VEHICLE_LABEL = {
	bitrem_7: "Bitrem 7 eixos",
	bitrem_9: "Bitrem 9 eixos"
};
var UF_LABEL = {
	MS: "Mato Grosso do Sul",
	SP: "São Paulo",
	PR: "Paraná"
};
var DEST_KIND_LABEL = {
	porto: "Porto",
	industria: "Indústria",
	armazem: "Armazém"
};
var ALL_UFS = [
	"MS",
	"SP",
	"PR"
];
var ALL_GRAINS = [
	"soja",
	"milho",
	"farelo_soja",
	"trigo",
	"sorgo"
];
function pickupRange(load) {
	const fmt = new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "short"
	});
	const a = fmt.format(load.pickupStart);
	const b = fmt.format(load.pickupEnd);
	return a === b ? a : `${a} a ${b}`;
}
function loadMessage(load) {
	return [
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
		"Carga de bitrem — responder rápido."
	].join("\n");
}
function whatsappUrl(message, phone) {
	const text = encodeURIComponent(message);
	const digits = phone ? toWhatsAppPhone(phone) : null;
	if (digits) return `https://api.whatsapp.com/send?phone=${digits}&text=${text}`;
	return `https://api.whatsapp.com/send?text=${text}`;
}
function openWhatsApp(message, phone) {
	const url = whatsappUrl(message, phone);
	window.open(url, "_blank", "noopener,noreferrer");
}
var CORRIDORS = [
	{
		origin: {
			city: "Dourados",
			uf: "MS"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 1118
	},
	{
		origin: {
			city: "Dourados",
			uf: "MS"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 890
	},
	{
		origin: {
			city: "Maracaju",
			uf: "MS"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 1085
	},
	{
		origin: {
			city: "Maracaju",
			uf: "MS"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 820
	},
	{
		origin: {
			city: "Campo Grande",
			uf: "MS"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 1010
	},
	{
		origin: {
			city: "Campo Grande",
			uf: "MS"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 980
	},
	{
		origin: {
			city: "Sidrolândia",
			uf: "MS"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 1040
	},
	{
		origin: {
			city: "São Gabriel do Oeste",
			uf: "MS"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 960
	},
	{
		origin: {
			city: "Chapadão do Sul",
			uf: "MS"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 920
	},
	{
		origin: {
			city: "Naviraí",
			uf: "MS"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 740
	},
	{
		origin: {
			city: "Rio Brilhante",
			uf: "MS"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 1090
	},
	{
		origin: {
			city: "Nova Andradina",
			uf: "MS"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 980
	},
	{
		origin: {
			city: "Ponta Porã",
			uf: "MS"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 910
	},
	{
		origin: {
			city: "Costa Rica",
			uf: "MS"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 880
	},
	{
		origin: {
			city: "Cassilândia",
			uf: "MS"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 840
	},
	{
		origin: {
			city: "Maracaju",
			uf: "MS"
		},
		dest: {
			city: "Ponta Grossa",
			uf: "PR",
			kind: "industria",
			label: "Cargill Ponta Grossa"
		},
		km: 690
	},
	{
		origin: {
			city: "Dourados",
			uf: "MS"
		},
		dest: {
			city: "Ponta Grossa",
			uf: "PR",
			kind: "industria",
			label: "Cargill Ponta Grossa"
		},
		km: 720
	},
	{
		origin: {
			city: "Campo Grande",
			uf: "MS"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "industria",
			label: "ADM Paranaguá"
		},
		km: 990
	},
	{
		origin: {
			city: "Sidrolândia",
			uf: "MS"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "industria",
			label: "LDC Paranaguá"
		},
		km: 860
	},
	{
		origin: {
			city: "Chapadão do Sul",
			uf: "MS"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "industria",
			label: "COFCO Santos"
		},
		km: 900
	},
	{
		origin: {
			city: "Cascavel",
			uf: "PR"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 430
	},
	{
		origin: {
			city: "Toledo",
			uf: "PR"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 480
	},
	{
		origin: {
			city: "Campo Mourão",
			uf: "PR"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 390
	},
	{
		origin: {
			city: "Londrina",
			uf: "PR"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 410
	},
	{
		origin: {
			city: "Maringá",
			uf: "PR"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 450
	},
	{
		origin: {
			city: "Ponta Grossa",
			uf: "PR"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 180
	},
	{
		origin: {
			city: "Guarapuava",
			uf: "PR"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 250
	},
	{
		origin: {
			city: "Palotina",
			uf: "PR"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 520
	},
	{
		origin: {
			city: "Cascavel",
			uf: "PR"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 780
	},
	{
		origin: {
			city: "Londrina",
			uf: "PR"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 620
	},
	{
		origin: {
			city: "Toledo",
			uf: "PR"
		},
		dest: {
			city: "Ponta Grossa",
			uf: "PR",
			kind: "industria",
			label: "Cargill Ponta Grossa"
		},
		km: 310
	},
	{
		origin: {
			city: "Assis",
			uf: "SP"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 520
	},
	{
		origin: {
			city: "Ourinhos",
			uf: "SP"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 470
	},
	{
		origin: {
			city: "Presidente Prudente",
			uf: "SP"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 610
	},
	{
		origin: {
			city: "São José do Rio Preto",
			uf: "SP"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 530
	},
	{
		origin: {
			city: "Ribeirão Preto",
			uf: "SP"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 380
	},
	{
		origin: {
			city: "Marília",
			uf: "SP"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 490
	},
	{
		origin: {
			city: "Araçatuba",
			uf: "SP"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 580
	},
	{
		origin: {
			city: "Barretos",
			uf: "SP"
		},
		dest: {
			city: "Santos",
			uf: "SP",
			kind: "porto",
			label: "Porto de Santos"
		},
		km: 440
	},
	{
		origin: {
			city: "Assis",
			uf: "SP"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 390
	},
	{
		origin: {
			city: "Presidente Prudente",
			uf: "SP"
		},
		dest: {
			city: "Paranaguá",
			uf: "PR",
			kind: "porto",
			label: "Porto de Paranaguá"
		},
		km: 540
	},
	{
		origin: {
			city: "Ourinhos",
			uf: "SP"
		},
		dest: {
			city: "Ponta Grossa",
			uf: "PR",
			kind: "industria",
			label: "Cargill Ponta Grossa"
		},
		km: 260
	}
];
var SHIPPERS = [
	"Copasul",
	"Coamo",
	"C.Vale",
	"Lar Cooperativa",
	"Copacol",
	"Cocamar",
	"Integrada",
	"Cargill",
	"Bunge",
	"ADM",
	"Louis Dreyfus",
	"Amaggi",
	"COFCO International",
	"SLC Agrícola",
	"Caramuru",
	"Fiagril",
	"Copercana",
	"Cooperativa Agrícola Sul-Mato-Grossense",
	"Sementes Guerra",
	"Bianchini"
];
var NOTES = [
	"Pedágio incluso. Granel sólido, lonado.",
	"Descarga no terminal. Agendar janela com 24 h.",
	"Quebra de 0,5%. Piso de bitrem — não aceita truck.",
	"Embarque na cooperativa, fila preferencial bitrem.",
	"Frete à vista na descarga. Tacógrafo obrigatório.",
	"Acesso por estrada vicinal; bitrem 7 eixos preferencial.",
	"Carga de lote único. Retorno vazio a combinar.",
	"Descarga no TEG. Documentação da carga pronta.",
	"Janela noturna liberada. Pedágio por conta do embarcador.",
	"Armazém da cooperativa. Pesagem na entrada e na saída."
];
var GRAIN_WEIGHT = {
	milho: 42,
	soja: 26,
	farelo_soja: 16,
	trigo: 10,
	sorgo: 6
};
var GRAIN_PREMIUM = {
	soja: 10,
	milho: 0,
	farelo_soja: 14,
	trigo: 6,
	sorgo: -6
};
function mulberry32(seed) {
	let a = seed >>> 0;
	return function rand() {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function pick(rand, list) {
	return list[Math.floor(rand() * list.length)];
}
function pickWeighted(rand, weights) {
	const entries = Object.entries(weights);
	const total = entries.reduce((s, [, w]) => s + w, 0);
	let r = rand() * total;
	for (const [key, w] of entries) {
		r -= w;
		if (r <= 0) return key;
	}
	return entries[0][0];
}
function rateFor(km, grain, rand) {
	const base = 52 + km * .168 + GRAIN_PREMIUM[grain];
	const noise = (rand() - .45) * 36;
	return Math.round(Math.min(320, Math.max(72, base + noise)));
}
function volumeFor(vehicle, rand) {
	if (vehicle === "bitrem_7") return pick(rand, [
		32,
		34,
		36,
		37
	]);
	return pick(rand, [
		40,
		42,
		43,
		45
	]);
}
var seq = 48e3;
function makeLoad(rand, now = Date.now()) {
	const corridor = pick(rand, CORRIDORS);
	const grain = pickWeighted(rand, GRAIN_WEIGHT);
	const vehicle = rand() < .62 ? "bitrem_7" : "bitrem_9";
	const volumeT = volumeFor(vehicle, rand);
	const ratePerT = rateFor(corridor.km, grain, rand);
	const postedAt = now - Math.floor(rand() * 280) * 6e4;
	const startOffsetH = rand() < .28 ? 0 : Math.floor(rand() * 36) + 4;
	const windowH = pick(rand, [
		18,
		24,
		36,
		48
	]);
	const pickupStart = now + startOffsetH * 36e5;
	const pickupEnd = pickupStart + windowH * 36e5;
	const urgent = startOffsetH < 8 && rand() < .55;
	seq += 1;
	const id = `BT${corridor.origin.uf}${seq}`;
	const statusRoll = rand();
	const status = statusRoll > .92 ? "negociando" : statusRoll > .97 ? "fechada" : "aberta";
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
		pedagioIncluso: rand() > .35,
		notes: pick(rand, NOTES),
		urgent
	};
}
function seedBoard(count = 22, seed = 20260919) {
	const rand = mulberry32(seed);
	const loads = [];
	for (let i = 0; i < count; i++) {
		const load = makeLoad(rand);
		load.status = i < 2 ? "negociando" : "aberta";
		loads.push(load);
	}
	return loads.sort((a, b) => b.postedAt - a.postedAt);
}
function matchesFilters(load, f) {
	if (f.onlyOpen && load.status === "fechada") return false;
	if (f.ufs.length && !f.ufs.includes(load.origin.uf)) return false;
	if (f.grains.length && !f.grains.includes(load.grain)) return false;
	if (f.vehicle !== "todos" && load.vehicle !== f.vehicle) return false;
	if (f.destKind !== "todos" && load.dest.kind !== f.destKind) return false;
	if (load.ratePerT < f.minRate) return false;
	if (f.onlyUrgent && !load.urgent) return false;
	if (f.query.trim()) {
		const q = f.query.trim().toLowerCase();
		if (![
			load.origin.city,
			load.dest.city,
			load.dest.label,
			load.shipper,
			load.id,
			load.origin.uf,
			load.dest.uf
		].join(" ").toLowerCase().includes(q)) return false;
	}
	return true;
}
function matchesRule(load, rule) {
	if (!rule.enabled) return false;
	if (load.status === "fechada") return false;
	if (rule.ufs.length && !rule.ufs.includes(load.origin.uf)) return false;
	if (rule.grains.length && !rule.grains.includes(load.grain)) return false;
	if (load.ratePerT < rule.minRate) return false;
	if (rule.destKind !== "todos" && load.dest.kind !== rule.destKind) return false;
	return true;
}
var DEFAULT_FILTERS = {
	ufs: [],
	grains: [],
	vehicle: "todos",
	destKind: "todos",
	minRate: 0,
	query: "",
	onlyUrgent: false,
	onlyOpen: true
};
var DEFAULT_RULE = {
	enabled: false,
	phone: "",
	ufs: [],
	grains: [...ALL_GRAINS],
	minRate: 0,
	destKind: "todos",
	notifyBrowser: false
};
var RULE_KEY = "bitrem-alerta-rule";
var ALERTS_KEY = "bitrem-alerta-queue";
function readJson(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return fallback;
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}
function persistAlerts(alerts) {
	if (typeof window === "undefined") return;
	localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts.slice(0, 40)));
}
function pushBrowserNotification(load) {
	if (typeof window === "undefined" || !("Notification" in window)) return;
	if (Notification.permission !== "granted") return;
	try {
		new Notification("Nova carga bitrem", { body: `${GRAIN_LABEL[load.grain]} · ${load.origin.city}/${load.origin.uf} → ${load.dest.city}/${load.dest.uf} · ${brl.format(load.ratePerT)}/t` });
	} catch {}
}
function toAlert(load) {
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
			km: load.km
		}
	};
}
var useFreight = create((set, get) => ({
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
		const storedRule = readJson(RULE_KEY, {});
		const rule = {
			...DEFAULT_RULE,
			...storedRule
		};
		const alerts = readJson(ALERTS_KEY, []);
		const loads = seedBoard(24, 20260919 + Math.floor(Date.now() / 36e5));
		set({
			ready: true,
			rule,
			alerts,
			loads,
			now: Date.now(),
			selectedId: loads[0]?.id ?? null,
			requestMobileDetail: false
		});
	},
	setFilters: (patch) => set((s) => ({ filters: {
		...s.filters,
		...patch
	} })),
	toggleUf: (uf) => set((s) => {
		const has = s.filters.ufs.includes(uf);
		return { filters: {
			...s.filters,
			ufs: has ? s.filters.ufs.filter((x) => x !== uf) : [...s.filters.ufs, uf]
		} };
	}),
	setRule: (patch) => {
		const rule = {
			...get().rule,
			...patch
		};
		set({ rule });
		if (typeof window !== "undefined") localStorage.setItem(RULE_KEY, JSON.stringify(rule));
	},
	select: (id, opts) => set({
		selectedId: id,
		requestMobileDetail: Boolean(id) && Boolean(opts?.mobile)
	}),
	markSent: (alertId) => {
		const alerts = get().alerts.map((a) => a.id === alertId ? {
			...a,
			sent: true
		} : a);
		set({ alerts });
		persistAlerts(alerts);
	},
	markAllSent: () => {
		const alerts = get().alerts.map((a) => ({
			...a,
			sent: true
		}));
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
			const oldest = [...get().loads].filter((l) => l.status === "aberta").sort((a, b) => a.postedAt - b.postedAt)[0];
			if (oldest) loads = loads.map((l) => l.id === oldest.id ? {
				...l,
				status: "fechada"
			} : l);
		}
		const rule = get().rule;
		const matched = announce && matchesRule(load, rule);
		let alerts = get().alerts;
		if (matched) {
			alerts = [toAlert(load), ...alerts].slice(0, 40);
			toast(`${GRAIN_LABEL[load.grain]} · ${load.origin.city} → ${load.dest.city}`, { description: `${brl.format(load.ratePerT)}/t · ${load.volumeT} t · bitrem` });
			if (rule.notifyBrowser) pushBrowserNotification(load);
			persistAlerts(alerts);
		}
		set({
			loads,
			alerts,
			lastEvent: `Nova: ${GRAIN_LABEL[load.grain]} ${load.origin.city}/${load.origin.uf} → ${load.dest.city}`
		});
	},
	spawnLoad: () => {
		const rand = mulberry32((Date.now() ^ get().loads.length * 9973) >>> 0);
		const load = makeLoad(rand, Date.now());
		load.status = "aberta";
		load.postedAt = Date.now();
		load.urgent = rand() < .32;
		get().ingest(load, true);
		return load;
	},
	spawnMatching: () => {
		const rule = get().rule;
		const rand = mulberry32((Date.now() ^ 2654435769) >>> 0);
		for (let i = 0; i < 48; i++) {
			const load = makeLoad(rand, Date.now());
			load.status = "aberta";
			load.postedAt = Date.now();
			if (matchesRule({
				...load,
				status: "aberta"
			}, {
				...rule,
				enabled: true
			})) {
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
		const target = get().loads.filter((l) => l.status === "aberta").sort((a, b) => a.postedAt - b.postedAt)[0];
		if (!target) return;
		set({
			loads: get().loads.map((l) => l.id === target.id ? {
				...l,
				status: "fechada"
			} : l),
			lastEvent: `Fechada: ${target.id} · ${target.origin.city}`
		});
	}
}));
function useVisibleLoads() {
	const loads = useFreight((s) => s.loads);
	const filters = useFreight((s) => s.filters);
	return loads.filter((l) => matchesFilters(l, filters));
}
function pickupLabel(load) {
	const fmt = new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "short"
	});
	const a = fmt.format(load.pickupStart);
	const b = fmt.format(load.pickupEnd);
	return a === b ? a : `${a} – ${b}`;
}
function LoadCard({ load, now }) {
	const selected = useFreight((s) => s.selectedId === load.id);
	const select = useFreight((s) => s.select);
	const phone = useFreight((s) => s.rule.phone);
	const isNew = now - load.postedAt < 48e4;
	const closed = load.status === "fechada";
	function openDetail() {
		const mobile = typeof window !== "undefined" && !window.matchMedia("(min-width: 1024px)").matches;
		select(load.id, { mobile });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("rounded-xl bg-card p-4 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 ease-out", selected && "shadow-[var(--shadow-border-hover)] ring-1 ring-ring/40", closed && "opacity-55"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: openDetail,
			className: "flex w-full flex-col gap-3 text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl font-semibold tracking-tight text-foreground",
									children: GRAIN_LABEL[load.grain]
								}),
								isNew && !closed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "live",
									children: "Nova"
								}) : null,
								load.urgent && !closed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "warn",
									children: "Urgente"
								}) : null,
								load.status === "negociando" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: "Em negociação"
								}) : null,
								closed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Fechada" }) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-sm text-muted-foreground",
							children: [
								VEHICLE_LABEL[load.vehicle],
								" · ",
								nBr.format(load.volumeT),
								" t · ",
								load.id
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-2xl font-semibold leading-none tabular-nums tracking-tight",
							children: [brl.format(load.ratePerT), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-muted-foreground",
								children: "/t"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground tabular-nums",
							children: [brl.format(load.total), " total"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg bg-secondary/80 px-3 py-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: load.origin.city
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: load.origin.uf
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs tabular-nums",
								children: [nBr.format(load.km), " km"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: load.dest.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: load.dest.uf
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3.5" }),
								"Coleta ",
								pickupLabel(load)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), load.shipper]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: relativeTime(load.postedAt, now)
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "whatsapp",
				size: "sm",
				className: "flex-1",
				disabled: closed,
				onClick: () => openWhatsApp(loadMessage(load), phone),
				children: "WhatsApp"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "sm",
				className: "flex-1",
				onClick: openDetail,
				children: "Detalhe"
			})]
		})]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-border transition-[background-color] duration-150 ease-out data-[state=checked]:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-background transition-transform duration-150 ease-out data-[state=checked]:translate-x-5 data-[state=checked]:bg-primary-foreground" })
	});
}
function Chip$1({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-9 rounded-full px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out", active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"),
		children
	});
}
function AlertForm() {
	const rule = useFreight((s) => s.rule);
	const setRule = useFreight((s) => s.setRule);
	const spawnMatching = useFreight((s) => s.spawnMatching);
	const [testing, setTesting] = (0, import_react.useState)(false);
	function toggleUf(uf) {
		const has = rule.ufs.includes(uf);
		setRule({ ufs: has ? rule.ufs.filter((x) => x !== uf) : [...rule.ufs, uf] });
	}
	function toggleGrain(g) {
		const next = rule.grains.includes(g) ? rule.grains.filter((x) => x !== g) : [...rule.grains, g];
		setRule({ grains: next.length ? next : [...ALL_GRAINS] });
	}
	async function toggleEnabled(on) {
		setRule({ enabled: on });
		if (on) {
			setTesting(true);
			window.setTimeout(() => {
				spawnMatching();
				setTesting(false);
			}, 400);
		}
	}
	async function toggleNotify(on) {
		if (on && "Notification" in window && Notification.permission === "default") await Notification.requestPermission();
		setRule({ notifyBrowser: on && Notification.permission === "granted" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 rounded-lg bg-secondary px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Alertas ativos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Nova carga que bater a regra entra na fila do WhatsApp"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: rule.enabled,
					onCheckedChange: toggleEnabled,
					"aria-label": "Ativar alertas"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium tracking-wide text-muted-foreground",
						children: "WhatsApp (seu número ou do despachante)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						inputMode: "tel",
						autoComplete: "tel",
						placeholder: "(67) 99999-0000",
						value: formatPhoneBr(rule.phone),
						onChange: (e) => setRule({ phone: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted-foreground",
						children: "Vazio: o WhatsApp abre para você escolher o contato ou o grupo."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-muted-foreground",
						children: "Origem"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: ALL_UFS.map((uf) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$1, {
							active: rule.ufs.length === 0 || rule.ufs.includes(uf),
							onClick: () => toggleUf(uf),
							children: uf
						}, uf))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: rule.ufs.length === 0 ? "Todos os estados (MS, SP e PR)" : rule.ufs.join(" · ")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted-foreground",
					children: "Grão"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: ALL_GRAINS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$1, {
						active: rule.grains.includes(g),
						onClick: () => toggleGrain(g),
						children: GRAIN_LABEL[g]
					}, g))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium tracking-wide text-muted-foreground",
					children: "Frete mínimo (R$/t)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					step: 10,
					value: rule.minRate || "",
					placeholder: "0",
					onChange: (e) => setRule({ minRate: Number(e.target.value) || 0 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted-foreground",
					children: "Destino"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						["todos", "Todos"],
						["porto", "Porto"],
						["industria", "Indústria"]
					].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip$1, {
						active: rule.destKind === key,
						onClick: () => setRule({ destKind: key }),
						children: label
					}, key))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Aviso no navegador"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Quando a aba estiver em segundo plano"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					checked: rule.notifyBrowser,
					onCheckedChange: toggleNotify,
					"aria-label": "Aviso no navegador"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				disabled: testing,
				onClick: () => {
					setTesting(true);
					setRule({ enabled: true });
					spawnMatching();
					setTesting(false);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), "Testar alerta agora"]
			})
		]
	});
}
function AlertQueue() {
	const alerts = useFreight((s) => s.alerts);
	const loads = useFreight((s) => s.loads);
	const phone = useFreight((s) => s.rule.phone);
	const markSent = useFreight((s) => s.markSent);
	const markAllSent = useFreight((s) => s.markAllSent);
	const clearSent = useFreight((s) => s.clearSent);
	const pending = alerts.filter((a) => !a.sent);
	const sent = alerts.filter((a) => a.sent);
	function send(alertId, loadId) {
		const load = loads.find((l) => l.id === loadId);
		const alert = alerts.find((a) => a.id === alertId);
		if (load) openWhatsApp(loadMessage(load), phone);
		else if (alert) openWhatsApp([
			`*BITREM ALERTA*`,
			`${GRAIN_LABEL[alert.snapshot.grain]} · ${nBr.format(alert.snapshot.volumeT)} t`,
			`${alert.snapshot.origin} → ${alert.snapshot.dest}`,
			`${nBr.format(alert.snapshot.km)} km · ${brl.format(alert.snapshot.ratePerT)}/t`
		].join("\n"), phone);
		markSent(alertId);
	}
	function sendAll() {
		if (!pending.length) return;
		const first = pending[0];
		send(first.id, first.loadId);
		markAllSent();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-lg font-semibold tracking-tight",
				children: ["Fila WhatsApp", pending.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "live",
					className: "ml-2 align-middle",
					children: pending.length
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1",
				children: [pending.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "whatsapp",
					size: "sm",
					onClick: sendAll,
					children: "Enviar 1ª"
				}) : null, sent.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					onClick: clearSent,
					"aria-label": "Limpar enviados",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				}) : null]
			})]
		}), !alerts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-lg bg-secondary px-3 py-4 text-sm text-muted-foreground",
			children: "Nenhuma mensagem na fila. Ative os alertas e aguarde uma carga de bitrem que combine — ou toque em Testar alerta agora."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2 overflow-y-auto pb-4",
			children: alerts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "rounded-lg bg-secondary px-3 py-3 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm font-medium",
								children: [
									GRAIN_LABEL[a.snapshot.grain],
									" · ",
									nBr.format(a.snapshot.volumeT),
									" t"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									a.snapshot.origin,
									" → ",
									a.snapshot.dest
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs tabular-nums text-muted-foreground",
								children: [brl.format(a.snapshot.ratePerT), "/t"]
							})
						]
					}), a.sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 size-3" }), "Enviada"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "whatsapp",
						onClick: () => send(a.id, a.loadId),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-3.5" }), "Enviar"]
					})]
				})
			}, a.id))
		})]
	});
}
function AlertPanel() {
	const pending = useFreight((s) => s.alerts.some((a) => !a.sent));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full min-h-0 flex-col gap-6 overflow-y-auto p-5",
		children: pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertQueue, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertForm, {})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertForm, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertQueue, {})
		] })
	});
}
function LogoMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-8",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "7",
				className: "fill-secondary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "4",
				y: "18",
				width: "11",
				height: "6",
				rx: "1.2",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "16.5",
				y: "18",
				width: "11",
				height: "6",
				rx: "1.2",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14.2",
				y: "20",
				width: "3.6",
				height: "2",
				rx: "0.4",
				className: "fill-muted-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "7.2",
				cy: "25.2",
				r: "1.5",
				className: "fill-muted-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "11.8",
				cy: "25.2",
				r: "1.5",
				className: "fill-muted-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "19.6",
				cy: "25.2",
				r: "1.5",
				className: "fill-muted-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24.4",
				cy: "25.2",
				r: "1.5",
				className: "fill-muted-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "17.5",
				y: "8",
				width: "9",
				height: "8",
				rx: "1",
				className: "fill-primary"
			})
		]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out", active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"),
		children
	});
}
function Kpi({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-40 shrink-0 rounded-xl bg-card px-4 py-3 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display mt-1 text-2xl font-semibold leading-none tabular-nums tracking-tight",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function CorridorStrip({ loads }) {
	const rows = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const load of loads) {
			if (load.status === "fechada") continue;
			const key = `${load.origin.uf}-${load.dest.label}`;
			const cur = map.get(key) ?? {
				label: `${load.origin.uf} · ${load.dest.label}`,
				uf: load.origin.uf,
				count: 0,
				avg: 0
			};
			cur.count += 1;
			cur.avg += load.ratePerT;
			map.set(key, cur);
		}
		return [...map.values()].map((r) => ({
			...r,
			avg: r.avg / r.count
		})).sort((a, b) => b.count - a.count).slice(0, 6);
	}, [loads]);
	const max = rows[0]?.count ?? 1;
	if (!rows.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-card p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-baseline justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold tracking-tight",
				children: "Corredores quentes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "MS · SP · PR · bitrem"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-2.5",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex items-baseline justify-between gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: row.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "shrink-0 tabular-nums text-muted-foreground",
					children: [
						row.count,
						" · ",
						brl.format(row.avg),
						"/t"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 overflow-hidden rounded-full bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-primary/80",
					style: { width: `${Math.max(12, row.count / max * 100)}%` }
				})
			})] }, row.label))
		})]
	});
}
function Detail({ load, now }) {
	const phone = useFreight((s) => s.rule.phone);
	const fmt = new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-muted-foreground",
					children: load.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: GRAIN_LABEL[load.grain]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						VEHICLE_LABEL[load.vehicle],
						" · ",
						nBr.format(load.volumeT),
						" t"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-secondary px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Frete"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-xl font-semibold tabular-nums",
						children: [brl.format(load.ratePerT), "/t"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-secondary px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Total"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl font-semibold tabular-nums",
						children: brl.format(load.total)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg bg-secondary px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: [
							load.origin.city,
							"/",
							load.origin.uf
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [nBr.format(load.km), " km"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm font-medium",
						children: [
							load.dest.label,
							"/",
							load.dest.uf
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: DEST_KIND_LABEL[load.dest.kind]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-1 gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Embarcador"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: load.shipper })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Coleta"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "text-right",
							children: [
								fmt.format(load.pickupStart),
								" — ",
								fmt.format(load.pickupEnd)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Pedágio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: load.pedagioIncluso ? "Incluso" : "Por conta" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Publicada"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: relativeTime(load.postedAt, now) })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: load.notes
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "whatsapp",
				disabled: load.status === "fechada",
				onClick: () => openWhatsApp(loadMessage(load), phone),
				children: "Enviar no WhatsApp"
			})
		]
	});
}
function GrainAndVehicleFilters() {
	const filters = useFreight((s) => s.filters);
	const setFilters = useFreight((s) => s.setFilters);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		ALL_GRAINS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			active: filters.grains.includes(g),
			onClick: () => {
				const has = filters.grains.includes(g);
				setFilters({ grains: has ? filters.grains.filter((x) => x !== g) : [...filters.grains, g] });
			},
			children: GRAIN_LABEL[g]
		}, g)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			active: filters.onlyUrgent,
			onClick: () => setFilters({ onlyUrgent: !filters.onlyUrgent }),
			children: "Urgente"
		}),
		[
			["todos", "Qualquer bitrem"],
			["bitrem_7", "7 eixos"],
			["bitrem_9", "9 eixos"]
		].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			active: filters.vehicle === key,
			onClick: () => setFilters({ vehicle: key }),
			children: label
		}, key)),
		[
			["todos", "Todos destinos"],
			["porto", "Porto"],
			["industria", "Indústria"]
		].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			active: filters.destKind === key,
			onClick: () => setFilters({ destKind: key }),
			children: label
		}, key))
	] });
}
function LiveClock() {
	const hydrate = useFreight((s) => s.hydrate);
	const spawnLoad = useFreight((s) => s.spawnLoad);
	const closeOldest = useFreight((s) => s.closeOldest);
	const tick = useFreight((s) => s.tick);
	(0, import_react.useEffect)(() => {
		hydrate();
		const t = window.setInterval(() => tick(), 3e4);
		const spawn = window.setInterval(() => spawnLoad(), 22e3);
		const close = window.setInterval(() => closeOldest(), 48e3);
		return () => {
			window.clearInterval(t);
			window.clearInterval(spawn);
			window.clearInterval(close);
		};
	}, [
		hydrate,
		spawnLoad,
		closeOldest,
		tick
	]);
	return null;
}
function Dashboard() {
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
	const [filterOpen, setFilterOpen] = (0, import_react.useState)(false);
	const [alertOpen, setAlertOpen] = (0, import_react.useState)(false);
	const selected = loads.find((l) => l.id === selectedId) ?? null;
	const openLoads = loads.filter((l) => l.status !== "fechada");
	const avg = openLoads.length === 0 ? 0 : Math.round(openLoads.reduce((s, l) => s + l.ratePerT, 0) / openLoads.length);
	const byUf = ALL_UFS.map((uf) => ({
		uf,
		n: openLoads.filter((l) => l.origin.uf === uf).length
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveClock, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-xl font-semibold tracking-tight sm:text-2xl",
									children: "Bitrem Alerta"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "live",
									className: "gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "live-dot size-1.5 rounded-full bg-live" }), "Ao vivo"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: "Grãos para bitrem · MS, SP e PR"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							size: "icon",
							className: "lg:hidden",
							onClick: () => setFilterOpen(true),
							"aria-label": "Filtros",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: enabled ? "whatsapp" : "secondary",
							className: "relative",
							onClick: () => setAlertOpen(true),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Alertas"
								}),
								pending > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 grid size-5 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground",
									children: pending
								}) : null
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-6 lg:py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 overflow-x-auto pb-1",
							children: [
								byUf.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
									label: UF_LABEL[row.uf],
									value: `${row.n}`,
									hint: `cargas abertas · ${row.uf}`
								}, row.uf)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
									label: "Frete médio",
									value: brl.format(avg),
									hint: "R$ por tonelada"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
									label: "Praça bitrem",
									value: `${openLoads.length}`,
									hint: lastEvent ?? "quadro ao vivo"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 rounded-xl bg-card p-3 shadow-[var(--shadow-border)] sm:p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: filters.query,
											onChange: (e) => setFilters({ query: e.target.value }),
											placeholder: "Cidade, porto, embarcador ou código",
											className: "pl-9"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										size: "icon",
										onClick: () => spawnLoad(),
										"aria-label": "Buscar novas cargas",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 overflow-x-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										active: filters.ufs.length === 0,
										onClick: () => setFilters({ ufs: [] }),
										children: "Todos"
									}), ALL_UFS.map((uf) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										active: filters.ufs.includes(uf),
										onClick: () => toggleUf(uf),
										children: uf
									}, uf))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden flex-wrap gap-2 lg:flex",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrainAndVehicleFilters, {})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorridorStrip, { loads: visible.length ? visible : loads }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-end justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold tracking-tight",
								children: "Cargas disponíveis"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground tabular-nums",
								children: [visible.length, " no filtro"]
							})]
						}), !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-52 animate-pulse rounded-xl bg-card shadow-[var(--shadow-border)]" }, i))
						}) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-card px-5 py-10 text-center shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheat, { className: "mx-auto size-6 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground",
									children: "Nenhuma carga de bitrem neste recorte. Limpe os filtros ou aguarde a próxima publicação da praça."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "mt-4",
									variant: "secondary",
									onClick: () => setFilters({
										ufs: [],
										grains: [],
										vehicle: "todos",
										destKind: "todos",
										minRate: 0,
										query: "",
										onlyUrgent: false,
										onlyOpen: true
									}),
									children: "Limpar filtros"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: visible.map((load, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "board-enter",
								style: { animationDelay: `${Math.min(i, 8) * 40}ms` },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadCard, {
									load,
									now
								})
							}, load.id))
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden lg:flex lg:flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-card shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5 pb-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs tracking-wide text-muted-foreground",
										children: "Como rastrear"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-lg font-semibold tracking-tight",
										children: "Bitrem em MS, SP e PR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
										className: "mt-3 list-decimal space-y-2 pl-4 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Filtre o estado de origem e o grão." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Ative o alerta e, se quiser, informe o WhatsApp." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Quando entrar carga compatível, a mensagem é montada." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Toque em Enviar — o WhatsApp abre com o texto pronto." })
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "mt-4" }),
							selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
									load: selected,
									now
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "p-5 text-sm text-muted-foreground",
								children: "Selecione uma carga para ver o detalhe."
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: filterOpen,
				onOpenChange: setFilterOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "bottom",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Filtros" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Recorte a praça de bitrem" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2 px-5 pb-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrainAndVehicleFilters, {})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: alertOpen,
				onOpenChange: setAlertOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Alertas WhatsApp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Mensagem pronta para enviar. Sem API do WhatsApp Business — o envio é no seu aplicativo, com um toque." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertPanel, {})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: requestMobileDetail && Boolean(selected),
				onOpenChange: (open) => {
					if (!open) select(selectedId, { mobile: false });
				},
				children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "bottom",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, { children: ["Carga ", selected.id] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: [GRAIN_LABEL[selected.grain], " para bitrem"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-y-auto px-5 pb-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
							load: selected,
							now
						})
					})]
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto max-w-7xl px-4 pb-8 text-center text-xs text-muted-foreground",
				children: "Praça ilustrativa com corredores reais de grãos em MS, SP e PR. Confira sempre no embarcador antes de fechar o frete."
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {});
}
//#endregion
export { Home as component };
