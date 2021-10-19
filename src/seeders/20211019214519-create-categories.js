"use strict";
const model = require("../models").Category;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const result = await model.findOne({ where: { id: 1 } });

    if (result) return false;

    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Essencial",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Educação",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Para o que quiser (livre estou)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Curto, médio ou longo prazo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Aposentadoria",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
