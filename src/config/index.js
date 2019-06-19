const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  port: parseInt(process.env.PORT, 10),
  pgDatabaseURL: process.env.PG_DATABASE_URL,
  pgTestDatabaseURL: process.env.PG_TEST_DATABASE_URL,
  jwtSignature: process.env.JWT_SIGNATURE,
  jwtSecret: process.env.JWT_SECRET
};
