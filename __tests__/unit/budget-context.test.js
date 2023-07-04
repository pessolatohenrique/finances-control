const BudgetContext = require("../../src/business/BudgetContext");
const UserEarningStrategy = require("../../src/business/UserEarningStrategy");
const UserExpenseStrategy = require("../../src/business/UserExpenseStrategy");

describe("Budget Context", () => {
  it("should instanciate and change budget context", () => {
    const instance = new BudgetContext(new UserEarningStrategy());
    expect(instance.strategy).toBeInstanceOf(UserEarningStrategy);

    instance.setStrategy(new UserExpenseStrategy());
    expect(instance.strategy).toBeInstanceOf(UserExpenseStrategy);
  })
})