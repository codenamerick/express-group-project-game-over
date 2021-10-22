const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { Vote, Answer } = require('../db/models');
const { requireAuth } = require("../auth");

router.get('/', asyncHandler(async (req, res) => {
   res.send('you made it to the Vote route handler!')
}))


module.exports = router;
