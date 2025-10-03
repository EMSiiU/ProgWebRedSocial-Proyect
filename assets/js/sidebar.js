// sidebar.js
// Inyecta una barra lateral (sidebar) en páginas que se abren directamente
(function () {
    // No inyectar si ya existe una sidebar (por ejemplo en index.html)
    if (document.querySelector('.sidebar')) return;

    // Construir el nav lateral
    const sidebar = document.createElement('nav');
    sidebar.className = 'col-md-3 col-lg-2 d-none d-md-block bg-light sidebar';
    sidebar.innerHTML = `
        <div class="position-sticky pt-3">
        <ul class="nav flex-column">
            <li class="nav-item"><a class="nav-link" href="feed.html">ConnectCat</a></li>
            <li class="nav-item"><a class="nav-link" href="search.html">Buscar</a></li>
            <li class="nav-item"><a class="nav-link" href="profile.html">Perfil</a></li>
            <li class="nav-item"><a class="nav-link" href="chats.html">Chats</a></li>
            <li class="nav-item"><a class="nav-link text-danger" href="../index.html#logout">Cerrar sesión</a></li>
        </ul>
        </div>
    `;

    // Encontrar el contenedor principal existente (usualmente .container)
    const mainContainer = document.querySelector('.container');
    if (!mainContainer) {
        // fallback: pegar sidebar al body
        document.body.insertBefore(sidebar, document.body.firstChild);
        return;
    }

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
