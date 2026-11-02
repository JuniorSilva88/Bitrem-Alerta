# Documento de implementação — Bitrem Alerta

## 1. Objetivo e escopo

O Bitrem Alerta é uma interface demonstrativa de consulta e acompanhamento de cargas para bitrem nos estados MS, SP e PR. O fluxo funcional disponível cobre visualização de cargas geradas localmente, pesquisa e filtragem, consulta de detalhes, configuração de alertas e abertura de uma conversa do WhatsApp com uma mensagem pré-preenchida.

O produto **não está conectado a fontes de frete ou sistemas de embarcadores**. As cargas e os indicadores são dados sintéticos; não representam ofertas, tarifas ou janelas de coleta confirmadas. Não há transação de reserva ou agendamento.

## 2. Arquitetura em alto nível

```text
src/routes/__root.tsx
  └── src/routes/index.tsx
        └── Dashboard
             ├── LoadCard ── seleção e detalhe da carga
             ├── AlertPanel ── configuração de regras e fila
             └── useFreight (Zustand)
                   ├── generator/catalog ── dados demonstrativos
                   ├── localStorage ── regras e fila de alertas
                   └── whatsapp ── URL e texto pré-preenchido
```

É uma aplicação React/TypeScript com roteamento do TanStack Start. A rota de entrada `/` renderiza o dashboard. Tailwind CSS fornece utilitários e tokens de design; Radix UI fornece o comportamento base de diálogos e controles.

## 3. Módulos da aplicação

