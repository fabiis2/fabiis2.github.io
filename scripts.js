document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');
    const formLogin = document.getElementById('formLogin');
    const registroContainer = document.getElementById('registro');
    const loginContainer = document.getElementById('login');

    // Evento para manejar el registro
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Validación de que el nombre de usuario y la contraseña sean válidos
        if (username && password.length >= 6) {
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
        if (storedUser && storedUser.password === loginPassword) {
            alert(`Inicio de sesión exitoso como ${storedUser.role}.`);
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
});
