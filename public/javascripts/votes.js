const db = require('../../db/models');
const { Vote, Answer } = db;

window.addEventListener("load", async (event) => {

    const upVoteCounter = async (value) => {
        await Vote.findAll({
            where: {
                answer_id: value,
                
            }
        })
    };

    // implement down vote btn func below ---

    const downVoteBtns = document.querySelectorAll('.down-vote-btn');

    downVoteBtns.addEventListener('click', (e) => {
        voteCounter--;
    });

    // implement up vote btn func below ---

    const upVoteBtns = document.querySelectorAll('.up-vote-btn');


});
