![Project Stage][Static-Badge]
![Maintenance][maintenance-shield]
![License][license-shield]
<a href="https://forgejo.humbertof.dev/Humberto/infinity/">![Repository][repo-shield]</a>


# Infinity

Repositório dedicado aos arquivos do projeto Infity, uma versão customizada do tema [Finity](https://github.com/prism2001/finity).

## Ajustes

- Ajuste na inicialização do cronômetro do slideshow;
- Correção dos `dots` que marcam a quantidade de itens no slideshow;
- Correção na transparência nas páginas de filmes e séries;
- Imagem de Fundo (Backdrop): 
  * Alteração das variáveis `--detail-page-backdrop-offset` para 0 e `--detail-page-backdrop-width` para 100vw. Isso faz com que a imagem ocupe toda a largura da tela, eliminando a  barra preta na esquerda.
  * Substituí o desfoque por um gradiente escuro sólido `(rgba(0,0,0,0.8)` na esquerda sumindo até transparente na direita). Isso garante que o texto continue legível sobre a imagem.
- Painel de Texto:
  * Ajuste da máscara lateral `(.backgroundContainer.withBackdrop)` para cobrir a área onde os textos ficam (definida em 70vw).


## Modificações

- Aumento na quantidade de itens no slideshow (de 8 para 16);
- Alteração da fonte para a Kodchasan;
- Slideshow clicável (clicar em um item do slideshow direciona para a página do item na biblioteca);

## Instalação

Para usar este tema basta colar os scripts e css abaixo em seu index.html do jellyfin (inserir obrigatóriamente no _*final*_ do cabeçalho antes de `</head>`):

```
<script src="https://cdn.jsdelivr.net/npm/marked@15.0.11/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.2.5/dist/purify.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/slideshowpure.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/finity-complete.css">
<script defer src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/slideshowpure.js"></script>
<script async src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/clickableTitles.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/clickableSlideshow.js"></script>"
```

Você também precisará criar um arquivo `list.txt` no _*mesmo diretório*_ do `index.html` e popular este arquivo inserindo _*apenas*_ os IDs das mídias que deseja no slideshow.

<img src="screenshots/Screenshot_06.png"    title="Home - slideshow 01" width="auto"/>

```
Arquivo1id
Arquivo2id
.
.
.
Arquivo16id
```

Se quiser automatizar esse processo e manter o slideshow sempre atualizado com as mídias mais recentes, você pode usar o [Script Runner](https://github.com/iHumberto/jellyfin-plugin-scriptrunner) e criar um script customizado que busque as mídias mais recentes e atualize o arquivo com os ids. 

## Dica

Se voce usa o docker vale a pena criar uma pasta `custom` no mesmo diretório do seu `docker-compose.yaml` e colocar dentro dessa pasta o `index.html` modificado e o arquivo `list.txt`. Depois basta referenciar esses arquivos para dentro do seu container docker

<img src="screenshots/Screenshot_07.png"    title="Home - slideshow 01" width="auto"/>

```
- ./custom/index.html:/jellyfin/jellyfin-web/index.html
- ./custom/list.txt:/jellyfin/jellyfin-web/list.txt
```

## Screenshots

<div align="center">

<img src="screenshots/Screenshot_01.png"    title="Home - slideshow 01" width="75%"/>
<img src="screenshots/Screenshot_02.png"    title="Home - slideshow 02" width="75%"/></br>
<img src="screenshots/Screenshot_03.png"    title="Home - Continue Watching, Next, Recent Movies" width="75%"/>
<img src="screenshots/Screenshot_04.png"    title="Movie page" width="75%"/></br>
<img src="screenshots/Screenshot_05.png"    title="Series page" width="75%"/>

</div>


## Licença

Este projeto é licenciado sob a [GNU GPL v3](LICENSE).

[maintenance-shield]: https://img.shields.io/maintenance/yes/2026.svg
[Static-Badge]: https://img.shields.io/badge/status-developing-blue?style=plastic&logo=forgejo
[repo-shield]: https://img.shields.io/badge/forgejo-repo-green?logo=forgejo
[license-shield]: https://img.shields.io/badge/License-GNU_GPL_v3-brightgreen?style=flat&logo=gnuprivacyguard
