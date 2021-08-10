import React, { useState } from 'react'

const TopVoted = ({data: [votes, anecdotes]}) => {
  if(votes.reduce((a, b) => a + b, 0) > 0){
    const max = Math.max(...votes)
    return(
      <>
        <p>{anecdotes[votes.indexOf(max)]}<br/>
          has {votes[votes.indexOf(max)]} votes
        </p>
      </>
    )
  }

  return (
    <p>No votes yet, be the first to vote :)</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const data = [votes,anecdotes]

  const handleVote = () => {
    const cloneVotes = [...votes]
    cloneVotes[selected] += 1
    setVotes(cloneVotes)
  }
  const handleAnecdote = () => {
    let randomNum = Math.floor(Math.random() * anecdotes.length)
    while (randomNum === selected) {
      randomNum = Math.floor(Math.random() * anecdotes.length)
    } 
    setSelected(randomNum)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}<br/>
        has {votes[selected]} votes
      </p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <TopVoted data={data}/>
    </div>
  )
}

export default App