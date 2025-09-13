// Selecionando elementos do formulário
const form = document.getElementById('cadastroForm');
const limparBtn = document.getElementById('limparBtn');
const nome = document.getElementById('nome');
const dataNascimento = document.getElementById('dataNascimento');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmaSenha = document.getElementById('confirmaSenha');
const cpf = document.getElementById('cpf');
const telefone = document.getElementById('telefone');
const cep = document.getElementById('cep');
const enderecoGroup = document.getElementById('enderecoGroup');
const endereco = document.getElementById('endereco');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const numero = document.getElementById('numero');

// Botão de Modo Escuro
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const darkModeIcon = darkModeToggle.querySelector('i');

// Spans de erro
const errorSpans = {
    dataNascimento: document.getElementById('idadeError'),
    email: document.getElementById('emailError'),
    senha: document.getElementById('senhaError'),
    confirmaSenha: document.getElementById('confirmaSenhaError'),
    cpf: document.getElementById('cpfError'),
    cep: document.getElementById('cepError'),
    numero: document.getElementById('numeroError'),
    telefone: document.getElementById('telefoneError')
};

// Mapeamento de campos e a ordem de validação
const campos = [
    { id: 'nome', proximo: 'dataNascimento' },
    { id: 'dataNascimento', proximo: 'email' },
    { id: 'email', proximo: 'senha' },
    { id: 'senha', proximo: 'confirmaSenha' },
    { id: 'confirmaSenha', proximo: 'cpf' },
    { id: 'cpf', proximo: 'cep' },
    { id: 'cep', proximo: 'numero' },
    { id: 'numero', proximo: 'telefone' },
    { id: 'telefone', proximo: null }
];

// Criação do pop-up
const popup = document.createElement('div');
popup.id = 'popupSucesso';
popup.style.position = 'fixed';
popup.style.top = '50%';
popup.style.left = '50%';
popup.style.transform = 'translate(-50%, -50%)';
popup.style.background = 'var(--card-bg-color)';
popup.style.color = 'var(--text-color)';
popup.style.border = '2px solid var(--primary-color)';
popup.style.padding = '20px';
popup.style.borderRadius = '8px';
popup.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
popup.style.zIndex = '1000';
popup.style.display = 'none';
popup.innerHTML = `
    <p>Formulário enviado com sucesso!</p>
    <button id="fecharPopup" class="btn btn-primary">Fechar</button>
`;
document.body.appendChild(popup);

document.getElementById('fecharPopup').addEventListener('click', () => {
    popup.style.display = 'none';
});

// Funções de validação
function validarNome(nome) {
    return nome.trim().length > 0;
}

function validarIdade(data) {
    if (!data) return false;
    const hoje = new Date();
    const nascimento = new Date(data);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
    return idade >= 18;
}

function validarEmail(e) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(e);
}

function validarSenha(s) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(s);
}

function validarConfirmacaoSenha(s1, s2) {
    return s1 === s2;
}

function validarCPF(cpfValor) {
    cpfValor = cpfValor.replace(/\D/g, '');
    if (cpfValor.length !== 11 || /^(\d)\1+$/.test(cpfValor)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpfValor.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfValor.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpfValor.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfValor.substring(10, 11))) return false;
    return true;
}

function validarCep(c) {
    const cepLimpo = c.replace(/\D/g, '');
    return cepLimpo.length === 8;
}

function validarNumero(n) {
    return n.trim().length > 0;
}

function validarTelefone(t) {
    const telefoneLimpo = t.replace(/\D/g, '');
    const regex = /^(\d{2})?(\d{4,5}\d{4})$/;
    return regex.test(telefoneLimpo) && (telefoneLimpo.length === 10 || telefoneLimpo.length === 11);
}

