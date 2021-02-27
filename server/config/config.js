require("dotenv").config();
const env = process.env;

const development = {
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: "mysql",
};

const test = {
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: "mysql",
};

const production = {
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: "mysql",
};

module.exports = { development, test, production };
