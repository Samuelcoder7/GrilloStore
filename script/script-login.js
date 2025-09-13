document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.querySelector('.btn-dark-mode');
    const darkModeIcon = darkModeToggle.querySelector('i');
    
    // --- Funcionalidade do Modo Escuro ---
    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        darkModeIcon.classList.remove('bxs-moon');
        darkModeIcon.classList.add('bxs-sun');
        localStorage.setItem('darkMode', 'enabled');
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        darkModeIcon.classList.remove('bxs-sun');
        darkModeIcon.classList.add('bxs-moon');
        localStorage.setItem('darkMode', 'disabled');
    };

    // Verifica a preferência salva ao carregar a página
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // --- Validação em Tempo Real ---
    const loginForm = document.querySelector('.auth-card');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const showError = (input, message) => {
        const inputBox = input.parentElement;
        inputBox.classList.add('error');
        const small = inputBox.querySelector('small');
        small.textContent = message;
    };

    const showSuccess = (input) => {
        const inputBox = input.parentElement;
        inputBox.classList.remove('error');
        const small = inputBox.querySelector('small');
        small.textContent = '';
    };

    const validateEmail = (input) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (re.test(input.value.trim())) {
            showSuccess(input);
            return true;
        } else {
            showError(input, 'Email inválido');
            return false;
        }
    };

    const validatePassword = (input) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (re.test(input.value.trim())) {
            showSuccess(input);
            return true;
        } else {
            showError(input, 'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e um caractere especial');
            return false;
        }
    };

    // Eventos para validação em tempo real
    emailInput.addEventListener('input', () => validateEmail(emailInput));
    passwordInput.addEventListener('input', () => validatePassword(passwordInput));

    // Validação final ao enviar o formulário
    loginForm.addEventListener('submit', (e) => {
        let isFormValid = true;
        isFormValid = validateEmail(emailInput) && isFormValid;
        isFormValid = validatePassword(passwordInput) && isFormValid;

        if (!isFormValid) {
            e.preventDefault();
        } else {
            alert('Login simulado com sucesso! (Sem backend)');
        }
    });
});