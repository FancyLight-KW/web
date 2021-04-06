require("dotenv").config();
const env = process.env;

const development = {
  username: env.DB_USER,
  password: env.PASSWORD,
  database: env.DATABASE,
  dialect: "mysql",
  host: env.HOST,
  timezone: "+09:00",
};

const test = {
  username: env.DB_USER,
  password: env.PASSWORD,
  database: env.DATABASE,
  dialect: "mysql",
  host: env.HOST,
  timezone: "+09:00",
};

const production = {
  username: env.DB_USER,
  password: env.PASSWORD,
  database: env.DATABASE,
  dialect: "mysql",
  host: env.HOST,
  timezone: "+09:00",
};

module.exports = { development, test, production };
