
window.addEventListener('load', async (e) => {
    console.log('hello from votes.js JS!');

    const answers = document.querySelectorAll('.answer-container');

    console.log(answers);

    // voteCounter helper function
    const voteCounter = async (ans) => {
        const upVotes = await Vote.findAll({
            where: {
                [Op.and]: [
                    {answer_id: ans.id},
                    {upvote: true}
                ]
            }
        })
    }

    answers.forEach((ans) => {

    })
});


window.addEventListener("DOMContentLoaded", (e) => {

    // implement down vote btn func below ---

    const downVoteBtns = document.querySelectorAll('.down-vote-btn');
    downVoteBtns.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            // TODO: add functionality
        })
    })

    // implement up vote btn func below ---

    const upVoteBtns = document.querySelectorAll('.up-vote-btn');
    upVoteBtns.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            // TODO: add functionality
        })
    })

});
