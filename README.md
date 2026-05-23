<div align="center">

![Project Stage][Static-Badge]
![Maintenance][maintenance-shield]
![License][license-shield]
<a href="https://forgejo.humbertof.dev/Humberto/infinity/">![Repository][repo-shield]</a>
</div>

# Infinity

Tema customizado para Jellyfin, baseado no [Finity](https://github.com/prism2001/finity) por prism2001.

## O que muda em relação ao Finity

### 🎨 Tema de cores — Dark Purple

Palheta inteira refeita com roxo `#9400D3` como cor primária:

- Fundo da página com undertone roxo (`#9400D3`)
- Cards, header, sidebar e botões com tons de roxo escuro
- Barra de progresso, hover de listas e scrollbar em roxo
- Borda de seleção (multi-select) em roxo
- Checkbox de seleção com fundo roxo e checkmark branco
- Hover de botões com roxo transparente (não mais preto sólido)
- Botão Play com fade roxo no hover
- Gradiente do backdrop do slideshow em tons roxos

### 🖱️ Feedback visual de hover e foco

- Borda roxa ao redor do card no hover do mouse
- Borda roxa ao navegar com controle remoto/teclado (`.focused`)
- List items ganham outline roxo sutil + fundo no hover

### 📐 Layout e páginas de detalhes

- Backdrop ocupa 100% da largura (`--detail-page-backdrop-width: 100vw`, offset 0)
- Máscara lateral com gradiente escuro sólido (sem blur) para legibilidade do texto
- Máscara cobre a área de texto (60vw)
- Temporadas em slider horizontal ocupando 94% da tela
- Episódios em grid com 94% de largura, navegável por setas e touch
- Fonte alterada para **Kodchasan**

### 🎬 Slideshow

- 16 itens (original: 8)
- Slides clicáveis — direcionam para a página do item
- Títulos de episódios clicáveis no grid view
- Intervalo sincronizado com a animação Ken Burns (10s)
- `will-change` em elementos animados para GPU acceleration
- Correção dos dots indicadores de posição
- Correção na inicialização do cronômetro

### 🖥️ Dashboard e páginas de admin

O tema também estiliza a Dashboard de administração (páginas que o CSS customizado do Branding não alcança), usando um arquivo separado (`dashboard.css` carregado no `index.html`):

- Fundo roxo escuro em todas as páginas de admin
- **Painel lateral (sidebar)**: fundo roxo opaco (`#0D0A14`), itens de navegação com formato pill, texto branco, hover roxo com texto preservado, espaçamento entre seções
- **Cards e painéis**: bordas arredondadas (15px), fundo escuro (`#15121A`), consistente com os cards da Home
- **Tipografia**: fonte Kodchasan em todos os componentes MUI (Typography, Button, Input, ListItem, Tab, Chip, Select, etc.)
- **Formulários**: inputs, selects, textareas com fundo escuro e foco roxo
- **Botões**: formato pill em todos os botões (padrão, submit, warning, outlined, text)
- **Páginas de plugins, metadata manager e configuração** com o mesmo tema visual

> Veja a seção [Instalação](#instalação) para configurar o `dashboard.css` corretamente.

## Instalação

O Infinity usa **dois arquivos CSS** com responsabilidades diferentes:

| Arquivo | Onde carregar | Páginas que afeta |
|---|---|---|
| `finity-complete.css` | Dashboard > Geral > Branding > CSS Customizado | Home, detalhes, listas, player (páginas do usuário) |
| `dashboard.css` | No `<head>` do `index.html` | Dashboard, admin, configurações, plugins |

> O campo de CSS Customizado do Branding **não** injeta CSS nas páginas de admin/dashboard do Jellyfin — por isso o `dashboard.css` precisa ir no `index.html`.

### 1. Index.html

Cole no final do `<head>` do `index.html` do Jellyfin (antes de `</head>`):

```html
<!-- Infinity — Dashboard styles (admin/config pages) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/dashboard.css">

<!-- Infinity — Slideshow (home page) -->
<script src="https://cdn.jsdelivr.net/npm/marked@15.0.11/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.2.5/dist/purify.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/slideshowpure.css">
<script defer src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/slideshowpure.js"></script>
<script async src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/clickableTitles.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/clickableSlideshow.js"></script>
```

### 2. CSS Customizado (Branding)

No Jellyfin, vá em **Dashboard > Geral > Branding/Marca** e cole no campo **CSS Customizado**:

```css
@import url('https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/finity-complete.css');
```

> **Importante:** O `finity-complete.css` deve ser carregado SOMENTE via campo de CSS customizado, **não** no `index.html`. 

### 3. Arquivo list.txt

Crie um arquivo `list.txt` no mesmo diretório do `index.html` com os IDs das mídias do slideshow (um por linha, máximo 16):

```
ID_DO_FILME_1
ID_DO_FILME_2
...
ID_DO_FILME_16
```

<img src="screenshots/Screenshot_06.png" title="URL media id" width="auto"/>

Para automatizar, use o [Script Runner](https://github.com/iHumberto/jellyfin-plugin-scriptrunner) com um script que busque as mídias mais recentes.

## Dica — Docker

Crie uma pasta `custom` junto ao `docker-compose.yaml` e monte os arquivos:

```
- ./custom/index.html:/jellyfin/jellyfin-web/index.html
- ./custom/list.txt:/jellyfin/jellyfin-web/list.txt
```

<img src="screenshots/Screenshot_07.png" title="Directory tip" width="auto"/>

## Personalização

O Infinity expõe **~55 variáveis CSS** que podem ser sobrescritas no campo **Custom CSS do Branding**. Basta adicionar as variáveis no mesmo bloco onde você importa o tema:

```css
@import url('https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/finity-complete.css');

:root {
  --theme-accent-color: #00B894;    /* muda a cor primária */
  --infinity-slideshow-items: 10;   /* menos slides no carrossel */
}
```

> **Dica:** você não precisa redeclarar todas as variáveis — apenas as que quiser alterar. As demais usam os valores padrão do tema.

### 🎨 Cores

| Variável | Padrão | Descrição |
|---|---|---|
| `--theme-background-color` | `#0F0D14` | Fundo da página |
| `--theme-text-color` | `#eee` | Cor do texto principal |
| `--theme-text-color-secondary` | `#dbdbdb` | Cor do texto secundário (ex: títulos de episódios) |
| `--theme-accent-color` | `#9400D3` | Cor de destaque (links, seleção, hover) |
| `--theme-accent-color-alpha-low` | `rgba(148,0,211,.18)` | Destaque transparente (hover de botões) |
| `--theme-accent-color-alpha-med` | `#AD33E0` | Destaque médio (hover de listas) |
| `--theme-accent-color-alpha-high` | `#C266EB` | Destaque claro (barra de progresso) |
| `--theme-accent-color-alpha-hover` | `rgba(148,0,211,.35)` | Destaque hover (FAB) |
| `--theme-warning-color` | `#bb4a4a` | Cor de aviso/ações destrutivas |
| `--selection-border-color` | `#9400D3` | Cor da borda de seleção |
| `--card-bg` | `#15121A` | Fundo dos cards |
| `--header-bg` | `rgba(10,8,18,.7)` | Fundo do header |
| `--sidebar-bg` | `rgba(10,8,18,.65)` | Fundo da sidebar |
| `--button-bg` | `#27242E` | Fundo dos botões padrão |
| `--button-bg-subtle` | `rgba(255,255,255,.08)` | Fundo de botões sutis |
| `--tooltip-bg` | `rgba(0,0,0,.85)` | Fundo dos tooltips |
| `--context-menu-bg` | `rgba(45,42,52,.5)` | Fundo dos menus de contexto |
| `--episode-grid-bg` | `rgba(15,13,20,.85)` | Fundo dos episódios no grid |
| `--indicator-bg` | `#15121A94` | Fundo dos indicadores (played, count) |
| `--scrollbar-thumb-color` | `#9400D3` | Cor do scrollbar |

### 🔤 Tipografia

| Variável | Padrão | Descrição |
|---|---|---|
| `--font-family-base` | `"Kodchasan", sans-serif` | Fonte principal |
| `--font-size-base` | `0.9rem` | Tamanho base da fonte |
| `--font-size-h2` | `1.5em` | Tamanho dos títulos H2 |
| `--font-weight-normal` | `400` | Peso normal |
| `--font-weight-semibold` | `600` | Peso semi-negrito |
| `--font-weight-bold` | `700` | Peso negrito |

### 📐 Bordas e layout

| Variável | Padrão | Descrição |
|---|---|---|
| `--theme-roundness` | `0.5rem` | Arredondamento geral |
| `--theme-roundness-large` | `15px` | Arredondamento de cards |
| `--theme-roundness-full` | `4em` | Formato pill |
| `--card-padding` | `25px` | Espaçamento interno dos cards |
| `--card-shadow` | `0px 8px 16px rgba(0,0,0,.3)` | Sombra dos cards |
| `--detail-page-backdrop-width` | `100vw` | Largura do backdrop na página de detalhes |
| `--detail-page-primary-width` | `60%` | Largura da área de conteúdo |
| `--detail-page-mask-width` | `60vw` | Largura da máscara lateral |
| `--episode-grid-gap` | `1.5rem` | Espaço entre itens no grid de episódios |
| `--episode-grid-min-item-width` | `200px` | Largura mínima dos cards de episódios |

### 👁️ Toggles de exibição

| Variável | Padrão | Descrição |
|---|---|---|
| `--display-tomato-rating` | `none` | Nota do Rotten Tomatoes |
| `--display-imdb-logo` | `none` | Logo IMDb |
| `--display-star-rating` | `none` | Nota por estrelas da comunidade |
| `--display-critic-rating` | `none` | Ícone fresh/rotten tomato |
| `--display-age-rating` | `none` | Classificação etária |
| `--display-original-title` | `block` | Título original |
| `--display-external-links` | `none` | Links externos |
| `--display-header-warning` | `none` | Aviso no header |

> Use `flex` ou `block` para mostrar, `none` para esconder.

### 🎬 Slideshow

| Variável | Padrão | Descrição |
|---|---|---|
| `--infinity-slideshow-items` | `16` | Quantidade de itens no carrossel |
| `--infinity-slide-interval` | `10s` | Intervalo entre slides |
| `--infinity-fade-duration` | `500ms` | Duração da transição de fade |
| `--infinity-hide-logo` | `false` | Esconder o logo do item |
| `--infinity-show-title` | `true` | Mostrar título textual |
| `--infinity-enable-random` | `false` | Fallback aleatório da API |
| `--infinity-animation` | `true` | Animação Ken Burns no backdrop |

## Screenshots

<div align="center">

<img src="screenshots/Screenshot_01.png" title="Home - slideshow 01" width="75%"/>
<img src="screenshots/Screenshot_02.png" title="Home - slideshow 02" width="75%"/></br>
<img src="screenshots/Screenshot_03.png" title="Home - Continue Watching, Next, Recent Movies" width="75%"/>
<img src="screenshots/Screenshot_10.png" title="Home - New colors selection mode" width="75%"/>
<img src="screenshots/Screenshot_04.png" title="Movie page" width="75%"/></br>
<img src="screenshots/Screenshot_05.png" title="New series page, with slide seasons" width="75%"/>
<img src="screenshots/Screenshot_08.png" title="New series page, with bigger grid episodes" width="75%"/>
<img src="screenshots/Screenshot_09.png" title="New Admin dashboard" width="75%"/>
</div>


## Licença

Este projeto é licenciado sob a [GNU GPL v3](LICENSE).

[maintenance-shield]: https://img.shields.io/maintenance/yes/2026.svg
[Static-Badge]: https://img.shields.io/badge/production-Ready-brightgreen?logo=Forgejo
[repo-shield]: https://img.shields.io/badge/forgejo-repo-brightgreen?logo=forgejo
[license-shield]: https://img.shields.io/badge/License-GNU_GPL_v3-brightgreen?style=flat&logo=gnuprivacyguard