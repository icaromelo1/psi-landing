# psi-landing

Landing page de psicologia clínica — atendimento online com TCC e Terapia do Esquema, voltado a pessoas LGBT+, neurodivergentes, PCD e fãs de cultura pop, dos 12 aos 60 anos.

Vue 3 + Quasar (SPA estático), sem backend. O design aprovado está em [docs/design/2026-07-27-landing-page.md](docs/design/2026-07-27-landing-page.md).

## Comandos

```bash
npm install
npm run dev        # http://localhost:9100
npm run build      # gera dist/spa
npm run lint
npm run typecheck
npm run contraste  # valida WCAG AA dos 10 temas
```

## Preencher antes de publicar

Os dados do psicólogo são placeholders. Todos ficam em **`src/configuracaoSite.ts`**:

| Campo | O que colocar |
|---|---|
| `identidade.nome` | Nome completo |
| `identidade.crp` | Registro no CRP |
| `identidade.formacao` / `especializacoes` | Graduação e formações |
| `contatos.whatsapp.numero` | Só dígitos, com DDI: `5592999999999` |
| `contatos.instagram` / `email` | Perfil e e-mail reais |
| `atendimento.plataforma` | Google Meet, Zoom, etc. |

Dois arquivos repetem esses dados e precisam do mesmo ajuste manual:

- **`index.html`** — `<title>`, meta description, Open Graph, `canonical` e o bloco JSON-LD (nome e CRP).
- **`public/sitemap.xml`** e **`public/robots.txt`** — trocar `https://exemplo.com.br/` pelo domínio real.

Pendências de conteúdo: as políticas em `src/conteudo.ts` (`politicas.itens`) usam valores de exemplo — confirmar com o psicólogo antes de publicar. Falta também uma imagem de Open Graph (`public/og-image.png`, 1200×630); a meta tag só deve ser reativada quando o arquivo existir.

## Temas

Os dez temas desenhados vivem em `src/css/themes.css`, cada um como um bloco `[data-theme]` que define o mesmo contrato de tokens. **Nenhum componente escreve cor ou fonte literal** — todos consomem os tokens.

Trocar o par ativo é uma linha em `src/configuracaoSite.ts`:

```ts
export const parDeTemas: { claro: IdTema; escuro: IdTema } = {
  claro: 'c5',
  escuro: 'e4',
};
```

| Claros | Escuros |
|---|---|
| `c1` Mapa do Aventureiro — pergaminho, teal, âmbar | `e1` Fogueira — noite azul, luz quente |
| `c2` Vila Cozy — sálvia, folha, amora | `e2` Taverna — madeira, vela, brasa |
| `c3` Céu Aberto — céu claro, sol | `e3` Observatório — céu estrelado |
| `c4` Grimório Gentil — lilás, violeta, ouro | `e4` Arcade Pastel — rosa e menta pastéis |
| `c5` Banca de Quadrinhos — papel, tinta, retícula | `e5` Vagalumes — musgo, lanterna |

Cada tema traz seu próprio par tipográfico. Só as fontes dos temas ativos estão em `public/fonts/` — ao trocar para um tema com tipografia diferente, baixe os woff2 correspondentes (subset latin) e declare o `@font-face` em `src/css/app.css`.

O comparador visual dos dez temas está em `docs/design/2026-07-28-preview-tema.html` (abrir direto no navegador).

## Acessibilidade

Verificado com **axe-core 4.12.1**: zero violações WCAG 2.1 A/AA nos dois temas ativos, 41 regras aprovadas. O único ponto "incompleto" reportado é o sublinhado arco-íris do título — o axe não calcula contraste sobre gradiente, e ali o texto fica sobre o fundo normal, não sobre a faixa colorida.

Também verificado manualmente: nenhum alvo de toque abaixo de 44px, hierarquia de headings sem saltos, `lang="pt-BR"`, sem rolagem horizontal em 375px nem em zoom de 200%.

Para reauditar: copie `node_modules/axe-core/axe.min.js` para `public/`, rode o dev server e execute `axe.run()` no console.

O painel "Preferências de leitura" (canto inferior direito) oferece cinco controles, persistidos em `localStorage`: tamanho do texto, tema, linguagem simples, fonte de alta legibilidade (Atkinson Hyperlegible) e animações. Os padrões seguem `prefers-color-scheme` e `prefers-reduced-motion`.

O conteúdo existe em duas variantes — `padrao` e `simples` — em `src/conteudo.ts`. A variante simples remove metáforas e usa frases curtas e ordem direta.

## Peso da página

Primeira carga: **106 KB transferidos** (com gzip), sendo 40 KB de JS, 36 KB de CSS e 29 KB das duas fontes do tema claro.

O CSS base do Quasar responde por quase todo o CSS, mesmo sem nenhum componente Quasar em uso. Fica no projeto porque o plano é evoluir esta landing para um sistema de atendimento — se isso mudar, arrancar o Quasar é a maior economia disponível.

## Deploy

Está no ar em **https://icaromelodev.com.br/referencia-projeto-psicologo/** como material de referência para o psicólogo avaliar.

A VM Oracle (`ssh dsg-vm`) não usa nginx no host: tudo é container atrás do **Traefik v3.7**, um por site, no padrão de `~/projects/<nome>/` com `docker-compose.yml` + `nginx.conf` + `site/`. Este projeto segue a mesma receita do `wild`, que também é um SPA Quasar em subpath.

### Publicar uma nova versão

```bash
NOINDEX=1 PUBLIC_PATH=/referencia-projeto-psicologo/ npm run build
tar czf - -C dist/spa . | ssh dsg-vm 'tar xzf - -C ~/projects/psi-landing/site/'
ssh dsg-vm 'find ~/projects/psi-landing/site \( -name "._*" -o -name ".DS_Store" \) -delete'
```

O `tar` do macOS leva metadados AppleDouble junto; a terceira linha limpa isso. O container serve o volume direto, então não precisa reiniciar — só recarregar a página.

`PUBLIC_PATH` é obrigatório: sem ele os assets apontam para a raiz do domínio e o site quebra dentro do subpath. O Traefik remove o prefixo (`stripprefix`) antes de repassar ao nginx, então os arquivos ficam na raiz de `site/`.

### Sobre o `NOINDEX`

Enquanto os dados forem placeholder, **mantenha `NOINDEX=1`**. Ele injeta `<meta name="robots" content="noindex, nofollow">`, e o `nginx.conf` reforça com o header `X-Robots-Tag`. O motivo é concreto: a página traz um JSON-LD do tipo `ProfessionalService` com CRP fictício — indexar isso associaria uma credencial inexistente a um profissional real nos buscadores.

Quando for para o domínio definitivo com os dados reais, buildar **sem** `NOINDEX` e remover o `add_header X-Robots-Tag` do `nginx.conf`.

### Domínio próprio

Ao migrar para o domínio final, o compose muda para uma regra por Host, sem `PathPrefix` nem `stripprefix` (o padrão do `portfolio` e do `littleclock`), e o build dispensa o `PUBLIC_PATH`.

### Se preferir nginx no host

Build estático servido por nginx na Oracle server:

```nginx
server {
    listen 443 ssl http2;
    server_name exemplo.com.br;

    root /var/www/psi-landing;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /fonts/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

Enviar o conteúdo de `dist/spa/` para `/var/www/psi-landing`. O `try_files` com fallback para `index.html` é obrigatório: o router está em modo history.
