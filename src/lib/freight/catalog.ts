import type { Corridor, Grain } from "./types";

export const CORRIDORS: Corridor[] = [
  {
    origin: { city: "Dourados", uf: "MS" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 1118,
  },
  {
    origin: { city: "Dourados", uf: "MS" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 890,
  },
  {
    origin: { city: "Maracaju", uf: "MS" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 1085,
  },
  {
    origin: { city: "Maracaju", uf: "MS" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 820,
  },
  {
    origin: { city: "Campo Grande", uf: "MS" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 1010,
  },
  {
    origin: { city: "Campo Grande", uf: "MS" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 980,
  },
  {
    origin: { city: "Sidrolândia", uf: "MS" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 1040,
  },
  {
    origin: { city: "São Gabriel do Oeste", uf: "MS" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 960,
  },
  {
    origin: { city: "Chapadão do Sul", uf: "MS" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 920,
  },
  {
    origin: { city: "Naviraí", uf: "MS" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 740,
  },
  {
    origin: { city: "Rio Brilhante", uf: "MS" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 1090,
  },
  {
    origin: { city: "Nova Andradina", uf: "MS" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 980,
  },
  {
    origin: { city: "Ponta Porã", uf: "MS" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 910,
  },
  {
    origin: { city: "Costa Rica", uf: "MS" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 880,
  },
  {
    origin: { city: "Cassilândia", uf: "MS" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 840,
  },
  {
    origin: { city: "Maracaju", uf: "MS" },
    dest: {
      city: "Ponta Grossa",
      uf: "PR",
      kind: "industria",
      label: "Cargill Ponta Grossa",
    },
    km: 690,
  },
  {
    origin: { city: "Dourados", uf: "MS" },
    dest: {
      city: "Ponta Grossa",
      uf: "PR",
      kind: "industria",
      label: "Cargill Ponta Grossa",
    },
    km: 720,
  },
  {
    origin: { city: "Campo Grande", uf: "MS" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "industria",
      label: "ADM Paranaguá",
    },
    km: 990,
  },
  {
    origin: { city: "Sidrolândia", uf: "MS" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "industria",
      label: "LDC Paranaguá",
    },
    km: 860,
  },
  {
    origin: { city: "Chapadão do Sul", uf: "MS" },
    dest: {
      city: "Santos",
      uf: "SP",
      kind: "industria",
      label: "COFCO Santos",
    },
    km: 900,
  },
  {
    origin: { city: "Cascavel", uf: "PR" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 430,
  },
  {
    origin: { city: "Toledo", uf: "PR" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 480,
  },
  {
    origin: { city: "Campo Mourão", uf: "PR" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 390,
  },
  {
    origin: { city: "Londrina", uf: "PR" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 410,
  },
  {
    origin: { city: "Maringá", uf: "PR" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 450,
  },
  {
    origin: { city: "Ponta Grossa", uf: "PR" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 180,
  },
  {
    origin: { city: "Guarapuava", uf: "PR" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 250,
  },
  {
    origin: { city: "Palotina", uf: "PR" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 520,
  },
  {
    origin: { city: "Cascavel", uf: "PR" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 780,
  },
  {
    origin: { city: "Londrina", uf: "PR" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 620,
  },
  {
    origin: { city: "Toledo", uf: "PR" },
    dest: {
      city: "Ponta Grossa",
      uf: "PR",
      kind: "industria",
      label: "Cargill Ponta Grossa",
    },
    km: 310,
  },
  {
    origin: { city: "Assis", uf: "SP" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 520,
  },
  {
    origin: { city: "Ourinhos", uf: "SP" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 470,
  },
  {
    origin: { city: "Presidente Prudente", uf: "SP" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 610,
  },
  {
    origin: { city: "São José do Rio Preto", uf: "SP" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 530,
  },
  {
    origin: { city: "Ribeirão Preto", uf: "SP" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 380,
  },
  {
    origin: { city: "Marília", uf: "SP" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 490,
  },
  {
    origin: { city: "Araçatuba", uf: "SP" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 580,
  },
  {
    origin: { city: "Barretos", uf: "SP" },
    dest: { city: "Santos", uf: "SP", kind: "porto", label: "Porto de Santos" },
    km: 440,
  },
  {
    origin: { city: "Assis", uf: "SP" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 390,
  },
  {
    origin: { city: "Presidente Prudente", uf: "SP" },
    dest: {
      city: "Paranaguá",
      uf: "PR",
      kind: "porto",
      label: "Porto de Paranaguá",
    },
    km: 540,
  },
  {
    origin: { city: "Ourinhos", uf: "SP" },
    dest: {
      city: "Ponta Grossa",
      uf: "PR",
      kind: "industria",
      label: "Cargill Ponta Grossa",
    },
    km: 260,
  },
];

export const SHIPPERS = [
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
  "Bianchini",
];

export const NOTES = [
  "Pedágio incluso. Granel sólido, lonado.",
  "Descarga no terminal. Agendar janela com 24 h.",
  "Quebra de 0,5%. Piso de bitrem — não aceita truck.",
  "Embarque na cooperativa, fila preferencial bitrem.",
  "Frete à vista na descarga. Tacógrafo obrigatório.",
  "Acesso por estrada vicinal; bitrem 7 eixos preferencial.",
  "Carga de lote único. Retorno vazio a combinar.",
  "Descarga no TEG. Documentação da carga pronta.",
  "Janela noturna liberada. Pedágio por conta do embarcador.",
  "Armazém da cooperativa. Pesagem na entrada e na saída.",
];

export const GRAIN_WEIGHT: Record<Grain, number> = {
  milho: 42,
  soja: 26,
  farelo_soja: 16,
  trigo: 10,
  sorgo: 6,
};

export const GRAIN_PREMIUM: Record<Grain, number> = {
  soja: 10,
  milho: 0,
  farelo_soja: 14,
  trigo: 6,
  sorgo: -6,
};
