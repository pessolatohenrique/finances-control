"use strict";
const model = require("../models").Author;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const result = await model.findOne({ where: { id: 1 } });

    if (result) return false;

    await queryInterface.bulkInsert(
      "authors",
      [
        {
          name: "Agatha Christie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Suzanne Collins",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "J.K Rowling",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "George Orwell",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Edgar Allan Poe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("authors", null, {});
  },
};
