const { convertRouteToPermission } = require("../../src/utils/Strings");
describe("String Utils", () => {
  it('should convert route "/budget/summarize" to "budget"', () => {
    const result = convertRouteToPermission("/budget/summarize");
    expect(result).toEqual("budget");
  });
});
