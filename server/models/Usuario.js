const { Model, DataTypes } = require("sequelize")

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            senha: DataTypes.INTEGER
        }, {
            sequelize
        })
    }

    static associar(models) {
        this.hasMany(models.Postagem, {
            foreignKey: "email",
            as: "postagens"
        })
    }
}

module.exports = Usuario