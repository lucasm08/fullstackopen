import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { isUserWhitespacable } from '@babel/types'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0})

  const handleVotesUpdate = () => {
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
  
      <div>
        <button onClick={handleVotesUpdate}>vote</button>
        <button onClick={() => setSelected(Math.floor((Math.random() * 6) + 1) - 1)}>next anecdote</button>
      </div>
    </div>
   
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
