// Manejo principal del DOM
// Inicializacion y router

import { initSidebar } from "./sidebar.js";
import { initAuth } from "./auth.js";

const mainContent = document.getElementById("main-content");
const appContainer = document.getElementById("app-container");
const authContainer = document.getElementById("auth-container");

export function navigateTo(route) {
    if (!mainContent) return;

    let page = "";
    switch (route) {
        case "#feed":
            page = "feed.html";
            break;
        case "#search":
            page = "search.html";
            break;
        case "#profile":
            page = "profile.html";
            break;
        case "#chats":
            page = "chats.html";
            break;
        case "#logout":
            localStorage.removeItem("isLoggedIn");
            if (appContainer) appContainer.style.display = "none";
            if (authContainer) authContainer.style.display = "block";
            window.location.hash = "";
            return;
        default:
            mainContent.innerHTML = "<h2>Página no encontrada</h2>";
            return;
    }

    fetch(`pages/${page}`)
        .then(res => res.text())
        .then(html => {
            mainContent.innerHTML = html;
        })
        .catch(() => {
            mainContent.innerHTML = "<h2>Error al cargar la página</h2>";
        });
}

window.addEventListener("hashchange", () => {
    navigateTo(window.location.hash);
});

// Inicialización
initSidebar();
initAuth(navigateTo);

