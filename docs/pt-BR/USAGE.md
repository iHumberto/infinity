# 🚀 Como Instalar e Usar o Infinity

> Um guia passo a passo para instalar o tema Infinity no seu servidor Jellyfin.

## O que é o Infinity

O Infinity é um tema customizado que muda a aparência do seu Jellyfin. Ele aplica um design dark roxo, um slideshow animado na página inicial e um estilo combinando para o painel de administração. Tudo é carregado pela internet — você não precisa baixar nem instalar nada no servidor.

## Antes de começar

- Você precisa ter acesso aos arquivos do servidor Jellyfin. Isso geralmente significa acesso à máquina onde o Jellyfin está instalado.
- Você precisa poder editar o arquivo `index.html` dentro da pasta web do Jellyfin.
- Você precisa ter acesso de administrador ao painel do Jellyfin.

## Instalação

### Passo 1: Encontre a pasta web

A localização da pasta web do Jellyfin depende de como você instalou:

| Método de instalação | Caminho da pasta web |
|---|---|
| Docker (linuxserver/jellyfin) | `/usr/share/jellyfin/web/` dentro do container |
| Docker (jellyfin/jellyfin) | `/jellyfin/jellyfin-web/` dentro do container |
| Linux nativo | `/usr/share/jellyfin/web/` |
| Windows | `C:\Program Files\Jellyfin\Server\jellyfin-web\` |

### Passo 2: Edite o index.html

Abra o arquivo `index.html` dentro da pasta web. Encontre a linha `</head>` perto do topo do arquivo.

Adicione este código **logo antes** de `</head>`:

```html
<!-- Dashboard styles (admin/config pages) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/dashboard.css">

<!-- Slideshow dependencies + scripts -->
<script src="https://cdn.jsdelivr.net/npm/marked@15.0.11/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.2.5/dist/purify.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/slideshowpure.css">
<script defer src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/slideshowpure.js"></script>
<script async src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/clickableTitles.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/clickableSlideshow.js"></script>
```

Salve o arquivo.

### Passo 3: Adicione o CSS principal do tema

1. Abra o painel do Jellyfin no navegador.
2. Vá em **Painel de Controle** > **Geral**.
3. Role até a seção **Branding**.
4. Encontre o campo **CSS Customizado**.
5. Cole esta linha:

```css
@import url('https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/finity-complete.css');
```

6. Clique em **Salvar** no final da página.

### Passo 4 (opcional): Configure a lista do slideshow

Se quiser controlar exatamente quais mídias aparecem no slideshow da página inicial:

1. Na mesma pasta do `index.html`, crie um arquivo chamado `list.txt`.
2. Adicione os IDs das mídias que você quer mostrar — um ID por linha. Exemplo:

```
a1b2c3d4e5f6
b2c3d4e5f6a1
c3d4e5f6a1b2
```

> 💡 **Como encontrar o ID de uma mídia?** Acesse a página de detalhes do filme ou série. O ID aparece no final da URL: `.../details?id=a1b2c3d4e5f6` — o ID é `a1b2c3d4e5f6`.

- Máximo de 16 itens.
- Se você não criar este arquivo, o slideshow escolhe mídias aleatórias da sua biblioteca.

### Passo 5: Verifique

1. Abra seu Jellyfin em uma nova aba do navegador.
2. Você deve ver o novo tema dark roxo na página inicial.
3. Vá para o Painel de Controle — o painel admin também deve estar com o novo estilo.
4. Na página inicial, você deve ver o slideshow com imagens.

## O que esperar

- Após a instalação, seu Jellyfin terá o tema dark roxo em todos os lugares — página inicial, detalhes de filmes, páginas de séries e painel admin.
- A página inicial mostrará um slideshow animado com imagens da sua biblioteca.
- Você pode clicar nos itens do slideshow e nos títulos dos episódios para navegar.
- O tema funciona junto com as funções nativas do Jellyfin — nada é removido.

## Trocando entre branches

As URLs acima usam `@main`, que aponta para a versão estável pronta para produção. Se quiser testar novas funcionalidades (instáveis), troque `@main` por `@dev` em todas as URLs. **Não recomendado para uso diário.**

## Precisa de ajuda?

Veja o [FAQ](FAQ.md) para respostas a perguntas comuns, ou o [Guia de Customização](CUSTOMIZATION.md) para aprender a personalizar o tema.
