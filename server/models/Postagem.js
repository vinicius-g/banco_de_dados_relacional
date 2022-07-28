const { Model, DataTypes } = require("sequelize")

class Postagem extends Model {
    static init(sequelize) {
        super.init({
            titulo: DataTypes.STRING,
            conteudo: DataTypes.TEXT
        }, {
            sequelize,
            tableName: "Postagens"
        })
    }

    static associar(models) {
        this.belongsTo(models.Usuario, {
            foreignKey: "email",
            as: "usuario"
        })
    }
}

module.exports = Postagem