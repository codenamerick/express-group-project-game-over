const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { Vote, Sequelize: { Op } } = require('../db/models');
const { requireAuth } = require("../auth");

// router.get('/', asyncHandler(async (req, res) => {
//    const { up_vote } = req.body

//    console.log('----------------');
//    console.log(up_vote);
//    console.log('----------------');

//    const { count: upVotes } = await Vote.findAndCountAll({
//       where: {
//          [Op.and]: [
//             { answer_id },
//             { up_vote: true }
//          ]
//       }
//    });

//    console.log('----------------');
//    console.log(upVotes);
//    console.log('----------------');

//    const { count: downVotes } = await Vote.findAndCountAll({
//       where: {
//          [Op.and]: [
//             { answer_id },
//             { up_vote: false }
//          ]
//       }
//    });

//    const voteScore = upVotes - downVotes;

// }))


module.exports = router;
