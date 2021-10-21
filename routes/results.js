const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { Question, User } = db;
const { Op }  = require('sequelize');
const id = db.User.id

async function searchQuestions(question){
  // let user = User.findById(id)
   let questions = await Question.findAll({
     where: {
       title: {
         [Op.like]: '`%question%`',
       },
     include : {
      User
     }},
   });
   console.log(questions);
   return questions;
 }



router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    console.log('we made it into the async function!')
    let questions = await searchQuestions(`%${req.query.question}`);
    console.log(questions);
    console.log('the above listed are question objects')
    res.render("results", { questions });
  })
);

module.exports = router;
