/**
 * extends Error to add some specific methods
 */
class CommonError extends Error {
  getStatusCode() {
    return this.status;
  }
}

/**
 * represents unauthorized error, like invalid username or password
 */
class UnauthorizedError extends CommonError {
  constructor() {
    super("Invalid username or password");
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}

/**
 * represents entity not found, like not founded book
 */
class NotFoundError extends CommonError {
  constructor() {
    super("Entity not found");
    this.name = "NotFoundError";
    this.status = 404;
  }
}

/**
 * represents forbidden error, configured based on rbac
 */
class ForbiddenError extends CommonError {
  constructor() {
    super("Forbidden. Verify the user permission");
    this.name = "ForbiddenError";
    this.status = 403;
  }
}

/**
 * represents invalid key for reset password
 */
class InvalidPasswordKey extends CommonError {
  constructor() {
    super("Invalid password key");
    this.name = "InvalidPasswordKey";
    this.status = 401;
  }
}

module.exports = {
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  InvalidPasswordKey,
};
