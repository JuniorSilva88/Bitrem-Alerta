# Bitrem Alerta

Aplicação web demonstrativa para acompanhar cargas de grãos destinadas a bitrens nos corredores de Mato Grosso do Sul (MS), São Paulo (SP) e Paraná (PR). Reúne quadro de cargas, busca e filtros, detalhes da rota e alertas com mensagens preparadas para WhatsApp.

> **Importante:** as cargas, valores, embarcadores, rotas e atualizações exibidos atualmente são gerados localmente para demonstração. O sistema não consulta uma bolsa de fretes, não confirma disponibilidade e não agenda coletas diretamente com embarcadores. Valide as condições com o embarcador antes de fechar uma operação.

## Funcionalidades

### Quadro de cargas

- Indicadores de cargas abertas por estado, frete médio por tonelada e total da praça.
- Resumo dos corredores com mais cargas e valores médios ilustrativos.
- Pesquisa por cidade, destino, embarcador, UF ou código da carga.
- Filtros por origem (MS, SP e PR), grão, urgência, configuração do bitrem e destino (todos, porto ou indústria).
- Ação para inserir uma nova carga demonstrativa.
- Identificação visual de cargas novas, urgentes, em negociação ou fechadas.
- Seleção de carga para consultar preço por tonelada e total, volume, veículo, origem, destino, distância, embarcador, janela de coleta, pedágio e observações.
- Painel de detalhes lateral no desktop e janela inferior em telas menores.
- Layout responsivo, com filtros compactos em dispositivos móveis.

### Alertas e WhatsApp

- Regras de alerta configuráveis por estado de origem, grão, valor mínimo por tonelada e tipo de destino.
- Número de WhatsApp opcional; se não for preenchido, o WhatsApp abre para escolher uma conversa.
- Fila de cargas que correspondem às regras, com opção de testar um alerta.
- Notificações do navegador opcionais, mediante permissão do usuário.
- Mensagem da carga montada com os dados da rota, veículo, preço, coleta e embarcador.
- A ação **Enviar** abre o WhatsApp com a mensagem preenchida. O envio é confirmado pelo usuário no próprio WhatsApp; o sistema não usa a API do WhatsApp Business.
- A fila e as regras ficam no armazenamento local do navegador. Ao enviar um item, apenas aquele item é marcado como enviado.

## Limitações atuais

- O quadro é uma simulação local, não um feed de ofertas reais.
- Não há criação de conta, compartilhamento de estado entre dispositivos ou sincronização das preferências.
- Não há reserva, agendamento, aceite de frete nem confirmação direta com embarcador.
- Os alertas só são processados enquanto a aplicação está aberta; não há serviço de notificações em segundo plano.

## Tecnologias

- React 19, TypeScript e TanStack Start/Router.
- Vite 8 e Tailwind CSS 4.
- Zustand para estado de interface e `localStorage` para regras e fila de alertas.
- Radix UI para primitivas acessíveis de diálogo/controles e Lucide para ícones.
- Node.js 22.12 ou superior e npm.

## Executar localmente

```sh
npm ci
npm run dev
```

O servidor de desenvolvimento é configurado pelo script npm para aceitar conexões na porta `8080`. Use os scripts npm para iniciar o Vite; o wrapper do projeto prepara as variáveis de configuração locais.

## Comandos do projeto

| Comando                   | Uso                                                                                     |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `npm run dev`             | Inicia o servidor de desenvolvimento.                                                   |
| `npm run build`           | Gera a versão de produção e executa as migrações se `DATABASE_URL` estiver configurada. |
| `npm run preview`         | Serve localmente o build de produção.                                                   |
| `npm run preview:restart` | Reinicia o preview de QA do build na porta `8081`.                                      |
| `npm run preview:stop`    | Para o preview de QA.                                                                   |
| `npm run typecheck`       | Executa a verificação de tipos TypeScript.                                              |
| `npm run lint`            | Executa o ESLint.                                                                       |
| `npm test`                | Executa os testes Node.js e os testes TypeScript configurados.                          |
| `npm run check:auth`      | Verifica se o sinalizador de autenticação do dev corresponde ao do build.               |
| `npm run db:migrate`      | Aplica migrações pendentes quando há banco de dados configurado.                        |
| `npm run format`          | Formata os arquivos com Prettier.                                                       |

## Paleta visual

As cores são definidas como tokens CSS em [`src/styles.css`](./src/styles.css). A interface usa tema escuro, superfícies discretas, texto claro e verde para ações do WhatsApp.

| Token                                    | Valor                 | Aplicação                           |
| ---------------------------------------- | --------------------- | ----------------------------------- |
| `background`                             | `#0b0c0b`             | Fundo principal                     |
| `foreground`                             | `#eceee8`             | Texto principal                     |
| `card` / `card-foreground`               | `#131513` / `#eceee8` | Cartões                             |
| `popover` / `popover-foreground`         | `#181b18` / `#eceee8` | Janelas e popovers                  |
| `primary` / `primary-foreground`         | `#d6dbd2` / `#121412` | Ação e seleção primária             |
| `secondary` / `secondary-foreground`     | `#1c1f1c` / `#eceee8` | Superfícies e controles secundários |
| `muted` / `muted-foreground`             | `#1c1f1c` / `#9aa396` | Texto e superfícies secundárias     |
| `accent` / `accent-foreground`           | `#222622` / `#eceee8` | Destaque interativo                 |
| `destructive` / `destructive-foreground` | `#c45c4a` / `#f4ecea` | Ações destrutivas                   |
| `border` / `input`                       | `#2a2e2a` / `#2a2e2a` | Bordas e campos                     |
| `ring`                                   | `#d6dbd2`             | Foco de teclado                     |
| `whatsapp` / `whatsapp-foreground`       | `#2f7a4a` / `#f3faf5` | Ações de WhatsApp                   |
| `warn` / `warn-foreground`               | `#c4a574` / `#1a1610` | Estado urgente/aviso                |
| `live`                                   | `#6fbf86`             | Indicador de atividade              |

**Tipografia:** Barlow para texto e Barlow Condensed para títulos; fontes de sistema são usadas como fallback.

**Raios:** `4px`, `8px`, `12px`, `16px` e `24px`; raio padrão de `12px`.

**Sombras:** contorno branco com opacidade de 8% e 13% no estado de ênfase.

## Estrutura do repositório

```text
src/
  components/freight/   Dashboard, cartões, alertas e fila de mensagens
  components/ui/        Componentes visuais reutilizáveis
  lib/freight/          Tipos, catálogo, gerador, estado e mensagens WhatsApp
  lib/auth/             Base de autenticação opcional
  lib/app-data/         Utilitários opcionais de conectores
  routes/               Rota inicial e shell do documento
  styles.css            Tokens de tema, estilos base e animações
migrations/              Migrações SQL
scripts/                 Ambiente, build, preview, migrações e testes
server/middleware/       Middleware de publicação e arquivos PWA
public/                  Ícones, imagens e arquivos públicos, incluindo recursos PWA
docs/                    Documentação técnica de implementação
```

## Documentação técnica

Consulte [`docs/IMPLEMENTACAO.md`](./docs/IMPLEMENTACAO.md) para detalhes de arquitetura, estado, geração de cargas, alertas, persistência, configuração e pontos de extensão.
