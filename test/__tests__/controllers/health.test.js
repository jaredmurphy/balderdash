const request = require('../../helpers/request');

describe('GET /status', () => {
  test('returns a 200', () => {
    return request.get('/status').then(res => {
      expect(res.statusCode).toBe(200);
    });
  });
});
