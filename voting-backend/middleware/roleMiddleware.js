// Ensure user has one of the allowed roles
module.exports = function(allowedRoles = []) {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Forbidden: insufficient rights' });
      }
      next();
    };
  };
  