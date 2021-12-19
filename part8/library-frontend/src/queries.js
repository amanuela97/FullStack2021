import { gql } from '@apollo/client'

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
        name
        born
        bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
        title
        author{
          name
          bookCount
          born
        }
        published
        genres
    }
  }
`
export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
        title
        published
        author{
          name
          born
          bookCount
        }
        genres  
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!){
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`