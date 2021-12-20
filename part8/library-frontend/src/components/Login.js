import React, {useEffect, useState} from 'react';
import { LOGIN } from '../queries'
import {useMutation} from '@apollo/client'

const Login = ({ show, setError, setToken, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const [ login, result ] = useMutation(LOGIN, {
      onError: (error) => {
        setError({message: error.graphQLErrors[0]?.message, color: 'red'})
      }
    })

    useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          setToken(token)
          localStorage.setItem('jwtToken', token)
          setPage('authors')
        }
    }, [result.data]) // eslint-disable-line

    if(!show){
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
    
        login({ variables: { username, password } })
        setUsername('')
        setPassword('')
    }
    
    return (
        <div>
           <form onSubmit={submit}>
                <div>
                username <input
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                password <input
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <button type='submit'>login</button>
            </form> 
        </div>
    );
};


export default Login;