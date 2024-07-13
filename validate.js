const camposFormulario = document.querySelectorAll('[required]');
const formBtn = document.querySelector('.form-btn');
const formulario = document.querySelector('[data-formulario]');

const tipoErro = [
    'valueMissing',
    'patternMismatch',
    'customError'
]

const mensagens = {
    nome: { valueMissing: `O campo de nome não pode estar vazio.`, customError: 'Número máximo de caracteres atingido (50).' },
    email: { valueMissing: `O campo de e-mail não pode estar vazio.`, patternMismatch: 'Por favor, preencha um email válido.' },
    assunto: { valueMissing: `O campo de assunto não pode estar vazio.`, customError: 'Número máximo de caracteres atingido (50).' },
    mensagem: { valueMissing: `O campo de mensagem não pode estar vazio.`, customError: 'Número máximo de caracteres atingido (300).' }
}

camposFormulario.forEach((campo) => {
    campo.addEventListener('blur', () => verificaCampo(campo));
    campo.addEventListener('invalid', evento => evento.preventDefault());
    campo.addEventListener('change', () => ativaBotao());
})

function verificaCampo(campo) {
    let mensagem = '';
    campo.setCustomValidity('');
    if (campo.id == 'nome' && campo.value.length > 50) {
        campo.setCustomValidity('mensagem');
    }
    if (campo.id == 'assunto' && campo.value.length > 50) {
        campo.setCustomValidity('mensagem');
    }
    if (campo.id == 'mensagem' && campo.value.length > 300) {
        campo.setCustomValidity('mensagem');
    }

    tipoErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.id][erro];
        }
    })

    const elementoMensagemErro = document.getElementById(`erro-${campo.id}`);
    const validador = campo.checkValidity();
    if (!validador) {
        elementoMensagemErro.textContent = mensagem;
    } else {
        elementoMensagemErro.textContent = '';
    }
}

function ativaBotao() {
    campos = Array.from(camposFormulario);
    if (campos.every(campo => campo.value)) {
        formBtn.removeAttribute('disabled');
    } else {
        formBtn.setAttribute('disabled');}
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const listaRespostas = {
        'nome': e.target.elements['nome'].value,
        'email': e.target.elements['email'].value,
        'assunto': e.target.elements['assunto'].value,
        'mensagem': e.target.elements['mensagem'].value,
    }
    localStorage.setItem('cadastro', JSON.stringify(listaRespostas));
    alert('Mensagem enviada!');
})