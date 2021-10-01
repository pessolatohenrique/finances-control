const methodsRoles = {
  GET: "read",
  POST: "create",
  PUT: "update",
  DELETE: "delete",
};

convertHttpToRole = (method) => {
  if (method.includes("restore")) {
    return "update";
  }

  return methodsRoles[method];
};

module.exports = { convertHttpToRole };
