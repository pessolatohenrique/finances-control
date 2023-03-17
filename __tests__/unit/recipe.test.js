const Recipe = require("../../src/models").Recipe;
const {
  mockExpenses,
  mockSumEarning,
  mockUserRecipe,
  mockRecipeComparative,
  mockCategoryId,
} = require("./mocks/recipe");

describe("Recipe", () => {
  test("it should map comparative recipe", async () => {
    const result = Recipe.mapComparativeRecipe(
      mockExpenses,
      mockSumEarning,
      mockUserRecipe
    );

    expect(result[0].name).toBe("Essencial");
    expect(result[0].value_expense).toBe(288.97);
  });

  test("it should filter expenses category when recipe_category is not empty", async () => {
    const result = Recipe.filterExpensesCategory(
      mockRecipeComparative,
      mockCategoryId
    );

    expect(result[0].percentage).toBe(55);
    expect(result[0].category_id).toBe(mockCategoryId);
  });

  test("it should filter expenses category when recipe_category is not empty", async () => {
    const result = Recipe.filterExpensesCategory([], mockCategoryId);
    expect(result.length).toBe(0);
  });

  test("it should find recipe comparative", async () => {
    const result = Recipe.findRecipeComparative(
      mockRecipeComparative,
      mockCategoryId
    );

    expect(result.percentage).toBe(55);
    expect(result.category_id).toBe(mockCategoryId);
  });

  test("it should sum comparative expenses", async () => {
    const result = Recipe.sumComparativeExpenses(mockExpenses);
    expect(result.toFixed(2)).toBe("489.93");
  });

  test("it should sum percentage spent", async () => {
    const result = Recipe.sumPercentageSpent(mockExpenses);
    expect(result.toFixed(2)).toBe("15.00");
  });

  test("it should consolidate comparative recipe", async () => {
    const result = Recipe.consolidateComparativeRecipe(
      mockRecipeComparative,
      mockSumEarning
    );

    expect(result[0].percentage).toBe(55);
    expect(result[0].value_expected.toFixed(2)).toBe("2012.78");
  });
});
