import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0})
  const [popular, setPopular] = useState(0)

  const handleVotesUpdate = () => {
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)
    setPopular(getMostVotesIndex())
  }

  const getMostVotesIndex = () => {
    let maxIndex = 0;
    let maxVotes = 0;
    for (const index in votes) {
        if(votes[index] > maxVotes) {
          maxVotes = votes[index];
          maxIndex = index;
        }
    }
    return maxIndex

  }

  return (
    <div>
      <h1>Annecdote of the day</h1>
      {props.anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <button onClick={handleVotesUpdate}>vote</button>
        <button onClick={() => setSelected(Math.floor((Math.random() * 6) + 1) - 1)}>next anecdote</button>
      </div>

      <h1>Annecdote with most votes</h1>
      {props.anecdotes[popular]}

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
