"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user_earning", {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "users", // Name of the created table
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      earningId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "earnings", // Name of the created table
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      transaction_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user_earning");
  },
};
