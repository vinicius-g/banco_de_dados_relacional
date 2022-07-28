const formularioAlterarPostagem = document.getElementById("alterarPostagem")
const postagens = document.querySelectorAll("[data-postagem]")

const idPostagem = document.getElementById("id_postagem")
const mudarTitulo = document.getElementById("mudar_titulo")
const mudarConteudo = document.getElementById("mudar_conteudo")

postagens.forEach((postagem) => {
    postagem.addEventListener("click", (e) => {
        if (e.target.id.match("alterar")) {
            formularioAlterarPostagem.classList.toggle("mostrar")
            idPostagem.value = e.currentTarget.id
            mudarTitulo.value = document.getElementById("titulo" + e.currentTarget.id).innerText
            mudarConteudo.value = document.getElementById("conteudo" + e.currentTarget.id).innerText
        }
    })
})