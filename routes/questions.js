const express = require("express");
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const db = require("../db/models");
const { Question, User, Answer, Vote } = db;
const { check, validationResult } = require("express-validator");
const id = db.User.id;

const { requireAuth } = require("../auth");

// question validators
const questionValidators = [
  check("question")
    .exists({ checkFalsy: true })
    .withMessage("A questions content can not be blank."),
];

router.get('/', asyncHandler(async (req, res) => {
  const questions = await Question.findAll({
    limit: 15,
    order: [['createdAt', 'DESC']],
  });
  res.render('questions', { questions });
}))

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
    const newQuestion = await Question.create({ title, question, user_id, user });
    res.redirect(`/questions/${newQuestion.id}`);
  })
);


router.get(
  "/:id(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const question = await Question.findByPk(req.params.id, {
      include: {
        model: Answer,
        include: Vote
      }
    })

    if (question) {
      let sessionUserId;
      if (req.session.auth) {
        sessionUserId = req.session.auth.user_id;
      }
      res.render("question-id", { question, sessionUserId, csrfToken: req.csrfToken() });
    }
  })
);

// Delete question
router.post('/:id(\\d+)/delete', requireAuth, csrfProtection, asyncHandler(async (req, res) => {

  const questionId = req.params.id;
  const removedQuestion = await Question.findByPk(questionId, {
    include: Answer
  });

  await removedQuestion.destroy();

  res.redirect('/questions');
}));


// EDITING A QUESTION

// getting question edit page
router.get('/:id(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
  const question = await Question.findByPk(req.params.id);
  res.render('question-edit', { question, csrfToken: req.csrfToken() })
}))

// submitting an edited question
router.post('/:id(\\d+)', requireAuth, csrfProtection, questionValidators, asyncHandler(async (req, res) => {
  const question_content = req.body.question;

  const editedQuestion = await Question.findByPk(req.params.id)

  const validatorErrors = validationResult(req);
  let errors = [];

  if (question_content.length > 0) {
    editedQuestion.question = question_content;
    await editedQuestion.save();
    res.redirect(`/questions/${editedQuestion.id}`);
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
    let question = editedQuestion
    res.render("question-edit", { question, errors, csrfToken: req.csrfToken() })
  }
}))


// ANSWERING A QUESTION

//Answers validators
const answerValidators = [
  check("answer")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an answer."),
];

router.post(
  "/:id(\\d+)/answers",
  requireAuth,
  csrfProtection,
  answerValidators,
  asyncHandler(async (req, res) => {
    const { answer } = req.body;
    const { user_id } = req.session.auth;
    const question_id = req.params.id;

    const validatorErrors = validationResult(req);
    let errors = [];

    if (validatorErrors.isEmpty()) {

      await Answer.create({
        answer,
        user_id,
        question_id,
      });

      res.redirect(`/questions/${req.params.id}`);
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
      let question = await Question.findByPk(question_id, {
        include: {
          model: Answer,
          include: Vote
        }
      })
      let sessionUserId = user_id
      res.render("question-id", { errors, question, sessionUserId, csrfToken: req.csrfToken() });
    }
  })
);

// Dynamically deleting an answer

router.delete('/:id(\\d+)/answers/:answerId(\\d+)', requireAuth, asyncHandler(async (req, res) => {

  const answerId = req.params.answerId;
  const removedAnswer = await Answer.findByPk(answerId);

  if (removedAnswer) {
    await removedAnswer.destroy();
    res.json({ message: "Success" });
  } else {
    res.json({ message: "Failure" })
  }

}));

// --- What is this for??? (below) ---

// const questionNotFoundError = (id) => {
//   const err = Error("Question not found");
//   err.errors = [`Question with id of ${id} could not be found.`];
//   err.title = "Question not found.";
//   err.status = 404;
//   return err;
// };

module.exports = router;
