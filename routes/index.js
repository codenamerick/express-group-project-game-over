var express = require('express');
var router = express.Router();
const { Question } = require('../db/models');
const { asyncHandler, csrfProtection } = require('./utils')


/* GET home page. */
// router.get('/', function(req, res, next) {
//   const questions = Question.findAll({
//     where:{

//     }

//   })
//   res.render('index', { questions  });
// });

router.get('/', csrfProtection, asyncHandler(async(req, res) => {

// TODO add vote count instead of updatedAt
  const questions = await Question.findAll({
    limit: 15,
    order: [["updatedAt", "DESC"]],
  });
  res.render('index', { questions })
}));

module.exports = router;
