const { User } = require("../models/entities/Users");



class UserService {
    create = async (data) => {
        const result = await User.create();
        return result;
    }
}

module.exports = new UserService(); 