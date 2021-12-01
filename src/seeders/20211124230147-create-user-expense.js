"use strict";
const model = require("../models").UserExpense;
const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const result = await model.findOne({ where: { userId: 1 } });

    if (result) return false;

    await queryInterface.bulkInsert(
      "user_expense",
      [
        {
          userId: 1,
          expenseId: 1,
          categoryId: 1,
          value: 400,
          transaction_date: "2021-09-05",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          expenseId: 2,
          categoryId: 1,
          value: 150,
          transaction_date: "2021-09-05",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          expenseId: 3,
          categoryId: 3,
          value: 300,
          transaction_date: "2021-09-20",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          expenseId: 1,
          categoryId: 1,
          value: 401,
          transaction_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          expenseId: 2,
          categoryId: 1,
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
    await queryInterface.bulkDelete("user_expense", null, {});
  },
};
