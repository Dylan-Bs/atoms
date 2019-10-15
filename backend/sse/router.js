const {Router} = require('express');
const {authenticated} = require('../authentication');
const {register, unregister, notify} = require('.');

const router = Router();

router.get('/', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.write('\n');
  register(res);
  req.on('close', () => unregister(res));
});

module.exports = router;
