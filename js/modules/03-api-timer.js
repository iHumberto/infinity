// infinity/modules/03-api-timer.js — SlideUtils (cont), ApiUtils, SlideTimer
// This file is part of the Infinity theme. Built via: npm run build

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
    async fetchItemIdsFromServer(limit = CONFIG.maxItems) {
        if (!STATE.jellyfinData.accessToken || STATE.jellyfinData.accessToken === "Not Found" || !STATE.jellyfinData.serverAddress || STATE.jellyfinData.serverAddress === "Not Found") {
            console.warn("Auth/Server info missing for random item fetch.");
            return [];
        }
        debugLog(`Fetching up to ${limit} random item IDs...`);
        const url = `${STATE.jellyfinData.serverAddress}/Users/${STATE.jellyfinData.userId}/Items?IncludeItemTypes=Movie,Series&Recursive=true&HasLogo=true&HasBackdrop=true&sortBy=Random&Limit=${limit}&Fields=Id`;
        try {
            const response = await fetch(url, { headers: this.getAuthHeaders() });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            const itemIds = (data.Items || []).map(item => item.Id);
            debugLog(`Fetched ${itemIds.length} random IDs.`);
            return itemIds;
        } catch (error) {
            console.error("Error fetching random IDs:", error);
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
