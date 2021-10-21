const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const db = require('../db/models');
const { Answer, Question } = db;


// EDITING AN ANSWER

// getting answer edit page
router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
   const answer = await Answer.findByPk(req.params.id, {
      include: Question
   })
   res.render('answer-edit', { csrfToken: req.csrfToken(), answer })
}))

//submitting an edited answer



module.exports = router;
