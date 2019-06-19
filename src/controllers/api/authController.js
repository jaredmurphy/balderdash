const express = require('express');
const router = express.Router();
const { signUpValidator } = require('../../middlewares/authValidator');
const { signUp } = require('../../services/AuthService');

router.post('/signUp', signUpValidator, async (req, res, next) => {
  // Do not try to create user if request fails validation
  if (res.error) {
    res.status(422);
    res.send({ error: res.error });
    return;
  }

  const { email, username, password } = req.body;
  const user = await signUp({ email, username, password });

  if (user.error) {
    res.status(422);
    res.send(user);
  } else {
    res.status(200);
    res.send(user);
  }
});

module.exports = router;
