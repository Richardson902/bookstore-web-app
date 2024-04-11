//Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const bookstoreController = require("./controllers/bookstoreController");

//Create an Express app
const app = express();

//Set the view engine to EJS
app.set("view engine", "ejs");

//Set the port number
const port = 3000;

//Serve static files from the "static" directory
app.use("/", express.static("static"));

//Use body-parser middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Fire the bookstoreController
bookstoreController(app);

//Run the express app and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
