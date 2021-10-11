"use strict";
const model = require("../models").User;
const bcrypt = require("bcrypt");
const ROUNDS_BCRYPT = 12;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const result = await model.findOne({ where: { id: 1 } });

    if (result) return false;

    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "pessolatohenrique",
          email: "pessolatohenrique@gmail.com",
          password: await bcrypt.hash(
            process.env.DEFAULT_PASSWORD,
            ROUNDS_BCRYPT
          ),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "exemplousuario",
          email: "exemplousuario@gmail.com",
          password: await bcrypt.hash(
            process.env.DEFAULT_PASSWORD,
            ROUNDS_BCRYPT
          ),
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
