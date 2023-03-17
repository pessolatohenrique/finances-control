const mockExpenses = [
  {
    value: 288.97,
    value_expense: 288.97,
    percentage_spent: 5,
    transaction_date: "2022-04-25T00:00:00.000Z",
    createdAt: "2022-04-25T20:04:23.000Z",
    updatedAt: "2022-04-25T20:04:23.000Z",
    deletedAt: null,
    expenseId: 8,
    userId: 1,
    categoryId: 1,
    id: 19,

    Expense: {
      id: 8,
      name: "Internet Vivo",
      isPublic: true,
      createdAt: "2022-04-25T23:04:23.000Z",
      updatedAt: "2022-04-25T23:04:23.000Z",
      deletedAt: null,
      userExpenseCategory: {
        expenseId: 8,
        userId: 1,
        Category: {
          id: 1,
          name: "Essencial",
          createdAt: "2021-12-01T18:42:59.000Z",
          updatedAt: "2021-12-01T18:42:59.000Z",
          deletedAt: null,
        },
      },
    },
  },
  {
    value: 50.99,
    value_expense: 50.99,
    percentage_spent: 5,
    transaction_date: "2022-04-25T00:00:00.000Z",
    createdAt: "2022-04-25T20:04:24.000Z",
    updatedAt: "2022-04-25T20:04:24.000Z",
    deletedAt: null,
    expenseId: 9,
    userId: 1,
    categoryId: 1,
    id: 20,

    Expense: {
      id: 9,
      name: "Celular Vivo",
      isPublic: true,
      createdAt: "2022-04-25T23:04:24.000Z",
      updatedAt: "2022-04-25T23:04:24.000Z",
      deletedAt: null,
      userExpenseCategory: {
        expenseId: 9,
        userId: 1,
        Category: {
          id: 1,
          name: "Essencial",
          createdAt: "2021-12-01T18:42:59.000Z",
          updatedAt: "2021-12-01T18:42:59.000Z",
          deletedAt: null,
        },
      },
    },
  },
  {
    value: 149.97,
    value_expense: 149.97,
    percentage_spent: 5,
    transaction_date: "2022-04-25T00:00:00.000Z",
    createdAt: "2022-04-25T20:04:24.000Z",
    updatedAt: "2022-04-25T20:04:24.000Z",
    deletedAt: null,
    expenseId: 10,
    userId: 1,
    categoryId: 3,
    id: 21,

    Expense: {
      id: 10,
      name: "Hering - 3 camisetas",
      isPublic: true,
      createdAt: "2022-04-25T23:04:24.000Z",
      updatedAt: "2022-04-25T23:04:24.000Z",
      deletedAt: null,
      userExpenseCategory: {
        expenseId: 10,
        userId: 1,
        Category: {
          id: 3,
          name: "Para o que quiser (livre estou)",
          createdAt: "2021-12-01T18:42:59.000Z",
          updatedAt: "2021-12-01T18:42:59.000Z",
          deletedAt: null,
        },
      },
    },
  },
];

const mockSumEarning = 3659.600006103516;

const mockUserRecipe = {
  id: 1,
  name: "By Nath Arcuri",
  isPublic: true,
  createdAt: "2021-12-01T18:42:59.000Z",
  updatedAt: "2021-12-01T18:42:59.000Z",
  deletedAt: null,
  Categories: [
    {
      id: 1,
      name: "Essencial",
      createdAt: "2021-12-01T18:42:59.000Z",
      updatedAt: "2021-12-01T18:42:59.000Z",
      deletedAt: null,
      RecipeCategory: {
        percentage: 55,
        createdAt: "2021-12-01T18:43:00.000Z",
        updatedAt: "2021-12-01T18:43:00.000Z",
        categoryId: 1,
        recipeId: 1,
      },
    },
    {
      id: 5,
      name: "Aposentadoria",
      createdAt: "2021-12-01T18:42:59.000Z",
      updatedAt: "2021-12-01T18:42:59.000Z",
      deletedAt: null,
      RecipeCategory: {
        percentage: 10,
        createdAt: "2021-12-01T18:43:00.000Z",
        updatedAt: "2021-12-01T18:43:00.000Z",
        categoryId: 5,
        recipeId: 1,
      },
    },
    {
      id: 2,
      name: "Educação",
      createdAt: "2021-12-01T18:42:59.000Z",
      updatedAt: "2021-12-01T18:42:59.000Z",
      deletedAt: null,
      RecipeCategory: {
        percentage: 5,
        createdAt: "2021-12-01T18:43:00.000Z",
        updatedAt: "2021-12-01T18:43:00.000Z",
        categoryId: 2,
        recipeId: 1,
      },
    },
    {
      id: 4,
      name: "Curto, médio ou longo prazo",
      createdAt: "2021-12-01T18:42:59.000Z",
      updatedAt: "2021-12-01T18:42:59.000Z",
      deletedAt: null,
      RecipeCategory: {
        percentage: 20,
        createdAt: "2021-12-01T18:43:00.000Z",
        updatedAt: "2021-12-01T18:43:00.000Z",
        categoryId: 4,
        recipeId: 1,
      },
    },
    {
      id: 3,
      name: "Para o que quiser (livre estou)",
      createdAt: "2021-12-01T18:42:59.000Z",
      updatedAt: "2021-12-01T18:42:59.000Z",
      deletedAt: null,
      RecipeCategory: {
        percentage: 10,
        createdAt: "2021-12-01T18:43:00.000Z",
        updatedAt: "2021-12-01T18:43:00.000Z",
        categoryId: 3,
        recipeId: 1,
      },
    },
  ],
};

const mockRecipeComparative = [
  {
    name: "Essencial",
    percentage: 55,
    value_expected: 2012.780003356934,
    value_spent: 339.96000000000004,
    percentage_spent: 9.29,
    category_id: 1,
  },
  {
    name: "Para o que quiser (livre estou)",
    percentage: 10,
    value_expected: 365.96000061035164,
    value_spent: 149.97,
    percentage_spent: 4.1,
  },
];

const mockCategoryId = 1;

const mockEarnings = [
  {
    value: 3500,
    transaction_date: "2022-04-25T00:00:00.000Z",
    createdAt: "2022-04-25T20:06:21.000Z",
    updatedAt: "2022-04-25T20:06:21.000Z",
    deletedAt: null,
    earningId: 1,
    userId: 1,
    id: 10,
    Earning: {
      id: 1,
      name: "Salário",
      isPublic: "1",
      createdAt: "2021-12-01T18:43:00.000Z",
      updatedAt: "2021-12-01T18:43:00.000Z",
      deletedAt: null,
    },
  },
  {
    value: 159.6,
    transaction_date: "2022-04-25T00:00:00.000Z",
    createdAt: "2022-04-25T20:06:22.000Z",
    updatedAt: "2022-04-25T20:06:22.000Z",
    deletedAt: null,
    earningId: 6,
    userId: 1,
    id: 11,
    Earning: {
      id: 6,
      name: "Dividendos",
      isPublic: "1",
      createdAt: "2021-12-01T18:43:00.000Z",
      updatedAt: "2021-12-01T18:43:00.000Z",
      deletedAt: null,
    },
  },
];

module.exports = {
  mockExpenses,
  mockSumEarning,
  mockUserRecipe,
  mockRecipeComparative,
  mockCategoryId,
  mockEarnings,
};
