const {v4: uuid} = require('uuid');
const db = require('../db');
const {sort} = require('../utils');

const STATUSES = ['NOT_TESTED', 'PASS', 'BATTERY_ISSUE', 'LIGHT_ISSUE'];

let results = {};

db.get('results')
  .then(result => results = JSON.parse(result))
  .catch(() => results = {});

const getStatus = status => STATUSES.includes(status) && status || 'NOT_TESTED';

const createResult = (blockId, status, date) => ({id: uuid(), blockId, status: getStatus(status), date});

const getAllResults = (fields = ['-date']) => sort(Object.values(results), fields);

const getResult = id => results[id];

const saveResult = result => {
  results[result.id] = result;
  return db.put('results', JSON.stringify(results))
    .then(() => result);
};

const deleteResult = id => {
  delete results[id];
  return db.put('results', JSON.stringify(results))
};

const findByBlockId = blockId => Object.values(results).filter(r => r.blockId === blockId);

module.exports = {createResult, getAllResults, getResult, saveResult, deleteResult, findByBlockId};
