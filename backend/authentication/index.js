const authenticated = (req, res, next) => {
  if(!req.session.user) {
    return res.status(403).end();
  }
  next();
};

const isA = role => (req, res, next) => {
  const user = req.session.user;
  if(!user || user.role !== role) {
    return res.status(403).end();
  }
  next();
};

module.exports = {authenticated, hasRole: isA};
