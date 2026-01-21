const { Op, Sequelize } = require("sequelize");

const  {Role,User, initModels} = require('./entities/index')

module.exports= {Role,User, initModels}