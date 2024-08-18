/* eslint-disable react/prop-types */
import { nanoid } from "nanoid"
import QuizElAnswer from "./QuizElAnswer"
import { decode } from 'he';

export default function QuizElement({data, question, answers, choices, setChoices, id, showResults}) {
  
  const answerButtons = answers.map(answer => {
    return <QuizElAnswer
      key={nanoid()}
      answer={answer}
      choices={choices}
      setChoices={setChoices}
      id={id}
      showResults={showResults}
      data={data}
    />
  })

  return (
    <div className="quiz-element">
      <h2 className="quiz-element--question">{decode(question)}</h2>
      <div className="quiz-element--buttons-container">
        {answerButtons}
      </div>
      <hr />
    </div>
  )
}