// Manejo principal del DOM


//
const authContainer = document.getElementById("auth-container");
const appContainer = document.getElementById("app-container");
const loginForm = document.getElementById("login-form");
const mainContent = document.getElementById("main-content");

// Revisar si ya está logueado
if (localStorage.getItem("isLoggedIn") === "true") {
    showApp();
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    showApp();
});

function showApp() {
    authContainer.style.display = "none";
    appContainer.style.display = "flex";
    navigateTo(window.location.hash || "#feed");
}

// Router: escucha cambios de hash
window.addEventListener("hashchange", () => {
    navigateTo(window.location.hash);
});

async function navigateTo(route) {
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
            appContainer.style.display = "none";
            authContainer.style.display = "block";
            window.location.hash = "";
        return; // detenemos aquí para no cargar nada
        default:
            mainContent.innerHTML = "<h2>Página no encontrada</h2>";
        return;
    }

    try {
        const res = await fetch(`/pages/${page}`);
        const html = await res.text();
        mainContent.innerHTML = html;
    } catch (error) {
        mainContent.innerHTML = "<h2>Error al cargar la página</h2>";
    }
}

