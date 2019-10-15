const level = require('level');

const db = level('db');
db.open();

module.exports = db;
