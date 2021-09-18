import React from 'react';
import {connect } from 'react-redux'
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

const AnecdoteList = ({voteAnecdote,setNotification,anecdotes}) => {

  
    const vote = (anecdote) => {
      voteAnecdote(anecdote)
      setNotification(`you voted '${anecdote.content}'`,5)
    }

    return (anecdotes.sort( (a, b) => b.votes - a.votes)
           .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote}/>));
}

const mapStateToProps = (state) => {
    return {
      anecdotes: !state.filter
        ? state.anecdote
        : state.anecdote.filter((an) =>
            an.content.toLowerCase().includes(state.filter.toLowerCase())
          ),
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification,
}

export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)