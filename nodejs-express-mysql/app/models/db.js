const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  connectionLimit : 1000,
  connectTimeout  : 60 * 60 * 1000,
  acquireTimeout  : 60 * 60 * 1000,
  timeout         : 60 * 60 * 1000,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  port: 3306,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;
