function addToCart(bookID) {
  //Send POST request to add book to cart
  fetch("/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bookID: bookID }), //Send the book ID in the request body
  })
    .then((response) => {
      if (response.ok) {
        //Book added to cart successfully
        console.log("Book added to cart.");
      } else {
        //Failed to add book to cart, handle the error
        console.error("Failed to add book to cart.");
      }
    })
    .catch((error) => {
      console.error("Error adding book to cart:", error);
    });
}
