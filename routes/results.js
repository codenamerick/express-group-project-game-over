const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { Question, User } = db;
const { Op } = require('sequelize');
const id = db.User.id

async function searchQuestions(question) {
  // let user = User.findById(id)

  console.log('test', questions);
  return questions;
}



router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    console.log('we made it into the async function!')
    const { search } = req.query
    let questions = await Question.findAll({
      where: {
        title: {
          [Op.iLike]: `%${search}%`,
        },
      },
      include: {
        model: User
      },
    });
    console.log(questions);
    console.log('the above listed are question objects')
    res.render("results", { questions });
  })
);


module.exports = router;
