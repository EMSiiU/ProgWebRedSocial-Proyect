// Maneja el login y registro utilizando jQuery para validación simple

export function initAuth(navigateTo) {
    // Usamos selectors de jQuery cuando sea posible
    const $loginForm = $("#login-form");
    const $registerForm = $("#register-form");
    const $authContainer = $("#auth-container");
    const $appContainer = $("#app-container");
    const $loginAlertBox = $("#loginAlert");
    const $registerAlertBox = $("#registerAlert");

    function showAlert($container, message, type = 'danger') {
        if (!$container || $container.length === 0) {
            window.alert(message);
            return;
        }
        $container.html(`<div class="alert alert-${type} alert-sm" role="alert">${message}</div>`);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Login
    if ($loginForm.length) {
        $loginForm.on('submit', function (e) {
            e.preventDefault();
            const username = $.trim($loginForm.find("[name='username']").val() || '');
            const password = $.trim($loginForm.find("[name='password']").val() || '');

            $loginAlertBox.empty();
            $loginForm.find('.is-invalid').removeClass('is-invalid');

            if (!username) {
                $loginForm.find("[name='username']").addClass('is-invalid');
                showAlert($loginAlertBox, 'El usuario es obligatorio', 'warning');
                return;
            }
            if (!password) {
                $loginForm.find("[name='password']").addClass('is-invalid');
                showAlert($loginAlertBox, 'La contraseña es obligatoria', 'warning');
                return;
            }

            if (password.length < 8) {
                $loginForm.find("[name='password']").addClass('is-invalid');
                showAlert($loginAlertBox, 'La contraseña debe tener al menos 8 caracteres', 'warning');
                return;
            }

            // Simulamos login: guardamos un flag en localStorage
            localStorage.setItem('isLoggedIn', '1');

            $authContainer.hide();
            $appContainer.css('display', 'flex');
            if (typeof navigateTo === 'function') navigateTo('#feed');
        });
    }

    // Register
    if ($registerForm.length) {
        $registerForm.on('submit', function (e) {
            e.preventDefault();
            const username = $.trim($registerForm.find("[name='username']").val() || '');
            const email = $.trim($registerForm.find("[name='email']").val() || '');
            const password = $.trim($registerForm.find("[name='password']").val() || '');
            const password2 = $.trim($registerForm.find("[name='password2']").val() || '');

            $registerAlertBox.empty();
            $registerForm.find('.is-invalid').removeClass('is-invalid');

            if (!username) {
                $registerForm.find("[name='username']").addClass('is-invalid');
                showAlert($registerAlertBox, 'El usuario es obligatorio', 'warning');
                return;
            }
            if (!email || !validateEmail(email)) {
                $registerForm.find("[name='email']").addClass('is-invalid');
                showAlert($registerAlertBox, 'Introduce un correo válido', 'warning');
                return;
            }
            if (!password || password.length < 8) {
                $registerForm.find("[name='password']").addClass('is-invalid');
                showAlert($registerAlertBox, 'La contraseña debe tener al menos 8 caracteres', 'warning');
                return;
            }
            if (password !== password2) {
                $registerForm.find("[name='password2']").addClass('is-invalid');
                showAlert($registerAlertBox, 'Las contraseñas no coinciden', 'danger');
                return;
            }

            // Simulamos registro: guardamos isLoggedIn y limpiamos alertas
            localStorage.setItem('isLoggedIn', '1');
            $registerAlertBox.empty();
            $authContainer.hide();
            $appContainer.css('display', 'flex');
            if (typeof navigateTo === 'function') navigateTo('#feed');
        });
    }

    // Manejo del modal de registro para enfocar el primer input
    try {
        const registerModalEl = document.getElementById('registerModal');
        if (registerModalEl) {
            registerModalEl.addEventListener('shown.bs.modal', function () {
                const first = registerModalEl.querySelector('input[name="name"]');
                if (first) first.focus();
            });
        }
    } catch (e) {}

    // Si el usuario ya estaba logueado, mostrar la app
    try {
        if (localStorage.getItem('isLoggedIn')) {
            $authContainer.hide();
            $appContainer.css('display', 'flex');
        }
    } catch (e) {}
}
