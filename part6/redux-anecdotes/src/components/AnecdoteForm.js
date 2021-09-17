import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'
import {setMessage, resetMessage} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const add = (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(addAnecdote(anecdote))

        dispatch(setMessage(`you created '${anecdote}'`))
        setTimeout(() => {
            dispatch(resetMessage())
        },5000)
    }
    return (
        <div>
           <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>  
        </div>
    );
}

export default AnecdoteForm