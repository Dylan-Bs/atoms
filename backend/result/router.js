const {Router} = require('express');
const {authenticated, hasRole} = require('../authentication');
const {getAllResults, getResult, deleteResult} = require('.');

const router = Router();

router.get('/', authenticated, (req, res) => {
  const {sortBy} = req.query;
  const fields = sortBy && sortBy.split(',') || undefined;
  return res.json(getAllResults(fields));
});

router.get('/:id', authenticated, (req, res) => {
  const {id} = req.params;
  const result = getResult(id);
  if (!result) {
    return res.status(404).json({error: 'Unknown result'});
  }
  res.json(result);
});

router.delete('/:id', hasRole('ADMIN'), (req, res) => {
  const {id} = req.params;
  deleteResult(id)
    .then(() => res.end());
});


module.exports = router;
