require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router');

const port = process.env.PORT;

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
