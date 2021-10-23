
window.addEventListener('load', async (e) => {
    console.log('hello from votes.js JS!');

    // Load voteScore for individual answers
    const answerContainers = document.querySelectorAll('.answer-container');

    answerContainers.forEach(async (ansContainer) => {
        const answerId = ansContainer.id.split('-')[1]

        //db query for voteScore
        const res = await fetch(`/answers/${answerId}/votes`)
        const data = await res.json();
        const { voteScore } = data;
        const voteScoreContainer = document.querySelector(`#answer-${answerId}-voteScore`);
        voteScoreContainer.innerText = voteScore;
    })

});


window.addEventListener("DOMContentLoaded", (e) => {

    // up vote button functionality
    const downVoteBtns = document.querySelectorAll('.down-vote-btn');

    downVoteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const answerId = e.target.id.split('-')[2];

            const res = await fetch(`/answers/${answerId}/votes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ up_vote: false , btn: "down vote"})
            });

            // dynamically updating voteScore
            const voteScoreContainer = document.querySelector(`#answer-${answerId}-voteScore`);
            const currScore = parseInt(voteScoreContainer.innerText, 10);

            const data = await res.json();

            if (data.message === "vote created") {
                const newScore = currScore - 1;
                voteScoreContainer.innerText = newScore;
            } else if (data.message === "down vote removed") {
                const newScore = currScore + 1;
                voteScoreContainer.innerText = newScore;
            } else if (data.message === "up vote removed") {
                const newScore = currScore - 1;
                voteScoreContainer.innerText = newScore;
            }
        })
    })

    // up vote button functionality
    const upVoteBtns = document.querySelectorAll('.up-vote-btn');

    upVoteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const answerId = e.target.id.split('-')[2];

            const res = await fetch(`/answers/${answerId}/votes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ up_vote: true, btn: "up vote" })
            });

            // dynamically updating voteScore
            const voteScoreContainer = document.querySelector(`#answer-${answerId}-voteScore`);
            const currScore = parseInt(voteScoreContainer.innerText, 10);

            const data = await res.json()

            if (data.message === "vote created") {
                const newScore = currScore + 1;
                voteScoreContainer.innerText = newScore;
            } else if (data.message === "up vote removed") {
                const newScore = currScore - 1;
                voteScoreContainer.innerText = newScore;
            } else if (data.message === "down vote removed") {
                const newScore = currScore + 1;
                voteScoreContainer.innerText = newScore;
            }
        })
    })

});
