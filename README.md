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
