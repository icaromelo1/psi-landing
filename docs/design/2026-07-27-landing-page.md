# Landing page — psicólogo (TCC + terapia do esquema)

**Data:** 2026-07-27
**Status:** aprovado no brainstorming, aguardando plano de implementação

## Contexto

Landing page para psicólogo recém-formado que atende pessoas LGBT+, neurodivergentes, PCD e fãs de cultura pop (games, animes, RPG), dos 12 aos 60 anos, com abordagem TCC e terapia do esquema. Pilares: usabilidade, transparência e acessibilidade para todas as idades.

No texto do site, o público "geek" é referido como **"cultura pop"** no texto principal, com exemplos concretos (games, animes, RPG) como reforço de pertencimento — evita rótulo que parte do público pode não usar para si.

## Decisões de produto

| Tema | Decisão |
|---|---|
| Conversão principal | Botão de WhatsApp (link a ser fornecido pelo Icaro) |
| Canais secundários | Instagram e e-mail, visíveis mas sem competir com o CTA |
| Modalidade | Online no lançamento; atendimento domiciliar futuro **fica fora da v1** (entra quando existir) |
| Identidade visual | Criada do zero neste projeto |
| Posicionamento visual | **Abertamente temático** — estética "jornada RPG cozy" |
| Transparência | Como funciona a terapia, credenciais completas (CRP obrigatório), políticas de atendimento. **Sem preço público** — valor é conversa de WhatsApp |
| Adolescentes (12–17) | Seção dedicada "Para pais e responsáveis" |
| Acessibilidade | Base WCAG AA + painel de preferências de leitura + versão em linguagem simples |
| Stack | Vue 3 + Quasar (TypeScript), hospedado na Oracle server do Icaro |

## Conceito: "Jornada RPG cozy"

O visitante é o protagonista, a terapia é a campanha, o psicólogo é o **guia** (nunca o herói). Metáforas de RPG/games no copy ("todo personagem tem uma história de origem", "você não precisa enfrentar essa fase sozinho"), com layout limpo e legível por baixo do tema. A metáfora de "jornada" é universal o bastante para funcionar dos 12 aos 60 e manter credibilidade com pais e público 45+.

## Estrutura da página (single-page, âncoras)

Header fixo enxuto com âncoras + botão WhatsApp sempre visível.

1. **Hero — "O início da jornada"**: headline com metáfora de jornada; subheadline nomeando explicitamente os públicos acolhidos; CTA grande de WhatsApp; ilustração temática; nome + CRP visíveis.
2. **"Para quem é" — os personagens**: 4 cards (LGBT+, neurodivergente, PCD, cultura pop), cada um falando uma dor real do público em linguagem que ele reconhece, sem estereótipo.
3. **"Como funciona" — o mapa da campanha**: TCC e terapia do esquema em linguagem simples + passo a passo numerado da primeira sessão (o que acontece, quanto dura, qual plataforma). Seção mais importante para previsibilidade (público neurodivergente).
4. **"Sobre" — o guia da jornada**: história de origem do psicólogo — formação, CRP, por que atende esses públicos. Foto real quando existir; placeholder ilustrado até lá.
5. **Para pais e responsáveis**: como funciona terapia de adolescente, sigilo e seus limites legais, como iniciar.
6. **Políticas de atendimento**: cancelamento, remarcação, plataforma, pontualidade — em lista direta.
7. **FAQ**: acordeão com dúvidas de quem nunca fez terapia ("preciso ter diagnóstico?", "e se eu não souber o que falar?").
8. **CTA final + rodapé**: WhatsApp repetido; Instagram e e-mail; CRP e informações exigidas pelo CFP.

## Estilo visual

### Paleta (tema claro + escuro desde a v1)

- Fundo: creme-pergaminho (claro) / azul-noite profundo (escuro)
- Primária: teal/verde-floresta
- Acento: âmbar quente (botões/CTA)
- **Gradiente arco-íris discreto** como sinal LGBT+: usado com parcimônia (sublinhado do headline, borda de um card)
- Todas as combinações validadas para contraste WCAG AA nos dois temas

### Tipografia

