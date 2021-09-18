import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {connect} from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = ({addAnecdote,setNotification}) => {
    
    const add = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        e.target.anecdote.value = ''
        addAnecdote(anecdote)
        setNotification(`you created '${anecdote}'`,5)
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

const mapDispatchToProps = {
    addAnecdote,
    setNotification
}

export default connect(null,mapDispatchToProps)(AnecdoteForm)