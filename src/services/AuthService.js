const argon2 = require('argon2');
const randomBytes = require('randombytes');
const User = require('../models/user');

const signUp = async ({ email, username, password }) => {
  const hashedPassword = await hashPassword({ password });

  const userRecord = await User.create({
    hashedPassword,
    email,
    username
  });

  if (userRecord.error) {
    return userRecord;
  } else {
    return {
      id: userRecord.id,
      email: userRecord.email,
      username: userRecord.username
    };
  }
};

const hashPassword = async ({ password }) => {
  return await argon2.hash(password, { salt: randomBytes(32) });
};

module.exports = { signUp, hashPassword };
