const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { User } = db


/* GET users listing. */

// insert user creation validators


// get routes
router.get('/sign-up', csrfProtection ,asyncHandler(async(req, res) => {
  const user =await User.build();
  res.render('sign-up', { user, csrfToken: req.csrfToken() });

}));

module.exports = router;
