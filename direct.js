document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');
    const formLogin = document.getElementById('formLogin');
    const registroContainer = document.getElementById('registro');
    const loginContainer = document.getElementById('login');
    const btnIniciarSesion = document.getElementById('btnIniciarSesion');

    // Notificación
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    const closeNotification = document.getElementById('closeNotification');

    // Mostrar notificación
    function showNotification(message) {
        notificationMessage.textContent = message;
        notification.style.display = 'block';
    }

    // Cerrar notificación
    closeNotification.addEventListener('click', () => {
        notification.style.display = 'none';
    });

    // Evento para manejar el registro
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Verificar si el usuario ya existe en localStorage
        if (localStorage.getItem(username)) {
            alert('Este usuario ya está registrado. Por favor, inicia sesión.');
        } else if (username && password.length >= 6) {
            // Guardar el usuario, contraseña y rol en localStorage
            localStorage.setItem(username, JSON.stringify({ password, role }));
            alert(`Usuario registrado correctamente como ${role}.`);
            // Mostrar formulario de inicio de sesión
            registroContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        } else {
            alert('La contraseña debe tener al menos 6 caracteres.');
        }
    });

    // Evento para manejar el inicio de sesión
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginUser = document.getElementById('loginUser').value;
        const loginPassword = document.getElementById('loginPassword').value;

        // Recuperar el usuario almacenado en localStorage
        const storedUser = JSON.parse(localStorage.getItem(loginUser));

        // Verificar si el usuario existe y si la contraseña es correcta
        if (storedUser && storedUser.password === loginPassword) {
            alert(`Inicio de sesión exitoso como ${storedUser.role}.`);
            // Mostrar una notificación importante
            showNotification('¡Has iniciado sesión correctamente! Tienes 3 mensajes nuevos.');
            
            // Redirigir según el rol
            if (storedUser.role === 'administrador') {
                window.location.href = 'admin.html'; // Página de administrador
            } else {
                window.location.href = 'index.html'; // Página principal para usuarios
            }
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });

    // Evento para redirigir al formulario de inicio de sesión
    btnIniciarSesion.addEventListener('click', () => {
        registroContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Simulando un evento de mensaje nuevo o actualización de estado
    // Esto puede reemplazarse por cualquier otro evento de tu aplicación
    setTimeout(() => {
        // Simulando que un mensaje nuevo o actualización de estado ha llegado
        showNotification('Tienes un mensaje nuevo de tu equipo.');
    }, 5000);  // Esto muestra la notificación después de 5 segundos
});
