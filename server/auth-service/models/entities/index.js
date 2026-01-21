const { Role, initializeRoles } = require("./Roles");
const { User } = require("./Users");

const initModels = async () => {
  // await initializeRoles();
};
module.exports = {
  initModels,
  Role,
  User,
};
