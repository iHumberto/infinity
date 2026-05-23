// infinity/modules/04-observer-slides.js — VisibilityObserver, SlideCreator
// This file is part of the Infinity theme. Built via: npm run build

        this.callback = callback;
        this.interval = interval;
        this.timerId = null;
        this.startTime = null;
        this.remaining = interval;
        this.paused = false;
    }
    stop() {
        if (this.timerId) {
            clearTimeout(this.timerId);
            clearInterval(this.timerId);
            this.timerId = null;
        }
        this.paused = true;
        // Don't reset remaining here, pause should preserve it
        return this;
    }
    pause() {
        if (this.timerId && !this.paused) {
            clearTimeout(this.timerId);
            clearInterval(this.timerId);
            this.timerId = null;
            this.remaining -= Date.now() - this.startTime;
            this.paused = true;
        }
        return this;
    }
    start() {
        if (this.timerId || !this.callback) return this;
        this.paused = false;
        this.startTime = Date.now();

        if (this.remaining < this.interval && this.remaining > 0) {
            this.timerId = setTimeout(() => {
                this.callback();
                this.remaining = this.interval;
                this.start();
            }, this.remaining);
        } else {
            this.remaining = this.interval;
            this.timerId = setInterval(this.callback, this.interval);
        }
        return this;
    }
    restart() {
        return this.stop().start();
    }
}


/**
 * Observer for handling slideshow visibility and re-initialization on SPA navigation.
 */
