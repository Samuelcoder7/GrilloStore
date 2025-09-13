document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO DO NOVO CARROSSEL ---
    const newCarouselTrack = document.querySelector('.new-carousel-track');
    const newSlides = document.querySelectorAll('.new-carousel-slide');
    const newPrevBtn = document.querySelector('.new-prev-btn');
    const newNextBtn = document.querySelector('.new-next-btn');
    const newCarouselDotsContainer = document.querySelector('.new-carousel-dots');

    let newCurrentSlideIndex = 0;
    const newSlideWidth = newSlides[0].clientWidth; // Largura de um slide
    let newAutoPlayInterval;

    // Criar os pontos indicadores
    function createNewDots() {
        newSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('new-carousel-dot');
            if (index === newCurrentSlideIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                stopNewAutoPlay();
                newCurrentSlideIndex = index;
                updateNewCarousel();
                startNewAutoPlay();
            });
            newCarouselDotsContainer.appendChild(dot);
        });
    }

    // Atualizar a posição do carrossel
    function updateNewCarousel() {
        const offset = -newCurrentSlideIndex * 100;
        newCarouselTrack.style.transform = `translateX(${offset}%)`;
        updateNewDots();
    }

    // Atualizar os pontos ativos
    function updateNewDots() {
        const dots = document.querySelectorAll('.new-carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === newCurrentSlideIndex);
        });
    }

    // Avançar para o próximo slide
    function nextNewSlide() {
        newCurrentSlideIndex++;
        if (newCurrentSlideIndex >= newSlides.length) {
            newCurrentSlideIndex = 0;
        }
        updateNewCarousel();
    }

    // Voltar para o slide anterior
    function prevNewSlide() {
        newCurrentSlideIndex--;
        if (newCurrentSlideIndex < 0) {
            newCurrentSlideIndex = newSlides.length - 1;
        }
        updateNewCarousel();
    }

    // Iniciar auto-play
    function startNewAutoPlay() {
        newAutoPlayInterval = setInterval(nextNewSlide, 5000); // Muda a cada 5 segundos
    }

    // Parar auto-play
    function stopNewAutoPlay() {
        clearInterval(newAutoPlayInterval);
    }

    // Event Listeners para os botões do carrossel
    newNextBtn.addEventListener('click', () => {
        stopNewAutoPlay();
        nextNewSlide();
        startNewAutoPlay();
    });

    newPrevBtn.addEventListener('click', () => {
        stopNewAutoPlay();
        prevNewSlide();
        startNewAutoPlay();
    });

    // Inicialização do carrossel
    if (newSlides.length > 0) {
        createNewDots();
        updateNewCarousel();
        startNewAutoPlay();
    }
    // --- FIM DO CÓDIGO DO NOVO CARROSSEL ---


    // --- CÓDIGO DA PÁGINA PRINCIPAL ---
    
    // --- Elementos da Interface ---
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close-btn');

    const loginBtn = document.querySelector('.btn-secondary');
    const signupBtn = document.querySelector('.btn-primary');
    const accountLink = document.querySelector('.nav-links li:nth-child(1) a');
    const cartLink = document.querySelector('.cart-link a');
    
    const searchForm = document.querySelector('.search-bar'); // Mudado para o form
    const searchInput = document.querySelector('.search-bar input');

    const categoryItems = document.querySelectorAll('.category-item');
    const loginForm = document.querySelector('#login-modal form');

    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart'); // Botões de adicionar ao carrinho
    const darkModeButton = document.querySelector('.btn-dark-mode'); // Botão de modo escuro
    // const body = document.body; // Referência ao body para aplicar o modo escuro (removido para evitar redeclaração)

    // --- Funções Auxiliares ---
    const showModal = (e) => {
        e.preventDefault(); // Evita que o link tente navegar
        loginModal.classList.add('show');
    };
    const hideModal = () => loginModal.classList.remove('show');

    // --- Lógica de Eventos ---

    // Abertura e fechamento do modal de login/cadastro
    loginBtn.addEventListener('click', showModal);
    signupBtn.addEventListener('click', showModal);
    closeBtn.addEventListener('click', hideModal);
    
    // Fechar o modal clicando fora da janela de conteúdo
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            hideModal();
        }
    });

    // Lida com o envio do formulário de login (sem banco de dados)
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;
        
        console.log('Dados do formulário prontos para serem enviados ao backend.');
        
        // Simulação de chamada de API
        try {
            // Em um ambiente real, você faria uma requisição fetch ou axios aqui
            // Ex: const response = await fetch('/api/login', { ... });
            // Por enquanto, vamos simular uma resposta
            const simulatedResponse = {
                ok: true,
                json: async () => ({ message: 'Login simulado com sucesso!' })
            };

            if (simulatedResponse.ok) {
                const data = await simulatedResponse.json();
                console.log('Resposta simulada:', data.message);
                alert('Login bem-sucedido! Bem-vindo(a)!');
                hideModal();
            } else {
                const errorData = await simulatedResponse.json();
                console.error('Erro de login simulado:', errorData.message);
                alert(`Erro de login: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Falha na simulação de comunicação:', error);
            alert('Falha ao tentar simular login. Tente novamente.');
        }
    });

    // Lida com a funcionalidade da barra de pesquisa
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (!query) return;

        console.log(`Buscando por: "${query}"`);

        try {
            // Simulação de chamada de API
            const simulatedResponse = {
                ok: true,
                json: async () => ([
                    { id: 1, name: 'Produto Encontrado 1' },
                    { id: 2, name: 'Produto Encontrado 2' }
                ])
            };
            
            if (simulatedResponse.ok) {
                const results = await simulatedResponse.json();
                console.log('Resultados da busca simulados:', results);
                alert(`Resultados para "${query}" obtidos (simulado).`);
            } else {
                 alert('Erro ao buscar produtos (simulado). Tente novamente.');
            }
        } catch (error) {
            console.error('Falha na busca simulada:', error);
            alert('Erro ao buscar produtos. Tente novamente.');
        }
    });
    
    // Lida com o clique nas categorias
    categoryItems.forEach(item => {
        item.addEventListener('click', async () => {
            const categoryName = item.querySelector('p').innerText;

            console.log(`Carregando produtos da categoria: ${categoryName}`);

            try {
                // Simulação de chamada de API
                const simulatedResponse = {
                    ok: true,
                    json: async () => ([
                        { id: 101, name: `Produto de ${categoryName} 1` },
                        { id: 102, name: `Produto de ${categoryName} 2` }
                    ])
                };

                if (simulatedResponse.ok) {
                    const products = await simulatedResponse.json();
                    console.log('Produtos da categoria simulados:', products);
                    alert(`Produtos da categoria "${categoryName}" obtidos (simulado).`);
                } else {
                    alert('Erro ao carregar produtos desta categoria (simulado).');
                }
            } catch (error) {
                console.error('Falha ao carregar categoria simulada:', error);
                alert('Erro ao carregar produtos desta categoria.');
            }
        });
    });

    // Funcionalidade dos botões "Adicionar ao Carrinho"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').innerText;
            console.log(`Produto "${productTitle}" adicionado ao carrinho.`);
            alert(`"${productTitle}" foi adicionado ao seu carrinho!`);
            // Aqui você enviaria uma requisição para o backend para adicionar o produto ao carrinho do usuário
        });
    });

    // Funcionalidade do botão "Modo Escuro"
    darkModeButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode'); // Adiciona ou remove a classe 'dark-mode' no <body>
        const isDarkMode = body.classList.contains('dark-mode');
        darkModeButton.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i> Modo Claro' : '<i class="fas fa-moon"></i> Modo Escuro';
        document.querySelector('.dark-mode-section h2').innerText = isDarkMode ? 'Dark Mode Ativado' : 'Dark Mode Desativado';
        console.log(`Modo Escuro: ${isDarkMode ? 'Ativado' : 'Desativado'}`);
        // Você pode salvar a preferência do usuário em localStorage aqui, para que persista
    });


    // Redirecionamentos simples para links de navegação
    accountLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Redirecionando para a página de Minha Conta.');
        // window.location.href = '/minha-conta.html';
    });

    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Redirecionando para o Carrinho de Compras.');
        // window.location.href = '/carrinho.html';
    });

    // --- MODO ESCURO ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';

    function enableDarkMode() {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = sunIcon;
        localStorage.setItem('darkMode', 'enabled');
        const darkModeSection = document.querySelector('.dark-mode-section h2');
        if (darkModeSection) darkModeSection.innerText = 'Dark Mode Ativado';
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = moonIcon;
        localStorage.setItem('darkMode', 'disabled');
        const darkModeSection = document.querySelector('.dark-mode-section h2');
        if (darkModeSection) darkModeSection.innerText = 'Dark Mode Desativado';
    }

    // Estado inicial
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // Alternância
    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Seleciona o formulário de login do modal
    // const loginForm = document.querySelector('#login-modal form'); // Removido para evitar redeclaração
    const emailInput = loginForm.querySelector('#email');
    const passwordInput = loginForm.querySelector('#password');

    // Funções de exibição de erro/sucesso
    function showError(input, message) {
        let small = input.parentElement.querySelector('small');
        if (!small) {
            small = document.createElement('small');
            input.parentElement.appendChild(small);
        }
        small.textContent = message;
        input.classList.add('error');
    }

    function showSuccess(input) {
        let small = input.parentElement.querySelector('small');
        if (small) small.textContent = '';
        input.classList.remove('error');
    }

    // Validação de e-mail
    function validateEmail(input) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (re.test(input.value.trim())) {
            showSuccess(input);
            return true;
        } else {
            showError(input, 'Email inválido');
            return false;
        }
    }

    // Validação de senha
    function validatePassword(input) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (re.test(input.value.trim())) {
            showSuccess(input);
            return true;
        } else {
            showError(input, 'A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas, números e um caractere especial');
            return false;
        }
    }

    // Validação em tempo real
    emailInput.addEventListener('input', () => validateEmail(emailInput));
    passwordInput.addEventListener('input', () => validatePassword(passwordInput));

    // Validação ao enviar
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

// --- Modo Escuro --- 

// Seleciona o botão de alternância do modo escuro
const darkModeToggle = document.getElementById('darkModeToggle');
// Seleciona o elemento body para aplicar a classe de modo escuro
const body = document.body;
// Seleciona os ícones de lua e sol para alternar
const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';

// Função para aplicar o modo escuro
function enableDarkMode() {
    body.classList.add('dark-mode'); // Adiciona a classe 'dark-mode' ao body
    darkModeToggle.innerHTML = sunIcon; // Muda o ícone para o sol
    localStorage.setItem('darkMode', 'enabled'); // Salva a preferência no localStorage
}

// Função para desativar o modo escuro
function disableDarkMode() {
    body.classList.remove('dark-mode'); // Remove a classe 'dark-mode' do body
    darkModeToggle.innerHTML = moonIcon; // Muda o ícone para a lua
    localStorage.setItem('darkMode', 'disabled'); // Salva a preferência no localStorage
}

// Verifica se o modo escuro estava habilitado ao carregar a página
if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
} else {
    // Se não estiver habilitado, garante que o ícone inicial seja a lua
    darkModeToggle.innerHTML = moonIcon;
}

// Adiciona um "event listener" ao botão de alternância
darkModeToggle.addEventListener('click', () => {
    // Verifica se o body já tem a classe 'dark-mode'
    if (body.classList.contains('dark-mode')) {
        disableDarkMode(); // Se sim, desativa o modo escuro
    } else {
        enableDarkMode(); // Se não, ativa o modo escuro
    }
});