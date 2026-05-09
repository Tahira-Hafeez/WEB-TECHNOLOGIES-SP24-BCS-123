const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/products");

const app = express();

mongoose.connect("mongodb://localhost:27017/crumblDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));


// HOME PAGE
app.get("/", function(req, res) {

  res.render("index");

});


// PRODUCTS PAGE
app.get("/products", async function(req, res) {

  const page = parseInt(req.query.page) || 1;

  const LIMIT = 10;

  const search = req.query.search || "";

  const category = req.query.category || "";

  const minPrice = req.query.minPrice || "";
  const maxPrice = req.query.maxPrice || "";

  const filter = {};

  // search by name
  if(search) {

    filter.name = {
      $regex: search,
      $options: "i"
    };

  }

  // category filter
  if(category) {

    filter.category = category;

  }

  // total products
  const totalProducts = await Product.countDocuments(filter);

  // total pages
  const totalPages = Math.ceil(totalProducts / LIMIT);

  // fetch products
  const products = await Product.find(filter)
  .skip((page - 1) * LIMIT)
  .limit(LIMIT);

 res.render("products", {
  products,
  currentPage: page,
  totalPages,
  search,
  category,
  minPrice,
  maxPrice
});

});


// Start the server on port 3000
app.listen(3000, function () {
  console.log("Server Started at localhost:3000");
});

// Log a message to indicate that the server.js file is being executed
console.log("Console from server.js file");