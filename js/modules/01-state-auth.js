// infinity/modules/01-state-auth.js — State, config, debug, request queue, auth (isUserLoggedIn, initJellyfinData)
// This file is part of the Infinity theme. Built via: npm run build

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
    slideshowSource: 'recently_added',   // 'random' | 'recently_added' | 'prebuilt'
    slideshowPrebuiltIds: [],    // IDs for 'prebuilt' source mode
};

/**
 * Loads stored configuration from localStorage.
 * If localStorage has saved data → apply it (takes priority).
 * If localStorage is empty → do nothing, let Branding CSS handle it.
 *
 * Chain: localStorage (admin browser override) > Branding CSS (server-side) > defaults.
 */
const loadStoredConfig = () => {
    if (typeof ConfigPersistence === 'undefined') {
        console.warn('[Infinity] ConfigPersistence not available — slideshow will use defaults.');
        return;
    }
    try {
        const hasLocalStorage = localStorage.getItem('infinity-config');
        if (hasLocalStorage) {
            const config = ConfigPersistence.load();
            ConfigPersistence.apply(config); // Only apply if user explicitly saved
        }
        // If no localStorage, Branding CSS custom properties handle the theme.
        // But slideshow CONFIG still needs to be read from CSS variables.
        if (!hasLocalStorage) {
            const style = getComputedStyle(document.documentElement);
            const items = parseInt(style.getPropertyValue('--infinity-slideshow-items').trim());
            const interval = parseFloat(style.getPropertyValue('--infinity-slide-interval'));
            const fade = parseInt(style.getPropertyValue('--infinity-fade-duration').trim());
            CONFIG.slideshowItems = items || CONFIG.slideshowItems;
            CONFIG.shuffleInterval = (interval * 1000) || CONFIG.shuffleInterval;
            CONFIG.fadeTransitionDuration = fade || CONFIG.fadeTransitionDuration;
        }
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
