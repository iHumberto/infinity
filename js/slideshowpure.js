/*
 * Jellyfin Slideshow by M0RPH3US --- with modifications by prism2001 v3.2.0
 */

//Core Module Configuration
const CONFIG = {
    IMAGE_SVG: {
        imdbLogo:
            '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 575 289.83" width="33" height="32.83"><defs><path d="M575 24.91C573.44 12.15 563.97 1.98 551.91 0C499.05 0 76.18 0 23.32 0C10.11 2.17 0 14.16 0 28.61C0 51.84 0 237.64 0 260.86C0 276.86 12.37 289.83 27.64 289.83C79.63 289.83 495.6 289.83 547.59 289.83C561.65 289.83 573.26 278.82 575 264.57C575 216.64 575 48.87 575 24.91Z" id="d1pwhf9wy2"></path><path d="M69.35 58.24L114.98 58.24L114.98 233.89L69.35 233.89L69.35 58.24Z" id="g5jjnq26yS"></path><path d="M201.2 139.15C197.28 112.38 195.1 97.5 194.67 94.53C192.76 80.2 190.94 67.73 189.2 57.09C185.25 57.09 165.54 57.09 130.04 57.09L130.04 232.74L170.01 232.74L170.15 116.76L186.97 232.74L215.44 232.74L231.39 114.18L231.54 232.74L271.38 232.74L271.38 57.09L211.77 57.09L201.2 139.15Z" id="i3Prh1JpXt"></path><path d="M346.71 93.63C347.21 95.87 347.47 100.95 347.47 108.89C347.47 115.7 347.47 170.18 347.47 176.99C347.47 188.68 346.71 195.84 345.2 198.48C343.68 201.12 339.64 202.43 333.09 202.43C333.09 190.9 333.09 98.66 333.09 87.13C338.06 87.13 341.45 87.66 343.25 88.7C345.05 89.75 346.21 91.39 346.71 93.63ZM367.32 230.95C372.75 229.76 377.31 227.66 381.01 224.67C384.7 221.67 387.29 217.52 388.77 212.21C390.26 206.91 391.14 196.38 391.14 180.63C391.14 174.47 391.14 125.12 391.14 118.95C391.14 102.33 390.49 91.19 389.48 85.53C388.46 79.86 385.93 74.71 381.88 70.09C377.82 65.47 371.9 62.15 364.12 60.13C356.33 58.11 343.63 57.09 321.54 57.09C319.27 57.09 307.93 57.09 287.5 57.09L287.5 232.74L342.78 232.74C355.52 232.34 363.7 231.75 367.32 230.95Z" id="a4ov9rRGQm"></path><path d="M464.76 204.7C463.92 206.93 460.24 208.06 457.46 208.06C454.74 208.06 452.93 206.98 452.01 204.81C451.09 202.65 450.64 197.72 450.64 190C450.64 185.36 450.64 148.22 450.64 143.58C450.64 135.58 451.04 130.59 451.85 128.6C452.65 126.63 454.41 125.63 457.13 125.63C459.91 125.63 463.64 126.76 464.6 129.03C465.55 131.3 466.03 136.15 466.03 143.58C466.03 146.58 466.03 161.58 466.03 188.59C465.74 197.84 465.32 203.21 464.76 204.7ZM406.68 231.21L447.76 231.21C449.47 224.5 450.41 220.77 450.6 220.02C454.32 224.52 458.41 227.9 462.9 230.14C467.37 232.39 474.06 233.51 479.24 233.51C486.45 233.51 492.67 231.62 497.92 227.83C503.16 224.05 506.5 219.57 507.92 214.42C509.34 209.26 510.05 201.42 510.05 190.88C510.05 185.95 510.05 146.53 510.05 141.6C510.05 131 509.81 124.08 509.34 120.83C508.87 117.58 507.47 114.27 505.14 110.88C502.81 107.49 499.42 104.86 494.98 102.98C490.54 101.1 485.3 100.16 479.26 100.16C474.01 100.16 467.29 101.21 462.81 103.28C458.34 105.35 454.28 108.49 450.64 112.7C450.64 108.89 450.64 89.85 450.64 55.56L406.68 55.56L406.68 231.21Z" id="fk968BpsX"></path></defs><g><g><g><use xlink:href="#d1pwhf9wy2" opacity="1" fill="#f6c700" fill-opacity="1"></use><g><use xlink:href="#d1pwhf9wy2" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#g5jjnq26yS" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#g5jjnq26yS" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#i3Prh1JpXt" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#i3Prh1JpXt" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#a4ov9rRGQm" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#a4ov9rRGQm" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#fk968BpsX" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#fk968BpsX" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g></g></g></svg>',
        tomatoLogo:
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 106.25 140" width="18" height="20"><path fill="#fa3106" d="M2.727 39.537c-.471-21.981 100.88-25.089 100.88-.42L92.91 117.56c-7.605 26.86-72.064 27.007-79.07.21z"/><g fill="#fff"><path d="M8.809 51.911l9.018 66.639c3.472 4.515 8.498 7.384 9.648 8.022l-6.921-68.576c-3.498-1.41-9.881-4.579-11.745-6.083zM28.629 59.776l5.453 68.898c4.926 2.652 11.04 3.391 15.73 3.566l-1.258-70.366c-3.414-.024-13.82-.642-19.925-2.098zM97.632 52.121l-9.019 66.643c-3.472 4.515-8.498 7.384-9.647 8.022l6.92-68.583c3.5-1.41 9.882-4.579 11.746-6.082zM77.812 59.986l-5.453 68.898c-4.926 2.652-11.04 3.391-15.73 3.566l1.258-70.366c3.414-.024 13.82-.642 19.925-2.098z"/></g><g fill="#ffd600"><circle cx="13.213" cy="31.252" r="6.816"/><circle cx="22.022" cy="27.687" r="6.607"/><circle cx="30.359" cy="19.769" r="5.925"/><circle cx="34.973" cy="15.155" r="6.03"/><circle cx="45.093" cy="17.095" r="4.929"/><circle cx="51.123" cy="9.597" r="6.24"/><circle cx="61.19" cy="9.387" r="6.554"/><circle cx="67.954" cy="13.635" r="4.929"/><circle cx="76.081" cy="17.672" r="5.925"/><circle cx="78.913" cy="22.706" r="4.352"/><circle cx="83.475" cy="26.324" r="5.243"/><circle cx="88.194" cy="34.398" r="5.768"/><path d="M87.355 35.447c5.79 2.799 1.352-2.213 10.696 2.097-9.574 15.338-74.774 16.892-90.291.525l-.21-3.985L38.59 16.99l22.863-6.606 15.52 9.962z"/></g></svg>',
        freshTomato:
            '<svg id="svg3390" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 138.75 141.25" width="18" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><metadata id="metadata3396"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><g id="layer1" fill="#f93208"><path id="path3412" d="m20.154 40.829c-28.149 27.622-13.657 61.011-5.734 71.931 35.254 41.954 92.792 25.339 111.89-5.9071 4.7608-8.2027 22.554-53.467-23.976-78.009z"/><path id="path3471" d="m39.613 39.265 4.7778-8.8607 28.406-5.0384 11.119 9.2082z"/></g><g id="layer2"><path id="path3437" d="m39.436 8.5696 8.9682-5.2826 6.7569 15.479c3.7925-6.3226 13.79-16.316 24.939-4.6684-4.7281 1.2636-7.5161 3.8553-7.7397 8.4768 15.145-4.1697 31.343 3.2127 33.539 9.0911-10.951-4.314-27.695 10.377-41.771 2.334 0.009 15.045-12.617 16.636-19.902 17.076 2.077-4.996 5.591-9.994 1.474-14.987-7.618 8.171-13.874 10.668-33.17 4.668 4.876-1.679 14.843-11.39 24.448-11.425-6.775-2.467-12.29-2.087-17.814-1.475 2.917-3.961 12.149-15.197 28.625-8.476z" fill="#02902e"/></g></svg>',
        rottenTomato:
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 145 140" width="20" height="18"><path fill="#0fc755" d="M47.4 35.342c-13.607-7.935-12.32-25.203 2.097-31.88 26.124-6.531 29.117 13.78 22.652 30.412-6.542 24.11 18.095 23.662 19.925 10.067 3.605-18.412 19.394-26.695 31.67-16.359 12.598 12.135 7.074 36.581-17.827 34.187-16.03-1.545-19.552 19.585.839 21.183 32.228 1.915 42.49 22.167 31.04 35.865-15.993 15.15-37.691-4.439-45.512-19.505-6.8-9.307-17.321.11-13.423 6.502 12.983 19.465 2.923 31.229-10.906 30.62-13.37-.85-20.96-9.06-13.214-29.15 3.897-12.481-8.595-15.386-16.57-5.45-11.707 19.61-28.865 13.68-33.976 4.19-3.243-7.621-2.921-25.846 24.119-23.696 16.688 4.137 11.776-12.561-.63-13.633-9.245-.443-30.501-7.304-22.86-24.54 7.34-11.056 24.958-11.768 33.348 6.293 3.037 4.232 8.361 11.042 18.037 5.033 3.51-5.197 1.21-13.9-8.809-20.135z"/></svg>',
    },
    shuffleInterval: 10000, // sync with kenBurnsZoomIn (10s)
    retryInterval: 500,
    minSwipeDistance: 50,
    loadingCheckInterval: 100,
    maxPlotLength: 700,
    maxMovies: 25,
    maxTvShows: 25,
    maxItems: 500,
    preloadCount: 3,
    fadeTransitionDuration: 500,
    hideLogo: false,
    showTitle: true,
    slideshowItems: 16,
    enableRandom: false,         // Derived from slideshowSource at runtime
    slideAnimationEnabled: true,
    slideshowSource: 'random',   // 'random' | 'recently_added' | 'prebuilt'
    slideshowPrebuiltIds: [],    // IDs for 'prebuilt' source mode
};

