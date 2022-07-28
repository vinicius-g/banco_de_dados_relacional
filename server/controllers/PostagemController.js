const Postagem = require("../models/Postagem");
const Usuario = require("../models/Usuario");

module.exports = {
    async criarPostagem(req, res) {
        const { email, titulo, conteudo } = req.body

        await Postagem.create({
            titulo,
            conteudo,
            email
        })
    },

    async mostrarPostagens(req,res) {
        const { email } = req.body
        
        const postagens = await Postagem.findAll({
            where: {
                email
            },
            order: [[
                "id",
                "DESC"
            ]]
        })

        return postagens
    },
    
    async alterarPostagem(req, res) {
        const { id_postagem, mudar_titulo, mudar_conteudo } = req.body

        await Postagem.update({
            titulo: mudar_titulo,
            conteudo: mudar_conteudo
        }, {
            where: {
                id: id_postagem
            }
        })
    },
    
    async deletarPostagem(req, res) {
        const { id } = req.params

        await Postagem.destroy({
            where: {
                id
            }
        })
    }
}