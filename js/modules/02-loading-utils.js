// infinity/modules/02-loading-utils.js — Loading screen, login state watcher, ApiClient init, SlideUtils
// This file is part of the Infinity theme. Built via: npm run build

          <div class="progress-bar" id="progress-bar" style="width: 0%;"></div>
          <div class="progress-gap" id="progress-gap"></div>
          <div class="unfilled-bar" id="unfilled-bar" style="width: 100%;"></div>
        </div>
      </div>
    `;
    document.body.appendChild(loadingDiv);

    requestAnimationFrame(() => {
        const img = loadingDiv.querySelector("h1 img");
        if(img) img.style.opacity = "1";
    });

    // Keep custom progress bar logic
    const progressBar = document.getElementById("progress-bar");
    const unfilledBar = document.getElementById("unfilled-bar");
    let progress = 0;
    let lastIncrement = 5;

    const progressInterval = setInterval(() => {
        if (progress < 95) {
            lastIncrement = Math.max(0.5, lastIncrement * 0.98);
            const randomFactor = 0.8 + Math.random() * 0.4;
            const increment = lastIncrement * randomFactor;
            progress = Math.min(progress + increment, 95);
            if(progressBar) progressBar.style.width = `${progress}%`;
            if(unfilledBar) unfilledBar.style.width = `${100 - progress}%`;
        } else {
            clearInterval(progressInterval);
        }
    }, 150);

    // Keep custom check logic for hiding loader
    const checkInterval = setInterval(() => {
        const loginFormLoaded = document.querySelector(".manualLoginForm");
        const homePageLoaded = document.querySelector(".homeSectionsContainer") && document.getElementById('slides-container');

        if (loginFormLoaded || homePageLoaded) {
            clearInterval(progressInterval);
            clearInterval(checkInterval);

            if(progressBar) {
                progressBar.style.transition = "width 300ms ease-in-out";
                progressBar.style.width = "100%";
            }
             if(unfilledBar) {
                unfilledBar.style.transition = "width 300ms ease-in-out";
                unfilledBar.style.width = "0%";
            }

            // Fade out loader after progress animation (use timeout for reliability)
            setTimeout(() => {
                const loader = document.getElementById("page-loader");
                if (loader) {
                    loader.style.opacity = '0';
                    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
                }
            }, 350);
        }
    }, CONFIG.loadingCheckInterval);
};

/**
 * Resets the slideshow state completely
 */
const resetSlideshowState = () => {
    debugLog("🔄 Resetting slideshow state...");

    STATE.slideshow.slideInterval?.stop();
    STATE.slideshow.slideInterval = null;

    const container = document.getElementById("slides-container");
    if (container) {
        container.innerHTML = '';
        // Consider removing event listeners added directly to container if any
    }

    Object.assign(STATE.slideshow, {
        hasInitialized: false,
        isTransitioning: false,
        isPaused: false,
        currentSlideIndex: 0,
        focusedSlide: null,
        containerFocused: false,
        itemIds: [],
        loadedItems: {},
        createdSlides: {},
        totalItems: 0,
        isLoading: false,
    });
    debugLog("Slideshow state reset complete.");
};

/**
 * Watches for login status changes
 */
const startLoginStatusWatcher = () => {
    let wasLoggedIn = isUserLoggedIn();

    const checkLogin = () => {
        const isLoggedIn = isUserLoggedIn();
        if (isLoggedIn !== wasLoggedIn) {
            debugLog(`User login status changed: ${wasLoggedIn ? 'Logged Out' : 'Logged In'}`);
            if (isLoggedIn) {
                debugLog("👤 User logged in. Checking slideshow initialization...");
                if (!STATE.slideshow.hasInitialized) {
                    waitForApiClientAndInitialize();
                } else {
                    debugLog("🔄 Slideshow already initialized. State:", STATE.slideshow);
                    // Optionally refresh data if needed on re-login
                }
            } else {
                debugLog("👋 User logged out. Resetting slideshow...");
                resetSlideshowState();
            }
            wasLoggedIn = isLoggedIn;
        }
    };

    checkLogin();
    setInterval(checkLogin, 2000);
};

/**
 * Wait for ApiClient to initialize before starting the slideshow
 */
const waitForApiClientAndInitialize = () => {
    if (window.slideshowCheckInterval) {
        clearInterval(window.slideshowCheckInterval);
        window.slideshowCheckInterval = null;
    }
    debugLog("Waiting for ApiClient and user login...");

    const checkApiClient = () => {
        if (!window.ApiClient) {
            debugLog("⏳ ApiClient not available yet...");
            return false;
        }

        if (isUserLoggedIn()) {
            debugLog("🔓 User is logged in. Proceeding...");
            clearInterval(window.slideshowCheckInterval);
            window.slideshowCheckInterval = null;

            if (!STATE.slideshow.hasInitialized) {
                debugLog("Initializing Jellyfin data and slideshow...");
                initJellyfinData(() => {
                    console.log("✅ Jellyfin API client data initialized.");
                    // Use setTimeout to ensure DOM might be ready
                    setTimeout(slidesInit, 100);
                });
            } else {
                debugLog("🔄 Slideshow already initialized, skipping init call.");
            }
            return true;
        } else {
            debugLog("🔒 Authentication incomplete or ApiClient not fully ready...");
            return false;
        }
    };

    if (!checkApiClient()) {
        window.slideshowCheckInterval = setInterval(checkApiClient, CONFIG.retryInterval);
    }
};

/**
 * Utility functions for slide creation and management
 */
const SlideUtils = {
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    truncateText(element, maxLength) {
        if (!element) return;
        const text = element.innerText || element.textContent;
        if (text && text.length > maxLength) {
            element.innerText = text.substring(0, maxLength) + "...";
        }
    },
    createSeparator() {
        const separator = document.createElement("i");
        separator.className = "material-icons fiber_manual_record separator-icon";
        return separator;
    },
    createElement(tag, attributes = {}, content = null) {
        const element = document.createElement(tag);
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === "style" && typeof value === "object") {
                Object.assign(element.style, value);
            } else if (key === "className") {
                element.className = value;
            } else if (key === "innerHTML") {
                element.innerHTML = value;
            } else if (key === "onclick" && typeof value === "function") {
