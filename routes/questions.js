const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const { Question } = db;
const { check, validationResult } = require('express-validator');


// TODO: add requiredAuth to access questions text field

router.get('/', asyncHandler( async (req, res) => {
  const questions = await Question.findAll();
  res.render('questions', { questions } );
}))

router.get('/ask', asyncHandler(async (req, res) => {
  res.render('ask')
}));

router.get('/:id', asyncHandler(async(req, res) => {
  const question = await Question.findByPk(id)

  res.render('question-id', { question })

}));

const questionNotFoundError = (id) => {
  const err = Error("Question not found");
  err.errors = [`Question with id of ${id} could not be found.`];
  err.title = "Question not found.";
  err.status = 404;
  return err;
};


router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const question = await Question.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (question) {
      res.json({ question });
    } else {
      next(questionNotFoundError(req.params.id));
    }
  })
);


module.exports = router;
