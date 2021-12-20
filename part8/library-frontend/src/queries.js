import { gql } from '@apollo/client'

const BookDetails = gql`
  fragment BookDetails on Book {
    id
    title
    author{
      id
      name
      bookCount
      born
    }
    published
    genres
  }
`

const AuthorDetails = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
  }
`

export const ME = gql`
  query {
    me {
      id
      username
      favoriteGenre
      
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AuthorDetails}
`
export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BookDetails}
`
export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      ...BookDetails 
    }
  }
  ${BookDetails}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AuthorDetails}
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BookDetails}
`