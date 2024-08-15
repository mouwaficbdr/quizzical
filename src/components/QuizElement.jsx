/* eslint-disable react/prop-types */
import { nanoid } from "nanoid"
import QuizElAnswer from "./QuizElAnswer"

export default function QuizElement({question, answers}) {
  
  const answerButtons = answers.map(answer => {
    return <QuizElAnswer key={nanoid()} answer={answer}/>
  })

  return (
    <div className="quiz-element">
      <h2 className="quiz-element--question">{question}</h2>
      <div className="quiz-element--buttons-container">
        {answerButtons}
      </div>
      <hr />
    </div>
  )
}