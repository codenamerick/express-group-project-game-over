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

async function searchQuestions(question) {
  return await Question.findAll({
    where: {
      title: {
        [Op.like]: `%${question}%`
      }
    }
  });
}

router.get('/', csrfProtection, asyncHandler( async (req, res) => {
  let questions = await Question.searchQuestions(`%${req.query.term}`);

  res.render('index', {
    listTitle: 'Search Results',
    error,
    questions
  });
}));

module.exports = router;
