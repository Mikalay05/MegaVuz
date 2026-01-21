const { User } = require("../models/entities/Users");



class UserService {
    create = async (data) => {
        //TODO Add validate
        const result = await User.create();
        return result;
    }
}

module.exports = new UserService();