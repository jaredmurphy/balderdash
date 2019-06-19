const express = require('express');
const {
  auth: {
    errors: { emailBlank, usernameBlank, passwordBlank }
  }
} = require('../../config/en');

module.exports = (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || email === '') {
    res.error = emailBlank;
  } else if (!username || username === '') {
    res.error = usernameBlank;
  } else if (!password || password === '') {
    res.error = passwordBlank;
  }

  next();
};
