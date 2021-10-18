const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils')
const db = require('../db/models')
const { User } = db
/* GET users listing. */
router.get('/sign-up', csrfProtection ,asyncHandler(async(req, res) => {
  res.send('respond with a resource');

}));

module.exports = router;
