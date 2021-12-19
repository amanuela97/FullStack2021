import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { ALL_BOOKS } from './queries'
import {useQuery, useApolloClient} from '@apollo/client'
import Notify from './components/Notify'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const notify = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  useEffect(() => {
    !token && setToken(localStorage.getItem('jwtToken'))
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
        <> 
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={() => logout()}>logout</button>
        </>) : ( 
          <button onClick={() => setPage('login')}>login</button> 
        )}
      </div>

      <Notify error={error}/>

      <Authors
        show={page === 'authors'}
        setError={notify}
        token={token}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Recommend
        show={page === 'recommend'}
        books={books}
      />

      <Login 
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App