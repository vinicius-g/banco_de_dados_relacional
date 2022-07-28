const alterarPostagem = document.getElementById("formularioAlterarPostagem")
const postagensContainer = document.getElementById("postagens")

const tituloInput = document.getElementById("titulo")
const conteudoInput = document.getElementById("conteudo")

const mudarTituloInput = document.getElementById("mudarTitulo")
const mudarConteudoInput = document.getElementById("mudarConteudo")

const botaoCadastro = document.getElementById("botaoCadastro")
const botaoAlterar = document.querySelector("[data-botao-alterar]")

class Postagem {
    constructor(titulo, conteudo) {
        return {
            titulo: titulo,
            conteudo: conteudo
        }
    }
}

var postagens = []

function postar() {
    let postagem = criarConteudoPostagem()

    let elementos = criarElementos()

    anexarConteudoPostagem(postagem, elementos)

    darAtributos(elementos)

    anexarFilhosPostagem(elementos)

    interagirPostagens(elementos)

    postagens.reverse()

    postagens.push(elementos.divElemento)

    postagens.reverse()

    let id = 1

    mostrarPostagens(id)

    let elementosPagina = selectionarElementosPagina()

    darId(elementosPagina.titulos, "titulo", id)
    darId(elementosPagina.conteudos, "conteudo", id)
    darId(elementosPagina.botoesDeletar, "deletar", id)
    darId(elementosPagina.botoesEditar, "editar", id)
}

function criarConteudoPostagem() {
    let titulo = tituloInput.value
    let conteudo = conteudoInput.value

    let postagem = new Postagem(titulo, conteudo)

    return postagem
}

function criarElementos() {
    let divElemento = document.createElement("div")
    let tituloElemento = document.createElement("h3")
    let conteudoElemento = document.createElement("p")
    let botaoDeletar = document.createElement("button")
    let botaoEditar = document.createElement("button")

    return {
        divElemento,
        tituloElemento,
        conteudoElemento,
        botaoDeletar,
        botaoEditar
    }
}

function anexarConteudoPostagem(postagem, elementos) {
    elementos.tituloElemento.innerText = postagem.titulo
    elementos.conteudoElemento.innerText = postagem.conteudo
    elementos.botaoDeletar.innerHTML = "<i class='bx bxs-trash-alt'></i>"
    elementos.botaoEditar.innerHTML = "<i class='bx bxs-edit-alt' ></i>"
}

function darAtributos(elementos) {
    elementos.tituloElemento.setAttribute("data-titulo", "")
    elementos.conteudoElemento.setAttribute("data-conteudo", "")
    elementos.botaoDeletar.setAttribute("data-botao-deletar", "")
    elementos.botaoEditar.setAttribute("data-botao-editar", "")
}

function darId(elementos, nome, id) {
    elementos.forEach((elemento) => {
        elemento.id = nome + id
        id++
    })
}

function selectionarElementosPagina() {
    let titulos = document.querySelectorAll("[data-titulo]")
    let conteudos = document.querySelectorAll("[data-conteudo]")
    let botoesDeletar = document.querySelectorAll("[data-botao-deletar]")
    let botoesEditar = document.querySelectorAll("[data-botao-editar]")

    return {
        titulos,
        conteudos,
        botoesDeletar,
        botoesEditar
    }
}

function anexarFilhosPostagem(elementos) {
    elementos.divElemento.appendChild(elementos.tituloElemento)
    elementos.divElemento.appendChild(elementos.conteudoElemento)
    elementos.divElemento.appendChild(elementos.conteudoElemento)
    elementos.divElemento.appendChild(elementos.botaoDeletar)
    elementos.divElemento.appendChild(elementos.botaoEditar)
}

function interagirPostagens(elementos) {
    elementos.divElemento.addEventListener("click", (e) => {
        let elementoAtual = e.currentTarget
        let elementoAtualId = elementoAtual.id
        let botaoSelecionado = e.target.id

        if (botaoSelecionado.match("deletar")) {
            deletarPostagem(elementoAtual)
        }

        if (botaoSelecionado.match("editar")) {
            mostrarContainerAlterar(elementoAtualId)
        }
    })
}

function mostrarPostagens(id) {
    postagens.forEach((postagem) => {
        console.log()
        postagensContainer.append(postagem)
        postagem.id = id
        id++
    })
}


function deletarPostagem(elementoAtual) {
    elementoAtual.remove()
    let deletarItem = postagens.indexOf(elementoAtual)
    postagens.splice(deletarItem, 1)
}

function mostrarContainerAlterar(elementoAtualId) {
    alterarPostagem.classList.toggle("mostrar")
    let tituloSelecionado = document.getElementById("titulo" + elementoAtualId).innerText
    let conteudoSelecionado = document.getElementById("conteudo" + elementoAtualId).innerText

    console.log(postagens)

    botaoAlterar.id = "botaoAlterar"+elementoAtualId
    mudarTituloInput.value = tituloSelecionado
    mudarConteudoInput.value = conteudoSelecionado
}

function editarPostagem() {
    let idAtual = botaoAlterar.id.replace(/\D/g, "")
    let tituloSelecionado = document.getElementById("titulo" + idAtual)
    let conteudoSelecionado = document.getElementById("conteudo" + idAtual)

    tituloSelecionado.innerText = mudarTituloInput.value
    conteudoSelecionado.innerText = mudarConteudoInput.value

    alterarPostagem.classList.remove("mostrar")
}

botaoCadastro.addEventListener("click", () => {
    postar()
})

botaoAlterar.addEventListener("click", () => {
    editarPostagem()
})