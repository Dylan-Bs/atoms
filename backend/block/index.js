const {sortWith, ascend, descend, prop} = require('ramda');
const {v4: uuid} = require('uuid');
const db = require('../db');

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

const fieldToComparator = field => {
  const match = field.match(/([-+])?(\w+)/);
  const fieldName = match[2];
  return match[1] === '-' ? descend(prop(fieldName)) : ascend(prop(fieldName));
};

const sort = (blocks, fields) => sortWith(fields.map(fieldToComparator), blocks);

const getAllBlocks = (fields = []) => sort(Object.values(blocks), fields);

const getBlock = id => blocks[id];

const saveBlock = block => {
  blocks[block.id] = block;
  return db.put('blocks', JSON.stringify(blocks))
    .then(() => block);
};

const deleteBlock = id => delete blocks[id];

const findByNameAndLocation = (name, location) => Object.values(blocks)
  .find(b => b.name === name && b.location === location);

module.exports = {createBlock, getAllBlocks, getBlock, saveBlock, deleteBlock, findByNameAndLocation};
