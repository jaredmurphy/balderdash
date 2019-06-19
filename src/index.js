const express = require('express');
const { app } = require('./loaders');
const config = require('./config');

app.listen(config.port, err => {
  if (err) {
    console.log('error', err);
    process.exit(1);
    return;
  }

  console.log(`
      ##################################
        SERVER LISTENING ON PORT: ${config.port}
      ##################################
  `);
});
