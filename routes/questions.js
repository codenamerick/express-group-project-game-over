const express = require("express");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const db = require("../db/models");
const { Question, User, Answer } = db;
const { check, validationResult } = require("express-validator");
const id = db.User.id;

const { requireAuth } = require("../auth");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const questions = await Question.findAll();
    res.render("questions", { questions });
  })
);

router.get(
  "/ask",
  requireAuth,
  asyncHandler(async (req, res) => {
    res.render("ask");
  })
);

router.post(
  "/ask",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { title, question, user_id } = req.body;
    const user = User.findOne(id);
    await Question.create({ title, question, user_id, user });

    res.redirect("/questions");
  })
);

router.get(
  "/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const question = await Question.findByPk(req.params.id,
      {
        include: Answer,
      }
    );

    if (question) {
      console.log(question, "___________________________");
      res.render("question-id", { question, csrfToken: req.csrfToken() });
    }
  })
);

// ANSWERING A QUESTION

//Answers validators
const answerValidators = [
  check("answer")
    .exists({ checkFalsy: true })
    .withMessage("Please provide email address."),
];

router.post(
  "/:id(\\d+)/answers",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { answer } = req.body;
    const { user_id } = req.session.auth;
    const question_id = parseInt(req.params.id, 10);

    // implement answer validators

    const newAnswer = await Answer.create({
      answer,
      user_id,
      question_id,
    });

    res.redirect(`/questions/${question_id}`, {
      newAnswer,
      csrfToken: req.csrfToken(),
    });
  })
);

// router.post('/ask', asyncHandler(async(req, res)=> {
//   const { title, question, user_id } = req.body;

//  const askQuestion = await Question.create({ title, question, user_id})

//   res.redirect('/questions/:id', { askQuestion })

// }))

const questionNotFoundError = (id) => {
  const err = Error("Question not found");
  err.errors = [`Question with id of ${id} could not be found.`];
  err.title = "Question not found.";
  err.status = 404;
  return err;
};

module.exports = router;
