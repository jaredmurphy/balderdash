const request = require('../../../helpers/request');
const { buildUser, createUser } = require('../../../factories/user');
const {
  auth: {
    errors: {
      users_email_key: { '23505': emailAlreadyTaken },
      users_username_key: { '23505': usernameAlreadyTaken },
      emailBlank,
      usernameBlank
    }
  }
} = require('../../../../src/config/en');

describe('post /api/auth/signUp', () => {
  describe('when the user credentials are valid', () => {
    let user, response;

    beforeEach(async () => {
      user = await buildUser();
      response = await request.post('/api/auth/signUp', user);
    });

    test('it responds with a 200', () => {
      expect(response.statusCode).toBe(200);
    });

    test('it responds with the user', () => {
      expect(response.body.id).toBeTruthy;
      expect(response.body.email).toBe(user.email);
      expect(response.body.username).toBe(user.username);
    });
  });

  describe('when the email is blank', () => {
    let response;

    beforeEach(async () => {
      const { username, password } = await buildUser();
      const params = { email: '', username, password };
      response = await request.post('/api/auth/signUp', params);
    });

    test('it responds with a 422', () => {
      expect(response.statusCode).toBe(422);
    });

    test('it responds with an error', () => {
      expect(response.body.error).toBe(emailBlank);
    });
  });

  describe('when the username is blank', () => {
    let response;

    beforeEach(async () => {
      const { email, password } = await buildUser();
      const params = { email, username: '', password };
      response = await request.post('/api/auth/signUp', params);
    });

    test('it responds with a 422', () => {
      expect(response.statusCode).toBe(422);
    });

    test('it responds with an error', () => {
      expect(response.body.error).toBe(usernameBlank);
    });
  });

  describe('when the password is blank', () => {
    let response;

    beforeEach(async () => {
      const { email, username } = await buildUser();
      const params = { email, username, password: '' };
      response = await request.post('/api/auth/signUp', params);
    });

    test('it responds with a 422', () => {
      expect(response.statusCode).toBe(422);
    });

    test('it responds with an error', () => {
      expect(response.body.error).toBe('Password cannot be blank');
    });
  });

  describe('when the email is already taken', () => {
    let response;

    beforeEach(async () => {
      const { email } = await createUser();
      const params = {
        email,
        username: 'newusername',
        password: 'newpassword'
      };
      response = await request.post('/api/auth/signUp', params);
    });

    test('it responds with a 422', () => {
      expect(response.statusCode).toBe(422);
    });

    test('it responds with an error', () => {
      expect(response.body.error).toBe(emailAlreadyTaken);
    });
  });

  describe('when the username is already taken', () => {
    let response;

    beforeEach(async () => {
      const { username } = await createUser();
      const params = {
        email: 'new@gmail.com',
        username,
        password: 'newpassword'
      };
      response = await request.post('/api/auth/signUp', params);
    });

    test('it responds with a 422', () => {
      expect(response.statusCode).toBe(422);
    });

    test('it responds with an error', () => {
      expect(response.body.error).toBe(usernameAlreadyTaken);
    });
  });
});
