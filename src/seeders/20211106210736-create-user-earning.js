"use strict";
const model = require("../models").UserEarning;
const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const result = await model.findOne({ where: { userId: 1 } });

    if (result) return false;

    await queryInterface.bulkInsert(
      "user_earning",
      [
        {
          userId: 1,
          earningId: 1,
          value: 4000,
          transaction_date: "2022-01-05",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          earningId: 2,
          value: 150,
          transaction_date: "2022-01-05",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          earningId: 1,
          value: 4019,
          transaction_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          earningId: 2,
          value: 150,
          transaction_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_earning", null, {});
  },
};
