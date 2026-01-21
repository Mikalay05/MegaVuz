const UserCreationDto = require("../DTO/UserCreationDto");
const UserService = require("../services/UserService");

class UserController {
    createUser = async (req, res,next) => {
        const dataDto = UserCreationDto(req.data)
        const result = UserService.create(dataDto)
    }
}
module.exports = new UserController();
