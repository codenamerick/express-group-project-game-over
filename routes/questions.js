const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const { Questions } = db;
const { check, validationResult } = require('express-validator');
// TODO: add requiredAuth to access questions text field

router.get('/', asyncHandler(async (req, res) => {
  res.send(' This is the questions page')
}))

module.exports = router;