| Local                                  | Responsabilidade                                                                               |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/routes/__root.tsx`                | Shell HTML, metadados, fontes, folha de estilos e providers globais.                           |
| `src/routes/index.tsx`                 | Rota `/`; renderiza `Dashboard`.                                                               |
| `src/components/freight/dashboard.tsx` | Indicadores, busca/filtros, lista, corredores, painel desktop, diálogos e detalhes.            |
| `src/components/freight/load-card.tsx` | Cartão de carga, seleção e ações de detalhe/WhatsApp.                                          |
| `src/components/freight/alerts.tsx`    | Formulário de regras, pedido de permissão de notificação e fila de alertas.                    |
| `src/components/ui/`                   | Botão, campo, badge, sheet, switch, separador e toaster reutilizáveis.                         |
| `src/lib/freight/types.ts`             | Tipos, estados, rótulos e constantes de grãos, veículos e destinos.                            |
| `src/lib/freight/catalog.ts`           | Corredores, pesos de grãos, embarcadores e textos usados na simulação.                         |
| `src/lib/freight/generator.ts`         | Criação de cargas sintéticas e predicados de filtros/regras.                                   |
| `src/lib/freight/store.ts`             | Store Zustand, inicialização, ciclos da simulação, alertas e persistência local.               |
| `src/lib/freight/whatsapp.ts`          | Montagem de mensagem e URL para abrir o WhatsApp.                                              |
| `src/lib/utils.ts`                     | Formatação monetária/numérica, classes e utilitários de interface.                             |
| `src/styles.css`                       | Paleta, tipografia, estilos globais e animações.                                               |
| `src/lib/app-data/`                    | Utilitários opcionais de leitura/estado de conectores; não alimentam o quadro de cargas atual. |
| `src/lib/auth/`                        | Base opcional de autenticação; não há fluxo de conta exposto no produto de cargas.             |
| `src/lib/db.ts` e `migrations/`        | Camada SQL e migrações para recursos que precisem de persistência no servidor.                 |
| `server/middleware/` e `public/`       | Recursos de instalação/PWA, metadados e arquivos públicos.                                     |
| `scripts/`                             | Wrappers de ambiente, build, migrações, preview, verificações e testes.                        |

## 4. Domínio e ciclo de vida das cargas

Uma carga (`Load`) contém identificador, grão, volume, veículo, origem, destino, quilometragem, frete por tonelada e total, embarcador, início/fim da coleta, horário de publicação, status, pedágio, observações e sinalizador de urgência.

Valores aceitos no modelo:

- **Estados:** MS, SP e PR.
- **Grãos:** soja, milho, farelo de soja, trigo e sorgo.
- **Veículos:** bitrem de 7 e 9 eixos.
- **Destinos:** porto, indústria e armazém.
- **Status:** aberta, em negociação e fechada.

Ao abrir a aplicação, `hydrate()` cria um quadro inicial de 24 cargas sintéticas. O gerador usa o catálogo de corredores e escolhe grão, veículo, volume, preço, embarcador, horários e observações. A sequência é baseada no relógio para dar variação às demonstrações; ela não consulta serviço externo.

Enquanto o dashboard está montado, `LiveClock` atualiza a hora de referência a cada 30 segundos, acrescenta uma carga demonstrativa a cada 22 segundos e fecha a carga aberta mais antiga a cada 48 segundos. O botão de atualização acrescenta outra carga imediatamente. Esses intervalos são simulação de interface, não monitoramento de mercado.

O cálculo de total é `frete por tonelada × volume`. O gerador estima valores a partir de distância e prêmio do grão com uma variação aleatória limitada. Portanto, os valores não devem ser usados como cotação.

## 5. Busca, filtros e indicadores

`matchesFilters()` combina os filtros do quadro:

- texto parcial em cidade de origem, cidade/rótulo de destino, embarcador, código ou UF;
- estado de origem;
- grãos;
- tipo de veículo;
- tipo de destino;
- urgência;
- exclusão de cargas fechadas (padrão inicial).

O tipo `BoardFilters` e `matchesFilters()` também aceitam um frete mínimo, embora o dashboard ainda não exponha um controle visual para esse filtro. O formulário de alertas tem seu próprio campo de frete mínimo.

O dashboard resume as cargas não fechadas por estado, calcula o frete médio por tonelada da praça e apresenta os principais corredores do recorte atual (ou do quadro inteiro se nenhum resultado passar pelos filtros). Em telas grandes, o painel de detalhe fica ao lado do quadro e permanece acessível durante a rolagem; em telas menores, os detalhes são apresentados em uma janela inferior.

## 6. Alertas e fila de WhatsApp

Uma regra (`AlertRule`) combina estado, grão, frete mínimo por tonelada, tipo de destino, número opcional e opções de notificação. `matchesRule()` só aceita cargas abertas que satisfaçam a regra ativa.

Ao ativar alertas, a interface tenta gerar uma carga demonstrativa que corresponda à regra para exercitar o fluxo. A opção **Testar alerta agora** também insere uma carga sintética e a encaminha pelo mesmo mecanismo de avaliação. Uma correspondência cria uma entrada na fila, exibe aviso na aplicação e, se autorizado, tenta mostrar uma notificação do navegador.

O texto enviado inclui produto, volume, veículo, rota, distância, preço estimado, janela, embarcador, pedágio e observações. `whatsappUrl()` codifica o texto e, quando há número configurado, normaliza-o para o parâmetro `phone`. `openWhatsApp()` abre o endereço em outra aba/janela. O usuário ainda precisa confirmar o envio no WhatsApp.

Na fila:

- cada botão **Enviar** abre a conversa da carga correspondente e marca apenas aquele item como enviado;
- **Enviar 1ª** abre somente a primeira pendência; as demais continuam pendentes;
- itens enviados podem ser removidos da fila;
- a fila persiste até 40 itens.

Não há acesso à API do WhatsApp Business, envio automático de mensagens ou confirmação de leitura.

## 7. Estado e persistência

O estado de interface é mantido em uma store Zustand (`useFreight`). Filtros e seleção da carga são estado de sessão em memória. Ao recarregar, o quadro demonstrativo é criado novamente. O provider global de aplicação existe como ponto estável de composição; atualmente ele não adiciona estado de autenticação à interface do quadro.

No navegador, as regras de alerta são gravadas sob a chave `bitrem-alerta-rule`, e a fila sob `bitrem-alerta-queue`. A fila é limitada a 40 entradas. Esses dados não são sincronizados entre navegadores ou dispositivos e não têm cópia no servidor. A regra inclui o telefone informado pelo usuário, portanto fica armazenada no `localStorage` desse navegador.

## 8. Interface e identidade visual

Os tokens de cor, raio, tipografia e sombra estão em `src/styles.css`; a tabela completa e os usos estão no README. O tema é escuro, com superfícies em tons de carvão, textos claros, verde para ações WhatsApp/atividade e âmbar para avisos.

A fonte Barlow é usada no texto corrido e Barlow Condensed nos títulos, com alternativas de sistema. A interface responde ao tamanho da janela, oferece foco visível, respeita `prefers-reduced-motion` e usa animações leves para entrada do quadro e indicação de atividade.

## 9. Configuração e execução

Requisitos: Node.js 22.12 ou superior e npm.

```sh
npm ci
npm run dev
```

O comando `dev` inicia Vite por meio de `scripts/with-app-env.mjs`, que carrega as variáveis `VITE_` locais antes de iniciar o servidor. A configuração de desenvolvimento usa a porta 8080. Evite iniciar o Vite diretamente, para que o ambiente local e o build leiam o mesmo sinalizador.

Comandos de verificação e publicação:

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

`npm run build` compila a aplicação e depois executa `scripts/migrate.mjs`. O migrador ignora o banco se `DATABASE_URL` não estiver definida; quando há banco configurado, aplica migrações pendentes de forma transacional. O backend SQL suporta PostgreSQL configurado e PGlite para execução local da infraestrutura de banco.

## 10. Autenticação, banco e integrações opcionais

A aplicação de cargas não utiliza atualmente banco para suas cargas, alertas ou preferências. O arquivo de configuração local mantém autenticação e banco de publicação desativados. A base do repositório contém módulos opcionais de autenticação/conectores e migração de autenticação, mas eles não constituem um feed de cargas nem são necessários para usar o quadro demonstrativo.

Se uma evolução passar a persistir dados de cargas ou reservar fretes, deve definir uma fonte autorizada, regras de acesso, ciclo de confirmação e tratamento de erros. Não é seguro transformar o catálogo atual em uma lista de ofertas reais sem integração e validação com as empresas responsáveis.

## 11. Testes e manutenção

- `npm test`: testes unitários de utilitários/scripts e testes TypeScript de autenticação e conectores.
- `npm run typecheck`: valida tipos da aplicação e dos módulos de suporte.
- `npm run lint`: regras ESLint.
- `scripts/browser-smoke.mjs`: verificação automatizada de renderização em desktop e celular, quando executada no ambiente que disponibiliza navegador e diretório de capturas.
- `server/middleware/` e `public/`: mantenha as rotas de manifesto/instalação e seus arquivos estáticos em sincronia ao alterar recursos PWA.

Ao adicionar um campo a uma carga, revisar em conjunto `types.ts`, `catalog.ts`/`generator.ts`, o cartão, o detalhe e `loadMessage()`. Ao alterar as regras de alertas, revisar `matchesRule()`, o formulário e a persistência local. Ao alterar filtros, revisar `BoardFilters`, `DEFAULT_FILTERS`, `matchesFilters()` e os controles no dashboard.

## 12. Próximas integrações para agendamento real

Agendamento direto com um embarcador depende de integração formal com o sistema daquele embarcador: API ou protocolo autorizado, autenticação, disponibilidade de janela, dados fiscais/operacionais exigidos, consentimento e mecanismo de confirmação/cancelamento. O fluxo deve refletir estados como solicitado, confirmado, recusado e cancelado, com rastreabilidade e proteção contra duplicidade.

Até existir esse contrato e uma fonte real de disponibilidade, o produto deve continuar apresentando a ação do WhatsApp como contato manual e identificando todos os dados de carga como demonstrativos.
