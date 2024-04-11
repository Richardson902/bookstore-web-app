function removeBook(bookID) {
    fetch(`/cart/remove/${bookID}`, {
        method: "DELETE"
    })
    .then(response => {
        if(response.ok) {
            //Book removed sucessfully
            console.log("Book removed from cart.");
            //Reload the page to update the cart
            window.location.reload();
        }
        else {
            //Failed to remove book, handle the error
            console.error("Failed to remove book from cart.");
        }
    })
    .catch (error => {
        console.error("Error removing book:", error);
    });
}