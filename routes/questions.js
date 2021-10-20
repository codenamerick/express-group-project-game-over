const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const { Question, User } = db;
const { check, validationResult } = require('express-validator');
const id = db.User.id

// TODO: add requiredAuth to access questions text field

router.get('/', asyncHandler( async (req, res) => {
  const questions = await Question.findAll();
  res.render('questions', { questions } );
}))

router.get('/ask', asyncHandler(async (req, res) => {
  res.render('ask')
}));



router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const question = await Question.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (question) {
      res.render("question-id", { question });
    }
  })
);

// router.post('/ask', asyncHandler(async(req, res)=> {
//   const { title, question, user_id } = req.body;

//  const askQuestion = await Question.create({ title, question, user_id})

//   res.redirect('/questions/:id', { askQuestion })

// }))

router.post('/ask', asyncHandler(async(req, res) => {
  const { title, question, user_id } = req.body;
  const user = User.findOne(id)
  await Question.create({ title, question, user_id, user});

  res.redirect('/')
}));

const questionNotFoundError = (id) => {
  const err = Error("Question not found");
  err.errors = [`Question with id of ${id} could not be found.`];
  err.title = "Question not found.";
  err.status = 404;
  return err;
};




module.exports = router;
