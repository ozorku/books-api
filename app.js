const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const Joi = require("joi");
const uniqid = require("uniqid");

app.use(express.json());

const books = require("./db.json");

function validateBody(book) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
  });
  return schema.validate(book);
}

function writeToFile(payload, message, res) {
  fs.writeFile("db.json", JSON.stringify(payload), (err) => {
    if (err) throw err;
    res.status(200).send(message);
  });
}

// Index route
app.get("/", (req, res) => {
  res.status(200).send("It works");
});

// GET ALL BOOKS
app.get("/api/books", (req, res) => {
  res.send(books);
});

// GET SPECIFIC BOOK
app.get("/api/books/:id", (req, res) => {
  let getBook = books.find((book) => book.id === req.params.id);
  if (!getBook) return res.status(404).send("Book not found");
  res.send(getBook);
});

// ADD NEW BOOK
app.post("/api/books", (req, res) => {
  //   validate body
  const { error } = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // add id to new book data objet
  let newBook = {
    id: uniqid(),
    name: req.body.name,
    author: req.body.author,
  };
  books.push(newBook);
  writeToFile(books, "Book added", res);
});

// UPDATE A BOOK
app.put("/api/books/update/:id", (req, res) => {
  let getBook = books.find((book) => book.id === req.params.id);
  if (!getBook) return res.status(404).send("Book not found");
  //   validate body
  const { error } = validateBody(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // update new book
  const bookIndex = books.findIndex((book) => book.id === req.params.id);
  // create a copy of books
  let newBooksArray = [...books];
  // update the copy
  newBooksArray[bookIndex] = {
    ...newBooksArray[bookIndex],
    name: req.body.name,
    author: req.body.author,
  };
  // write to file
  writeToFile(newBooksArray, "Book updated!", res);
});

// DELETE A BOOK
app.delete("/api/books/delete/:id", (req, res) => {
  let getBook = books.find((book) => book.id === req.params.id);
  if (!getBook) return res.status(404).send("Book not found");
  let updatedBooks = books.filter((book) => {
    return book.id !== req.params.id;
  });
  writeToFile(updatedBooks, "Book deleted!", res);
});

// KICKSTART SERVER
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
