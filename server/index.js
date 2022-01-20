const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const cities = require('./cities');

app.get('/api/get', (request, res) => {
  res.status(200).send(cities);
});

app.use('/', express.static(path.join(__dirname, '../dist')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
