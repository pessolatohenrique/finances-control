class BudgetContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  mountQuery({ month, year, user }) {
    return this.strategy.mountQuery({ month, year, user });
  }

  sumValues() {
    return this.strategy.sumValues();
  }

  findAllEntity() {
    return this.strategy.findAllEntity();
  }
}

module.exports = BudgetContext;