const {sortWith, ascend, descend, prop} = require('ramda');

const fieldToComparator = field => {
  const match = field.match(/([-+])?(\w+)/);
  const fieldName = match[2];
  return match[1] === '-' ? descend(prop(fieldName)) : ascend(prop(fieldName));
};

const sort = (blocks, elements) => sortWith(elements.map(fieldToComparator), blocks);

module.exports = {sort};
