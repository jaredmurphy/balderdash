const { pgDatabaseURL, pgTestDatabaseURL } = require('../config');
const pgp = require('pg-promise')();

let db;

if (process.env.NODE_ENV === 'test') {
  db = pgp(pgTestDatabaseURL);
} else {
  console.log('🤘PG loaded');
  db = pgp(pgDatabaseURL);
}

module.exports = db;