const VisibilityObserver = {
    _observer: null,
    _clickListener: null,
    _hashChangeListener: null,
    _reinitTimeoutId: null,
    _removalCheckObserver: null, // Observer to watch for removal AFTER insertion

    updateVisibility() {
        const container = document.getElementById("slides-container");
        // *** Added check: Only proceed if container is actually inside homeTab ***
        const homeTabElement = document.getElementById('homeTab');
        const containerIsInHomeTab = homeTabElement?.contains(container) ?? false;

        if (!container || !containerIsInHomeTab) {
            // If container doesn't exist or is orphaned, ensure timer is paused.
            if (STATE.slideshow.slideInterval && !STATE.slideshow.slideInterval.paused) {
                 console.warn("[updateVisibility] Container missing/orphaned, ensuring timer is paused.");
                 STATE.slideshow.slideInterval.pause();
            }
            // If container exists but is orphaned, hide it.
            if (container && !containerIsInHomeTab) {
                container.style.display = 'none';
            }
            return;
        }

        const isOnHomePage = window.location.hash === '#/home.html' || window.location.hash === '#/home';
        const homeTabButton = document.querySelector('.skinHeader .emby-tab-button[data-index="0"]');
        const homeTabActive = homeTabButton?.classList.contains('emby-tab-button-active') ?? false;

        const shouldBeVisible = isOnHomePage && homeTabActive;

        container.style.display = shouldBeVisible ? "block" : "none";
        debugLog(`[updateVisibility] isOnHome: ${isOnHomePage}, homeTabActive: ${homeTabActive}. Setting display: ${container.style.display}`);

        if (STATE.slideshow.slideInterval) {
            if (shouldBeVisible && !STATE.slideshow.isPaused) {
                if (STATE.slideshow.slideInterval.paused) {
                    debugLog("[updateVisibility] Conditions met for RESUME timer.");
                    STATE.slideshow.slideInterval.start();
                }
            } else {
                 if (!STATE.slideshow.slideInterval.paused) {
                    debugLog("[updateVisibility] Conditions met for PAUSE timer.");
                    STATE.slideshow.slideInterval.pause();
                 }
            }
        }
    },

    _handleMutation() {
        this.updateVisibility();

        const isOnHomePage = window.location.hash === '#/home.html' || window.location.hash === '#/home';
        const homeTabExists = !!document.getElementById('homeTab');

        if (!isOnHomePage || !homeTabExists) {
            if (this._reinitTimeoutId) {
                clearTimeout(this._reinitTimeoutId);
                this._reinitTimeoutId = null;
                debugLog("[_handleMutation] Navigated away or #homeTab missing, cleared pending re-init.");
            }
            this._stopRemovalCheckObserver();
            return;
        }

        const containerExistsInHomeTab = !!document.querySelector('#homeTab #slides-container');
        const homeSectionsExistInHomeTab = !!document.querySelector('#homeTab .homeSectionsContainer');
        const wasInitialized = STATE.slideshow.hasInitialized;

        debugLog(`[_handleMutation Check] isOnHome: ${isOnHomePage}, homeTabExists: ${homeTabExists}, homeSectionsInTab: ${homeSectionsExistInHomeTab}, containerInHomeTab: ${containerExistsInHomeTab}, wasInitialized: ${wasInitialized}`);

        const globalContainer = document.getElementById("slides-container");
        if (globalContainer && !containerExistsInHomeTab) {
            console.warn("[_handleMutation Cleanup] Found orphaned #slides-container outside #homeTab. Removing it.");
            globalContainer.remove();
        }

        if (isOnHomePage && homeSectionsExistInHomeTab && !containerExistsInHomeTab && !this._reinitTimeoutId && wasInitialized) {
             // We check wasInitialized here to ensure we only try to *re*-init automatically.
             // Initial init is handled by startLoginStatusWatcher -> waitForApiClientAndInitialize -> slidesInit
            console.warn("[_handleMutation] Condition met for re-init (container missing in homeTab). Scheduling timeout...");

            STATE.slideshow.hasInitialized = false;

            this._reinitTimeoutId = setTimeout(() => {
                debugLog("[Re-init Timeout] Executing delayed re-initialization...");
                this._reinitTimeoutId = null;

                const stillOnHomePage = window.location.hash === '#/home.html' || window.location.hash === '#/home';
                const homeSectionsNowExist = !!document.querySelector('#homeTab .homeSectionsContainer');
                const containerStillMissing = !document.querySelector('#homeTab #slides-container');

                if (stillOnHomePage && homeSectionsNowExist && containerStillMissing) {
                    debugLog("[Re-init Timeout] Conditions still valid. Calling reset/init.");
                    resetSlideshowState();
                    slidesInit();
                    if (STATE.slideshow.hasInitialized) {
                         this._startRemovalCheckObserver();
                    }
                } else {
                    console.warn("[Re-init Timeout] Aborted: Conditions changed.");
                     if (STATE.slideshow.hasInitialized) { STATE.slideshow.hasInitialized = false; }
                }
            }, 250);

        } else if (isOnHomePage && !homeSectionsExistInHomeTab && !containerExistsInHomeTab && wasInitialized) {
             debugLog("[_handleMutation] On home page, container missing, homeSectionsContainer not ready yet. Waiting.");
        } else if (isOnHomePage && containerExistsInHomeTab) {
            // If container is correctly present, ensure removal check is running (or start it)
             this._startRemovalCheckObserver();
        }
    },

    _startRemovalCheckObserver() {
        if (this._removalCheckObserver) return;

        const homeTab = document.getElementById('homeTab');
        if (!homeTab) return;

        debugLog("[_startRemovalCheckObserver] Starting observer on #homeTab children.");
        this._removalCheckObserver = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.removedNodes.forEach(node => {
                        if (node.id === 'slides-container') {
                            console.error("!!! [_removalCheckObserver] #slides-container was REMOVED from #homeTab externally after being added!");
                            this._stopRemovalCheckObserver();

                            // Ensure state reflects removal so main observer can trigger re-init again if needed
                            if (STATE.slideshow.hasInitialized) {
                                console.warn("[_removalCheckObserver] Resetting hasInitialized state due to container removal.");
                                // just setting the flag allows the main observer loop to handle it.
                                STATE.slideshow.hasInitialized = false;
                            }
                             // Clear any pending re-init from main observer as this removal is the new event
                             if (this._reinitTimeoutId) {
                                  clearTimeout(this._reinitTimeoutId);
                                  this._reinitTimeoutId = null;
                             }
                        }
                    });
                }
            }
        });
        this._removalCheckObserver.observe(homeTab, { childList: true });
    },

    _stopRemovalCheckObserver() {
        if (this._removalCheckObserver) {
            this._removalCheckObserver.disconnect();
            this._removalCheckObserver = null;
            debugLog("[_stopRemovalCheckObserver] Stopped observer on #homeTab children.");
        }
    },

    init() {
        if (this._observer) {
            debugLog("[VisibilityObserver.init] Disconnecting existing observers.");
            this.disconnect();
        }

        this._clickListener = () => this.updateVisibility();
        this._hashChangeListener = () => {
             if (this._reinitTimeoutId) {
                 clearTimeout(this._reinitTimeoutId);
                 this._reinitTimeoutId = null;
                 debugLog("[hashchange] Cleared pending re-init due to navigation.");
             }
             this._stopRemovalCheckObserver();
             setTimeout(() => this.updateVisibility(), 50);
        };

        const boundMutationHandler = this._handleMutation.bind(this);
        this._observer = new MutationObserver(boundMutationHandler);

        debugLog("[VisibilityObserver.init] Observing document.body...");
        this._observer.observe(document.body, {
            childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'id', 'style']
        });

        document.body.addEventListener("click", this._clickListener);
        window.addEventListener("hashchange", this._hashChangeListener);

        setTimeout(() => {
            debugLog("[VisibilityObserver.init] Running delayed initial updateVisibility.");
            this.updateVisibility();
             // Start removal check on initial load as well, if container exists
             if (document.querySelector('#homeTab #slides-container')) {
                  this._startRemovalCheckObserver();
             }
        }, 50);

        debugLog("Visibility Observer Initialized.");
    },

     disconnect() {
          this._stopRemovalCheckObserver();
          if (this._observer) {
              this._observer.disconnect();
              this._observer = null;
              debugLog("[VisibilityObserver.disconnect] Main observer disconnected.");
          }
           if (this._clickListener) {
               document.body.removeEventListener("click", this._clickListener);
               this._clickListener = null;
           }
           if (this._hashChangeListener) {
               window.removeEventListener("hashchange", this._hashChangeListener);
               this._hashChangeListener = null;
           }
           if (this._reinitTimeoutId) {
                 clearTimeout(this._reinitTimeoutId);
                 this._reinitTimeoutId = null;
                 debugLog("[VisibilityObserver.disconnect] Cleared pending re-init.");
           }
           debugLog("Visibility Observer Listeners Removed.");
     }
};


/**