- Títulos: **Fredoka** (sans arredondada, remete a jogo cozy sem infantilizar); Nunito é o fallback já definido caso Fredoka pareça infantil demais na validação visual
- Corpo: **Atkinson Hyperlegible** (desenhada para baixa visão — acessibilidade como posicionamento)
- Corpo base 18px, entrelinha generosa, parágrafos curtos, largura de linha ~70ch

### Ilustrações e componentes temáticos

- Conjunto próprio de SVGs flat com traço consistente: d20, mapa com trilha pontilhada, controle, pergaminho de quest, poção, fogueira. Sem fotos de banco de imagem.
- Passos da primeira sessão como "etapas de quest" numeradas na trilha do mapa.
- FAQ em acordeão estilo caixa de diálogo de jogo.
- Botão WhatsApp grande, arredondado, com rótulo explícito ("Chamar no WhatsApp"), nunca só ícone.
- Microanimações suaves (hover, revelar ao rolar), desligáveis e respeitando `prefers-reduced-motion` por padrão.

## Acessibilidade

### Base WCAG AA (estrutural)

HTML semântico com headings em hierarquia; skip-link; foco visível; navegação 100% por teclado (incluindo acordeão); alvos de toque ≥ 44px; `alt` em toda imagem significativa; contraste AA nos dois temas; zoom 200% sem quebra. Sem formulário na v1 (CTA é deep-link de WhatsApp).

### Painel "Preferências de leitura"

Botão fixo com ícone + rótulo, abrindo painel com:

1. **Tamanho do texto** — 3 níveis (A− / A / A+) via CSS custom properties
2. **Tema** — claro / escuro / automático (padrão: `prefers-color-scheme`)
3. **Animações** — ligadas / desligadas (padrão: `prefers-reduced-motion`)
4. **Linguagem simples** — liga/desliga

Persistência em `localStorage`, aplicação sem reload (composable + CSS vars no `:root`).

### Linguagem simples

Cada bloco de texto existe em duas variantes (`padrao` / `simples`) num arquivo de conteúdo único. A variante simples usa frases curtas, ordem direta e **sem metáfora** — a metáfora de RPG engaja, mas linguagem figurada atrapalha parte do público autista; a versão simples a substitui por instruções literais.

## Arquitetura técnica

- **Projeto:** `psi-landing/` (Quasar CLI, Vue 3, TypeScript)
- **Modo:** SPA buildado para estático, servido pelo nginx da Oracle server (zero processo Node). SEO reforçado: meta tags + Open Graph no template, JSON-LD (`ProfessionalService` + `Person` com CRP). **Plano B mapeado:** migrar para modo SSR do Quasar se a indexação se mostrar fraca. Futuro sistema de atendimento entra como rotas novas no mesmo projeto.
- **Componentes:** um por seção — `HeroSection`, `AudienceSection`, `HowItWorksSection`, `AboutSection`, `GuardiansSection`, `PoliciesSection`, `FaqSection`, `FinalCtaSection` — mais `ReadingPrefsPanel`.
- **Transversais:**
  - `content.ts` — todo o copy, nas variantes padrão/simples
  - `site.config.ts` — WhatsApp, Instagram, e-mail, CRP, nome (tudo que muda, num lugar só)
  - `useReadingPrefs` — composable de tema/fonte/animação/linguagem → CSS vars + localStorage
- **Performance:** fontes self-hosted woff2 com `font-display: swap`; SVGs inline; lazy-load abaixo da dobra; orçamento < 300KB; Lighthouse ≥ 95 nas quatro categorias.
- **Verificação:** axe-core automatizado no build + checklist manual (teclado, VoiceOver, zoom 200%, dois temas, duas linguagens). Sem E2E na v1.
- **Deploy:** `quasar build` → estáticos no nginx. CI/CD futuro.

## Fora de escopo da v1

- Atendimento domiciliar (anunciar só quando existir)
- Preço público na página
- VLibras (avaliar em v2 se houver demanda de pessoas surdas)
- Formulário de contato, agendamento online, blog, área logada
- CI/CD

## Pendências de conteúdo (bloqueiam copy final, não o desenvolvimento)

- Link do WhatsApp, Instagram e e-mail
- Nome completo e CRP do psicólogo
- Formação/especializações para a seção "Sobre"
- Políticas reais de cancelamento/remarcação e plataforma de atendimento
- Foto profissional (opcional na v1 — placeholder ilustrado previsto)
