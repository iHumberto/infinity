# ❓ Perguntas Frequentes

> Dúvidas comuns sobre o tema Infinity para Jellyfin.

## Instalação

### O tema não está aparecendo. O que devo verificar?

Certifique-se de que completou todos os passos:

1. Você adicionou o código no `index.html` antes de `</head>`? Verifique se o arquivo foi salvo.
2. Você adicionou a linha `@import` no campo de CSS Customizado do Branding e clicou em Salvar?
3. Tente limpar o cache do navegador (Ctrl+F5 ou Cmd+Shift+R).
4. Abra as ferramentas de desenvolvedor do navegador (F12) e verifique a aba **Console** para erros.

### Posso instalar o Infinity sem editar arquivos do servidor?

Não. O Infinity precisa de duas coisas que exigem acesso ao servidor: adicionar código no `index.html` e adicionar uma linha no campo de CSS Customizado nas configurações de Branding do Jellyfin. Ambas precisam de acesso de administrador.

### Preciso instalar algo no meu servidor?

Não. O Infinity é carregado inteiramente da internet (CDN jsDelivr). Você não precisa baixar arquivos, instalar pacotes nem executar scripts no servidor. Só precisa editar dois pontos de configuração no Jellyfin.

## Configuração

### Posso usar a página de configuração e o CSS Customizado ao mesmo tempo?

Não. A página de configuração substitui completamente o método antigo de configurar via CSS customizado. Se você tinha variáveis `--infinity-*` no campo de CSS do Branding, elas serão ignoradas — use a página de configuração no lugar.

### As configurações são salvas por usuário?

Não. As configurações são salvas no navegador (localStorage) e se aplicam a todos que acessam o Jellyfin por este navegador. Para aplicar as mesmas configurações em outro computador, repita o processo lá.

### O que acontece se eu trocar de navegador ou limpar os dados?

As configurações são salvas no armazenamento local do navegador. Se você limpar os dados do navegador ou usar outro navegador, as configurações voltam aos padrões. Basta acessar a página novamente e reconfigurar.

### Por que as cores ou fonte não mudaram?

Verifique se você clicou em **Salvar Configurações** após fazer as alterações. Alterações em tempo real são apenas uma prévia — só são permanentes após salvar.

## Slideshow

### O slideshow está mostrando imagens erradas ou nenhuma imagem.

Verifique a origem dos slides na página de configuração:
- **Aleatório**: escolhe itens da sua biblioteca. Certifique-se de que há mídias nela.
- **Adicionados Recentemente**: mostra apenas itens adicionados recentemente. Se você não adicionou nada ultimamente, pode mostrar poucos ou nenhum item.
- **Lista Manual**: verifique se os IDs no `list.txt` estão corretos e se o arquivo está na pasta certa.

### Quantos slides o slideshow pode mostrar?

Entre 1 e 100. O padrão é 16. Mais slides usam mais memória do navegador — se a página parecer lenta, reduza a quantidade.

### Posso desligar o slideshow?

Para remover completamente o slideshow, remova as linhas relacionadas do `index.html`:
- `<link rel="stylesheet" href="...slideshowpure.css">`
- `<script defer src="...slideshowpure.js"></script>`
- `<script src="...clickableSlideshow.js"></script>`

O restante do tema continuará funcionando normalmente.

## Atualizações

### Como atualizo para a versão mais recente?

O Infinity carrega da CDN jsDelivr usando a branch `@main`. As atualizações são automáticas — quando uma nova versão é lançada na branch `main`, o jsDelivr serve os novos arquivos. Você pode precisar limpar o cache do navegador (Ctrl+F5) para ver as mudanças imediatamente.

### Posso usar uma versão específica em vez de sempre pegar a mais recente?

Sim. Em vez de `@main` nas URLs, você pode usar uma tag de versão específica como `@v1.0.1`. Isso congela o tema naquela versão. No entanto, você não receberá atualizações ou correções.

### Como sei quando há uma atualização?

Acesse o repositório do projeto: [forgejo.humbertof.dev/Humberto/infinity](https://forgejo.humbertof.dev/Humberto/infinity/). Novas versões são marcadas com tags de versão.

## Solução de problemas

### O painel admin parece quebrado ou sem estilo.

Verifique se o link do `dashboard.css` está correto no `index.html`. O estilo do painel admin é carregado separadamente do tema principal — se este link estiver faltando ou errado, as páginas admin não terão o tema aplicado.

### Algumas páginas não mostram o tema.

O tema principal (`finity-complete.css`) é carregado pelo campo de CSS Customizado do Jellyfin, que se aplica à maioria das páginas. No entanto, as páginas do painel admin precisam do `dashboard.css` separado, carregado pelo `index.html`. Certifique-se de que ambos estão configurados.

### O console mostra erros sobre "marked" ou "DOMPurify".

Estas são bibliotecas externas que o slideshow precisa. Certifique-se de que as tags `<script>` do `marked` e `dompurify` estão **antes** da tag do `slideshowpure.js` no `index.html`. A ordem importa — o script do slideshow depende dessas bibliotecas serem carregadas primeiro.

### Estou recebendo um erro de Content Security Policy (CSP).

Se seu Jellyfin tem uma configuração CSP personalizada, você pode precisar permitir recursos de:
- `https://cdn.jsdelivr.net` (para arquivos do Infinity)
- `https://fonts.googleapis.com` (se estiver usando Google Fonts)

Verifique seu reverse proxy ou a configuração do Jellyfin se você usa cabeçalhos CSP.