/**
 * Loads stored configuration from localStorage via ConfigPersistence.
 * Applies theme colors (CSS custom properties) and updates global CONFIG.
 * Replaces the old readCSSConfig() — configuration is now managed
 * exclusively through the Infinity config page in the dashboard.
 *
 * Chain: localStorage (user-saved) > defaults (shipped with theme).
 */
const loadStoredConfig = () => {
    if (typeof ConfigPersistence === 'undefined') {
        console.warn('[Infinity] ConfigPersistence not available — slideshow will use defaults.');
        return;
    }
    try {
        const config = ConfigPersistence.load();
        ConfigPersistence.apply(config);
    } catch (e) {
        console.warn('[Infinity] loadStoredConfig failed:', e.message, '— using defaults');
    }
};

const STATE = {
    jellyfinData: {
        userId: null,
        appName: null,
        appVersion: null,
        deviceName: null,
        deviceId: null,
        accessToken: null,
        serverAddress: null,
        serverId: null,
    },
    slideshow: {
        hasInitialized: false,
        isTransitioning: false,
        isPaused: false,
        currentSlideIndex: 0,
        focusedSlide: null,
        containerFocused: false,
        slideInterval: null,
        itemIds: [],
        loadedItems: {},
        createdSlides: {},
        totalItems: 0,
        isLoading: false,
    },
};

const DEBUG = window.DEBUG_INFINITY === true;
const debugLog = DEBUG ? console.log.bind(console) : () => {};

const requestQueue = [];
let isProcessingQueue = false;

/**
 * Process the next request in the queue with throttling
 */
const processNextRequest = () => {
    if (requestQueue.length === 0) {
        isProcessingQueue = false;
        return;
    }

    isProcessingQueue = true;
    const { url, callback } = requestQueue.shift();

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response;
            }
            throw new Error(`Failed to fetch: ${response.status}`);
        })
        .then(callback)
        .catch((error) => {
            console.error("Error in throttled request:", error);
        })
        .finally(() => {
            setTimeout(processNextRequest, 100);
        });
};

/**
 * Add a request to the throttled queue
 * @param {string} url - URL to fetch
 * @param {Function} callback - Callback to run on successful fetch
 */
const addThrottledRequest = (url, callback) => {
    requestQueue.push({ url, callback });
    if (!isProcessingQueue) {
        processNextRequest();
    }
};

/**
 * Checks if the user is currently logged in
 * @returns {boolean} True if logged in, false otherwise
 */
const isUserLoggedIn = () => {
    try {
        return (
            window.ApiClient &&
            window.ApiClient._currentUser &&
            window.ApiClient._currentUser.Id &&
            window.ApiClient._serverInfo &&
            window.ApiClient._serverInfo.AccessToken
        );
    } catch (error) {
        console.error("Error checking login status:", error);
        return false;
    }
};

/**
 * Initializes Jellyfin data from ApiClient
 * @param {Function} callback - Function to call once data is initialized
 */
const initJellyfinData = (callback) => {
    if (!window.ApiClient) {
        console.warn("⏳ window.ApiClient is not available yet. Retrying...");
        setTimeout(() => initJellyfinData(callback), CONFIG.retryInterval);
        return;
    }

    try {
        const apiClient = window.ApiClient;
        STATE.jellyfinData = {
            userId: apiClient.getCurrentUserId() || "Not Found",
            appName: apiClient._appName || "Not Found",
            appVersion: apiClient._appVersion || "Not Found",
            deviceName: apiClient._deviceName || "Not Found",
            deviceId: apiClient._deviceId || "Not Found",
            accessToken: apiClient._serverInfo.AccessToken || "Not Found",
            serverId: apiClient._serverInfo.Id || "Not Found",
            serverAddress: apiClient._serverAddress || "Not Found",
        };
        if (STATE.jellyfinData.userId === "Not Found" || STATE.jellyfinData.accessToken === "Not Found") {
             throw new Error("User ID or Access Token not found in ApiClient.");
        }
        console.log("✅ Jellyfin data initialized.");
        if (callback && typeof callback === "function") {
            callback();
        }
    } catch (error) {
        console.error("Error initializing Jellyfin data:", error);
        // Retry with backoff or limit retries if needed
        setTimeout(() => initJellyfinData(callback), CONFIG.retryInterval * 2);
    }
};

/**
 * Creates and displays loading screen
 */
const initLoadingScreen = () => {
    // Keep custom check for homepage based on hash
    const isHomePage = window.location.hash === '#/home.html' || window.location.hash === '#/home';

    if (!isHomePage) return;
    if (document.getElementById("page-loader")) return; // Prevent duplicate loaders

    const loadingDiv = document.createElement("div");
    loadingDiv.className = "bar-loading";
    loadingDiv.id = "page-loader";
    loadingDiv.innerHTML = `
      <div class="loader-content">
        <h1>
          <img src="/web/assets/img/banner-light.png" alt="Server Logo" style="opacity: 0;">
        </h1>
        <div class="progress-container">
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
                element.addEventListener("click", value);
            } else if (value !== null && value !== undefined) {
                element.setAttribute(key, value);
            }
        });
        if (content) {
            if (typeof content === "string") {
                element.textContent = content;
            } else if (content instanceof Node) {
                element.appendChild(content);
            }
        }
        return element;
    },
    getOrCreateSlidesContainer() {
        debugLog("[getOrCreateSlidesContainer] Function called.");
        const homeTab = document.getElementById('homeTab');
        if (!homeTab) {
             console.error("❌ [getOrCreateSlidesContainer] Critical: #homeTab not found.");
             let globalContainer = document.getElementById("slides-container");
             if (!globalContainer) {
                 globalContainer = this.createElement("div", { id: "slides-container" });
                 document.body.appendChild(globalContainer);
                 console.warn("⚠️ [getOrCreateSlidesContainer] Fallback: Appended to body.");
             }
             return globalContainer;
        }
        debugLog("[getOrCreateSlidesContainer] Found #homeTab:", homeTab);

        let container = homeTab.querySelector("#slides-container");

        if (!container) {
            debugLog("🛠️ [getOrCreateSlidesContainer] #slides-container not found within #homeTab. Creating...");
            container = this.createElement("div", { id: "slides-container" });
            const homeSections = homeTab.querySelector('.homeSectionsContainer');

            if (homeSections) {
                debugLog(`✅ [getOrCreateSlidesContainer] Found .homeSectionsContainer. Inserting #slides-container before it.`);
                try {
                    homeTab.insertBefore(container, homeSections);

                    const insertedElement = homeTab.querySelector('#slides-container');
                    if (insertedElement && insertedElement === container) {
                        debugLog(`✅ [getOrCreateSlidesContainer] CONFIRMED Inserted successfully. New parent:`, container.parentElement?.id);
                    } else {
                        console.error(`❌ [getOrCreateSlidesContainer] FAILED INSERTION CHECK! Element not found immediately after insertBefore.`);
                        homeTab.appendChild(container);
                        console.warn("⚠️ [getOrCreateSlidesContainer] insertBefore failed check, fell back to appendChild within #homeTab.");
                    }
                } catch (e) {
                     console.error("❌ [getOrCreateSlidesContainer] Error during insertBefore:", e);
                     homeTab.appendChild(container);
                     console.warn("⚠️ [getOrCreateSlidesContainer] insertBefore threw error, fell back to appendChild within #homeTab.");
                }
            } else {
                console.warn("⚠️ [getOrCreateSlidesContainer] .homeSectionsContainer NOT found within #homeTab. Appending #slides-container to end of #homeTab.");
                homeTab.appendChild(container);
                debugLog(`✅ [getOrCreateSlidesContainer] Appended successfully. New parent:`, container.parentElement?.id);
            }
        } else {
             debugLog("✅ [getOrCreateSlidesContainer] #slides-container already exists within #homeTab.");
        }
        debugLog("[getOrCreateSlidesContainer] Returning container:", container);
        return container;
    },
    parseGenres(genresArray) {
        if (Array.isArray(genresArray) && genresArray.length > 0) {
            // Use custom separator '▫️'
            return genresArray.slice(0, 3).join(" ▫️ ");
        }
        return "No Genre Available";
    },
    createLoadingIndicator() {
         return this.createElement("div", {
            className: "slide-loading-indicator",
            innerHTML: '<div class="mdl-spinner mdl-spinner--single-color is-active" style="margin: auto;"></div>',
            style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }
        });
    },
};

/**
 * API utilities for fetching data from Jellyfin server
 */
