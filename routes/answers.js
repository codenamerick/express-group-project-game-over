const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const db = require('../db/models');
const { Answer, Question } = db;


// EDITING AN ANSWER

// getting answer edit page
router.get('/:id(\\d+)/edit', csrfProtection, asyncHandler(async (req, res) => {
   const answer = await Answer.findByPk(req.params.id, {
      include: Question
   })
   res.render('answer-edit', { csrfToken: req.csrfToken(), answer })
}))

//submitting an edited answer
router.post('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
   const answer = await Answer.findByPk(req.params.id, {
      include: Question
   })
   const questionId = answer.Question.id;

   answer.answer = req.body.answer;
   await answer.save();

   res.redirect(`/questions/${questionId}`);
}))


module.exports = router;
