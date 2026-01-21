require("dotenv").config();
const express = require("express");
const route = require("./routes/index");
const cors = require("cors");
const sequelize = require("./db");
const models = require("./models/entities/index");

const apiName = process.env.API_NAME;
const port = process.env.PORT;
const app = express();
app.use(express.json())
app.use(`/${apiName}`, route);
const errorHandlingMiddleware = require('./middlewares/ErrorHandlingMiddleware');
app.use(errorHandlingMiddleware)
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await models.initModels();

    app.listen(port, () => {
      console.log(`AUTH_SERVICE is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.log("FAIL START AUTH_SERVICE. Error: ", err);
  }
};

start();

// const CLIENT_ORIGIN = 'http://localhost:3000';
// const corsOptions = {
//     origin: CLIENT_ORIGIN,
//     credentials: true,
// };
// const express = require('express');
// const sequelize = require('sequelize')
// const app = express();

// const start = async () => {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync();
//     await models.initModels();

//     app.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port}`);
//     });
//   } catch (err) {
//     console.log("INDEX. Ошибка в Start: Error", err);
//   }
// };
// start();
