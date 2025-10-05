// Manejo principal del DOM
// Inicializacion y router

import { initSidebar } from "./sidebar.js";
import { initAuth } from "./auth.js";
import { initTheme } from "./theme.js";

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
            localStorage.removeItem("theme"); // Opcional: limpiar tema al cerrar sesión
            if (appContainer) appContainer.style.display = "none";
            if (authContainer) authContainer.style.display = "block";
            window.location.hash = "";
            return;
        default:
            mainContent.innerHTML = "<h2>Página no encontrada</h2>";
            return;
    }

    // Añadir animación de carga
    mainContent.classList.remove('fade-in');
    
    fetch(`pages/${page}`)
        .then(res => res.text())
        .then(html => {
            mainContent.innerHTML = html;
            // Aplicar animación de entrada
            setTimeout(() => {
                mainContent.classList.add('fade-in');
            }, 10);
        })
        .catch(() => {
            mainContent.innerHTML = "<h2>Error al cargar la página</h2>";
            mainContent.classList.add('fade-in');
        });
}

window.addEventListener("hashchange", () => {
    navigateTo(window.location.hash);
});

// Inicialización
initSidebar();
initAuth(navigateTo);
initTheme(); // <-- Esta es la nueva línea añadida