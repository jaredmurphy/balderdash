const Factory = require('rosie').Factory;
const faker = require('faker');
const User = require('../../src/models/User');
const { hashPassword } = require('../../src/services/AuthService');

const buildUser = async () => {
  return await new Factory()
    .attr('email', faker.internet.email())
    .attr('username', faker.internet.userName())
    .attr('password', faker.internet.password())
    .build();
};

const createUser = async () => {
  const { email, username, password } = await buildUser();
  const hashedPassword = await hashPassword({ password });
  const createdUser = await User.create({ email, username, hashedPassword });

  return { email, username, password };
};

module.exports = {
  buildUser,
  createUser
};
