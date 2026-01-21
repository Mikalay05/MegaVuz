const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: false },
);
// const initializeRoles = async () => {
//   for (const data of defaultData) {
//     // await Role.create(data);
//   }
// };
module.exports = { User };
