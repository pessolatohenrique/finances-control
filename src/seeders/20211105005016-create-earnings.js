"use strict";
const model = require("../models").Earning;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const result = await model.findOne({ where: { id: 1 } });

    if (result) return false;

    await queryInterface.bulkInsert(
      "earnings",
      [
        {
          name: "Salário",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Renda extra",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Restituição IR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Transferências",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Décimo terceiro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dividendos",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("earnings", null, {});
  },
};
