const Sequelize = require("sequelize")
const dbConfig = require("../config/database")

const Usuario = require("../models/Usuario")
const Postagem = require("../models/Postagem")

const connection = new Sequelize(dbConfig)

Usuario.init(connection)
Postagem.init(connection)

Usuario.associar(connection.models)
Postagem.associar(connection.models)

module.exports = connection