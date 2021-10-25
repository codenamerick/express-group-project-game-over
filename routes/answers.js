const express = require('express');
const router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils');
const db = require('../db/models');
const { Answer, Question, Vote, Sequelize: { Op } } = db;
const { requireAuth } = require('../auth');


// EDITING AN ANSWER

// getting answer edit page
router.get('/:id(\\d+)/edit', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
   const answer = await Answer.findByPk(req.params.id, {
      include: Question
   })
   res.render('answer-edit', { csrfToken: req.csrfToken(), answer })
}));

//submitting an edited answer
router.post('/:id(\\d+)', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
   const answer = await Answer.findByPk(req.params.id, {
      include: Question
   })
   const questionId = answer.Question.id;

   answer.answer = req.body.answer;
   await answer.save();

   res.redirect(`/questions/${questionId}`);
}));


// VOTING ON ANSWERS FUNCTIONALITY

// getting votes for a given answer
router.get('/:id(\\d+)/votes', asyncHandler(async (req, res) => {

   // getting all upvotes for given answer
   const { count: upVotes } = await Vote.findAndCountAll({
      where: {
         [Op.and]: [
            { answer_id: req.params.id },
            { up_vote: true }
         ]
      }
   });

   // getting all downvotes for given answer
   const { count: downVotes } = await Vote.findAndCountAll({
      where: {
         [Op.and]: [
            { answer_id: req.params.id },
            { up_vote: false }
         ]
      }
   });

   const voteScore = upVotes - downVotes;

   res.json({ "voteScore": voteScore })
}));


// creating votes for a given answer
router.post('/:id(\\d+)/votes', requireAuth, asyncHandler(async (req, res) => {
   const answer = await Answer.findByPk(req.params.id);
   const userId = req.session.auth.user_id;

   const { up_vote } = req.body

   // Need to figure out how to redirect user to login/signup page if they are trying to interact w/vote btns and are not logged in.

   // if (!answer && userId || answer && !userId) {
   //    res.redirect('/users/login');
   // }

   if (answer && userId) {
      const vote = await Vote.findOne({
         where: {
            [Op.and]: [
               { answer_id: answer.id },
               { user_id: userId }
            ]
         }
      })

      if (!vote) {
         const newVote = await Vote.create({
            answer_id: answer.id,
            user_id: userId,
            up_vote
         });

         if (newVote) {
            return res.json({ message: "vote created" })
         }
      }

      // changing votes / deleting votes / removing votes
      const { btn } = req.body;

      if (!vote.up_vote && btn === 'down vote') {
         await vote.destroy();
         return res.json({ message: "down vote removed" });
      }

      if (vote.up_vote && btn === 'up vote') {
         await vote.destroy();
         return res.json({ message: "up vote removed" });
      }

      if (vote.up_vote && btn === 'down vote') {
         await vote.destroy();
         return res.json({ message: "up vote removed" });
      }

      if (!vote.up_vote && btn === 'up vote') {
         await vote.destroy();
         return res.json({ message: "down vote removed" });
      }
   }
}));



module.exports = router;
