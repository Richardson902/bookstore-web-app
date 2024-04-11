async function getBooks() {
  try {
    //fetch the JSON from API
    const response = await fetch("http://localhost:3000/api/booksdata");

    //Checkk if response is sucessful
    if (response.status === 200) {
      //Parse the JSON response into an array of books
      const books = await response.json();

      //Get the container div where book elements will be appended
      const container = document.getElementById("books-container");

      //Loop over each book and create a div element to display it
      books.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book-div");

        //Populate the book-div with book data (title and image)
        bookDiv.innerHTML = `
        <h2>${book.title}</h2>
        <a href="/books/${book.title
          .toLowerCase()
          .replace(/\s+/g, "-")}"><img alt="${book.title}" src="/media/${
          book.image
        }" style="height: 422px" /></a>`;

        //Append the book-div to the container div
        container.appendChild(bookDiv);
      });
    } else {
      //Handle non-sucessful message response
      console.error("Failed to fetch books:", response.statusText);
    }
  } catch (error) {
    //Handle errors that occur during the fetch operation
    console.error("Error fetching books data:", error);
  }
}

//Call the getBooks function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", getBooks);
