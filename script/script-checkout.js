//
// LÓGICA DA PÁGINA DE CHECKOUT
// Este script gerencia a funcionalidade do formulário e o resumo do pedido.
//

document.addEventListener('DOMContentLoaded', () => {

    // ====================================
    // 1. DADOS DE EXEMPLO (Simula o carrinho de compras)
    // ====================================
    // No mundo real, estes dados viriam de uma API do backend.
    const cartItems = [
        {
            name: "Smartphone X Pro 128GB",
            price: 2500.00,
            image: "https://via.placeholder.com/80x80?text=Smartphone"
        }
    ];

    // ====================================
    // 2. LÓGICA DE EXIBIÇÃO DO RESUMO DO PEDIDO
    // ====================================
    const orderItemsContainer = document.getElementById('order-items');
    const subtotalValue = document.getElementById('subtotal-value');
    const totalValue = document.getElementById('total-value');
    
    let subtotal = 0;

    cartItems.forEach(item => {
        subtotal += item.price;
        const itemElement = document.createElement('div');
        itemElement.classList.add('order-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
            </div>
        `;
        orderItemsContainer.appendChild(itemElement);
    });

    subtotalValue.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    totalValue.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

    // ====================================
    // 3. LÓGICA DOS MÉTODOS DE PAGAMENTO
    // ====================================
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentForms = {
        'credit-card': document.getElementById('credit-card-form'),
        'pix': document.getElementById('pix-info'),
        'boleto': document.getElementById('boleto-info')
    };

    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove a seleção de todos os botões
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            // Adiciona a seleção ao botão clicado
            option.classList.add('selected');

            // Esconde todos os formulários de pagamento
            for (const key in paymentForms) {
                paymentForms[key].classList.add('hidden');
            }

            // Mostra o formulário correspondente ao método selecionado
            const selectedMethod = option.dataset.method;
            if (paymentForms[selectedMethod]) {
                paymentForms[selectedMethod].classList.remove('hidden');
            }
        });
    });

    // ====================================
    // 4. LÓGICA DE VALIDAÇÃO DO FORMULÁRIO (Exemplo básico)
    // ====================================
    const checkoutForm = document.getElementById('checkout-form');
    
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (name && email) {
            alert("Pedido finalizado com sucesso! Detalhes do pedido foram enviados para o seu e-mail.");
        } else {
            alert("Por favor, preencha todos os campos obrigatórios.");
        }
    });

    // ====================================
    // 5. LÓGICA DE MÁSCARAS PARA CAMPOS DE FORMULÁRIO
    // ====================================
    
    // Máscara para CEP (00000-000)
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 8);
            if (e.target.value.length > 5) {
                e.target.value = e.target.value.slice(0, 5) + '-' + e.target.value.slice(5, 8);
            }
        });
    }

    // Máscara para validade do cartão (MM/AA)
    const cardExpiryInput = document.getElementById('card-expiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
            if (e.target.value.length > 2) {
                e.target.value = e.target.value.slice(0, 2) + '/' + e.target.value.slice(2, 4);
            }
        });
    }

    // Máscara para CVV (3 ou 4 dígitos)
    const cardCvvInput = document.getElementById('card-cvv');
    if (cardCvvInput) {
        cardCvvInput.addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });
    }

    // ====================================
    // 6. LÓGICA DO MODO ESCURO
    // ====================================
    const body = document.body;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    function enableDarkMode() {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = sunIcon;
        }
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = moonIcon;
        }
        localStorage.setItem('darkMode', 'disabled');
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    } else {
        if (darkModeToggle) {
            darkModeToggle.innerHTML = moonIcon;
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });
    }
});