// Manejo principal del DOM

// --- Inyección de sidebar para páginas abiertas directamente (implementación integrada) ---
(function () {
    // Si ya existe una sidebar (por ejemplo en index.html), no hacer nada
    if (document.querySelector('.sidebar')) return;

    // Encontrar el contenedor principal existente (usualmente .container)
    const mainContainer = document.querySelector('.container');
    if (!mainContainer) {
        // fallback: insertar una sidebar simple al inicio del body
        const fallback = document.createElement('nav');
        fallback.className = 'bg-light sidebar p-3';
        fallback.innerHTML = '<ul class="nav flex-column"><li class="nav-item"><a class="nav-link" href="feed.html">Inicio</a></li><li class="nav-item"><a class="nav-link" href="search.html">Buscar</a></li><li class="nav-item"><a class="nav-link" href="profile.html">Perfil</a></li><li class="nav-item"><a class="nav-link" href="chats.html">Chats</a></li><li class="nav-item"><a class="nav-link text-danger" href="../index.html#logout">Cerrar sesión</a></li></ul>';
        document.body.insertBefore(fallback, document.body.firstChild);
        return;
    }

    // Construir el nav lateral
    const sidebar = document.createElement('nav');
    sidebar.className = 'col-md-3 col-lg-2 d-none d-md-block bg-light sidebar';
    sidebar.innerHTML = `
        <div class="position-sticky pt-3">
            <ul class="nav flex-column">
                <li class="nav-item"><a class="nav-link" href="feed.html">Inicio</a></li>
                <li class="nav-item"><a class="nav-link" href="search.html">Buscar</a></li>
                <li class="nav-item"><a class="nav-link" href="profile.html">Perfil</a></li>
                <li class="nav-item"><a class="nav-link" href="chats.html">Chats</a></li>
                <li class="nav-item"><a class="nav-link text-danger" href="../index.html#logout">Cerrar sesión</a></li>
            </ul>
        </div>
    `;

    // Crear wrapper container-fluid > row para contener sidebar + main
    const wrapper = document.createElement('div');
    wrapper.className = 'container-fluid';
    const row = document.createElement('div');
    row.className = 'row';

    // Crear una columna para el main y mover el contenedor dentro de forma segura
    const mainCol = document.createElement('main');
    mainCol.className = 'col-md-9 ms-sm-auto col-lg-10 px-md-4';

    const originalParent = mainContainer.parentNode;
    // Insertar wrapper antes del contenedor original
    if (originalParent) {
        originalParent.insertBefore(wrapper, mainContainer);
    } else {
        document.body.insertBefore(wrapper, document.body.firstChild);
    }

    // Construir la estructura y mover el contenedor dentro de mainCol (esto lo reubica)
    row.appendChild(sidebar);
    row.appendChild(mainCol);
    wrapper.appendChild(row);
    mainCol.appendChild(mainContainer);

    // Marcar el link activo según la ruta actual
    try {
        const file = location.pathname.split('/').pop() || 'feed.html';
        const links = sidebar.querySelectorAll('a.nav-link');
        links.forEach(a => {
            const href = a.getAttribute('href');
            if (href && href.includes(file)) a.classList.add('active');
        });
    } catch (e) {
        // no crítico
    }
})();

// --- fin inyección sidebar ---

const authContainer = document.getElementById("auth-container");
const appContainer = document.getElementById("app-container");
const loginForm = document.getElementById("login-form");
const mainContent = document.getElementById("main-content");

// Seguridad: si algún elemento falta, evitamos errores
if (!loginForm) {
    // Si no hay formulario de login en la página actual (p. ej. páginas abiertas directamente), no hacemos nada aquí.
} else {
    // Revisar si ya está logueado
    if (localStorage.getItem("isLoggedIn") === "true") {
        showApp();
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem("isLoggedIn", "true");
        showApp();
    });
}

function showApp() {
    if (authContainer) authContainer.style.display = "none";
    if (appContainer) appContainer.style.display = "flex";
    // Cargar la página por hash dentro del main (si existe)
    if (mainContent) navigateTo(window.location.hash || "#feed");
}

// Router: escucha cambios de hash
window.addEventListener("hashchange", () => {
    navigateTo(window.location.hash);
});

async function navigateTo(route) {
    if (!mainContent) return; // si no hay main, no cargamos (páginas independientes usan sidebar.js)

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

