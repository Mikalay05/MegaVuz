const UserCreationDto = require("../DTO/UserCreationDto");
const UserService = require("../services/UserService");

class UserController {
  createUser = async (req, res, next) => {
    try {
      const dataDto = new UserCreationDto(req.body || {});

      const result = await UserService.create(dataDto);

      return res.status(200).json({
        message: "User created",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
