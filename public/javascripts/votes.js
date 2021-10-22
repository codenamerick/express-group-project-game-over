
window.addEventListener('load', async (e) => {
    console.log('hello from votes.js JS!');

    // TODO: load all vote counts for answers on a given page
    const answerContainers = document.querySelectorAll('.answer-container');
    answerContainers.forEach(async (ansContainer) => {
        const answerId = ansContainer.id.split('-')[1]

        //query db for upvotes
        const score = await fetch(`/answers/${answerId}/votes`, {
            method: "GET",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ answer_id: answerId })
        })

        //query db for downvotes
    })

});


window.addEventListener("DOMContentLoaded", (e) => {

    // implement down vote btn func below ---
    const downVoteBtns = document.querySelectorAll('.down-vote-btn');

    downVoteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const answerId = e.target.id.split('-')[2];

            const res = await fetch(`/answers/${answerId}/votes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ up_vote: false })
            })
        })
    })

    // // implement up vote btn func below ---
    const upVoteBtns = document.querySelectorAll('.up-vote-btn');

    upVoteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const answerId = e.target.id.split('-')[2];

            const res = await fetch(`/answers/${answerId}/votes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ up_vote: true })
            })
        })
    })

});
