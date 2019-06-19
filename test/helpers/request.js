const supertest = require('supertest');
const { app } = require('../../src/loaders');

module.exports = {
  get: route => {
    return supertest(app).get(route);
  },
  post: (route, params) => {
    return supertest(app)
      .post(route)
      .send(params);
  }
};
