require("dotenv").config();
const env = process.env;

const development = {
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: "mysql",
  host: process.env.HOST,
  timezone: "+09:00",
};

const test = {
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: "mysql",
  host: process.env.HOST,
  timezone: "+09:00",
};

const production = {
  username: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: "mysql",
  host: process.env.HOST,
  timezone: "+09:00",
};

module.exports = { development, test, production };
