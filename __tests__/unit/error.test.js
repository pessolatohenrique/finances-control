const {
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  InvalidPasswordKey,
  BadRequestError,
  RecipeNotAssociatedError,
  KafkaNotConnected,
} = require("../../src/utils/Errors");

describe("Error Utils", () => {
  it("should create a new instance of UnauthorizedError with the correct properties", () => {
    const error = new UnauthorizedError();
    expect(error.name).toEqual("UnauthorizedError");
    expect(error.status).toEqual(401);
  });

  it("should create a new instance of NotFoundError with the correct properties", () => {
    const error = new NotFoundError();
    expect(error.name).toEqual("NotFoundError");
    expect(error.status).toEqual(404);
  });

  it("should create a new instance of ForbiddenError with the correct properties", () => {
    const error = new ForbiddenError();
    expect(error.name).toEqual("ForbiddenError");
    expect(error.status).toEqual(403);
  });

  it("should create a new instance of InvalidPasswordKey with the correct properties", () => {
    const error = new InvalidPasswordKey();
    expect(error.name).toEqual("InvalidPasswordKey");
    expect(error.status).toEqual(401);
  });

  it("should create a new instance of BadRequestError with the correct properties", () => {
    const error = new BadRequestError();
    expect(error.name).toEqual("BadRequestError");
    expect(error.status).toEqual(400);
  });

  it("should create a new instance of RecipeNotAssociatedError with the correct properties", () => {
    const error = new RecipeNotAssociatedError();
    expect(error.name).toEqual("RecipeNotAssociatedError");
    expect(error.status).toEqual(400);
  });

  it("should create a new instance of KafkaNotConnected with the correct properties", () => {
    const error = new KafkaNotConnected();
    expect(error.name).toEqual("KafkaNotConnected");
    expect(error.status).toEqual(504);
  });
});
