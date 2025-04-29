
let diretores = []

async function carregarDiretores(){
    try {
        const resposta = await fetch ('http://localhost:3000/diretores')
        diretores = await resposta.json();

        exibirDiretores(diretores)
    }
    catch (erro){
        console.error("Erro ao carregar diretores.")
    }
}

function exibirDiretores(lista){
    const tabela = document.querySelector('#tabela tbody')
        tabela.innerHTML = ''

        lista.forEach(diretor => {
            const linha = document.createElement('tr')
            linha.innerHTML = `
        <td>${diretor.nome}</td>
        <td>${diretor.nacionalidade}</td>
        `
        tabela.appendChild(linha)
        })
}

function filtrarDiretores(){
    const termo = document.querySelector('#barra-pesquisa').value.toLowerCase()
    const filtrados = diretores.filter(diretor => diretor.nome.toLowerCase().includes(termo) || diretor.nacionalidade.toLowerCase().includes(termo))

    exibirDiretores(filtrados)
}

async function cadastrarDiretor(evento) {
    evento.preventDefault();

    const nome = document.querySelector('#nome').value.trim();
    const nacionalidade = document.querySelector('#nacionalidade').value.trim();

    if (!nome || !nacionalidade) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const novoDiretor = {
        nome: nome,
        nacionalidade: nacionalidade
    };

    try {
        const resposta = await fetch('http://localhost:3000/diretores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoDiretor)
        });

        if (resposta.ok) {
            alert("Cadastro realizado com sucesso!");

            const form = document.querySelector('#form-cadastro-diretor');
            form.reset(); // Agora o reset funciona certinho!

            carregarDiretores(); // Atualiza a tabela
        } else {
            alert("Erro ao cadastrar diretor.");
        }
    }
    catch (erro) {
        console.error("Erro ao cadastrar:", erro);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarDiretores()

    const inputPesquisa = document.querySelector('#barra-pesquisa')
    if (inputPesquisa){
        inputPesquisa.addEventListener('input', filtrarDiretores)
    }
    })

document.querySelector('#form-cadastro-diretor').addEventListener('submit', cadastrarDiretor);
