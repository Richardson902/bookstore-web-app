module.exports = function (app) {
  const express = require("express");
  const fs = require("fs/promises");
  const Papa = require("papaparse");
  const path = require("path");
  const { getTaxRate } = require("../static/scripts/getTaxRate");

  //Initilaize array to store book data
  let books = [];

  //Initilaize array to store cart data
  let cart = [];

  //Initialize array to store form data
  let formData = [];

  //Function to read CSV data and parse it
  async function getCsvData() {
    //Clear the books array before reloading data
    books = [];

    //Read the CSV file
    const csv = await fs.readFile(
      path.join(__dirname, "../data/booksdata.csv"),
      "utf-8"
    );

    //Parse CSV data using PapaParse
    const csvData = Papa.parse(csv, { header: true });

    //Iterate through each row of CSV data and extract relevant book information
    csvData.data.forEach((book) => {
      if (book.Title && book.Available) {
        //Add book details to the "books" array
        books.push({
          id: book.BookID,
          title: book.Title,
          author: book.Author,
          genre: book.Genre,
          price: book.Price,
          image: book.ImageFileName,
          available: book.Available,
        });
      }
    });
  }

  //Call the function to read CSV data and parse it
  getCsvData();

  //Add route to get all books data
  app.get("/api/booksdata", (_, res) => {
    console.log(books);
    const response = JSON.stringify(books);
    res.header({ "Content-Type": "application/json" });

    if (books) {
      res.send(response);
    } else {
      res.status(500);
      res.send("Error: Could not get books data");
    }
  });

  //Create a route to render the index page
  app.get("/", (_, res) => {
    res.render("index");
  });

  //Function to convert spaces to hyphens
  function formatTitle(title) {
    return title.toLowerCase().replace(/\s+/g, "-");
  }

  //Add route for book titles with formatted URLs
  app.get("/books/:title", async (req, res) => {
    //Reload CSV data to ensure latest book information
    await getCsvData();
    //Get the title parameter from the request
    const title = req.params.title;
    //Format the title to have hyphens instead of spaces
    const formattedTitle = formatTitle(title);
    //Find the book with the specified title
    const book = books.find(
      (book) => formatTitle(book.title) === formattedTitle
    );

    //If book is found
    if (book) {
      res.render("book", { book: book });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  });

  //Add route to render the cart page
  app.get("/cart", (_, res) => {
    res.render("cart", { cart: cart });
  });

  //Add route to handle adding books to the cart
  app.post("/cart/add", (req, res) => {
    const bookID = req.body.bookID;
    console.log("book id received: ", bookID);
    //Find book in book array
    const book = books.find((book) => book.id === bookID);
    console.log("book found: ", book);

    if (book) {
      //Check if book exists in cart
      const existingCartItem = cart.find((item) => item.id === bookID);
      console.log("existingCartItem: ", existingCartItem);

      if (existingCartItem) {
        //Book already exists, increase quantity
        existingCartItem.quantity++;
      } else {
        //Book does not exist in cart, add it
        cart.push({
          img: book.image,
          id: book.id,
          title: book.title,
          price: book.price,
          quantity: 1,
        });
      }
      res.redirect(`/books/${formatTitle(book.title)}`);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  });

  //Route to handle removing books from the cart
  app.delete("/cart/remove/:bookID", (req, res) => {
    const bookID = req.params.bookID;
    console.log("book id received: ", bookID);

    //find the index of the book in the cart array
    const index = cart.findIndex((item) => item.id === bookID);
    console.log("index: ", index);

    //If book found, remove it from the cart
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        res.send("Book quantity decreased.");
      } else {
        cart.splice(index, 1);
        res.send("Book removed from cart.");
      }
    } else {
      res.status(404).send("Book not found in cart.");
    }
  });

  //Route to render the checkout page
  app.get("/checkout", (_, res) => {
    res.render("checkout", { cart: cart });
  });

  app.post("/place-order", (req, res) => {
    //Extract form data from request body
    const formData = req.body;

    //Calculate order total
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    //Calculate tax based on province
    const taxRate = getTaxRate(formData.province);
    const taxAmount = subtotal * taxRate;
    const totalAmount = subtotal + taxAmount;

    //render order-details pahe with form data and order details
    res.render("orderdetails", {
      formData: formData,
      cart: cart,
      subtotal: subtotal,
      taxAmount: taxAmount,
      totalAmount: totalAmount,
    });

    //Clear the cart after placing order
    cart = [];
  });
};
