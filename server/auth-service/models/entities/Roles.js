const sequelize = require("../../db");
const { DataTypes } = require("sequelize");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
  },
  { timestamps: false },
);
const defaultData = [
  {  name: "Админ" },
  {  name: "Учебный отдел" },
  {  name: "Деканат" },
  {  name: "Заведующий кафедрой" },
  {  name: "Препродователь" },
  {  name: "Староста" },
  {  name: "Студент" },
  {  name: "Родитель" },

];

const initializeRoles = async () => {
  for (const data of defaultData) {
    await Role.create(data);
  }
};
module.exports = { Role, initializeRoles };
