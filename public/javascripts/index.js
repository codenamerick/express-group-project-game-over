window.addEventListener("load", (event) => {
  console.log("hello from javascript!");

  const deleteBtns = document.querySelectorAll(".delete-btn");

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();

      const answerId = e.target.id.split("-")[4];
      const questionId = e.target.id.split("-")[1];
      const res = await fetch(
        `/questions/${questionId}/answers/${answerId}`,
        {
            method: "delete",
        }
      );
    });
  });
});
