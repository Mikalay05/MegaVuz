const joi = require("joi");

// For user creation, the following fields:

//Login: A required string with length between 4 and 50 characters
//Password: A required string with length between 8 and 32 characters
//Role: An integer

const userCreationShema = joi.object({
  login: joi.string().min(4).max(50).required(),
  password: joi.string().min(8).max(32).required(),
  roleId: joi.number().integer(),
});

module.exports = userCreationShema;
