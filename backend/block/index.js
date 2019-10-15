const {v4: uuid} = require('uuid');
const db = require('../db');
const {sort} = require('../utils');

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

module.exports = {createBlock, getAllBlocks, getBlock, saveBlock, deleteBlock, findByNameAndLocation};
