const express = require('express');
const router = express.Router();
const { csrfProtection, asyncHandler } = require("./utils");
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { Question } = db;
const { Op }  = require('sequelize');


async function searchQuestions(question){


   let questions = await Question.findAll({
     where: {
       title: {
         [Op.iLike]: `%${question}%`,
       },
     },
   });

   return questions;
 }



router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    console.log('we made it into the async function!')
    let questions = await searchQuestions(`%${req.query.question}`);
    console.log(questions);
    res.render("results", { questions });
  })
);

module.exports = router;
