const db = require('./db/models');

const loginUser = (req, res, user) => {
  req.session.auth = {
    user_id: user.id,
  };
};

const logoutUser = (req, res) => {
  delete req.session.auth;
};

const restoreUser = async (req, res, next) => {
  if (req.session.auth) {
    const { user_id } = req.session.auth;

    try {
      const user = await db.User.findByPk(user_id);

      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next()
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next()
  }
};

const requireAuth = (req, res) => {
  if (!res.locals.authenticated) {
    res.redirect('/users/login');
  } else {
    next();
  }
};

module.exports = { loginUser, restoreUser, logoutUser, requireAuth }
