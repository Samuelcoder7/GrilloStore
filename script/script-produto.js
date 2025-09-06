// Script para funcionalidades interativas

// --- Dark Mode Toggle ---

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


// --- Zoom nas Imagens do Produto ---

// Seleciona a imagem principal do produto
const mainProductImage = document.querySelector('.main-product-image');

// Adiciona um ouvinte de evento para o evento 'click' na imagem principal
mainProductImage.addEventListener('click', () => {
    // Verifica se a imagem já tem a classe 'zoomed'
    if (mainProductImage.classList.contains('zoomed')) {
        // Se tiver, remove a classe 'zoomed' para voltar ao tamanho normal
        mainProductImage.classList.remove('zoomed');
        // Remove a imagem sobreposta se existir
        const overlay = document.querySelector('.image-overlay');
        if (overlay) overlay.remove();
    } else {
        // Se não tiver, adiciona a classe 'zoomed' para aplicar o zoom
        mainProductImage.classList.add('zoomed');

        // Cria um elemento de overlay para escurecer o fundo
        const overlay = document.createElement('div');
        overlay.classList.add('image-overlay');
        document.body.appendChild(overlay); // Adiciona o overlay ao corpo do documento
    }
});

// Para fechar o zoom clicando fora da imagem, no overlay
document.addEventListener('click', (event) => {
    // Verifica se o clique foi fora da imagem principal e se o elemento clicado não é o próprio botão de toggle
    if (mainProductImage.classList.contains('zoomed') && !mainProductImage.contains(event.target) && event.target !== darkModeToggle) {
        mainProductImage.classList.remove('zoomed');
        const overlay = document.querySelector('.image-overlay');
        if (overlay) overlay.remove();
    }
});

// CSS adicional para o zoom (será adicionado no style.css)
/*
.main-product-image.zoomed {
    position: fixed; // Fixo na tela para zoom
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.5); // Aplica zoom e centraliza
    z-index: 1000; // Garante que fique acima de outros elementos
    cursor: zoom-out; // Muda o cursor para indicar que pode sair do zoom
    border: 2px solid #61A400; // Borda verde para destacar a imagem com zoom
}

body.dark-mode .main-product-image.zoomed {
    border-color: #8BC34A; // Borda verde clara no modo escuro
}

.image-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); // Fundo escuro semi-transparente
    z-index: 999; // Abaixo da imagem com zoom
}
*/