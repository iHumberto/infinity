// infinity/modules/06-init-bootstrap.js — SlideshowManager (cont), arrows, pause button, slidesInit, bootstrap
// This file is part of the Infinity theme. Built via: npm run build

        }
        this.updateDots();
    },
    updateDots() { // Keep custom logic
        const container = SlideUtils.getOrCreateSlidesContainer();
        const dots = container.querySelectorAll(".dots-container .dot");
        if (!dots || dots.length === 0) return;
        const currentIndex = STATE.slideshow.currentSlideIndex;
        const totalItems = STATE.slideshow.totalItems;
        const numDots = dots.length;
        if (totalItems === 0) return;
        const activeDotIndex = currentIndex % numDots;
        dots.forEach((dot, index) => dot.classList.toggle("active", index === activeDotIndex));
    },
    async updateCurrentSlide(index) {
        if (STATE.slideshow.isTransitioning || STATE.slideshow.totalItems === 0) return;
        STATE.slideshow.isTransitioning = true;
        const totalItems = STATE.slideshow.totalItems;
        index = (index % totalItems + totalItems) % totalItems;
        debugLog(`Updating slide to index: ${index}`);
        const container = SlideUtils.getOrCreateSlidesContainer();
        const currentItemId = STATE.slideshow.itemIds[index];
        let nextSlide = container.querySelector(`.slide[data-item-id="${currentItemId}"]:not(.placeholder)`);
        if (!nextSlide) {
            nextSlide = await SlideCreator.createSlideForItemId(currentItemId);
            if (!nextSlide) {
                console.error(`Failed to create slide ${currentItemId}, skipping.`);
                STATE.slideshow.isTransitioning = false;
                setTimeout(() => this.nextSlide(), 500); return;
            }
        }
        const previousSlide = container.querySelector(".slide.active");
        if (previousSlide && previousSlide !== nextSlide) {
            previousSlide.classList.remove("active");
             if (CONFIG.slideAnimationEnabled) {
                 previousSlide.querySelector(".backdrop")?.classList.remove("animate");
                 previousSlide.querySelector(".logo")?.classList.remove("animate");
             }
        }
        nextSlide.style.opacity = '0';
        nextSlide.classList.add('active');
        if (STATE.slideshow.isPaused) nextSlide.classList.add('slideshow-paused');
        else nextSlide.classList.remove('slideshow-paused');
        void nextSlide.offsetWidth; // Reflow
        nextSlide.style.opacity = '1';
        if (CONFIG.slideAnimationEnabled) {
             nextSlide.querySelector(".backdrop")?.classList.add("animate");
             nextSlide.querySelector(".logo")?.classList.add("animate");
         }
        STATE.slideshow.currentSlideIndex = index;
        this.updateDots();
        this.preloadAdjacentSlides(index);
        if (STATE.slideshow.slideInterval && !STATE.slideshow.isPaused) STATE.slideshow.slideInterval.restart();
        setTimeout(() => { STATE.slideshow.isTransitioning = false; }, CONFIG.fadeTransitionDuration);
    },
    upgradeSlideImageQuality(slide) {
         if (!slide) return;
         const images = slide.querySelectorAll("img[data-high-quality]");
         images.forEach((img) => {
              if (img.classList.contains('low-quality')) { // Only if loading LQ first
                   const highQualityUrl = img.getAttribute("data-high-quality");
                   if (highQualityUrl && img.src !== highQualityUrl) {
                        addThrottledRequest(highQualityUrl, () => { img.src = highQualityUrl; img.classList.remove("low-quality"); img.classList.add("high-quality"); });
                   }
              } else img.classList.add('high-quality');
         });
    },
    async preloadAdjacentSlides(currentIndex) {
        if (STATE.slideshow.totalItems <= 1) return;
        const totalItems = STATE.slideshow.totalItems;
        const preloadCount = Math.min(CONFIG.preloadCount, Math.floor(totalItems / 2));
        const indicesToPreload = new Set();
        for (let i = 1; i <= preloadCount; i++) indicesToPreload.add((currentIndex + i) % totalItems);
        for (let i = 1; i <= preloadCount; i++) indicesToPreload.add((currentIndex - i + totalItems) % totalItems);
        debugLog(`Preloading indices: ${Array.from(indicesToPreload)}`);
        const preloadPromises = Array.from(indicesToPreload).map(index => {
            const itemId = STATE.slideshow.itemIds[index];
            if (!STATE.slideshow.createdSlides[itemId]) {
                 return SlideCreator.createSlideForItemId(itemId).catch(err => { console.error(`Preload failed for ${itemId}:`, err); return null; });
            }
            return Promise.resolve();
        });
        await Promise.all(preloadPromises);
        debugLog("Preloading finished.");
    },
    nextSlide() { // Keep custom logic (handles unpausing)
        const nextIndex = (STATE.slideshow.currentSlideIndex + 1) % STATE.slideshow.totalItems;
        this.updateCurrentSlide(nextIndex);
        if (STATE.slideshow.isPaused) document.getElementById("slideshow-pause-button")?.click();
    },
    prevSlide() { // Keep custom logic (handles unpausing)
        const prevIndex = (STATE.slideshow.currentSlideIndex - 1 + STATE.slideshow.totalItems) % STATE.slideshow.totalItems;
        this.updateCurrentSlide(prevIndex);
        if (STATE.slideshow.isPaused) document.getElementById("slideshow-pause-button")?.click();
    },
    pruneSlideCache() {
        const currentIndex = STATE.slideshow.currentSlideIndex; const totalItems = STATE.slideshow.totalItems; const keepRange = 5;
        if (totalItems <= (keepRange * 2 + 1)) return; // Don't prune if too few items
        const minKeepIndex = (currentIndex - keepRange + totalItems) % totalItems; const maxKeepIndex = (currentIndex + keepRange) % totalItems;
        const indicesToKeep = new Set();
        if (minKeepIndex <= maxKeepIndex) { for (let i = minKeepIndex; i <= maxKeepIndex; i++) indicesToKeep.add(i); }
        else { for (let i = minKeepIndex; i < totalItems; i++) indicesToKeep.add(i); for (let i = 0; i <= maxKeepIndex; i++) indicesToKeep.add(i); }
        indicesToKeep.add(currentIndex);
        Object.keys(STATE.slideshow.createdSlides).forEach((itemId) => {
            const index = STATE.slideshow.itemIds.indexOf(itemId);
            if (index !== -1 && !indicesToKeep.has(index)) {
                document.querySelector(`.slide[data-item-id="${itemId}"]`)?.remove();
                delete STATE.slideshow.createdSlides[itemId]; delete STATE.slideshow.loadedItems[itemId];
                debugLog(`Pruned slide ${itemId} at index ${index}`);
            }
        });
    },
    initTouchEvents() {
        const container = SlideUtils.getOrCreateSlidesContainer(); let touchStartX = 0; let touchEndX = 0;
        container.addEventListener("touchstart", (e) => { if (e.touches.length === 1) touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        container.addEventListener("touchend", (e) => { if (e.changedTouches.length === 1) { touchEndX = e.changedTouches[0].screenX; this.handleSwipe(touchStartX, touchEndX); } }, { passive: true });
    },
    handleSwipe(startX, endX) {
        const diff = endX - startX; if (Math.abs(diff) < CONFIG.minSwipeDistance) return;
        if (diff > 0) this.prevSlide(); else this.nextSlide();
    },
    initKeyboardEvents() {
        document.addEventListener("keydown", (e) => {
            const container = document.getElementById('slides-container');
            if (!container || container.style.display === 'none') return;
            const isFocusedInSlideshow = container.contains(document.activeElement);
            const isBodyFocused = document.activeElement === document.body;
             if (!isFocusedInSlideshow && !isBodyFocused) return;
            switch (e.key) {
                case "ArrowRight": this.nextSlide(); e.preventDefault(); break;
                case "ArrowLeft": this.prevSlide(); e.preventDefault(); break;
                case " ": document.getElementById('slideshow-pause-button')?.click(); e.preventDefault(); break;
            }
        });
    },
    async loadSlideshowData() { // Keep custom logic
        try {
            STATE.slideshow.isLoading = true; const neededCount = CONFIG.slideshowItems; let finalItemIds = [];
            debugLog(`Loading slideshow data. Target items: ${neededCount}`);
            let listIds = await ApiUtils.fetchItemIdsFromList();
            if (listIds?.length > 0) { debugLog(`Got ${listIds.length} from list.txt.`); finalItemIds = [...listIds]; }
            else debugLog("list.txt empty/not found.");
            const missingCount = neededCount - finalItemIds.length;
            debugLog(`Missing ${missingCount} items.`);
            if (missingCount > 0 && CONFIG.enableRandom) {
                debugLog(`Fetching random fallback items...`);
                const fetchLimit = Math.max(missingCount * 3, 30);
                let serverIds = await ApiUtils.fetchItemIdsFromServer(fetchLimit);
                if (serverIds?.length > 0) {
                    const listIdSet = new Set(finalItemIds); const uniqueServerIds = serverIds.filter(id => !listIdSet.has(id));
                    debugLog(`Got ${uniqueServerIds.length} unique random IDs.`);
                    const neededServerIds = SlideUtils.shuffleArray(uniqueServerIds).slice(0, missingCount);
                    debugLog(`Adding ${neededServerIds.length} random IDs.`);
                    finalItemIds = finalItemIds.concat(neededServerIds);
                } else debugLog("No random items fetched.");
            } else if (missingCount > 0) debugLog(`Random fallback disabled. Slideshow has ${finalItemIds.length} items.`);
            finalItemIds = SlideUtils.shuffleArray(finalItemIds);
            if (finalItemIds.length > neededCount) { debugLog(`Slicing final list from ${finalItemIds.length} to ${neededCount}.`); finalItemIds = finalItemIds.slice(0, neededCount); }
            debugLog(`Final item count: ${finalItemIds.length}.`);
            STATE.slideshow.itemIds = finalItemIds; STATE.slideshow.totalItems = finalItemIds.length;
            if (STATE.slideshow.totalItems > 0) {
                 this.createPaginationDots();
                 await this.updateCurrentSlide(0);
                 if (!STATE.slideshow.slideInterval) {
                      STATE.slideshow.slideInterval = new SlideTimer(() => { if (!STATE.slideshow.isPaused) this.nextSlide(); }, CONFIG.shuffleInterval).start();
                      // Let VisibilityObserver start it initially
                 } else {
                     // If interval exists but wasn't running
                     if (!STATE.slideshow.slideInterval.timerId && !STATE.slideshow.isPaused) {
                          STATE.slideshow.slideInterval.start();
                     }
                 }
            } else { console.warn("No items for slideshow."); SlideUtils.getOrCreateSlidesContainer().style.display = 'none'; }
        } catch (error) { console.error("Error loading slideshow data:", error); }
        finally { STATE.slideshow.isLoading = false; }
    },
};

/**
 * Initializes arrow navigation
 */
const initArrowNavigation = () => {
    const container = SlideUtils.getOrCreateSlidesContainer();
    if (container.querySelector('.arrow.left-arrow')) return;
    const leftArrow = SlideUtils.createElement("div", { className: "arrow left-arrow", innerHTML: '<i class="material-icons">chevron_left</i>', tabIndex: "0", onclick: (e)=>{e.preventDefault(); e.stopPropagation(); SlideshowManager.prevSlide();}, style: { opacity: "0", transition: "opacity 0.3s", display: 'none' } });
    const rightArrow = SlideUtils.createElement("div", { className: "arrow right-arrow", innerHTML: '<i class="material-icons">chevron_right</i>', tabIndex: "0", onclick: (e)=>{e.preventDefault(); e.stopPropagation(); SlideshowManager.nextSlide();}, style: { opacity: "0", transition: "opacity 0.3s", display: 'none' } });
    container.appendChild(leftArrow); container.appendChild(rightArrow);
    let arrowTimeout;
    const showArrows = () => { clearTimeout(arrowTimeout); leftArrow.style.display = 'flex'; rightArrow.style.display = 'flex'; requestAnimationFrame(() => { leftArrow.style.opacity = '0.7'; rightArrow.style.opacity = '0.7'; }); };
    const hideArrows = () => { leftArrow.style.opacity = '0'; rightArrow.style.opacity = '0'; const hideFunc = (e) => { if (e.propertyName === 'opacity' && e.target.style.opacity === '0') { e.target.style.display = 'none'; e.target.removeEventListener('transitionend', hideFunc); } }; leftArrow.addEventListener('transitionend', hideFunc); rightArrow.addEventListener('transitionend', hideFunc); };
    container.addEventListener("mouseenter", showArrows); container.addEventListener("mouseleave", hideArrows);
    container.addEventListener("touchstart", () => { clearTimeout(arrowTimeout); showArrows(); arrowTimeout = setTimeout(hideArrows, 3000); }, { passive: true });
};

/**
 * Initializes the pause/play button
 */
const initPauseButton = () => {
    const container = SlideUtils.getOrCreateSlidesContainer();
    if (document.getElementById("slideshow-pause-button")) return; // Prevent duplicates
    const pauseButton = SlideUtils.createElement("button", { id: "slideshow-pause-button", className: "slideshow-control-button", title: "Pause Slideshow", innerHTML: '<i class="material-icons">pause</i>', tabIndex: "0" });
    pauseButton.addEventListener("click", (e) => {
        e.preventDefault(); e.stopPropagation();
        STATE.slideshow.isPaused = !STATE.slideshow.isPaused;
        console.log(`Slideshow ${STATE.slideshow.isPaused ? 'Paused' : 'Resumed'}`);
        const currentActiveSlide = container.querySelector('.slide.active');
        if (STATE.slideshow.isPaused) {
            STATE.slideshow.slideInterval?.pause();
            pauseButton.innerHTML = '<i class="material-icons">play_arrow</i>'; pauseButton.title = "Resume Slideshow";
            currentActiveSlide?.classList.add('slideshow-paused');
        } else {
            STATE.slideshow.slideInterval?.start();
            pauseButton.innerHTML = '<i class="material-icons">pause</i>'; pauseButton.title = "Pause Slideshow";
            currentActiveSlide?.classList.remove('slideshow-paused');
        }
    });
    container.appendChild(pauseButton);
};

/**
 * Initialize the slideshow
 */
const slidesInit = async () => {
    if (STATE.slideshow.hasInitialized) { console.log("⚠️ Slideshow already initialized."); return; }
    STATE.slideshow.hasInitialized = true;
    console.log("🌟 Initializing Slideshow...");
    readCSSConfig();
    if (typeof marked === 'undefined') console.error("Marked.js not loaded.");
    if (typeof DOMPurify === 'undefined') console.warn("DOMPurify not loaded.");

    try {
        SlideUtils.getOrCreateSlidesContainer();
        initArrowNavigation();
        initPauseButton();

        await SlideshowManager.loadSlideshowData();

        SlideshowManager.initTouchEvents();
        SlideshowManager.initKeyboardEvents();

        VisibilityObserver.init();

        console.log("✅ Slideshow initialized successfully.");
    } catch (error) {
        console.error("❌ Slideshow initialization error:", error);
        STATE.slideshow.hasInitialized = false; resetSlideshowState();
    }
};

window.slideshowPure = {
    nextSlide: () => SlideshowManager.nextSlide(),
    prevSlide: () => SlideshowManager.prevSlide(),
    refresh: () => SlideshowManager.loadSlideshowData(),
};

initLoadingScreen();
startLoginStatusWatcher(); // Handles triggering init after login
