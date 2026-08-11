document.getElementById("accessForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const message = document.getElementById("message");
  message.textContent = "Your request has been prepared. Connect this form to a backend/database before using it to store submissions.";

  this.reset();
});
