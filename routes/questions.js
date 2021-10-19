const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const { Questions } = db;
const { check, validationResult } = require('express-validator');
// TODO: add requiredAuth to access questions text field

router.get('/', asyncHandler( async (req, res) => {
  const questions = await Questions.findAll();
  res.render({ questions });
}))

router.get('/ask', asyncHandler(async (req, res) => {
  res.render('ask')
}));




module.exports = router;
