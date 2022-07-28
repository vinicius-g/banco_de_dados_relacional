const Usuario = require("../models/Usuario");

module.exports = {
    async criarUsuario(req, res) {
        const { nome, email, senha } = req.body

        await Usuario.create({
            nome,
            email,
            senha
        }).then(() => {
            res.redirect("http://localhost:2405/login")
        }).catch(() => {
            res.render("pages/cadastro", {
                erro: "Email já cadastrado",
                valores: req.body,
                erro_email: "erro",
                erro_nome: "",
                erro_senha: ""
            })
        })
    },

    async usuarioAtual(req, res) {
        const { email, senha } = req.body

        const usuarioAtual = await Usuario.findOne({
            where: {
                email,
                senha
            }
        })

        return usuarioAtual
    },

    async deletarUsuario(req, res) {
        const { id } = req.params

        await Usuario.destroy({
            where: {
                id
            }
        })
    }
}