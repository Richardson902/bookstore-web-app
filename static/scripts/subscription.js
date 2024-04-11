document.addEventListener("DOMContentLoaded", function () {
  //Function to validate email format
  const form = document.getElementById("subscribe-form");
  const email = document.getElementById("email");

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  //handling for what to do if email is valid or invalid
  function handleSubscriptionForm(event) {
    event.preventDefault();

    const userEmail = email.value.trim(); //removes whitespaces in string

    if (userEmail === "") {
      alert("Please enter a valid email address.");
    } else if (!validateEmail(userEmail)) {
      alert("Please enter a valid email address.");
    } else {
      alert("Thank's for subscribing!");
      form.reset();
    }
  }
  form.addEventListener("submit", handleSubscriptionForm);
});
