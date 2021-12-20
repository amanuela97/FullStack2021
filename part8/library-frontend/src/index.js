import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {decode} from 'jsonwebtoken'
import { 
    ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split
  } from '@apollo/client' 
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
require('dotenv').config()

const refreshToken = async (username) => {
  const query = JSON.stringify({
    query: `mutation {
      login(
        username: "${username}"
        password: "${process.env.REACT_APP_PASS}") { value }
      }
    `
  })
  try {
    const response = await fetch(process.env.REACT_APP_URL, {
      headers: {'content-type': 'application/json'},
      method: 'POST',
      body: query,
    })
    
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }

}

const authLink = setContext( async (_, { headers }) => {
  let token = localStorage.getItem('jwtToken')
  if(token){
    const {exp, username} = decode(token)
    const expirationTime = (exp * 1000) - 60000
    if (Date.now() >= expirationTime) {
      console.log('token expired')
      const newToken = await refreshToken(username)
       if(newToken){
        localStorage.setItem('jwtToken', newToken.data.login.value)
        token = newToken.data.login.value
        console.log('newtoken set')
       }
    }
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: process.env.REACT_APP_URL })

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_Socket_URL,
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})
  
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)