"use strict";
const model = require("../models").Recipe;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const result = await model.findOne({ where: { id: 1 } });

    if (result) return false;

    await queryInterface.bulkInsert(
      "recipes",
      [
        {
          name: "By Nath Arcuri",
          isPublic: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "By Harv Eker",
          isPublic: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("recipes", null, {});
  },
};
