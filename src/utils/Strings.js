convertRouteToPermission = (route) => {
  const permissionSplit = route.split("/");
  const permissionName = permissionSplit[1].replace("/", "");

  return permissionName;
};

module.exports = { convertRouteToPermission };
