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
      <table>
      <tbody>
        <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{getTotal()}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{getTotal() ? (good - bad)/getTotal() : 0}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{getTotal() ? good * 100/getTotal() : 0}%</td>
          </tr>
      </tbody>
       
      </table>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)