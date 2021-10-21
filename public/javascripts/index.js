window.addEventListener("load", (event) => {
  console.log("hello from javascript!");

  const deleteAnswerBtn = document.querySelectorAll(".answer-delete-btn");

  deleteAnswerBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();

      const answerId = e.target.id.split("-")[4];
      const questionId = e.target.id.split("-")[1];

      const res = await fetch(
        `/questions/${questionId}/answers/${answerId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (data.message === "Success") {
        const container = document.querySelector(`#answer-${answerId}-container`)
        container.remove();
      }
    });
  });
});
