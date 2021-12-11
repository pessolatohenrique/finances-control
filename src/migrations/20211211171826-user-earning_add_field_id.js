"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("user_earning", "id", {
      allowNull: false,
      autoIncrement: true,
      after: "earningId",
      primaryKey: true,
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("user_earning", "id");
  },
};
