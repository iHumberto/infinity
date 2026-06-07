# ⚙️ Configuração do Tema Infinity

> Acesse o painel de controle do tema e personalize cores, fonte e slideshow sem editar arquivos.

## O que é

A página de configuração do Infinity permite que você — administrador do servidor Jellyfin — personalize a aparência do tema diretamente pelo painel de controle. Antes, para mudar as cores ou ajustar o slideshow, você precisava editar o CSS manualmente. Agora tudo está reunido em um só lugar, com seletores de cor visuais e ajustes em tempo real.

Você pode:
- Mudar as **cores do tema** (fundo, texto, destaque, cards, botões e mais).
- Escolher uma **fonte personalizada** para o tema.
- Ajustar o **comportamento do slideshow** da página inicial.
- Escolher **de onde vêm as imagens** do slideshow — aleatório, últimos adicionados ou uma lista sua.

## Como usar

### Pré-requisitos

- Ter o tema Infinity instalado no seu Jellyfin.
- Estar logado como **administrador** (a página de configuração só aparece para admins).

### Acessando a página de configuração

1. No Jellyfin, abra o **Painel de Controle** (Dashboard).
2. No menu lateral, role até a seção **Plugins**.
3. Clique em **🎨 Infinity**.

A página de configuração será carregada no lugar do conteúdo do painel.

### Personalizando as cores

A seção **🎨 Cores do Tema** mostra 10 cores que você pode alterar:

| Cor | O que afeta |
|-----|-------------|
| Fundo da página | Cor de fundo geral do tema |
| Cor do texto | Textos principais da interface |
| Cor de destaque | Links, seleções, barras de progresso |
| Fundo dos cards | Cor de fundo dos blocos de conteúdo |
| Fundo do header | Cor da barra superior |
| Fundo da sidebar | Cor do menu lateral |
| Fundo dos botões | Cor de fundo dos botões |
| Cor de aviso | Cor de ações de alerta/perigo |
| Borda de seleção | Cor do contorno ao selecionar itens |
| Fundo dos campos | Cor de fundo de inputs e campos de texto |

Para alterar uma cor:
1. Clique no **quadrado colorido** — o navegador abre um seletor visual com gradiente.
2. Escolha a cor desejada.
3. Ou digite diretamente no campo de texto ao lado (aceita formatos como `#9400D3`, `rgb(148,0,211)`, `rgba(148,0,211,0.8)`).

> A mudança é aplicada **na hora** para você ver como fica. Nada é salvo até você clicar em **Salvar Configurações**.

### Trocando a fonte

Na seção **🔤 Fonte Customizada**:
1. Cole a URL de um arquivo de fonte `.woff` no campo **URL da fonte**. Pode ser um link externo (ex: Google Fonts) ou um caminho dentro do servidor (ex: `/web/fonts/minha-fonte.woff`).
2. No campo **Nome da família tipográfica**, digite o nome da fonte (ex: `Open Sans`).
3. Deixe a URL em branco para usar a fonte padrão do tema (Kodchasan).

### Configurando o slideshow

Na seção **🖼️ Slideshow** você controla o carrossel de imagens da página inicial:

| Campo | O que faz | Mínimo | Máximo |
|-------|-----------|--------|--------|
| Quantidade de slides | Quantas imagens giram no carrossel | 1 | 100 |
| Intervalo (segundos) | Tempo entre a troca de slides | 1 | 300 |
| Duração do fade (ms) | Tempo da transição entre slides | 0 | 10.000 |
| Duração Ken Burns (seg) | Tempo do efeito de zoom nas imagens | 1 | 60 |

E três opções de liga/desliga:
- **Esconder logo** — Oculta o logo da mídia no slide.
- **Mostrar título** — Mostra o nome da mídia como texto.
- **Animação Ken Burns** — Ativa/desativa o efeito de zoom suave nas imagens.

### Escolhendo a origem dos slides

Na mesma seção, abaixo dos controles, você escolhe **de onde vêm as imagens**:

**🔀 Aleatório (Random)** — Padrão. Escolhe filmes e séries aleatórios da sua biblioteca.

**🆕 Adicionados Recentemente** — Usa as mídias mais recentes, em ordem de adição. Ideal para destacar o que há de novo no servidor.

**📋 Lista Manual** — Você define exatamente quais mídias aparecem. Ao selecionar esta opção, aparece uma caixa de texto onde você cola os IDs:
- Um ID por linha, ou separados por vírgula.
- IDs inválidos são ignorados automaticamente.
- Exemplo:
  ```
  a1b2c3d4e5f6
  b2c3d4e5f6a1
  c3d4e5f6a1b2
  ```

> 💡 **Como encontrar o ID de uma mídia?** Acesse a página de detalhes do filme/série. O ID aparece no final da URL: `.../details?id=a1b2c3d4e5f6`.

### Salvando ou restaurando

- **💾 Salvar Configurações** — Grava todas as alterações. Elas serão mantidas mesmo se você reiniciar o servidor ou limpar o cache.
- **🔄 Restaurar Padrões** — Volta todas as cores, fonte e configurações do slideshow para os valores originais do tema Infinity.

## Perguntas frequentes

### Posso usar a página de configuração e o CSS Customizado ao mesmo tempo?

Não. A página de configuração substitui completamente o método antigo de configurar via CSS customizado. Se você tinha variáveis `--infinity-*` no campo de CSS do Branding, elas serão ignoradas — use a página de configuração no lugar.

### As configurações são salvas por usuário?

Não. Ao clicar em **Salvar Configurações**, o tema grava as alterações no servidor Jellyfin (campo Custom CSS do Branding). Isso significa que **todos os usuários** do servidor verão as mesmas cores e configurações, independente do navegador ou dispositivo que usarem.

### O que acontece se eu trocar de navegador ou dispositivo?

Como as configurações ficam salvas no servidor, elas são aplicadas automaticamente em qualquer navegador, computador ou celular (via navegador web). Basta acessar o Jellyfin normalmente — as cores e o slideshow já estarão configurados.

### Por que as cores ou fonte não mudaram?

Verifique se você clicou em **Salvar Configurações** após fazer as alterações. Alterações em tempo real são apenas uma prévia — só são permanentes após salvar.
