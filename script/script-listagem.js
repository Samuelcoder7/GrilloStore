//
// LÓGICA DA PÁGINA DE PRODUTOS
// Este script gerencia as funcionalidades interativas da página,
// como modo escuro, botões, modais e barra de pesquisa.
//

// ====================================
// 1. LÓGICA DO MODO ESCURO
// ====================================

const body = document.body;
const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

function enableDarkMode() {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = sunIcon;
    localStorage.setItem('darkMode', 'enabled');
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    darkModeToggle.innerHTML = moonIcon;
    localStorage.setItem('darkMode', 'disabled');
}

if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
} else {
    darkModeToggle.innerHTML = moonIcon;
}

darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

// ====================================
// 2. LÓGICA DA BARRA DE PESQUISA
// ====================================

const searchInput = document.getElementById('searchInput');
const productCards = document.querySelectorAll('.product-card');

searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();

    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const category = card.querySelector('.product-category').textContent.toLowerCase();

        if (title.includes(searchText) || category.includes(searchText)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// ====================================
// 3. LÓGICA DO CARRINHO
// ====================================

const cartItems = [];
const cartBadge = document.getElementById('cartBadge');
const cartModal = document.getElementById('cart-modal');
const closeCartModalBtn = document.getElementById('closeCartModal');
const cartLink = document.getElementById('cartLink');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
        cartTotalElement.textContent = 'R$ 0,00';
    } else {
        let total = 0;
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${item.price}</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);

            const priceValue = parseFloat(item.price.replace('R$', '').replace('.', '').replace(',', '.'));
            total += priceValue;
        });
        
        const formattedTotal = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        cartTotalElement.textContent = formattedTotal;
    }
}

const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        const productName = card.querySelector('.product-title').textContent;
        
        const priceText = card.querySelector('.product-price').textContent;
        const mainPrice = priceText.split(' ')[0] + priceText.split(' ')[1];
        
        const productImage = card.querySelector('.product-image').src;

        const product = {
            name: productName,
            price: mainPrice,
            image: productImage
        };

        cartItems.push(product);
        cartBadge.textContent = cartItems.length;
        
        renderCart();
        cartModal.classList.add('show');
    });
});

const btnCheckout = document.querySelector('.btn-checkout');

btnCheckout.addEventListener('click', () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    window.location.href = 'checkout.html';
});


cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    renderCart();
    cartModal.classList.add('show');
});

closeCartModalBtn.addEventListener('click', () => {
    cartModal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('show');
    }
});

// ====================================
// 4. LÓGICA DO MODAL DE CEP
// ====================================

const cepLink = document.getElementById('cepLink');
const cepModal = document.getElementById('cep-modal');
const closeCepModalBtn = document.getElementById('closeCepModal');
const checkCepBtn = document.getElementById('checkCepBtn');

cepLink.addEventListener('click', (e) => {
    e.preventDefault();
    cepModal.classList.add('show');
});

closeCepModalBtn.addEventListener('click', () => {
    cepModal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === cepModal) {
        cepModal.classList.remove('show');
    }
});

checkCepBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const cepValue = document.getElementById('cepInput').value;
        alert(`Verificando o CEP: ${cepValue}`);
    });

// ====================================
// 5. LÓGICA DO MODAL DE LOGIN
// ====================================

const loginLink = document.getElementById('loginLink');
const loginModal = document.getElementById('login-modal');
const closeLoginModalBtn = document.getElementById('closeLoginModal');
const loginForm = document.getElementById('login-form');

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('show');
});

closeLoginModalBtn.addEventListener('click', () => {
    loginModal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('show');
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        alert(`Login com sucesso!\nUsuário: ${email}`);
        loginModal.classList.remove('show');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// ====================================
// 6. LÓGICA DOS BOTÕES DE LISTA DE DESEJOS E OUTROS
// ====================================

const wishlistButtons = document.querySelectorAll('.wishlist-btn');

wishlistButtons.forEach(button => {
    button.addEventListener('click', () => {
        const icon = button.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
        
        if (icon.classList.contains('fas')) {
            alert('Produto adicionado à sua lista de desejos!');
        } else {
            alert('Produto removido da sua lista de desejos!');
        }
    });
});