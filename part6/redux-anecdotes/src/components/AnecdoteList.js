import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

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
      dispatch(voteAnecdote(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`,5))
    }

    return (anecdotes.sort( (a, b) => b.votes - a.votes)
           .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote}/>));
}

export default AnecdoteList;