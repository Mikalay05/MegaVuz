const userRoute = require('express').Router();
const UserController = require('../controller/UserController');
const validateMiddleware = require('../middlewares/validateMiddleware');
const userCreationShema = require('../validators/userValidator')

userRoute.post('/create', validateMiddleware(userCreationShema), UserController.createUser)

module.exports = userRoute;