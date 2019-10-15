const {Router} = require('express');
const {authenticated, hasRole} = require('../authentication');
const {getAllBlocks, getBlock, findByNameAndLocation, createBlock, saveBlock, deleteBlock} = require('.');

const router = Router();

router.get('/', authenticated, (req, res) => res.json(getAllBlocks()));

router.get('/:id', authenticated, (req, res) => {
  const {id} = req.params;
  const block = getBlock(id);
  if (!block) {
    return res.status(404).json({error: 'Unknown block'})
  }
  res.json(block);
});

router.post('/', hasRole('ADMIN'), (req, res) => {
  const {name, location} = req.body;
  if (!name || !location) {
    return res.status(400).json({error: 'Missing name or location'});
  }
  if (findByNameAndLocation(name, location)) {
    return res.status(400).json({error: 'A block with same name and location already exists'});
  }
  saveBlock(createBlock(name, location))
    .then(block => res.json(block.id));
});

router.put('/:id', hasRole('ADMIN'), (req, res) => {
  const {id} = req.params;
  const block = getBlock(id);
  if (!block) {
    return res.status(404).json({error: 'Unknown block'})
  }
  const name = req.body.name || block.name;
  const location = req.body.location || block.location;
  const existing = findByNameAndLocation(name, location);
  if (existing && existing.id !== id) {
    return res.status(400).json({error: 'A block with same name and location already exists'});
  }
  saveBlock({...block, name, location})
    .then(() => res.end());
});

router.delete('/:id', hasRole('ADMIN'), (req, res) => {
  const {id} = req.params;
  deleteBlock(id);
  res.end();
});

module.exports = router;
