require('dotenv').config()
module.exports = {
  "development": {
    "username": "root",
    "password": "",
    "database": "inews",
    "port": 3306,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    username: process.env.PROD_DB_USERNAME,//qwUFNSgP8%)?
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  //heroku run sequelize db:migrate --env production --app desserve-backend
  "production": {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    "dialect": "postgres",
    "use_env_variable": process.env.DATABASE_URL,
    "ssl": true,
    "protocol": "postgres",

    "logging": true,
    "dialectOptions":{
      "ssl":{
        "require": true,
      "rejectUnauthorized": false
      }
    }
  }
}
