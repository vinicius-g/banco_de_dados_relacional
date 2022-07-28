'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("postagens", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "email",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      conteudo: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("postagens")
  }
};
