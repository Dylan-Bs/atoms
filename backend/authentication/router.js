const {Router} = require('express');
const {verify} = require('../user');

const router = Router();

router.post('/login', (req, res) => {
  const {name, password} = req.body;
  if (!name || !password) {
    return res.status(403).end();
  }
  verify(name, password)
    .then(user => {
      if (!user) {
        return res.status(403).end();
      }
      req.session.user = user;
      res.end();
    })
});

router.get('/me', (req, res) => {
  const {user} = req.session;
  if (!user) {
    return res.status(403).end();
  }
  res.json({id: user.id, name: user.name, role: user.role});
});

router.post('/logout', (req, res) => {
  req.session.destroy((error) => {
    res.status(error && 500 || 200).end()
  });
});

module.exports = router;
