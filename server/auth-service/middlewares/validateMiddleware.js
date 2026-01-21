const ApiError = require("../error/ApiError");

module.exports = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body || {});
    console.log("schema", schema);
    console.log("result", result);
    const error = result.error;
    if (error) {
      throw ApiError.badRequest(error.details[0].message);
    }
    next();
  };
};
