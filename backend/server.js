const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const db = require('./db');
const userRouter = require('./user/router');
const authenticationRouter = require('./authentication/router');
const blockRouter = require('./block/router');
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  rolling: true,
  saveUninitialized: false,
}));

app.use('/', authenticationRouter);
app.use('/user', userRouter);
app.use('/block', blockRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started and listening on port ${port}`));
