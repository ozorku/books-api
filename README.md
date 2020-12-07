# BOOKS API

> A simple CRUD example to manage books, built using express, Joi for data validation and Node Filesystem to write to file. It uses db.json file to simulate a DB

## Features

- Add, View, Update and Delete books

## Endpoints

- Get all books = /api/books
  \
  Method - GET
- Get a specific book = /api/books/{id}
  \
  Method - GET
- Add new book = /api/books
  \
  Method - POST
  \
   {
  name: "Book name",
  author: "Author name"
  }
- Update a book = /api/books/update/{id}
  \
  Method - PUT
  \
   {
  name: "Book name",
  author: "Author name"
  }
- Delete a book = /api/books/delete/{id}
  \
  Method - DELETE
