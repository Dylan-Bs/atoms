const {Router} = require('express');
const {authenticated, hasRole} = require('../authentication');
const {ROLES, getAllUsers, createUser, getUser, saveUser, hashPassword, deleteUser, findByName} = require('.');

const getRole = role => ROLES.includes(role) && role;

const router = Router();

router.get('/', authenticated, (req, res) => res.json(getAllUsers()));

router.get('/:id', authenticated, (req, res) => {
  const {id} = req.params;
  const user = getUser(id);
  if (!user) {
    return res.status(404).json({error: 'Unknown user'})
  }
  res.json(user);
});

router.post('/', hasRole('ADMIN'), (req, res) => {
  const {name, password} = req.body;
  const role = getRole(req.body.role) || 'USER';
  if (!name || !password) {
    return res.status(400).json({error: 'Missing name or password'});
  }
  if (findByName(name)) {
    return res.status(400).json({error: 'Name already in use'});
  }
  createUser(name, password, role)
    .then(saveUser)
    .then(user => res.json(user.id))
});

router.put('/:id', hasRole('ADMIN'), (req, res) => {
  const {id} = req.params;
  const user = getUser(id);
  if (!user) {
    return res.status(404).json({error: 'Unknown user'})
  }
  const name = req.body.name || user.name;
  const role = getRole(req.body.role) || user.role;
  const existing = findByName(name);
  if (existing && existing.id !== id) {
    return res.status(400).json({error: 'Name already in use'});
  }
  if (req.body.password) {
    hashPassword(req.body.password)
      .then(password => saveUser({...user, name, role, password}))
      .then(() => res.end());
  } else {
    saveUser({...user, name, role})
      .then(() => res.end());
  }
});

router.delete('/:id', hasRole('ADMIN'), (req, res) => {
  const {id} = req.params;
  deleteUser(id);
  res.end();
});

module.exports = router;
