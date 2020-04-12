import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackButton = ({text, feedbackHandler}) => {
  return (
    <button onClick={feedbackHandler}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getTotal = () => good + neutral + bad


  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackButton text={"good"} feedbackHandler={() => setGood(good + 1)} />
      <FeedbackButton text={"neutral"} feedbackHandler={() => setNeutral(neutral + 1)} />
      <FeedbackButton text={"bad"} feedbackHandler={() => setBad(bad + 1)} />
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad  {bad}</p>
      <p>all {getTotal()}</p>
      <p>average {getTotal() ? (good - bad)/getTotal() : 0}</p>
      <p>positive {getTotal() ? good * 100/getTotal() : 0}%</p>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)