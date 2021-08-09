import React, { useState } from 'react'

const Button = ({ text, clickHandler }) => {
    return (
        <button onClick={clickHandler}> {text}</button>
    );
}

const StatisticLine = ({ stat, count }) => {
    return (
        <tr>
          <td> {stat} </td>
          <td> {count} </td>
        </tr>
    )
}

const Statistics = ({data}) => {
    const [good, neutral, bad] = data;
    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const percent = (good / all) * 100;

    if(all === 0) {
        return (
            <p>No feedback given :)</p>
        )
    }

    return (
    <table>
        <tbody>
          <StatisticLine  stat="Good" count={good} />
          <StatisticLine  stat="Neutral" count={neutral} />
          <StatisticLine  stat="Bad" count={bad} />
          <StatisticLine  stat="All" count={all} />
          <StatisticLine  stat="Average" count={average} />
          <StatisticLine  stat="Positive" count={`${percent} %`} />
        </tbody>
    </table>
    )
}
  

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const data = [good, neutral, bad]

  return (
    <div>
      <h1>Give Feedback</h1>  
      <Button text="Good" clickHandler={() => setGood(good + 1)} />
      <Button text="Neutral" clickHandler={() => setNeutral(neutral + 1)} />
      <Button text="Bad" clickHandler={() => setBad(bad + 1)} />
      <h1>Statistics</h1> 
      <Statistics data={data}/>
    </div>
  )
}

export default App