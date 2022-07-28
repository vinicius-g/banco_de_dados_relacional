const express = require('express')
const router = express.Router()
const { body, validationResult } = require("express-validator")

const UsuarioController = require("../../server/controllers/UsuarioController")
const PostagemController = require("../../server/controllers/PostagemController")

router.get("/", function (req, res) {
    res.render("pages/index", {
        usuario: {},
        postagens: []
    })
})

router.get("/home", async function (req, res) {
    let usuario = await UsuarioController.usuarioAtual(req, res) || {}
    let postagens = await PostagemController.mostrarPostagens(req, res)
    res.render("pages/home", {
        erros: null,
        valores: {},
        usuario: usuario,
        postagens: postagens,
        estado_formulario_alterar_postagem: ""
    })
})

router.get("/login", function (req, res) {
    res.render("pages/login", {
        valores: {},
        erro: null
    })
})

router.post("/login", async function (req, res) {
    let usuario = await UsuarioController.usuarioAtual(req, res)

    if (usuario === null) {
        return res.render("pages/login", {
            valores: req.body,
            erro: "Usuário ou senha inválidos"
        })
    }

    let postagens = await PostagemController.mostrarPostagens(req, res)

    res.render("pages/home", {
        erros: null,
        valores: {},
        usuario: usuario,
        postagens: postagens,
        estado_formulario_alterar_postagem: ""
    })
})

router.get("/cadastro", function (req, res) {
    res.render("pages/cadastro", {
        erro: null,
        valores: {},
        erro_email: "",
        erro_nome: "",
        erro_senha: ""
    })
})

router.post("/cadastro", async function (req, res) {
    await UsuarioController.criarUsuario(req, res)
})

router.post("/home/criarpostagem", 

body("titulo").isLength({
    min: 1,
    max: 255
}),
body("conteudo").isLength({
    min: 1
}),

async function (req, res) {

    let usuario = await UsuarioController.usuarioAtual(req, res)

    const erros = validationResult(req)

    if (!erros.isEmpty()) {
        let postagens = await PostagemController.mostrarPostagens(req, res)

        return res.render("pages/home", {
            erros: erros,
            valores: req.body,
            usuario: usuario,
            postagens: postagens,
            estado_formulario_alterar_postagem: ""
        })
    }

    await PostagemController.criarPostagem(req, res)
    let postagens = await PostagemController.mostrarPostagens(req, res)
    
    res.render("pages/home", {
        erros: null,
        valores: {},
        usuario: usuario,
        postagens: postagens,
        estado_formulario_alterar_postagem: ""
    })
})

router.post("/home/alterarpostagem", 

body("mudar_titulo").isLength({
    min: 1,
    max: 255
}),
body("mudar_conteudo").isLength({
    min: 1
}),

async function (req, res) {
    let usuario = await UsuarioController.usuarioAtual(req, res)

    const erros = validationResult(req)

    if (!erros.isEmpty()) {
        let postagens = await PostagemController.mostrarPostagens(req, res)

        return res.render("pages/home", {
            erros: erros,
            valores: req.body,
            usuario: usuario,
            postagens: postagens,
            estado_formulario_alterar_postagem: "mostrar"
        })
    }

    await PostagemController.alterarPostagem(req, res)
    let postagens = await PostagemController.mostrarPostagens(req, res)

    res.render("pages/home", {
        erros: null,
        valores: {},
        usuario: usuario,
        postagens: postagens,
        estado_formulario_alterar_postagem: ""
    })
})

router.post("/home/deletarpostagem/:id", async function (req, res) {
    let usuario = await UsuarioController.usuarioAtual(req, res)
    await PostagemController.deletarPostagem(req, res)
    let postagens = await PostagemController.mostrarPostagens(req, res)

    res.render("pages/home", {
        erros: null,
        valores: {},
        usuario: usuario,
        postagens: postagens,
        estado_formulario_alterar_postagem: ""
    })
})

router.get("/deletarusuario/:id", async function (req, res) {
    await UsuarioController.deletarUsuario(req, res)
    res.redirect("http://localhost:2405")
})

// criar uma primeira interação front end

module.exports = router