const ApiUtils = {
    async fetchItemDetails(itemId) {
        if (STATE.slideshow.loadedItems[itemId]) {
            return STATE.slideshow.loadedItems[itemId];
        }
        const url = `${STATE.jellyfinData.serverAddress}/Users/${STATE.jellyfinData.userId}/Items/${itemId}?fields=Overview,Genres,OfficialRating,CommunityRating,CriticRating,PremiereDate,RunTimeTicks,ChildCount,UserData,ProductionYear`;
        try {
            const response = await fetch(url, { headers: this.getAuthHeaders() });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const itemData = await response.json();
            STATE.slideshow.loadedItems[itemId] = itemData;
            return itemData;
        } catch (error) {
            console.error(`Error fetching details for item ${itemId}:`, error);
            return null;
        }
    },
    async fetchItemIdsFromList() {
        const listFileName = `${STATE.jellyfinData.serverAddress}/web/list.txt?userId=${STATE.jellyfinData.userId}&v=${Date.now()}`;
        debugLog(`Fetching list.txt: ${listFileName}`);
        try {
            const response = await fetch(listFileName, { cache: 'no-cache' });
            if (!response.ok) {
                 console.warn(`list.txt fetch failed (${response.status}).`);
                 return [];
            }
            const text = await response.text();
            // Keep custom logic potentially skipping first line if that was intended
            const ids = text.split("\n").map(id => id.trim()).filter(id => id);
            debugLog(`Fetched ${ids.length} IDs from list.txt.`);
            return ids;
        } catch (error) {
            console.error("Error fetching list.txt:", error);
            return [];
        }
    },
    async fetchItemIdsFromServer(limit = CONFIG.maxItems, sortBy = 'Random') {
        if (!STATE.jellyfinData.accessToken || STATE.jellyfinData.accessToken === "Not Found" || !STATE.jellyfinData.serverAddress || STATE.jellyfinData.serverAddress === "Not Found") {
            console.warn("Auth/Server info missing for item fetch.");
            return [];
        }
        const sortModes = {
            random: 'Random',
            recently_added: 'DateCreated',
            random_desc: 'Random'
        };
        const sortField = sortModes[sortBy] || 'Random';
        const sortOrder = sortBy === 'recently_added' ? 'Descending' : '';
        const sortParam = sortOrder ? `sortBy=${sortField}&SortOrder=${sortOrder}` : `sortBy=${sortField}`;

        debugLog(`Fetching up to ${limit} item IDs (sort: ${sortBy})...`);
        const url = `${STATE.jellyfinData.serverAddress}/Users/${STATE.jellyfinData.userId}/Items?IncludeItemTypes=Movie,Series&Recursive=true&HasLogo=true&HasBackdrop=true&${sortParam}&Limit=${limit}&Fields=Id`;
        try {
            const response = await fetch(url, { headers: this.getAuthHeaders() });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            const itemIds = (data.Items || []).map(item => item.Id);
            debugLog(`Fetched ${itemIds.length} IDs (${sortBy}).`);
            return itemIds;
        } catch (error) {
            console.error(`Error fetching IDs (${sortBy}):`, error);
            return [];
        }
    },
    getAuthHeaders() {
        const { appName, deviceName, deviceId, appVersion, accessToken } = STATE.jellyfinData;
        const authHeader = `MediaBrowser Client="${appName}", Device="${deviceName}", DeviceId="${deviceId}", Version="${appVersion}", Token="${accessToken}"`;
        return { 'Authorization': authHeader, 'Accept': 'application/json' };
    },
    async playItem(itemId) {
        try {
            const sessionId = await this.getSessionId();
            if (!sessionId) throw new Error("Could not get session ID.");
            const playUrl = `${STATE.jellyfinData.serverAddress}/Sessions/${sessionId}/Playing?playCommand=PlayNow&itemIds=${itemId}&userId=${STATE.jellyfinData.userId}`;
            const response = await fetch(playUrl, { method: "POST", headers: this.getAuthHeaders(), body: '{}' });
            if (!response.ok) throw new Error(`Play command failed: ${response.status} ${response.statusText}`);
            console.log(`Play command for ${itemId} sent.`);
            return true;
        } catch (error) {
            console.error("Error sending play command:", error);
            return false;
        }
    },
    async getSessionId() {
        if (!STATE.jellyfinData.deviceId || !STATE.jellyfinData.serverAddress) return null;
        const url = `${STATE.jellyfinData.serverAddress}/Sessions?deviceId=${encodeURIComponent(STATE.jellyfinData.deviceId)}`;
        try {
            const response = await fetch(url, { headers: this.getAuthHeaders() });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const sessions = await response.json();
            const activeSession = sessions.find(s => s.IsActive && s.DeviceId === STATE.jellyfinData.deviceId);
            if (activeSession) return activeSession.Id;
            if (sessions.length > 0) {
                 console.warn("No active session, using first available.");
                 return sessions[0].Id;
            }
            console.warn("No sessions found for device.");
            return null;
        } catch (error) {
            console.error("Error fetching session:", error);
            return null;
        }
    },
    async toggleFavorite(itemId, button) {
        if (!STATE.jellyfinData.userId || !itemId) return;
        const userId = STATE.jellyfinData.userId;
        const isCurrentlyFavorite = button.classList.contains("favorited");
        const url = `${STATE.jellyfinData.serverAddress}/Users/${userId}/FavoriteItems/${itemId}`;
        const method = isCurrentlyFavorite ? "DELETE" : "POST";
        try {
            const response = await fetch(url, { method, headers: { ...this.getAuthHeaders(), "Content-Type": "application/json" }, body: method === 'POST' ? '{}' : undefined });
            if (!response.ok) throw new Error(`Favorite toggle failed (${method}): ${response.status} ${response.statusText}`);
            button.classList.toggle("favorited", !isCurrentlyFavorite);
            console.log(`Item ${itemId} favorite status: ${!isCurrentlyFavorite}`);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    }
};

/**
 * Class for managing slide timing
 */
class SlideTimer {
    constructor(callback, interval) {
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
        requestAnimationFrame(() => {
            nextSlide.style.opacity = '1';
            if (CONFIG.slideAnimationEnabled) {
                 nextSlide.querySelector(".backdrop")?.classList.add("animate");
                 nextSlide.querySelector(".logo")?.classList.add("animate");
             }
        });
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
    async loadSlideshowData() {
        try {
            STATE.slideshow.isLoading = true;
            const neededCount = CONFIG.slideshowItems;
            let finalItemIds = [];

            debugLog(`Loading slideshow data. Source: ${CONFIG.slideshowSource}, Target: ${neededCount} items.`);

            switch (CONFIG.slideshowSource) {
                case 'prebuilt':
                    // Use IDs from config (set via Infinity config page)
                    if (CONFIG.slideshowPrebuiltIds && CONFIG.slideshowPrebuiltIds.length > 0) {
                        finalItemIds = [...CONFIG.slideshowPrebuiltIds];
                        debugLog(`Using ${finalItemIds.length} prebuilt IDs from config.`);
                    } else {
                        debugLog('Prebuilt source selected but no IDs configured. Falling back to random.');
                        finalItemIds = await ApiUtils.fetchItemIdsFromServer(neededCount, 'random');
                    }
                    break;

                case 'recently_added':
                    // Fetch most recently added items
                    debugLog('Fetching recently added items...');
                    finalItemIds = await ApiUtils.fetchItemIdsFromServer(neededCount, 'recently_added');
                    debugLog(`Got ${finalItemIds.length} recently added IDs.`);
                    break;

                case 'random':
                default:
                    // Fetch random items from the server
                    debugLog('Fetching random items...');
                    finalItemIds = await ApiUtils.fetchItemIdsFromServer(neededCount, 'random');
                    debugLog(`Got ${finalItemIds.length} random IDs.`);
                    break;
            }

            // Shuffle for variety (except recently_added which is chronological)
            if (CONFIG.slideshowSource !== 'recently_added') {
                finalItemIds = SlideUtils.shuffleArray(finalItemIds);
            }

            if (finalItemIds.length > neededCount) {
                debugLog(`Slicing final list from ${finalItemIds.length} to ${neededCount}.`);
                finalItemIds = finalItemIds.slice(0, neededCount);
            }

            debugLog(`Final item count: ${finalItemIds.length}.`);
            STATE.slideshow.itemIds = finalItemIds;
            STATE.slideshow.totalItems = finalItemIds.length;

            if (STATE.slideshow.totalItems > 0) {
                this.createPaginationDots();
                await this.updateCurrentSlide(0);
                if (!STATE.slideshow.slideInterval) {
                    STATE.slideshow.slideInterval = new SlideTimer(() => {
                        if (!STATE.slideshow.isPaused) this.nextSlide();
                    }, CONFIG.shuffleInterval).start();
                } else {
                    if (!STATE.slideshow.slideInterval.timerId && !STATE.slideshow.isPaused) {
                        STATE.slideshow.slideInterval.start();
                    }
                }
            } else {
                console.warn('No items for slideshow.');
                SlideUtils.getOrCreateSlidesContainer().style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading slideshow data:', error);
        } finally {
            STATE.slideshow.isLoading = false;
        }
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
    loadStoredConfig();
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
/**
 * Configuration persistence layer for the Infinity theme.
 *
 * Stores user preferences in localStorage under key 'infinity-config'.
 * Provides validation, sanitization, and live application of config values
 * to CSS custom properties and the global CONFIG object.
 *
 * Chain: localStorage (user-saved) > defaults (shipped with theme)
 */

const STORAGE_KEY = 'infinity-config';
const CONFIG_VERSION = 1;

const DEFAULTS = Object.freeze({
    version: CONFIG_VERSION,
    theme: {
        backgroundColor: '#0F0D14',
        textColor: '#eee',
        accentColor: '#9400D3',
        cardBg: '#15121A',
        headerBg: 'rgba(10, 8, 18, 0.7)',
        sidebarBg: '#0D0A14',
        buttonBg: '#27242E',
        warningColor: '#bb4a4a',
        selectionBorder: '#9400D3',
        inputBg: '#27242E'
    },
    font: {
        url: '',
        family: 'Kodchasan'
    },
    slideshow: {
        items: 16,
        interval: 10,
        fadeDuration: 500,
        kenBurnsDuration: 10,
        hideLogo: false,
        showTitle: true,
        animation: true,
        source: 'random',
        prebuiltIds: []
    }
});

/**
 * CSS custom property mapping for theme colors.
 * Each config key maps to one or more CSS variables set on :root.
 */
const CSS_VAR_MAP = {
    backgroundColor:    '--theme-background-color',
    textColor:          '--theme-text-color',
    accentColor:        '--theme-accent-color',
    cardBg:             '--card-bg',
    headerBg:           '--header-bg',
    sidebarBg:          '--sidebar-bg',
    buttonBg:           '--button-bg',
    warningColor:       '--theme-warning-color',
    selectionBorder:    '--selection-border-color',
    inputBg:            '--input-bg'
};

/**
 * Color regex patterns for validation.
 * Accepts: #RGB, #RRGGBB, #RRGGBBAA, rgb(r,g,b), rgba(r,g,b,a)
 */
const COLOR_PATTERNS = [
    /^#[0-9a-fA-F]{3}$/,
    /^#[0-9a-fA-F]{6}$/,
    /^#[0-9a-fA-F]{8}$/,
    /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/,
    /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/
];

/**
 * Validates a single color string.
 * @param {string} color - Color value to validate
 * @returns {boolean}
 */
const isValidColor = (color) => {
    if (typeof color !== 'string' || color.length === 0) return false;
    return COLOR_PATTERNS.some(pattern => pattern.test(color.trim()));
};

/**
 * Validates a font URL — must be http/https, no javascript: or data: protocols.
 * Empty string is valid (means "use default font").
 * @param {string} url
 * @returns {boolean}
 */
const isValidFontUrl = (url) => {
    if (typeof url !== 'string') return false;
    if (url.length === 0) return true;
    const trimmed = url.trim().toLowerCase();
    if (trimmed.startsWith('javascript:')) return false;
    if (trimmed.startsWith('data:')) return false;
    if (trimmed.startsWith('file:')) return false;
    // Allow http, https, and relative paths
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('/') && !trimmed.startsWith('./') && !trimmed.startsWith('../')) {
        // If it's not a URL, it might still be a valid relative path — allow it
        // but flag protocols we know are dangerous
    }
    return true;
};

/**
 * Sanitizes a color value to prevent CSS injection.
 * Strips anything that's not a valid color format.
 * @param {string} color
 * @returns {string} sanitized color or empty string
 */
const sanitizeColor = (color) => {
    if (typeof color !== 'string') return '';
    const trimmed = color.trim();
    if (isValidColor(trimmed)) return trimmed;
    // If it looks like a color but has extra stuff, try to extract
    const hexMatch = trimmed.match(/#[0-9a-fA-F]{3,8}/);
    if (hexMatch) return hexMatch[0];
    const rgbMatch = trimmed.match(/rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)/);
    if (rgbMatch) return rgbMatch[0];
    return '';
};

/**
 * Sanitizes a font family name for CSS injection safety.
 * Only allows alphanumeric, spaces, hyphens, underscores, and quotes.
 * @param {string} family
 * @returns {string}
 */
const sanitizeFontFamily = (family) => {
    if (typeof family !== 'string') return DEFAULTS.font.family;
    // Remove any characters that could break out of CSS context
    const safe = family.replace(/[^a-zA-Z0-9\s\-_'",]/g, '').trim();
    return safe.length > 0 ? safe : DEFAULTS.font.family;
};

/**
 * Sanitizes item IDs (Jellyfin UUIDs: alphanumeric + hyphens).
 * @param {string} id
 * @returns {string|null} sanitized ID or null if invalid
 */
const sanitizeItemId = (id) => {
    if (typeof id !== 'string') return null;
    const trimmed = id.trim();
    // Jellyfin IDs are alphanumeric with hyphens
    if (/^[a-zA-Z0-9\-]+$/.test(trimmed) && trimmed.length > 0) {
        return trimmed;
    }
    return null;
};

const ConfigPersistence = {
    /**
     * Returns a deep-frozen copy of the default configuration.
     * @returns {object}
     */
    getDefaults() {
        return JSON.parse(JSON.stringify(DEFAULTS));
    },

    /**
     * Loads configuration from localStorage with validation.
     * Merges stored config with defaults so missing keys always have values.
     * If stored data is corrupt, returns defaults.
     * @returns {object} valid config object
     */
    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return this.getDefaults();

            const stored = JSON.parse(raw);
            if (!stored || typeof stored !== 'object') return this.getDefaults();

            // Version mismatch → reset to defaults
            if (stored.version !== CONFIG_VERSION) return this.getDefaults();

            const config = this.getDefaults();

            // Merge theme colors — only accept valid colors
            if (stored.theme && typeof stored.theme === 'object') {
                for (const key of Object.keys(config.theme)) {
                    if (key in stored.theme) {
                        const sanitized = sanitizeColor(stored.theme[key]);
                        if (sanitized) {
                            config.theme[key] = sanitized;
                        }
                    }
                }
            }

            // Merge font
            if (stored.font && typeof stored.font === 'object') {
                if (typeof stored.font.url === 'string' && isValidFontUrl(stored.font.url)) {
                    config.font.url = stored.font.url.trim();
                }
                if (typeof stored.font.family === 'string') {
                    config.font.family = sanitizeFontFamily(stored.font.family);
                }
            }

            // Merge slideshow
            if (stored.slideshow && typeof stored.slideshow === 'object') {
                const s = stored.slideshow;
                if (typeof s.items === 'number' && s.items >= 1 && s.items <= 100) config.slideshow.items = Math.floor(s.items);
                if (typeof s.interval === 'number' && s.interval >= 1 && s.interval <= 300) config.slideshow.interval = s.interval;
                if (typeof s.fadeDuration === 'number' && s.fadeDuration >= 0 && s.fadeDuration <= 10000) config.slideshow.fadeDuration = Math.floor(s.fadeDuration);
                if (typeof s.kenBurnsDuration === 'number' && s.kenBurnsDuration >= 1 && s.kenBurnsDuration <= 60) config.slideshow.kenBurnsDuration = s.kenBurnsDuration;
                if (typeof s.hideLogo === 'boolean') config.slideshow.hideLogo = s.hideLogo;
                if (typeof s.showTitle === 'boolean') config.slideshow.showTitle = s.showTitle;
                if (typeof s.animation === 'boolean') config.slideshow.animation = s.animation;
                if (typeof s.source === 'string' && ['random', 'recently_added', 'prebuilt'].includes(s.source)) {
                    config.slideshow.source = s.source;
                }
                if (Array.isArray(s.prebuiltIds)) {
                    config.slideshow.prebuiltIds = s.prebuiltIds
                        .map(sanitizeItemId)
                        .filter(Boolean)
                        .slice(0, 100);
                }
            }

            return config;
        } catch (e) {
            console.warn('[Infinity] ConfigPersistence.load() failed:', e.message, '— using defaults');
            return this.getDefaults();
        }
    },

    /**
     * Saves configuration to localStorage.
     * Throws if localStorage is full or unavailable.
     * @param {object} config
     * @throws {Error} on QuotaExceededError or storage unavailable
     */
    save(config) {
        if (!config || typeof config !== 'object') {
            throw new Error('Invalid config object');
        }
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error('[Infinity] localStorage full — cannot save config');
            }
            throw e;
        }
    },

    /**
     * Resets configuration: clears localStorage, returns defaults.
     * @returns {object} default config
     */
    reset() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn('[Infinity] Could not clear localStorage:', e.message);
        }
        return this.getDefaults();
    },

    /**
     * Applies configuration in real-time.
     * - Sets CSS custom properties on documentElement for theme colors
     * - Injects @font-face for custom font if URL is set
     * - Updates global CONFIG for slideshow settings
     * - Does NOT persist to localStorage (call save() separately)
     * @param {object} config — validated config object
     */
    apply(config) {
        if (!config || !config.theme) return;

        const root = document.documentElement;

        // Apply theme colors as CSS custom properties
        for (const [configKey, cssVar] of Object.entries(CSS_VAR_MAP)) {
            const color = config.theme[configKey];
            if (color && isValidColor(color)) {
                root.style.setProperty(cssVar, color);
            }
        }

        // Apply font
        if (config.font) {
            root.style.setProperty('--font-family-base', config.font.family + ', sans-serif');

            // Inject/update @font-face for custom font URL
            this._applyFontUrl(config.font.url, config.font.family);
        }

        // Apply slideshow configs to global CONFIG
        if (config.slideshow && typeof CONFIG !== 'undefined') {
            CONFIG.slideshowItems = config.slideshow.items;
            CONFIG.shuffleInterval = config.slideshow.interval * 1000;
            CONFIG.fadeTransitionDuration = config.slideshow.fadeDuration;
            CONFIG.hideLogo = config.slideshow.hideLogo;
            CONFIG.showTitle = config.slideshow.showTitle;
            CONFIG.slideAnimationEnabled = config.slideshow.animation;
            // 'enableRandom' is now derived from 'source' in loadSlideshowData
            CONFIG.enableRandom = (config.slideshow.source === 'random');
            CONFIG.slideshowSource = config.slideshow.source;
            CONFIG.slideshowPrebuiltIds = config.slideshow.prebuiltIds || [];
        }
    },

    /**
     * Injects or updates @font-face for custom font URL.
     * @param {string} url
     * @param {string} family
     * @private
     */
    _applyFontUrl(url, family) {
        const styleId = 'infinity-custom-font';
        let styleEl = document.getElementById(styleId);

        if (!url) {
            // Remove custom font if URL is empty
            if (styleEl) styleEl.remove();
            return;
        }

        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
        }

        const safeFamily = sanitizeFontFamily(family);
        styleEl.textContent = `@font-face { font-family: "${safeFamily}"; src: url("${url}") format("woff"); font-display: swap; }`;
    },

    /**
     * Validates a config object and returns error messages.
     * Used by the config page UI to show validation errors before save.
     * @param {object} config
     * @returns {{ valid: boolean, errors: string[] }}
     */
    validate(config) {
        const errors = [];

        if (!config || typeof config !== 'object') {
            return { valid: false, errors: ['Configuração inválida.'] };
        }

        // Validate theme colors
        if (config.theme) {
            for (const [key, value] of Object.entries(config.theme)) {
                if (!isValidColor(value)) {
                    errors.push(`Cor inválida em "${key}": "${value}"`);
                }
            }
        }

        // Validate font URL
        if (config.font) {
            if (!isValidFontUrl(config.font.url)) {
                errors.push('URL da fonte inválida ou protocolo não permitido.');
            }
            const safeFam = sanitizeFontFamily(config.font.family);
            if (safeFam !== config.font.family) {
                errors.push('Nome da família tipográfica contém caracteres inválidos.');
            }
        }

        // Validate slideshow numeric ranges
        if (config.slideshow) {
            const s = config.slideshow;
            if (typeof s.items !== 'number' || s.items < 1 || s.items > 100) {
                errors.push('Quantidade de slides deve estar entre 1 e 100.');
            }
            if (typeof s.interval !== 'number' || s.interval < 1 || s.interval > 300) {
                errors.push('Intervalo deve estar entre 1 e 300 segundos.');
            }
            if (typeof s.fadeDuration !== 'number' || s.fadeDuration < 0 || s.fadeDuration > 10000) {
                errors.push('Duração do fade deve estar entre 0 e 10000 ms.');
            }
            if (typeof s.kenBurnsDuration !== 'number' || s.kenBurnsDuration < 1 || s.kenBurnsDuration > 60) {
                errors.push('Duração do Ken Burns deve estar entre 1 e 60 segundos.');
            }
            if (!['random', 'recently_added', 'prebuilt'].includes(s.source)) {
                errors.push('Origem do slideshow inválida.');
            }
        }

        return { valid: errors.length === 0, errors };
    }
};
/**
 * Dashboard configuration page for the Infinity theme.
 *
 * Injects a menu item "Infinity" into the Jellyfin dashboard sidebar
 * (under the "Servidor" section) and renders a full configuration
 * page with color pickers, font URL, and slideshow settings.
 *
 * Uses ConfigPersistence (module 08) for storage and live preview.
 */

