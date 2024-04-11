//Execute this code when the DOM has fully loaded
document.addEventListener("DOMContentLoaded", function () {
  //Get the province select element from the DOM
  const provinceSelect = document.getElementById("province");

  //Add event listener to province select element
  provinceSelect.addEventListener("change", function () {
    //Calculate tax based on the selected province
    const taxRate = getTaxRate(provinceSelect.value);

    //Get the subtotal value from the DOM
    const subtotal = parseFloat(
      document.getElementById("subtotal-value").textContent
    );

    //Calculate the tax amount
    const taxAmount = subtotal * taxRate;

    // Update tax amount in the HTML element
    const taxAmountEle = document.getElementById("tax-value");
    taxAmountEle.textContent = `$${taxAmount.toFixed(2)}`;

    // Calculate total amount
    const totalAmount = subtotal + taxAmount;

    // Update total amount in the HTML element
    const totalAmountEle = document.getElementById("total-value");
    totalAmountEle.textContent = `$${totalAmount.toFixed(2)}`;
  });
  //Get the checkout form element from the DOM
  const checkoutForm = document.getElementById("checkout-form");

  //Add an event listener to the form submisison
  checkoutForm.addEventListener("submit", function (event) {
    //Get the selected province from the province select element
    const selectedProvince = provinceSelect.value;

    //Check if the selected province is NULL
    if (selectedProvince === "NULL") {
      event.preventDefault(); //Prevent form submission
      alert("Please select a province.");
    }

    //get the email input value from the form
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim(); //Trim whitespace from input

    //Validate email format using a regular expression
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailRegex.test(String(email).toLowerCase());

    if (!isValidEmail) {
      event.preventDefault(); //Prevent form submission
      alert("Please enter a valid email address.");
    }
  });
});

// Function to get tax rate based on province
function getTaxRate(province) {
  const taxRates = {
    NULL: 0.0,
    AB: 0.05,
    BC: 0.05,
    MB: 0.05,
    NB: 0.15,
    NL: 0.15,
    NS: 0.15,
    NT: 0.05,
    NU: 0.05,
    ON: 0.13,
    PE: 0.15,
    QC: 0.14975,
    SK: 0.11,
    YT: 0.05,
  };
  return taxRates[province];
}
