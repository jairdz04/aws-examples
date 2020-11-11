require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./endpoints')(app);

app.listen(process.env.PORT, () => {
  console.log('Listening on port ...', process.env.PORT);
});
