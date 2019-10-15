const {v4: uuid} = require('uuid');
const db = require('../db');
const {sort} = require('../utils');

const STATUSES = ['NOT_TESTED', 'TESTING', 'PASS', 'BATTERY_ISSUE', 'LIGHT_ISSUE'];

let blocks = {};

db.get('blocks')
  .then(result => blocks = JSON.parse(result))
  .catch(() => blocks = {});

const createBlock = (name, location) => ({
  id: uuid(),
  name,
  location,
  status: 'NOT_TESTED',
});

const getAllBlocks = (fields = []) => sort(Object.values(blocks), fields);

const getBlock = id => blocks[id];

const saveBlock = block => {
  blocks[block.id] = block;
  return db.put('blocks', JSON.stringify(blocks))
    .then(() => block);
};

const deleteBlock = id => {
  delete blocks[id];
  return db.put('blocks', JSON.stringify(blocks));
};

const findByNameAndLocation = (name, location) => Object.values(blocks)
  .find(b => b.name === name && b.location === location);

const startTest = block => {
  if (block.status === 'TESTING') {
    return Promise.resolve(block);
  }
  setTimeout(() => {
    if (Math.random() < 0.8) {
      return saveBlock({...block, status: 'PASS'})
    }
    saveBlock({...block, status: Math.random() < 0.5 ? 'BATTERY_ISSUE' : 'LIGHT_ISSUE'});
  }, 60000);
  return saveBlock({...block, status: 'TESTING'});
};

const report = (block, status) => {
  return saveBlock({...block, status: STATUSES.includes(status) && status || 'BATTERY_ISSUE'});
};

module.exports = {
  createBlock,
  getAllBlocks,
  getBlock,
  saveBlock,
  deleteBlock,
  findByNameAndLocation,
  startTest,
  report,
};
