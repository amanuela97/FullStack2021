import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {setMessage, resetMessage} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
    return (
    <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
        </div>
    </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdote, filter}) => {
        if(!filter){
            return anecdote
        }else {
          return anecdote.filter((an) => an.content.toLowerCase().includes(filter.toLowerCase()))
        }
    })
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      console.log('vote', anecdote.id)
      dispatch(voteAnecdote(anecdote.id))

      dispatch(setMessage(`you voted '${anecdote.content}'`))
      setTimeout(() => {
        dispatch(resetMessage())
      },5000)
    }
    return (anecdotes.sort( (a, b) => b.votes - a.votes)
           .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote}/>));
}

export default AnecdoteList;