const ConfigPage = {
    _menuInjected: false,
    _menuObserver: null,
    _pageVisible: false,
    _originalContent: null,
    _currentConfig: null,
    _injectedFontStyleId: 'infinity-custom-font',

    /**
     * Color fields definition for the config page.
     * Each entry maps a config key to a display label.
     */
    COLOR_FIELDS: [
        { key: 'backgroundColor',   label: 'Fundo da página',       cssVar: '--theme-background-color' },
        { key: 'textColor',         label: 'Cor do texto',          cssVar: '--theme-text-color' },
        { key: 'accentColor',       label: 'Cor de destaque',       cssVar: '--theme-accent-color' },
        { key: 'cardBg',            label: 'Fundo dos cards',       cssVar: '--card-bg' },
        { key: 'headerBg',          label: 'Fundo do header',       cssVar: '--header-bg' },
        { key: 'sidebarBg',         label: 'Fundo da sidebar',      cssVar: '--sidebar-bg' },
        { key: 'buttonBg',          label: 'Fundo dos botões',      cssVar: '--button-bg' },
        { key: 'warningColor',      label: 'Cor de aviso',          cssVar: '--theme-warning-color' },
        { key: 'selectionBorder',   label: 'Borda de seleção',      cssVar: '--selection-border-color' },
        { key: 'inputBg',           label: 'Fundo dos campos',      cssVar: '--input-bg' }
    ],

    /**
     * Initializes the config page system.
     * Starts observing the DOM for the dashboard sidebar.
     * Safe to call multiple times — idempotent.
     */
    init() {
        if (this._menuObserver) return; // Already observing

        console.log('[Infinity] ConfigPage.init() — starting dashboard observer. Hash:', window.location.hash);
        this._observeDashboard();
    },

    /**
     * Observes the DOM for the dashboard sidebar to appear.
     * Handles both MUI (10.10+) and legacy (10.8/10.9) selectors.
     * Re-injects menu on SPA navigation.
     */
    _observeDashboard() {
        // Try immediate injection first
        this._injectMenu();

        // Also listen for hash changes (SPA navigation)
        window.addEventListener('hashchange', () => {
            console.log('[Infinity] hashchange detected:', window.location.hash);
            setTimeout(() => this._injectMenu(), 200);
        });

        // Then observe for changes (SPA navigation recreates DOM)
        this._menuObserver = new MutationObserver(() => {
            this._injectMenu();
        });

        this._menuObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    },

    /**
     * Finds the dashboard sidebar and injects the "Infinity" menu item
     * under the "Servidor" section.
     * Idempotent — won't create duplicate menu items.
     */
    _injectMenu() {
        const hash = window.location.hash;

        // Only inject on dashboard routes
        if (!this._isDashboardRoute()) {
            if (!this._loggedNotDashboard) {
                console.log('[Infinity] _injectMenu: not a dashboard route. Hash:', hash);
                this._loggedNotDashboard = true;
                setTimeout(() => { this._loggedNotDashboard = false; }, 5000);
            }
            return;
        }

        this._loggedNotDashboard = false;

        // Check if menu item already exists
        if (document.getElementById('infinity-config-menu-item')) return;

        // Try multiple selector strategies for the sidebar list
        const drawer = this._findDrawerList();
        if (!drawer) {
            console.log('[Infinity] _injectMenu: drawer not found. Hash:', hash);
            return;
        }

        console.log('[Infinity] ConfigPage: drawer found, looking for insert point...');

        // Find the "Servidor"/"Server" section
        const serverHeader = this._findServerSection(drawer);
        let insertAfter = null;

        if (serverHeader) {
            insertAfter = this._findLastInSection(serverHeader);
            console.log('[Infinity] ConfigPage: "Servidor" section found, inserting after:', insertAfter?.textContent?.trim() || '(header)');
        } else {
            // Fallback: find known dashboard items and insert after them
            insertAfter = this._findFallbackInsertPoint(drawer);
            console.log('[Infinity] ConfigPage: "Servidor" not found, fallback insert after:', insertAfter?.textContent?.trim() || '(end of list)');
        }

        this._createMenuItem(drawer, insertAfter);
        console.log('[Infinity] ConfigPage: menu item "Infinity" injected.');
    },

    /**
     * Finds the sidebar list container in the dashboard.
     * Tries multiple selectors for different Jellyfin versions.
     * @returns {Element|null}
     */
    _findDrawerList() {
        // Jellyfin 10.10+ (MUI v5): Drawer with nav list
        const muiDrawer = document.querySelector('.MuiDrawer-root .MuiList-root');
        if (muiDrawer) return muiDrawer;

        // MUI drawer paper directly (some versions)
        const muiPaper = document.querySelector('.MuiDrawer-paper .MuiList-root');
        if (muiPaper) return muiPaper;

        // Legacy Jellyfin (10.8/10.9): mainDrawer class
        const legacy = document.querySelector('.mainDrawer');
        if (legacy) return legacy;

        // Last resort: any .MuiList-root inside the drawer area
        const anyMuiList = document.querySelector('.MuiDrawer-root .MuiList-root, .MuiDrawer-paper .MuiList-root');
        if (anyMuiList) return anyMuiList;

        return null;
    },

    /**
     * Checks if current route is a dashboard page.
     * @returns {boolean}
     */
    _isDashboardRoute() {
        const hash = window.location.hash;
        // Jellyfin 10.10+ uses #/dashboard, legacy uses #/dashboard.html
        return hash.includes('/dashboard') || hash.includes('dashboard.html') || hash.includes('configurationpage');
    },

    /**
     * Finds the "Servidor" section header in the sidebar.
     * Works with both MUI ListSubheader and legacy sectionTitle.
     * @param {Element} drawer
     * @returns {Element|null}
     */
    _findServerSection(drawer) {
        // Section headers can be "Servidor" (PT), "Server" (EN), etc.
        const serverNames = ['Servidor', 'Server'];

        // MUI: MuiListSubheader-root
        const muiHeaders = drawer.querySelectorAll('.MuiListSubheader-root');
        for (const header of muiHeaders) {
            const text = header.textContent.trim();
            if (serverNames.some(name => text === name)) return header;
        }

        // MUI v5+: list subheader variants
        const subHeaders = drawer.querySelectorAll('[class*="MuiListSubheader"]');
        for (const header of subHeaders) {
            const text = header.textContent.trim();
            if (serverNames.some(name => text === name || text.includes(name))) return header;
        }

        // Legacy: .sectionTitle
        const legacyHeaders = drawer.querySelectorAll('.sectionTitle');
        for (const header of legacyHeaders) {
            const text = header.textContent.trim();
            if (serverNames.some(name => text === name)) return header;
        }

        // Broader fallback: any leaf element containing the exact text
        const allElements = drawer.querySelectorAll('*');
        for (const el of allElements) {
            if (el.children.length === 0) {
                const text = el.textContent.trim();
                if (serverNames.some(name => text === name)) {
                    return el.parentElement || el;
                }
            }
        }

        return null;
    },

    /**
     * Fallback: finds an insert point when "Servidor" section isn't found.
     * Looks for known dashboard items like "Plugins", "Atividade", etc.
     * @param {Element} drawer
     * @returns {Element|null}
     */
    _findFallbackInsertPoint(drawer) {
        // Known items that appear in the server section (multi-language)
        const knownItems = ['Plugins', 'Plugin', 'Catálogo', 'Metadata', 'Atividade', 'Activity',
                            'Usuários', 'Users', 'Dispositivos', 'Devices', 'Bibliotecas', 'Libraries'];

        const allLinks = drawer.querySelectorAll('a, .MuiListItemButton-root, .MuiListItem-root, .navMenuOption');
        for (const link of allLinks) {
            const text = link.textContent.trim();
            if (knownItems.some(item => text.includes(item))) {
                return link;
            }
        }

        // If nothing found, return the last link item in the drawer
        const allItems = drawer.querySelectorAll('a, .MuiListItemButton-root, .MuiListItem-root, .navMenuOption');
        if (allItems.length > 0) {
            return allItems[allItems.length - 1];
        }

        return null;
    },

    /**
     * Finds the last list item in the "Servidor" section.
     * @param {Element} serverHeader
     * @returns {Element|null}
     */
    _findLastInSection(serverHeader) {
        let current = serverHeader.nextElementSibling;

        // Walk forward while elements are list items or dividers (not new sections)
        let lastItem = null;
        while (current) {
            // Stop at next section header
            if (current.classList.contains('MuiListSubheader-root') ||
                current.classList.contains('sectionTitle')) {
                break;
            }

            if (current.matches('.MuiListItemButton-root, .MuiListItem-root, .navMenuOption, a')) {
                lastItem = current;
            }
            current = current.nextElementSibling;
        }

        // If we found items, return the parent of the last one (for insertion)
        return lastItem || serverHeader;
    },

    /**
     * Creates and inserts the menu item.
     * @param {Element} drawer — the sidebar container
     * @param {Element|null} insertAfter — element to insert after (null = append to end)
     */
    _createMenuItem(drawer, insertAfter) {
        const menuItem = document.createElement('a');

        // Try to match MUI list item structure
        const isMui = drawer.classList.contains('MuiList-root');

        if (isMui) {
            // Match MUI list item appearance
            menuItem.className = 'MuiListItemButton-root MuiListItem-root navMenuOption';
            menuItem.setAttribute('role', 'button');
            menuItem.setAttribute('tabindex', '0');
            menuItem.innerHTML = `
                <div class="MuiListItemIcon-root" style="min-width:36px; color:#eee;">
                    <span class="material-icons" style="font-size:20px;">palette</span>
                </div>
                <div class="MuiListItemText-root">
                    <span class="MuiTypography-root" style="color:#eee; font-size:0.9rem;">Infinity</span>
                </div>
            `;
        } else {
            // Legacy Jellyfin style
            menuItem.className = 'navMenuOption';
            menuItem.innerHTML = `
                <span class="material-icons navMenuOptionIcon">palette</span>
                <span>Infinity</span>
            `;
        }

        menuItem.id = 'infinity-config-menu-item';
        menuItem.href = '#';
        menuItem.addEventListener('click', (e) => {
            e.preventDefault();
            this._showConfigPage();
        });

        if (insertAfter) {
            insertAfter.insertAdjacentElement('afterend', menuItem);
        } else {
            drawer.appendChild(menuItem);
        }
    },

    /**
     * Shows the configuration page, replacing dashboard content.
     * Saves original content reference to restore on navigation away.
     */
    _showConfigPage() {
        if (this._pageVisible) return;

        // Find dashboard content container
        const contentArea = document.querySelector('.dashboardContent') ||
                            document.getElementById('dashboardContent') ||
                            document.querySelector('.adminContent') ||
                            document.querySelector('.skinBody');

        if (!contentArea) {
            console.error('[ConfigPage] Cannot find dashboard content area.');
            return;
        }

        // Save reference to original content for restoration
        if (!this._originalContent) {
            this._originalContent = contentArea.innerHTML;
        }

        // Load current config
        this._currentConfig = ConfigPersistence.load();

        // Render the config page
        contentArea.innerHTML = this._renderPage();

        // Bind events
        this._bindColorPickers();
        this._bindSlideshowControls();
        this._bindSourceSelector();
        this._bindButtons();

        // Apply live preview
        ConfigPersistence.apply(this._currentConfig);

        this._pageVisible = true;
        debugLog('[ConfigPage] Configuration page rendered.');
    },

    /**
     * Hides the config page and restores original dashboard content.
     */
    _hideConfigPage() {
        if (!this._pageVisible) return;

        const contentArea = document.querySelector('.dashboardContent') ||
                            document.getElementById('dashboardContent') ||
                            document.querySelector('.adminContent') ||
                            document.querySelector('.skinBody');

        if (contentArea && this._originalContent !== null) {
            contentArea.innerHTML = this._originalContent;
        }

        this._pageVisible = false;
    },

    /**
     * Renders the full configuration page HTML.
     * @returns {string} HTML string
     */
    _renderPage() {
        const c = this._currentConfig;
        const t = c.theme;
        const f = c.font;
        const s = c.slideshow;

        // Color fields HTML
        const colorFields = this.COLOR_FIELDS.map(field => {
            const value = t[field.key] || '';
            return `
                <div class="infinity-color-field" style="margin-bottom:12px;">
                    <label style="display:block; color:#dbdbdb; margin-bottom:4px; font-size:0.85rem;">
                        ${field.label}
                    </label>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <input type="color"
                               value="${this._toHexForPicker(value)}"
                               data-config-key="${field.key}"
                               class="infinity-color-picker"
                               style="width:36px; height:36px; border:none; border-radius:0.5rem; cursor:pointer; background:none; padding:0;"
                               title="Seletor de cor">
                        <input type="text"
                               value="${this._escapeHtml(value)}"
                               data-config-key="${field.key}"
                               class="infinity-color-text"
                               placeholder="#000000 ou rgb(0,0,0)"
                               style="flex:1; background:#27242E; color:#eee; border:1px solid rgba(255,255,255,0.08); border-radius:0.5rem; padding:6px 8px; font-family:monospace; font-size:0.85rem;">
                    </div>
                </div>
            `;
        }).join('');

        const sourceOptions = [
            { value: 'random', label: 'Aleatório (Random)', desc: 'Escolhe filmes e séries aleatórios da biblioteca.' },
            { value: 'recently_added', label: 'Adicionados Recentemente', desc: 'Usa as mídias mais recentes da biblioteca.' },
            { value: 'prebuilt', label: 'Lista Manual', desc: 'Usa os IDs fornecidos abaixo (um por linha ou separados por vírgula).' }
        ];

        const sourceRadios = sourceOptions.map(opt => `
            <label style="display:flex; align-items:flex-start; margin-bottom:8px; cursor:pointer;">
                <input type="radio"
                       name="infinity-source"
                       value="${opt.value}"
                       ${s.source === opt.value ? 'checked' : ''}
                       style="margin-top:3px; accent-color:#9400D3;">
                <div style="margin-left:8px;">
                    <div style="color:#eee; font-weight:500;">${opt.label}</div>
                    <div style="color:rgba(255,255,255,0.5); font-size:0.8rem;">${opt.desc}</div>
                </div>
            </label>
        `).join('');

        const showPrebuilt = s.source === 'prebuilt';
        const prebuiltIdsStr = (s.prebuiltIds || []).join('\n');

        return `
            <div class="infinity-config-page" style="max-width:800px; margin:0 auto; padding:24px;">
                <h2 style="color:#eee; font-size:1.5rem; margin-bottom:4px; font-weight:700;">
                    ⚙️ Configuração do Tema Infinity
                </h2>
                <p style="color:rgba(255,255,255,0.5); margin-bottom:24px; font-size:0.85rem;">
                    Personalize as cores, fonte e slideshow do tema. As alterações são aplicadas em tempo real.
                    Clique em <strong>Salvar Configurações</strong> para persistir.
                </p>

                <!-- COLORS SECTION -->
                <div class="infinity-section" style="background:#15121A; border-radius:15px; padding:20px; margin-bottom:20px;">
                    <h3 style="color:#eee; font-size:1.1rem; margin-bottom:16px; font-weight:600;">
                        🎨 Cores do Tema
                    </h3>
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:4px 16px;">
                        ${colorFields}
                    </div>
                </div>

                <!-- FONT SECTION -->
                <div class="infinity-section" style="background:#15121A; border-radius:15px; padding:20px; margin-bottom:20px;">
                    <h3 style="color:#eee; font-size:1.1rem; margin-bottom:16px; font-weight:600;">
                        🔤 Fonte Customizada
                    </h3>
                    <div style="margin-bottom:12px;">
                        <label style="display:block; color:#dbdbdb; margin-bottom:4px; font-size:0.85rem;">
                            URL da fonte (.woff)
                        </label>
                        <input type="text"
                               id="infinity-font-url"
                               value="${this._escapeHtml(f.url)}"
                               placeholder="https://exemplo.com/fonte.woff"
                               style="width:100%; background:#27242E; color:#eee; border:1px solid rgba(255,255,255,0.08); border-radius:0.5rem; padding:8px 10px; font-size:0.85rem; box-sizing:border-box;">
                        <div style="color:rgba(255,255,255,0.4); font-size:0.75rem; margin-top:4px;">
                            Deixe em branco para usar a fonte padrão (Kodchasan). Aceita URLs http/https ou caminhos relativos.
                        </div>
                    </div>
                    <div>
                        <label style="display:block; color:#dbdbdb; margin-bottom:4px; font-size:0.85rem;">
                            Nome da família tipográfica
                        </label>
                        <input type="text"
                               id="infinity-font-family"
                               value="${this._escapeHtml(f.family)}"
                               placeholder="Nome da Fonte"
                               style="width:100%; background:#27242E; color:#eee; border:1px solid rgba(255,255,255,0.08); border-radius:0.5rem; padding:8px 10px; font-size:0.85rem; box-sizing:border-box;">
                    </div>
                </div>

                <!-- SLIDESHOW SECTION -->
                <div class="infinity-section" style="background:#15121A; border-radius:15px; padding:20px; margin-bottom:20px;">
                    <h3 style="color:#eee; font-size:1.1rem; margin-bottom:16px; font-weight:600;">
                        🖼️ Slideshow
                    </h3>

                    <!-- Numeric settings -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:12px 16px; margin-bottom:16px;">
                        ${this._renderNumberField('infinity-slideshow-items', 'Quantidade de slides', s.items, 1, 100)}
                        ${this._renderNumberField('infinity-slideshow-interval', 'Intervalo (segundos)', s.interval, 1, 300)}
                        ${this._renderNumberField('infinity-fade-duration', 'Duração do fade (ms)', s.fadeDuration, 0, 10000)}
                        ${this._renderNumberField('infinity-kenburns-duration', 'Duração Ken Burns (seg)', s.kenBurnsDuration, 1, 60)}
                    </div>

                    <!-- Toggles -->
                    <div style="display:flex; flex-wrap:wrap; gap:16px;">
                        ${this._renderToggle('infinity-hide-logo', 'Esconder logo', s.hideLogo)}
                        ${this._renderToggle('infinity-show-title', 'Mostrar título', s.showTitle)}
                        ${this._renderToggle('infinity-animation', 'Animação Ken Burns', s.animation)}
                    </div>

                    <!-- Source selector -->
                    <div style="margin-top:20px; padding-top:16px; border-top:1px solid rgba(255,255,255,0.08);">
                        <h4 style="color:#eee; font-size:0.95rem; margin-bottom:12px; font-weight:500;">
                            📋 Origem dos Slides
                        </h4>
                        <div id="infinity-source-options">
                            ${sourceRadios}
                        </div>
                        <div id="infinity-prebuilt-container" style="margin-top:12px; ${showPrebuilt ? '' : 'display:none;'}">
                            <label style="display:block; color:#dbdbdb; margin-bottom:4px; font-size:0.85rem;">
                                IDs das mídias (um por linha ou separados por vírgula)
                            </label>
                            <textarea id="infinity-prebuilt-ids"
                                      rows="5"
                                      style="width:100%; background:#27242E; color:#eee; border:1px solid rgba(255,255,255,0.08); border-radius:0.5rem; padding:8px 10px; font-family:monospace; font-size:0.85rem; box-sizing:border-box; resize:vertical;"
                                      placeholder="Ex:&#10;a1b2c3d4e5f6&#10;b2c3d4e5f6a1&#10;c3d4e5f6a1b2">${this._escapeHtml(prebuiltIdsStr)}</textarea>
                            <div style="color:rgba(255,255,255,0.4); font-size:0.75rem; margin-top:4px;">
                                Cada ID deve estar em uma linha separada. Os IDs inválidos serão ignorados automaticamente.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ACTION BUTTONS -->
                <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:8px;">
                    <button id="infinity-reset-btn"
                            style="background:#27242E; color:#eee; border:none; border-radius:4em; padding:10px 24px; cursor:pointer; font-family:inherit; font-size:0.9rem; transition:background-color 0.2s;"
                            onmouseover="this.style.backgroundColor='rgba(148,0,211,0.25)'"
                            onmouseout="this.style.backgroundColor='#27242E'">
                        🔄 Restaurar Padrões
                    </button>
                    <button id="infinity-save-btn"
                            style="background:#9400D3; color:#fff; border:none; border-radius:4em; padding:10px 24px; cursor:pointer; font-family:inherit; font-size:0.9rem; font-weight:600; transition:background-color 0.2s;"
                            onmouseover="this.style.backgroundColor='#AD33E0'"
                            onmouseout="this.style.backgroundColor='#9400D3'">
                        💾 Salvar Configurações
                    </button>
                </div>

                <div id="infinity-save-feedback" style="text-align:right; margin-top:8px; min-height:20px;"></div>
            </div>
        `;
    },

    /**
     * Renders a number input field with label.
     */
    _renderNumberField(id, label, value, min, max) {
        return `
            <div>
                <label style="display:block; color:#dbdbdb; margin-bottom:4px; font-size:0.85rem;" for="${id}">
                    ${label}
                </label>
                <input type="number"
                       id="${id}"
                       value="${value}"
                       min="${min}"
                       max="${max}"
                       style="width:100%; background:#27242E; color:#eee; border:1px solid rgba(255,255,255,0.08); border-radius:0.5rem; padding:6px 8px; font-size:0.85rem; box-sizing:border-box;">
            </div>
        `;
    },

    /**
     * Renders a toggle switch (checkbox styled).
     */
    _renderToggle(id, label, checked) {
        return `
            <label style="display:flex; align-items:center; cursor:pointer; color:#eee; font-size:0.85rem; gap:8px;">
                <input type="checkbox"
                       id="${id}"
                       ${checked ? 'checked' : ''}
                       style="accent-color:#9400D3; width:16px; height:16px;">
                ${label}
            </label>
        `;
    },

    /**
     * Converts a CSS color value to a hex string compatible with <input type="color">.
     * Handles: hex (#RGB, #RRGGBB, #RRGGBBAA), rgb(), rgba().
     * Falls back to #000000 for unsupported formats.
     */
    _toHexForPicker(color) {
        if (!color || typeof color !== 'string') return '#000000';

        const trimmed = color.trim();

        // Already hex (3, 6, or 8 chars)
        if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
            // Expand shorthand: #ABC → #AABBCC
            return '#' + trimmed[1] + trimmed[1] + trimmed[2] + trimmed[2] + trimmed[3] + trimmed[3];
        }
        if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
            return trimmed;
        }

        // rgba/rgb → hex approximation (lose alpha for picker)
        const rgbMatch = trimmed.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1], 10);
            const g = parseInt(rgbMatch[2], 10);
            const b = parseInt(rgbMatch[3], 10);
            return '#' + [r, g, b].map(c => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0')).join('');
        }

        return '#000000';
    },

    /**
     * Escapes HTML special characters.
     */
    _escapeHtml(str) {
        if (typeof str !== 'string') return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    /**
     * Binds color picker ↔ text input bidirectional sync + live preview.
     */
    _bindColorPickers() {
        const page = document.querySelector('.infinity-config-page');
        if (!page) return;

        const pickers = page.querySelectorAll('.infinity-color-picker');
        const textInputs = page.querySelectorAll('.infinity-color-text');

        // Color picker → text input + live preview
        pickers.forEach(picker => {
            picker.addEventListener('input', () => {
                const key = picker.dataset.configKey;
                const textInput = page.querySelector(`.infinity-color-text[data-config-key="${key}"]`);
                if (textInput) textInput.value = picker.value;
                this._updateColorConfig(key, picker.value);
            });
        });

        // Text input → color picker + live preview
        textInputs.forEach(textInput => {
            textInput.addEventListener('input', () => {
                const key = textInput.dataset.configKey;
                const picker = page.querySelector(`.infinity-color-picker[data-config-key="${key}"]`);
                const value = textInput.value.trim();

                // Try to update picker if value is valid hex
                const hexForPicker = this._toHexForPicker(value);
                if (picker && hexForPicker !== '#000000' || /^#[0-9a-fA-F]{6}$/.test(value)) {
                    picker.value = hexForPicker;
                }

                this._updateColorConfig(key, value);
            });
        });
    },

    /**
     * Updates a color in the current config and applies live preview.
     */
    _updateColorConfig(key, value) {
        if (!this._currentConfig || !this._currentConfig.theme) return;

        // Store raw value in config (validation happens on save)
        this._currentConfig.theme[key] = value;

        // Apply live to CSS custom property
        const field = this.COLOR_FIELDS.find(f => f.key === key);
        if (field && value) {
            document.documentElement.style.setProperty(field.cssVar, value);
        }
    },

    /**
     * Binds slideshow numeric inputs and toggles to live preview.
     */
    _bindSlideshowControls() {
        const page = document.querySelector('.infinity-config-page');
        if (!page) return;

        // Numeric inputs
        const numericBindings = [
            { id: 'infinity-slideshow-items', key: 'items' },
            { id: 'infinity-slideshow-interval', key: 'interval' },
            { id: 'infinity-fade-duration', key: 'fadeDuration' },
            { id: 'infinity-kenburns-duration', key: 'kenBurnsDuration' }
        ];

        numericBindings.forEach(({ id, key }) => {
            const input = page.querySelector('#' + id);
            if (input) {
                input.addEventListener('input', () => {
                    const val = parseFloat(input.value);
                    if (!isNaN(val) && this._currentConfig && this._currentConfig.slideshow) {
                        this._currentConfig.slideshow[key] = val;
                        this._applySlideshowLive();
                    }
                });
            }
        });

        // Toggles
        const toggleBindings = [
            { id: 'infinity-hide-logo', key: 'hideLogo' },
            { id: 'infinity-show-title', key: 'showTitle' },
            { id: 'infinity-animation', key: 'animation' }
        ];

        toggleBindings.forEach(({ id, key }) => {
            const checkbox = page.querySelector('#' + id);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    if (this._currentConfig && this._currentConfig.slideshow) {
                        this._currentConfig.slideshow[key] = checkbox.checked;
                        this._applySlideshowLive();
                    }
                });
            }
        });
    },

    /**
     * Applies slideshow settings live to CONFIG.
     */
    _applySlideshowLive() {
        if (!this._currentConfig || !this._currentConfig.slideshow) return;

        const s = this._currentConfig.slideshow;
        if (typeof CONFIG !== 'undefined') {
            CONFIG.slideshowItems = s.items;
            CONFIG.shuffleInterval = s.interval * 1000;
            CONFIG.fadeTransitionDuration = s.fadeDuration;
            CONFIG.hideLogo = s.hideLogo;
            CONFIG.showTitle = s.showTitle;
            CONFIG.slideAnimationEnabled = s.animation;
            CONFIG.enableRandom = (s.source === 'random');
        }
    },

    /**
     * Binds source selector radio buttons and prebuilt textarea.
     */
    _bindSourceSelector() {
        const page = document.querySelector('.infinity-config-page');
        if (!page) return;

        const radios = page.querySelectorAll('input[name="infinity-source"]');
        const prebuiltContainer = page.querySelector('#infinity-prebuilt-container');
        const prebuiltTextarea = page.querySelector('#infinity-prebuilt-ids');

        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (this._currentConfig && this._currentConfig.slideshow) {
                    this._currentConfig.slideshow.source = radio.value;
                    this._applySlideshowLive();
                }

                // Show/hide prebuilt textarea
                if (prebuiltContainer) {
                    prebuiltContainer.style.display = radio.value === 'prebuilt' ? '' : 'none';
                }
            });
        });

        // Prebuilt IDs textarea
        if (prebuiltTextarea) {
            prebuiltTextarea.addEventListener('input', () => {
                if (!this._currentConfig || !this._currentConfig.slideshow) return;

                const raw = prebuiltTextarea.value;
                // Parse IDs: split by newline or comma, trim, filter empty
                const ids = raw
                    .split(/[\n,]+/)
                    .map(id => id.trim())
                    .filter(Boolean);

                this._currentConfig.slideshow.prebuiltIds = ids;
            });
        }
    },

    /**
     * Binds Save and Reset buttons.
     */
    _bindButtons() {
        const page = document.querySelector('.infinity-config-page');
        if (!page) return;

        const saveBtn = page.querySelector('#infinity-save-btn');
        const resetBtn = page.querySelector('#infinity-reset-btn');
        const feedback = page.querySelector('#infinity-save-feedback');

        // Save button
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                // Sync all current values from form to config
                this._syncFormToConfig();

                // Validate
                const validation = ConfigPersistence.validate(this._currentConfig);
                if (!validation.valid) {
                    this._showFeedback(feedback, 'error', validation.errors.join('<br>'));
                    return;
                }

                // Save
                try {
                    ConfigPersistence.save(this._currentConfig);
                    ConfigPersistence.apply(this._currentConfig);
                    this._showFeedback(feedback, 'success', '✅ Configurações salvas com sucesso!');
                } catch (e) {
                    this._showFeedback(feedback, 'error', '❌ Erro ao salvar: ' + this._escapeHtml(e.message));
                }
            });
        }

        // Reset button
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                // eslint-disable-next-line no-restricted-globals
                if (!confirm('Tem certeza? Todas as configurações voltarão aos padrões do tema Infinity.')) {
                    return;
                }

                this._currentConfig = ConfigPersistence.reset();
                ConfigPersistence.apply(this._currentConfig);

                // Re-render the page with defaults
                this._pageVisible = false;
                this._showConfigPage();

                this._showFeedback(feedback, 'success', '🔄 Configurações restauradas aos padrões.');
            });
        }
    },

    /**
     * Syncs form values back to the config object before save.
     */
    _syncFormToConfig() {
        const page = document.querySelector('.infinity-config-page');
        if (!page || !this._currentConfig) return;

        // Colors
        const textInputs = page.querySelectorAll('.infinity-color-text');
        textInputs.forEach(input => {
            const key = input.dataset.configKey;
            if (key && this._currentConfig.theme) {
                this._currentConfig.theme[key] = input.value.trim();
            }
        });

        // Font
        const fontUrl = page.querySelector('#infinity-font-url');
        const fontFamily = page.querySelector('#infinity-font-family');
        if (fontUrl && this._currentConfig.font) this._currentConfig.font.url = fontUrl.value.trim();
        if (fontFamily && this._currentConfig.font) this._currentConfig.font.family = fontFamily.value.trim();

        // Slideshow numeric
        if (this._currentConfig.slideshow) {
            const s = this._currentConfig.slideshow;
            const itemsEl = page.querySelector('#infinity-slideshow-items');
            const intervalEl = page.querySelector('#infinity-slideshow-interval');
            const fadeEl = page.querySelector('#infinity-fade-duration');
            const kenBurnsEl = page.querySelector('#infinity-kenburns-duration');

            if (itemsEl) s.items = parseInt(itemsEl.value, 10) || 16;
            if (intervalEl) s.interval = parseFloat(intervalEl.value) || 10;
            if (fadeEl) s.fadeDuration = parseInt(fadeEl.value, 10) || 500;
            if (kenBurnsEl) s.kenBurnsDuration = parseFloat(kenBurnsEl.value) || 10;

            // Toggles
            s.hideLogo = page.querySelector('#infinity-hide-logo')?.checked ?? false;
            s.showTitle = page.querySelector('#infinity-show-title')?.checked ?? true;
            s.animation = page.querySelector('#infinity-animation')?.checked ?? true;

            // Source
            const selectedRadio = page.querySelector('input[name="infinity-source"]:checked');
            if (selectedRadio) s.source = selectedRadio.value;

            // Prebuilt IDs
            if (s.source === 'prebuilt') {
                const textarea = page.querySelector('#infinity-prebuilt-ids');
                if (textarea) {
                    s.prebuiltIds = textarea.value
                        .split(/[\n,]+/)
                        .map(id => id.trim())
                        .filter(Boolean);
                }
            }
        }
    },

    /**
     * Shows feedback message after save/reset.
     */
    _showFeedback(element, type, message) {
        if (!element) return;

        const color = type === 'success' ? '#4caf50' : '#bb4a4a';
        element.innerHTML = `<span style="color:${color}; font-size:0.85rem;">${message}</span>`;

        // Auto-hide after 4 seconds
        setTimeout(() => {
            if (element) element.innerHTML = '';
        }, 4000);
    }
};

// Auto-initialize when this module loads in the dashboard context
// Only if ConfigPersistence is available (module 08 loaded first)
if (typeof ConfigPersistence !== 'undefined') {
    ConfigPage.init();
} else {
    console.warn('[Infinity] ConfigPersistence not available — ConfigPage will init later.');
    // Retry mechanism for build order edge cases
    const retryInterval = setInterval(() => {
        if (typeof ConfigPersistence !== 'undefined') {
            clearInterval(retryInterval);
            ConfigPage.init();
        }
    }, 100);
    // Safety: stop retrying after 10s
    setTimeout(() => clearInterval(retryInterval), 10000);
}
