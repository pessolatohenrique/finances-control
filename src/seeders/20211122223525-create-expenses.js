"use strict";
const model = require("../models").Expense;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const result = await model.findOne({ where: { id: 1 } });

    if (result) return false;

    await queryInterface.bulkInsert(
      "expenses",
      [
        {
          name: "Energia Elétrica",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Água",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Internet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Celular",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("expenses", null, {});
  },
};
