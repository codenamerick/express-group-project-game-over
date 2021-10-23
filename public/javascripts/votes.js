
window.addEventListener('DOMContentLoaded', async (e) => {
    console.log('hello from votes.js JS!');

    // Load voteScore for individual answers
    const answerContainers = document.querySelectorAll('.answer-container');

    answerContainers.forEach(async (ansContainer) => {
        const answerId = ansContainer.id.split('-')[1]

        //db query for voteScore
        const res = await fetch(`/answers/${answerId}/votes`, {
            method: "GET",
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ answer_id: answerId })
        })
        // const { voteScore } = await res.json()
        // const scoreContainer = document.querySelector(`.answer-${answerId}-voteScore`);
        // console.log(ansContainer);
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
            });

            const data = await res.json()
            if (data.message === "vote created") {
                const voteScoreContainer = document.querySelector(`#answer-${answerId}-voteScore`);
                const currScore = parseInt(voteScoreContainer.innerText, 10);
                const newScore = currScore - 1;
                voteScoreContainer.innerText = newScore;
            }
        })
    })

    // implement up vote btn func below ---
    const upVoteBtns = document.querySelectorAll('.up-vote-btn');

    upVoteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const answerId = e.target.id.split('-')[2];

            const res = await fetch(`/answers/${answerId}/votes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ up_vote: true })
            });

            const data = await res.json()
            if (data.message === "vote created") {
                const voteScoreContainer = document.querySelector(`#answer-${answerId}-voteScore`);
                const currScore = parseInt(voteScoreContainer.innerText, 10);
                const newScore = currScore + 1;
                voteScoreContainer.innerText = newScore;
            }
        })
    })

});
