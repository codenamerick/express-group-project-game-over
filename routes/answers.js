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
router.get('/:id(\\d+)/votes', requireAuth, asyncHandler(async (req, res) => {

   // getting all upvotes for given answer
   const upVotes = await Vote.findAll({
      where: {
         [Op.and]: [
            { answer_id: req.params.id },
            { up_vote: true }
         ]
      }
   });

   // getting all downvotes for given answer
   const downVotes = await Vote.findAll({
      where: {
         [Op.and]: [
            { answer_id: req.params.id },
            { up_vote: false }
         ]
      }
   });
}));

router.post('/:id(\\d+)/votes', requireAuth, asyncHandler(async (req, res) => {
   const answer = await Answer.findByPk(req.params.id);
   const userId = req.session.auth.user_id;

   const { up_vote } = req.body

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
         return await Vote.create({
            answer_id: answer.id,
            user_id: userId,
            up_vote
         });
      }

      // TODO: implement user voting changing
      // if (vote.up_vote ) {

      // }

   }

}))


module.exports = router;


/*

     // console.log('----------------');
      // console.log(vote);
      // console.log('----------------');


*/
