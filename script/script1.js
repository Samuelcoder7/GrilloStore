// Seleciona os elementos do HTML que serão manipulados pelo JS
const carouselImages = document.querySelector('.carousel-images');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselDots = document.querySelector('.carousel-dots');
const images = document.querySelectorAll('.carousel-images img');

// Variáveis de estado para controlar o carrossel
let currentIndex = 0; // Começa na primeira imagem (índice 0)
const totalImages = images.length; // Conta o número total de imagens (10)
let intervalId; // Variável para guardar o ID do timer automático

// --- Funções de Lógica ---

// Função para criar os pontos indicadores dinamicamente
function createDots() {
    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        dot.addEventListener('click', () => {
            // Ao clicar no ponto, para o auto-play, muda o slide, e reinicia o auto-play
            stopAutoPlay();
            currentIndex = i;
            updateCarousel();
            startAutoPlay();
        });
        carouselDots.appendChild(dot);
    }
    updateDots();
}

// Função principal que atualiza a posição do carrossel
function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselImages.style.transform = `translateX(${offset}%)`;
    updateDots();
}

// Função que adiciona/remove a classe 'active' nos pontos
function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    });
}

// --- Funções de Auto-Play ---

// Função que inicia o carrossel automático
function startAutoPlay() {
    // A cada 3000ms (3 segundos), ele move para o próximo slide
    intervalId = setInterval(() => {
        currentIndex++;
        if (currentIndex >= totalImages) {
            currentIndex = 0;
        }
        updateCarousel();
    }, 3000);
}

// Função que para o carrossel automático
function stopAutoPlay() {
    clearInterval(intervalId);
}

// --- Eventos e Controles ---

// Evento de clique para o botão "Próximo"
nextBtn.addEventListener('click', () => {
    // Ao clicar, para o auto-play, avança o slide, e reinicia o auto-play
    stopAutoPlay();
    currentIndex++;
    if (currentIndex >= totalImages) {
        currentIndex = 0;
    }
    updateCarousel();
    startAutoPlay();
});

// Evento de clique para o botão "Anterior"
prevBtn.addEventListener('click', () => {
    // Ao clicar, para o auto-play, volta o slide, e reinicia o auto-play
    stopAutoPlay();
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = totalImages - 1;
    }
    updateCarousel();
    startAutoPlay();
});

// --- Iniciando a Mágica ---

// Cria os pontos na parte de baixo do carrossel
createDots();

// Inicia o carrossel automático quando a página é carregada
startAutoPlay();