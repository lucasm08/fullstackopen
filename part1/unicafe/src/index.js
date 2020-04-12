import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackButton = ({text, feedbackHandler}) => {
  return (
    <button onClick={feedbackHandler}>{text}</button>
  )
}

const Statistics = (props) => {
  if(!props.total) {
    return <p>No feedback given</p>
  }
  
 return (
  <>
    <h1>Statistics</h1>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad  {props.bad}</p>
    <p>all {props.total}</p>
    <p>average {props.average}</p>
    <p>positive {props.positive}%</p>
  </>
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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={getTotal()}
        average={getTotal() ? (good - bad)/getTotal() : 0}
        positive={getTotal() ? good * 100/getTotal() : 0}
       />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)