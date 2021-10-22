
window.addEventListener('load', async (e) => {
    console.log('hello from votes.js JS!');

    // TODO: load all vote counts for answers on a given page
    const answers = document.querySelectorAll('.answer-container');
    answers.forEach(async (ans) => {
        // TO DO: interact with DB to pull all votes for given answer
    })

});


window.addEventListener("DOMContentLoaded", (e) => {

    // implement down vote btn func below ---
    const downVoteBtns = document.querySelectorAll('.down-vote-btn');
    downVoteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const answerId = e.target.id.split('-')[2];

            await fetch(`/answers/${answerId}/votes`, {
                method: "POST"
            })
        })
    })

    // // implement up vote btn func below ---

    // const upVoteBtns = document.querySelectorAll('.up-vote-btn');
    // upVoteBtns.forEach((btn) => {
    //     btn.addEventListener('click', async (e) => {
    //         // TODO: add functionality
    //     })
    // })

});
