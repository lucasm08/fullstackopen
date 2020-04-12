import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackButton = ({text, feedbackHandler}) => {
  return (
    <button onClick={feedbackHandler}>{text}</button>
  )
}

const Statistic = ({text, value}) => {
  return <p>{text} {value}{text === "positive" ? "%" : ""}</p>
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
      <Statistic
        value={good}
        text={"good"}
      />
      <Statistic
        value={neutral}
        text={"neutral"}
      />
      <Statistic
        value={bad}
        text={"bad"}
      />
      <Statistic
        value={getTotal()}
        text={"all"}
      />
      <Statistic
        value={getTotal() ? (good - bad)/getTotal() : 0}
        text={"average"}
      />
      <Statistic
        value={getTotal() ? good * 100/getTotal() : 0}
        text={"positive"}
      />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)