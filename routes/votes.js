const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');

const { Vote } = require('../db/models');

router.get('/', asyncHandler(async(req, res) => {
   res.send('you made it into the votes router!!!')
}))


module.exports = router;
