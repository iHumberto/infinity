/**
 * Finity - Slideshow clicável
 *
 * Ao clicar no slide ativo (na imagem/backdrop), navega para a
 * página de detalhes do item exibido no momento.
 *
 * Cliques nos botões internos (Play, Detalhes, Favorito, Dots,
 * setas e pause) são ignorados — eles continuam funcionando
 * normalmente com seus próprios handlers.
 */
(function () {
  'use strict';

  // Seletores de elementos que NÃO devem disparar a navegação
  const IGNORE_SELECTORS = [
    '.play-button',
    '.detail-button',
    '.favorite-button',
    '.left-arrow',
    '.right-arrow',
    '.dot',
    '#slideshow-pause-button',
    '.button-container',
    '.dots-container',
  ].join(', ');

  /**
   * Retorna o item ID do slide ativo.
   * O script do slideshow armazena o ID no atributo data-item-id do .slide.
   */
  function getActiveItemId() {
    const activeSlide = document.querySelector('.slide.active');
    if (!activeSlide) return null;
    return activeSlide.dataset.itemId || activeSlide.dataset.id || null;
  }

  /**
   * Navega para a página de detalhes do item.
   * Usa o router interno do Jellyfin quando disponível,
   * com fallback para hash navigation.
   */
  function navigateToItem(itemId) {
    if (!itemId) {
      console.warn('[clickableSlideshow] Item ID não encontrado no slide ativo.');
      return;
    }

    console.log('[clickableSlideshow] Navegando para item:', itemId);

    // Tenta usar o ApiClient para descobrir o tipo do item e navegar corretamente
    try {
      const apiClient = window.ApiClient;
      if (apiClient) {
        apiClient.getItem(apiClient.getCurrentUserId(), itemId).then(function (item) {
          if (window.Emby && window.Emby.Page) {
            window.Emby.Page.show('/details?id=' + itemId);
          } else {
            window.location.hash = '/details?id=' + itemId;
          }
        }).catch(function () {
          window.location.hash = '/details?id=' + itemId;
        });
        return;
      }
    } catch (e) {
      // ApiClient não disponível, usa fallback
    }

    // Fallback direto
    window.location.hash = '/details?id=' + itemId;
  }

  /**
   * Adiciona o listener de clique no #slides-container.
   * Usa event delegation para capturar cliques em qualquer parte do slide ativo.
   */
  function setupClickListener(container) {
    console.log('[clickableSlideshow] Adicionando listener no #slides-container.');

    container.addEventListener('click', function (event) {
      // Ignora cliques em botões e controles internos
      if (event.target.closest(IGNORE_SELECTORS)) {
        return;
      }

      // Só age se o clique foi dentro de um .slide.active
      const activeSlide = event.target.closest('.slide.active');
      if (!activeSlide) return;

      const itemId = getActiveItemId();
      navigateToItem(itemId);
    });
  }

  /**
   * Aguarda o #slides-container aparecer no DOM
   * (o slideshow é injetado dinamicamente pelo index.html do Finity).
   */
  function waitForSlideshow() {
    const existing = document.getElementById('slides-container');
    if (existing) {
      setupClickListener(existing);
      return;
    }

    const observer = new MutationObserver(function (mutations, obs) {
      const container = document.getElementById('slides-container');
      if (container) {
        obs.disconnect();
        console.log('[clickableSlideshow] #slides-container encontrado via observer.');
        setupClickListener(container);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    console.log('[clickableSlideshow] Aguardando #slides-container...');
  }

  // Inicia
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForSlideshow);
  } else {
    waitForSlideshow();
  }

})();
