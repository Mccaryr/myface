require('dotenv').config();
const path = require('path')
const express = require('express')
const app = express();
const cors = require('cors')
const { ApolloServer, gql } = require('apollo-server')
const PORT = process.env.PORT || 5000

app.use('/', (req,res) => res.send({success: "Hello World"}))

app.use("*", (req, res) => res.status(404).json({error: "Not Found"}))



const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;


app.listen(PORT, () => console.log('Server Started'))