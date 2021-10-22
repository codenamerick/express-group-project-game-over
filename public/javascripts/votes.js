
window.addEventListener('load', async (e) => {
    console.log('Hello from votes.js JS!!!!')
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
