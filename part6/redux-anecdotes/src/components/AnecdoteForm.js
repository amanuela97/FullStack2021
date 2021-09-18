import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const add = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        e.target.anecdote.value = ''
        dispatch(addAnecdote(anecdote))
        dispatch(setNotification(`you created '${anecdote}'`,5))
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