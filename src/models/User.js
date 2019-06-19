const db = require('../loaders/pg');

const {
  auth: { errors: authErrors }
} = require('../config/en.js');

const create = async ({ email, username, hashedPassword }) => {
  return await db
    .one(
      'INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id, email, username, password;',
      [email, username, hashedPassword]
    )
    .catch(err => {
      return { error: authErrors[err.constraint][err.code] };
    })
    .then(function(user) {
      return user;
    });
};

module.exports = { create };
