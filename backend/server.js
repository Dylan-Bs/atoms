const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const session = require('express-session');
const userRouter = require('./user/router');
const authenticationRouter = require('./authentication/router');
const blockRouter = require('./block/router');
const sseRouter = require('./sse/router');
require('dotenv').config();

const app = express();

app.use(cors());
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
app.use('/stream', sseRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started and listening on port ${port}`));