// Funções de formatação e validação
const formatarCPF = (input) => {
    input.value = input.value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const formatarTelefone = (input) => {
    input.value = input.value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
};

const formatarCep = (input) => {
    input.value = input.value.replace(/\D/g, '')
        .replace(/^(\d{5})(\d)/, '$1-$2');
};

const buscarCep = async (cepValor) => {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepValor}/json/`);
        const data = await response.json();
        if (data.erro) {
            return false;
        } else {
            document.getElementById('endereco').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
            enderecoGroup.classList.remove('hidden');
            return true;
        }
    } catch (error) {
        return false;
    }
};

// Limpar classes de erro/valid
function limparValidacao(input) {
    if (!input) return;
    input.classList.remove('error', 'valid');
    const errorSpan = errorSpans[input.id];
    if (errorSpan) {
        errorSpan.textContent = '';
    }
}

// Validar campo e habilitar próximo
async function validarCampo(campo) {
    const input = document.getElementById(campo.id);
    if (!input) return false;

    limparValidacao(input);
    let isValid = false;

    switch (campo.id) {
        case 'nome':
            input.value = input.value.toUpperCase();
            isValid = validarNome(input.value);
            if (!isValid) {
                // Como 'nome' não tem um span de erro, usamos o title
                input.title = 'Nome é obrigatório.';
            }
            break;
        case 'dataNascimento':
            isValid = validarIdade(input.value);
            if (!isValid) errorSpans.dataNascimento.textContent = 'Você precisa ter pelo menos 18 anos.';
            break;
        case 'email':
            isValid = validarEmail(input.value);
            if (!isValid) errorSpans.email.textContent = 'E-mail inválido. Ex: nome@dominio.com';
            break;
        case 'senha':
            isValid = validarSenha(input.value);
            if (!isValid) errorSpans.senha.textContent = 'Senha fraca! Mínimo 8 caracteres, com letras maiúsculas, minúsculas, números e símbolo.';
            break;
        case 'confirmaSenha':
            isValid = validarConfirmacaoSenha(senha.value, input.value);
            if (!isValid) errorSpans.confirmaSenha.textContent = 'As senhas não coincidem!';
            break;
        case 'cpf':
            formatarCPF(input);
            isValid = validarCPF(input.value);
            if (!isValid) errorSpans.cpf.textContent = 'CPF inválido!';
            break;
        case 'cep':
            formatarCep(input);
            isValid = validarCep(input.value);
            if (!isValid) {
                errorSpans.cep.textContent = 'CEP inválido!';
            } else {
                const cepEncontrado = await buscarCep(input.value.replace(/\D/g, ''));
                if (!cepEncontrado) {
                    isValid = false;
                    errorSpans.cep.textContent = 'CEP não encontrado.';
                }
            }
            break;
        case 'numero':
            isValid = validarNumero(input.value);
            if (!isValid) errorSpans.numero.textContent = 'Número é obrigatório.';
            break;
        case 'telefone':
            formatarTelefone(input);
            isValid = validarTelefone(input.value);
            if (!isValid) errorSpans.telefone.textContent = 'Telefone inválido! Formato: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX';
            break;
    }

    if (isValid) {
        input.classList.add('valid');
        return true;
    } else {
        input.classList.add('error');
        return false;
    }
}

// Habilita/desabilita campos
function toggleCampos(startIndex) {
    campos.forEach((campo, index) => {
        const input = document.getElementById(campo.id);
        if (input) {
            input.disabled = (index >= startIndex);
        }
    });
}

// Adiciona eventos de validação e travamento de campos
document.addEventListener('DOMContentLoaded', () => {
    toggleCampos(1);
    document.getElementById(campos[0].id).disabled = false;
    document.getElementById(campos[0].id).focus();

    campos.forEach((campo, index) => {
        const input = document.getElementById(campo.id);
        if (!input) return;

        input.addEventListener('input', async () => {
            if (await validarCampo(campo)) {
                if (campo.proximo) {
                    const proximoCampo = document.getElementById(campo.proximo);
                    if (proximoCampo) {
                        proximoCampo.disabled = false;
                    }
                }
            } else {
                for (let i = index + 1; i < campos.length; i++) {
                    const nextInput = document.getElementById(campos[i].id);
                    if (nextInput) {
                        nextInput.disabled = true;
                    }
                }
            }
        });

        if (campo.id === 'dataNascimento') {
            input.addEventListener('change', async () => {
                await validarCampo(campo);
            });
        }
    });
});

// Lógica para o Modo Escuro
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    }
});

// Validação final e envio
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formValido = true;

    for (const campo of campos) {
        const isValid = await validarCampo(campo);
        if (!isValid) {
            formValido = false;
            document.getElementById(campo.id).focus();
            break;
        }
    }

    if (formValido) {
        popup.style.display = 'block';
        form.reset();
        limparValidacao(document.getElementById(campos[0].id));
        toggleCampos(1);
        document.getElementById(campos[0].id).disabled = false;
        document.getElementById(campos[0].id).focus();
    }
});