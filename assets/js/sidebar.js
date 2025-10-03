// Lógica del sidebar (menú lateral)

export function initSidebar() {
    (function () {
        if (document.querySelector('.sidebar')) return;

        const mainContainer = document.querySelector('.container');
        if (!mainContainer) {
            const fallback = document.createElement('nav');
            fallback.className = 'bg-light sidebar p-3';
            fallback.innerHTML = `
                <ul class="nav flex-column">
                    <li class="nav-item"><a class="nav-link" href="feed.html">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link" href="search.html">Buscar</a></li>
                    <li class="nav-item"><a class="nav-link" href="profile.html">Perfil</a></li>
                    <li class="nav-item"><a class="nav-link" href="chats.html">Chats</a></li>
                    <li class="nav-item"><a class="nav-link text-danger" href="../index.html#logout">Cerrar sesión</a></li>
                </ul>`;
            document.body.insertBefore(fallback, document.body.firstChild);
            return;
        }

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
            </div>`;

        const wrapper = document.createElement('div');
        wrapper.className = 'container-fluid';
        const row = document.createElement('div');
        row.className = 'row';
        const mainCol = document.createElement('main');
        mainCol.className = 'col-md-9 ms-sm-auto col-lg-10 px-md-4';

        const originalParent = mainContainer.parentNode;
        if (originalParent) {
            originalParent.insertBefore(wrapper, mainContainer);
        } else {
            document.body.insertBefore(wrapper, document.body.firstChild);
        }

        row.appendChild(sidebar);
        row.appendChild(mainCol);
        wrapper.appendChild(row);
        mainCol.appendChild(mainContainer);

        try {
            const file = location.pathname.split('/').pop() || 'feed.html';
            const links = sidebar.querySelectorAll('a.nav-link');
            links.forEach(a => {
                const href = a.getAttribute('href');
                if (href && href.includes(file)) a.classList.add('active');
            });
        } catch (e) {}
    })();
}
