// infinity/modules/05-slideshow.js — SlideCreator (cont), SlideshowManager
// This file is part of the Infinity theme. Built via: npm run build

 * Slideshow UI creation and management
 */
const SlideCreator = {
    createSlideElement(item, name) {
        if (!item || !item.Id) { console.error("Invalid item data:", item); return null; }
        const itemId = item.Id;
        const serverAddress = STATE.jellyfinData.serverAddress;
        const slide = SlideUtils.createElement("a", { className: "slide", target: "_top", rel: "noreferrer", tabIndex: 0, "data-item-id": itemId });

        const backdrop = SlideUtils.createElement("img", { className: "backdrop high-quality", src: `${serverAddress}/Items/${itemId}/Images/Backdrop/0?quality=100`, 'data-low-quality': `${serverAddress}/Items/${itemId}/Images/Backdrop/0?quality=10`, 'data-high-quality': `${serverAddress}/Items/${itemId}/Images/Backdrop/0?quality=100`, alt: "Backdrop", loading: "eager", decoding: "async" });
        const backdropOverlay = SlideUtils.createElement("div", { className: "backdrop-overlay" });
        const backdropContainer = SlideUtils.createElement("div", { className: "backdrop-container" });
        backdropContainer.append(backdrop, backdropOverlay);

        let logoContainer = null;
        if (!CONFIG.hideLogo) {
            const logo = SlideUtils.createElement("img", { className: "logo high-quality", src: `${serverAddress}/Items/${itemId}/Images/Logo?quality=75`, 'data-low-quality': `${serverAddress}/Items/${itemId}/Images/Logo?quality=10`, 'data-high-quality': `${serverAddress}/Items/${itemId}/Images/Logo?quality=75`, alt: "Logo", loading: "eager", decoding: "async" });
            logoContainer = SlideUtils.createElement("div", { className: "logo-container" });
            logoContainer.appendChild(logo);
        }

        let titleElement = null;
        if (CONFIG.showTitle) { // Use custom showTitle flag
            titleElement = SlideUtils.createElement("h2", { className: "slide-title" }, name);
        }

        const featuredContent = SlideUtils.createElement("div", { className: "featured-content" }, item.Type === "Movie" ? "Movie" : "TV Show");

        // Keep custom plot logic with Marked/DOMPurify and marquee
        const rawOverview = item.Overview || "No overview available";
        const hasDOMPurify = typeof DOMPurify !== 'undefined';
        const hasMarked = typeof marked !== 'undefined';
        const plotElement = SlideUtils.createElement("div", { className: "plot" });
        plotElement.innerHTML = `<div class="marquee-vertical"><div class="marquee-inner"></div></div>`;
        const marqueeInner = plotElement.querySelector(".marquee-inner");

        if (hasDOMPurify && hasMarked) {
            // Safe path: sanitize then parse markdown → rich innerHTML
            const sanitizedOverview = DOMPurify.sanitize(rawOverview);
            const htmlOverview = marked.parse(sanitizedOverview);
            marqueeInner.innerHTML = htmlOverview;
        } else {
            // Secure fallback: plain text only, no HTML parsing
            if (hasDOMPurify) {
                marqueeInner.textContent = DOMPurify.sanitize(rawOverview);
            } else {
                marqueeInner.textContent = rawOverview;
                console.warn("DOMPurify not loaded — overview displayed as plain text for security.");
            }
            if (!hasMarked) {
                console.warn("Marked.js not loaded — overview displayed as plain text.");
            }
        }
        setTimeout(() => { // Keep custom marquee animation logic
            const inner = plotElement.querySelector(".marquee-inner");
            const container = plotElement;
             if (!inner || !container) return;
            inner.style.animation = "none"; inner.style.transform = "translateY(0)"; inner.style.removeProperty('--scroll-amount');
             requestAnimationFrame(() => {
                 const scrollAmount = inner.scrollHeight - container.clientHeight;
                 if (scrollAmount > 5) {
                      const durationFactor = 0.2; const baseDuration = 6;
                      const durationSeconds = Math.max(baseDuration, scrollAmount * durationFactor);
                      inner.style.setProperty('--scroll-amount', `${-scrollAmount}px`);
                      inner.style.animation = `scroll-vertical ${durationSeconds}s linear 3s infinite`;
                 }
             });
        }, 100);
        const plotContainer = SlideUtils.createElement("div", { className: "plot-container" });
        plotContainer.appendChild(plotElement);

        const gradientOverlay = SlideUtils.createElement("div", { className: "gradient-overlay" });
        const infoContainer = SlideUtils.createElement("div", { className: "info-container" });
        const ratingInfo = this.createRatingInfo(item);
        infoContainer.appendChild(ratingInfo);
        const genreElement = SlideUtils.createElement("div", { className: "genre" });
        genreElement.innerHTML = SlideUtils.parseGenres(item.Genres);
        const buttonContainer = SlideUtils.createElement("div", { className: "button-container" });
        const playButton = this.createPlayButton(itemId);
        const detailButton = this.createDetailButton(itemId);
        const favoriteButton = this.createFavoriteButton(item);
        buttonContainer.append(playButton, detailButton, favoriteButton);

        if (logoContainer) slide.appendChild(logoContainer);
        if (titleElement) slide.appendChild(titleElement);
        slide.append(backdropContainer, gradientOverlay, featuredContent, plotContainer, infoContainer, genreElement, buttonContainer);
        return slide;
    },
    createRatingInfo(item) {
         const { CommunityRating: rating, CriticRating: criticRating, OfficialRating: age, PremiereDate: date, RunTimeTicks: runtime, ChildCount: season, ProductionYear } = item;
        const ratingContainer = SlideUtils.createElement("div", { className: "rating-value" });

        const imdbLogoDiv = SlideUtils.createElement("div", { className: "imdb-logo", innerHTML: CONFIG.IMAGE_SVG.imdbLogo, style: { width: "30px", height: "30px" }});
        ratingContainer.appendChild(imdbLogoDiv);
        const ratingSpan = SlideUtils.createElement("span", { style: { marginRight: "5px", marginLeft: "5px" } });
        if (typeof rating === "number" && rating > 0) ratingSpan.textContent = rating.toFixed(1);
        else { ratingSpan.innerHTML = "N/A"; ratingSpan.style.color = "rgba(255, 255, 255, 0.6)"; }
        ratingContainer.appendChild(ratingSpan);
        ratingContainer.appendChild(SlideUtils.createSeparator());

        const tomatoRatingDiv = SlideUtils.createElement("div", { className: "tomato-rating" });
        const tomatoLogoDiv = SlideUtils.createElement("div", { className: "tomato-logo", innerHTML: CONFIG.IMAGE_SVG.tomatoLogo, style: { width: "18px", height: "20px" } });
        tomatoRatingDiv.appendChild(tomatoLogoDiv);
        const valueElement = SlideUtils.createElement("span", { style: { marginLeft: "5px", marginRight: "5px" } });
        if (typeof criticRating === "number") valueElement.textContent = `${criticRating}% `;
        else { valueElement.style.color = "rgba(255, 255, 255, 0.6)"; valueElement.textContent = "N/A "; }
        tomatoRatingDiv.appendChild(valueElement);
        const criticLogoSpan = SlideUtils.createElement("span", { className: "critic-logo", style: { display: "flex"} });
        if (typeof criticRating === "number") criticLogoSpan.innerHTML = criticRating >= 60 ? CONFIG.IMAGE_SVG.freshTomato : CONFIG.IMAGE_SVG.rottenTomato;
        else criticLogoSpan.style.display = 'none';
        tomatoRatingDiv.appendChild(criticLogoSpan);
        ratingContainer.appendChild(tomatoRatingDiv);
        ratingContainer.appendChild(SlideUtils.createSeparator());

         const premiereDateDiv = SlideUtils.createElement("div", { className: "date" });
         let year = NaN;
         if (date) { try { year = new Date(date).getFullYear(); } catch (e) {} }
         if (isNaN(year) && ProductionYear) year = ProductionYear;
         if (!isNaN(year)) premiereDateDiv.textContent = year;
         else { const naSpan = SlideUtils.createElement("span", { style: { color: "rgba(255, 255, 255, 0.6)" } }, "N/A"); premiereDateDiv.appendChild(naSpan); }
         ratingContainer.appendChild(premiereDateDiv);
         ratingContainer.appendChild(SlideUtils.createSeparator());

        const ageRatingDiv = SlideUtils.createElement("div", { className: "age-rating" });
        const ageSpan = SlideUtils.createElement("span", {}, age || "N/A");
        ageRatingDiv.appendChild(ageSpan);
        ratingContainer.appendChild(ageRatingDiv);
        ratingContainer.appendChild(SlideUtils.createSeparator());

        const runTimeElement = SlideUtils.createElement("div", { className: "runTime" });
        if (item.Type === "Series" && typeof season === 'number' && season >= 0) runTimeElement.textContent = `${season} Season${season !== 1 ? "s" : ""}`;
        else if (item.Type === "Movie" && runtime && runtime > 0) {
            const minutes = Math.round(runtime / (10000 * 1000 * 60));
            if (minutes > 0) {
                 const hours = Math.floor(minutes / 60); const remainingMinutes = minutes % 60;
                 let durationString = '';
                 if (hours > 0) durationString += `${hours}h `;
                 if (remainingMinutes > 0) durationString += `${remainingMinutes}m`;
                 runTimeElement.textContent = durationString.trim() || 'N/A';
            } else runTimeElement.textContent = "N/A";
        } else runTimeElement.textContent = "N/A";
        ratingContainer.appendChild(runTimeElement);

        // Simple separator visibility (hide last one)
        const separators = ratingContainer.querySelectorAll('.separator-icon');
        if (separators.length > 0) {
            // Logic to hide separators if their preceding element is hidden by CSS
            separators.forEach(sep => {
                const prev = sep.previousElementSibling;
                // Check computed style to respect CSS rules
                if (prev && getComputedStyle(prev).display === 'none') {
                    sep.style.display = 'none';
                } else {
                     sep.style.display = '';
                }
            });
             separators[separators.length - 1].style.display = 'none';
        }


        return ratingContainer;
    },
    createPlayButton(itemId) {
        return SlideUtils.createElement("button", { className: "detailButton btnPlay play-button", tabIndex: "0", onclick: (e) => { e.preventDefault(); e.stopPropagation(); ApiUtils.playItem(itemId); }, innerHTML: `<span class="play-text">Play</span>` });
    },
    createDetailButton(itemId) {
        return SlideUtils.createElement("button", { className: "detailButton detail-button", tabIndex: "0", onclick: (e) => { e.preventDefault(); e.stopPropagation(); window.location.hash = `#/details?id=${itemId}&serverId=${STATE.jellyfinData.serverId}`; } });
    },
    createFavoriteButton(item) {
        const isFavorite = item.UserData?.IsFavorite === true;
        const button = SlideUtils.createElement("button", { className: `favorite-button ${isFavorite ? "favorited" : ""}`, tabIndex: "0", onclick: async (e) => { e.preventDefault(); e.stopPropagation(); await ApiUtils.toggleFavorite(item.Id, button); } });
        return button;
    },
    createLoadingPlaceholder(itemId) {
        const placeholder = SlideUtils.createElement("a", { className: "slide placeholder", "data-item-id": itemId, style: { display: 'block', opacity: "0", transition: `opacity ${CONFIG.fadeTransitionDuration}ms ease-in-out`, minHeight: '50vh', backgroundColor: 'rgba(0,0,0,0.2)' } });

        try {
            placeholder.appendChild(SlideUtils.createLoadingIndicator());
        } catch (error) {
            console.error(`❌ [createLoadingPlaceholder] Error calling SlideUtils.createLoadingIndicator:`, error);
            // Add a fallback visual indicator in case of error
            const errorIndicator = document.createElement('div');
            errorIndicator.textContent = 'Loading Error';
            errorIndicator.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:red; background:rgba(0,0,0,0.7); padding:5px; border-radius:3px; z-index:11;';
            placeholder.appendChild(errorIndicator);
        }
        return placeholder;
    },
    async createSlideForItemId(itemId) {
        let slideElement = document.querySelector(`.slide[data-item-id="${itemId}"]:not(.placeholder)`);
        if (slideElement) return slideElement;
        const container = SlideUtils.getOrCreateSlidesContainer();
        let placeholder = container.querySelector(`.slide.placeholder[data-item-id="${itemId}"]`);
        if (!placeholder) { placeholder = this.createLoadingPlaceholder(itemId); container.appendChild(placeholder); }
        try {
            const item = await ApiUtils.fetchItemDetails(itemId);
            if (!item) throw new Error("No details found");
            const newSlideElement = this.createSlideElement(item, item.Name);
            if (!newSlideElement) throw new Error("createSlideElement returned null");
            if (container.contains(placeholder)) container.replaceChild(newSlideElement, placeholder);
            else container.appendChild(newSlideElement);
            STATE.slideshow.createdSlides[itemId] = true;
            debugLog(`Slide created for ${itemId}`);
            return newSlideElement;
        } catch (error) {
            console.error(`Error creating slide for ${itemId}:`, error);
            placeholder?.remove(); delete STATE.slideshow.createdSlides[itemId]; return null;
        }
    },
};

/**
 * Manages slideshow functionality
 */
const SlideshowManager = {
    createPaginationDots() { // Keep custom logic based on slideshowItems
        const container = SlideUtils.getOrCreateSlidesContainer();
        let dotsContainer = container.querySelector(".dots-container");
        if (!dotsContainer) { dotsContainer = SlideUtils.createElement("div", { className: "dots-container" }); container.appendChild(dotsContainer); }
        else { dotsContainer.innerHTML = ''; }
        const numDotsToShow = Math.min(CONFIG.slideshowItems, STATE.slideshow.totalItems);
        debugLog(`Creating ${numDotsToShow} dots.`);
        for (let i = 0; i < numDotsToShow; i++) {
            const dot = SlideUtils.createElement("span", { className: "dot", "data-index": i, onclick: (event) => { const idx = parseInt(event.target.getAttribute('data-index'), 10); this.updateCurrentSlide(idx); if (STATE.slideshow.isPaused) document.getElementById("slideshow-pause-button")?.click(); } });
            dotsContainer.appendChild(dot);
