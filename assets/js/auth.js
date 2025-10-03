// Maneja el login y registro

export function initAuth(navigateTo) {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const authContainer = document.getElementById("auth-container");
    const appContainer = document.getElementById("app-container");
    const loginAlertBox = document.getElementById('loginAlert');
    const registerAlertBox = document.getElementById('registerAlert');

    function showAlert(container, message, type = 'danger') {
        if (!container) {
            // fallback to window alert
            window.alert(message);
            return;
        }
        container.innerHTML = `<div class="alert alert-${type} alert-sm" role="alert">${message}</div>`;
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = loginForm.querySelector("[name='username']").value.trim();
            const password = loginForm.querySelector("[name='password']").value.trim();

            if (!username || !password) {
                showAlert(loginAlertBox, "Por favor llena todos los campos", 'warning');
                return;
            }

            // De momento damos acceso directo
            if (authContainer) authContainer.style.display = "none";
            if (appContainer) appContainer.style.display = "flex";
            if (typeof navigateTo === 'function') navigateTo("#feed");
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = registerForm.querySelector("[name='username']").value.trim();
            const email = registerForm.querySelector("[name='email']").value.trim();
            const password = registerForm.querySelector("[name='password']").value.trim();
            const password2 = registerForm.querySelector("[name='password2']").value.trim();

            if (!username || !email || !password || !password2) {
                showAlert(registerAlertBox, "Por favor llena todos los campos", 'warning');
                return;
            }
            if (password !== password2) {
                showAlert(registerAlertBox, "Las contraseñas no coinciden", 'danger');
                return;
            }

            // Acceso directo
            if (authContainer) authContainer.style.display = "none";
            if (appContainer) appContainer.style.display = "flex";
            if (registerAlertBox) registerAlertBox.innerHTML = '';
            if (typeof navigateTo === 'function') navigateTo("#feed");
        });
    }

    // Si existe el modal de registro, enfocar el primer input cuando se muestre
    try {
        const registerModalEl = document.getElementById('registerModal');
        if (registerModalEl) {
            registerModalEl.addEventListener('shown.bs.modal', function () {
                const first = registerModalEl.querySelector('input[name="name"]');
                if (first) first.focus();
            });
        }
    } catch (e) {}
}
