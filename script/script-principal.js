// Espera o DOM (Document Object Model) ser completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO DO NOVO CARROSSEL ---
    // Seleciona os elementos do carrossel
    const newCarouselTrack = document.querySelector('.new-carousel-track');
    const newSlides = document.querySelectorAll('.new-carousel-slide');
    const newPrevBtn = document.querySelector('.new-prev-btn');
    const newNextBtn = document.querySelector('.new-next-btn');
    const newCarouselDotsContainer = document.querySelector('.new-carousel-dots');

    let newCurrentSlideIndex = 0; // Índice do slide atual
    // let newSlideWidth = newSlides[0].clientWidth; // Largura de um slide (não usado diretamente no JS atual)
    let newAutoPlayInterval; // Variável para armazenar o intervalo do auto-play

    // Função para criar os pontos indicadores (bolinhas) do carrossel
    function createNewDots() {
        newSlides.forEach((_, index) => {
            const dot = document.createElement('span'); // Cria um elemento <span> para cada dot
            dot.classList.add('new-carousel-dot'); // Adiciona a classe CSS para estilização
            // Define o dot ativo se for o slide atual
            if (index === newCurrentSlideIndex) {
                dot.classList.add('active');
            }
            // Adiciona um listener de clique para cada dot
            dot.addEventListener('click', () => {
                stopNewAutoPlay(); // Para o auto-play ao clicar em um dot
                newCurrentSlideIndex = index; // Atualiza o slide atual
                updateNewCarousel(); // Atualiza a exibição do carrossel
                startNewAutoPlay(); // Reinicia o auto-play
            });
            newCarouselDotsContainer.appendChild(dot); // Adiciona o dot ao container
        });
    }

    // Função para atualizar a posição visual do carrossel e os dots ativos
    function updateNewCarousel() {
        // Calcula o deslocamento em porcentagem para mover os slides
        const offset = -newCurrentSlideIndex * 100;
        newCarouselTrack.style.transform = `translateX(${offset}%)`; // Aplica a transformação
        updateNewDots(); // Atualiza quais dots estão ativos
    }

    // Função para atualizar a classe 'active' nos dots indicadores
    function updateNewDots() {
        const dots = document.querySelectorAll('.new-carousel-dot'); // Seleciona todos os dots
        dots.forEach((dot, index) => {
            // Adiciona ou remove a classe 'active' dependendo se o índice do dot corresponde ao slide atual
            dot.classList.toggle('active', index === newCurrentSlideIndex);
        });
    }

    // Função para avançar para o próximo slide
    function nextNewSlide() {
        newCurrentSlideIndex++; // Incrementa o índice
        // Volta para o primeiro slide se chegar ao final
        if (newCurrentSlideIndex >= newSlides.length) {
            newCurrentSlideIndex = 0;
        }
        updateNewCarousel(); // Atualiza a exibição
    }

    // Função para voltar para o slide anterior
    function prevNewSlide() {
        newCurrentSlideIndex--; // Decrementa o índice
        // Volta para o último slide se estiver no primeiro
        if (newCurrentSlideIndex < 0) {
            newCurrentSlideIndex = newSlides.length - 1;
        }
        updateNewCarousel(); // Atualiza a exibição
    }

    // Função para iniciar o auto-play do carrossel
    function startNewAutoPlay() {
        // Define um intervalo para chamar nextNewSlide a cada 5000 milissegundos (5 segundos)
        newAutoPlayInterval = setInterval(nextNewSlide, 5000);
    }

    // Função para parar o auto-play
    function stopNewAutoPlay() {
        clearInterval(newAutoPlayInterval); // Limpa o intervalo
    }

    // Adiciona listeners de evento para os botões de navegação do carrossel
    newNextBtn.addEventListener('click', () => {
        stopNewAutoPlay(); // Para o auto-play
        nextNewSlide(); // Avança para o próximo slide
        startNewAutoPlay(); // Reinicia o auto-play
    });

    newPrevBtn.addEventListener('click', () => {
        stopNewAutoPlay(); // Para o auto-play
        prevNewSlide(); // Volta para o slide anterior
        startNewAutoPlay(); // Reinicia o auto-play
    });

    // Inicializa o carrossel se houver slides
    if (newSlides.length > 0) {
        createNewDots(); // Cria os pontos indicadores
        updateNewCarousel(); // Garante que o primeiro slide seja exibido corretamente
        startNewAutoPlay(); // Inicia o auto-play
    }
    // --- FIM DO CÓDIGO DO NOVO CARROSSEL ---


    // --- CÓDIGO DA PÁGINA PRINCIPAL E NOVAS FUNÇÕES ---

    // --- Elementos da Interface ---
    // Modais e seus botões de fechar
    const loginModal = document.getElementById('login-modal');
    const cepModal = document.getElementById('cep-modal'); // Novo modal para CEP
    const closeLoginBtn = document.querySelector('#login-modal .close-btn');
    const closeCepBtn = document.getElementById('close-cep-modal');

    // Botões de navegação e ação
    const loginBtn = document.getElementById('login-btn'); // Referência ao botão de Login
    const signupBtn = document.querySelector('.btn-primary'); // Botão de Cadastro
    const headerCepBtn = document.getElementById('header-cep-btn'); // Novo botão para abrir o modal de CEP no header

    // Elementos do formulário de CEP
    const cepInput = document.getElementById('cep');
    const cepForm = document.getElementById('cep-form');
    const ruaInput = document.getElementById('rua');
    const numeroInput = document.getElementById('numero'); // Novo campo para número
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');

    // Barra de pesquisa e botões de categoria
    const searchForm = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-bar input');
    const categoryItems = document.querySelectorAll('.category-item');

    // Formulário de login e botões de adicionar ao carrinho
    const loginForm = document.getElementById('login-form'); // ID correto para o formulário de login
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');

    // Botão de modo escuro
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body; // Referência ao elemento body

    // Ícones para o modo escuro (usando os mesmos do HTML original)
    const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/></svg>';
    const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.65-5.65a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193-9.193a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L12.657 4.343a.5.5 0 0 1 0-.707m-9.193 9.193a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707l-1.414-1.414a.5.5 0 0 1 0-.707"/></svg>';

    // --- Funções Auxiliares ---
    // Função genérica para mostrar modais
    const showModal = (modalElement, event = null) => {
        if (event) event.preventDefault(); // Previne a ação padrão do link/botão se um evento for passado
        modalElement.classList.add('show'); // Adiciona a classe 'show' para exibir o modal
    };
    // Função genérica para esconder modais
    const hideModal = (modalElement) => {
        modalElement.classList.remove('show'); // Remove a classe 'show' para esconder o modal
        // Limpa os campos do modal de CEP ao fechar, para uma nova consulta limpa
        if (modalElement === cepModal) {
            cepForm.reset(); // Reseta o formulário
            // Limpa os campos preenchidos automaticamente
            ruaInput.value = '';
            bairroInput.value = '';
            cidadeInput.value = '';
            estadoInput.value = '';
        }
    };

    // Função para buscar CEP usando a API ViaCEP
    async function searchCep(cep) {
        cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP
        if (cep.length !== 8) {
            // Retorna um objeto de erro se o CEP não tiver 8 dígitos
            return { error: 'CEP inválido. Por favor, insira 8 dígitos.' };
        }

        try {
            // Realiza a requisição para a API ViaCEP
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            // Verifica se a requisição foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro na comunicação com a API.');
            }
            const data = await response.json(); // Converte a resposta para JSON
            // Verifica se a API retornou um erro indicando que o CEP não foi encontrado
            if (data.erro) {
                return { error: 'CEP não encontrado. Verifique o número e tente novamente.' };
            }
            // Retorna os dados do endereço encontrados
            return data;
        } catch (error) {
            console.error('Falha na busca de CEP:', error);
            // Retorna um erro genérico em caso de falha na requisição
            return { error: 'Erro de comunicação. Tente novamente mais tarde.' };
        }
    }

    // --- Lógica de Eventos ---

    // Event Listeners para abrir/fechar modais
    loginBtn.addEventListener('click', (e) => showModal(loginModal, e)); // Abre o modal de login
    signupBtn.addEventListener('click', (e) => { // Redireciona para a página de cadastro
        e.preventDefault();
        window.location.href = '../paginas/cadastro.html';
    });
    headerCepBtn.addEventListener('click', (e) => showModal(cepModal, e)); // Abre o modal de CEP
    closeLoginBtn.addEventListener('click', () => hideModal(loginModal)); // Fecha o modal de login
    closeCepBtn.addEventListener('click', () => hideModal(cepModal)); // Fecha o modal de CEP

    // Fecha modais se o usuário clicar fora da área de conteúdo
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) { // Se o clique foi no fundo do modal de login
            hideModal(loginModal);
        }
        if (e.target === cepModal) { // Se o clique foi no fundo do modal de CEP
            hideModal(cepModal);
        }
    });

    // Manipula o envio do formulário de login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previne o envio padrão do formulário
        console.log('Dados do formulário de login prontos para serem enviados ao backend.');

        // Simulação de chamada de API (substitua por uma chamada fetch real)
        const simulatedResponse = {
            ok: true, // Simula sucesso na autenticação
            json: async () => ({ message: 'Login simulado com sucesso!' })
        };

        if (simulatedResponse.ok) {
            console.log('Login bem-sucedido!');
            hideModal(loginModal); // Fecha o modal de login
            // Em um sistema real, aqui você poderia redirecionar o usuário ou atualizar a UI
            // window.location.href = '/dashboard.html';
            // alert('Login bem-sucedido! Bem-vindo(a)!'); // Substituído por lógica mais avançada
        } else {
            console.error('Erro de login simulado.');
            // Exibir mensagem de erro para o usuário, talvez em um elemento HTML específico
            // alert('Usuário ou senha inválidos.');
        }
    });

    // Manipula o envio do formulário de CEP
    cepForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previne o envio padrão

        const cepValue = cepInput.value; // Obtém o CEP digitado
        const result = await searchCep(cepValue); // Chama a função de busca de CEP

        if (result.error) {
            // Se houver erro, exibe um pop-up informativo
            displayInfoPopup(result.error, 'Erro de CEP');
            return; // Interrompe a função
        }

        // Se o CEP for encontrado com sucesso, atualiza os campos e exibe um pop-up
        ruaInput.value = result.logradouro || ''; // Preenche rua, se retornado
        numeroInput.placeholder = 'Ex: 123'; // Mantém o placeholder para o número
        bairroInput.value = result.bairro || ''; // Preenche bairro, se retornado
        cidadeInput.value = result.localidade || ''; // Preenche cidade, se retornado
        estadoInput.value = result.uf || ''; // Preenche estado, se retornado

        // Exibe um pop-up informativo com os dados encontrados
        displayInfoPopup(`Endereço encontrado: ${result.logradouro || 'N/A'}, ${result.localidade || 'N/A'} - ${result.uf || 'N/A'}`, 'Endereço Salvo');

        hideModal(cepModal); // Fecha o modal de CEP após salvar
    });

    // Lógica para preencher automaticamente os campos de endereço ao perder o foco do input CEP
    cepInput.addEventListener('blur', async () => {
        const cepValue = cepInput.value.replace(/\D/g, ''); // Limpa o CEP
        if (cepValue.length === 8) { // Verifica se tem 8 dígitos
            const data = await searchCep(cepValue); // Busca o CEP
            if (!data.error) {
                // Se não houver erro, preenche os campos (exceto o número)
                ruaInput.value = data.logradouro || '';
                // O campo número deve ser preenchido manualmente pelo usuário
                // Não preenchemos bairro, cidade e estado se o usuário já digitou algo,
                // permitindo que ele corrija se a API trouxer algo diferente.
                if (!bairroInput.value) bairroInput.value = data.bairro || '';
                if (!cidadeInput.value) cidadeInput.value = data.localidade || '';
                if (!estadoInput.value) estadoInput.value = data.uf || '';
            } else {
                // Se houver erro, limpa os campos de endereço para não confundir o usuário
                ruaInput.value = '';
                bairroInput.value = '';
                cidadeInput.value = '';
                estadoInput.value = '';
                // O erro será exibido no submit do formulário, caso o usuário clique em "Salvar" sem corrigir.
            }
        } else {
            // Se o CEP não tiver 8 dígitos ao perder o foco, limpa os campos de endereço
            ruaInput.value = '';
            bairroInput.value = '';
            cidadeInput.value = '';
            estadoInput.value = '';
        }
    });

    // Manipula o envio do formulário de busca
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Previne o envio padrão
        const query = searchInput.value.trim(); // Obtém o termo de busca
        if (!query) return; // Se a busca estiver vazia, não faz nada

        console.log(`Buscando por: "${query}"`);
        // Redireciona para uma página de resultados de busca (simulada)
        window.location.href = `/busca?q=${encodeURIComponent(query)}`;
    });

    // Manipula o clique nos itens de categoria
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const categoryName = item.querySelector('p').innerText; // Obtém o nome da categoria
            console.log(`Carregando produtos da categoria: ${categoryName}`);
            // Redireciona para uma página de categoria (simulada)
            window.location.href = `/categorias/${encodeURIComponent(categoryName.toLowerCase().replace(/\s+/g, '-'))}`;
        });
    });

    // Funcionalidade dos botões "Adicionar ao Carrinho"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card'); // Encontra o card do produto
            const productTitle = productCard.querySelector('.product-title').innerText; // Obtém o título do produto
            console.log(`Produto "${productTitle}" adicionado ao carrinho.`);

            // Exibe um pop-up informativo de sucesso
            displayInfoPopup(`"${productTitle}" foi adicionado ao seu carrinho!`, 'Produto Adicionado');

            // Em um sistema real, aqui você enviaria uma requisição para o backend
            // para adicionar o produto ao carrinho do usuário e, possivelmente,
            // atualizar o badge do carrinho na barra de navegação.
        });
    });

    // --- Funcionalidade do Modo Escuro ---
    // Carrega o estado do modo escuro do localStorage ou define como desativado por padrão
    const savedDarkModeState = localStorage.getItem('darkMode') || 'disabled';
    if (savedDarkModeState === 'enabled') {
        enableDarkMode(); // Ativa o modo escuro se estiver salvo como 'enabled'
    } else {
        disableDarkMode(); // Garante que o modo claro esteja ativo por padrão
    }

    // Listener para o botão de alternância do modo escuro
    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode(); // Desativa se já estiver ativo
        } else {
            enableDarkMode(); // Ativa se estiver no modo claro
        }
    });

    // Função para ativar o modo escuro
    function enableDarkMode() {
        body.classList.add('dark-mode'); // Adiciona a classe 'dark-mode' ao body
        darkModeToggle.innerHTML = sunIcon; // Muda o ícone do botão para o Sol
        localStorage.setItem('darkMode', 'enabled'); // Salva a preferência no localStorage
        console.log('Modo Escuro ativado.');
    }

    // Função para desativar o modo escuro
    function disableDarkMode() {
        body.classList.remove('dark-mode'); // Remove a classe 'dark-mode' do body
        darkModeToggle.innerHTML = moonIcon; // Muda o ícone do botão para a Lua
        localStorage.setItem('darkMode', 'disabled'); // Salva a preferência no localStorage
        console.log('Modo Escuro desativado.');
    }

    // --- Função para exibir pop-ups informativos (substitui alertas) ---
    function displayInfoPopup(message, title = 'Informação') {
        // Cria um elemento div para o pop-up
        const popup = document.createElement('div');
        popup.classList.add('info-popup'); // Adiciona classe CSS para estilização

        // Estrutura do pop-up
        popup.innerHTML = `
            <div class="popup-content">
                <div class="popup-header">
                    <h3>${title}</h3>
                    <span class="close-popup">&times;</span>
                </div>
                <div class="popup-body">
                    <p>${message}</p>
                </div>
            </div>
        `;

        // Adiciona o pop-up ao corpo do documento
        document.body.appendChild(popup);

        // Seleciona o botão de fechar do pop-up recém-criado
        const closePopupBtn = popup.querySelector('.close-popup');
        // Adiciona listener para fechar o pop-up
        closePopupBtn.addEventListener('click', () => {
            popup.remove(); // Remove o pop-up do DOM
        });

        // Fecha o pop-up se o usuário clicar fora do conteúdo dele
        popup.addEventListener('click', (e) => {
            if (e.target === popup) { // Se o clique foi diretamente no fundo do pop-up
                popup.remove(); // Remove o pop-up
            }
        });

        // Opcional: Define um tempo para o pop-up fechar automaticamente após alguns segundos
        // setTimeout(() => {
        //     if (popup.parentNode) { // Verifica se o pop-up ainda está no DOM
        //         popup.remove();
        //     }
        // }, 5000); // Fecha após 5 segundos
    }

    // --- Redirecionamentos simples para links de navegação ---
    // Estes links são apenas para demonstração e podem ser comentados ou modificados
    document.querySelector('.nav-links li:nth-child(1) a').addEventListener('click', (e) => {
        // e.preventDefault(); // Descomente para prevenir o redirecionamento padrão
        // displayInfoPopup('Redirecionando para sua conta...', 'Minha Conta');
        // window.location.href = '/minha-conta.html';
    });

    document.querySelector('.cart-link a').addEventListener('click', (e) => {
        // e.preventDefault(); // Descomente para prevenir o redirecionamento padrão
        // displayInfoPopup('Redirecionando para o carrinho...', 'Carrinho');
        // window.location.href = '/carrinho.html';
    });
});