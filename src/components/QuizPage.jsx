/* eslint-disable react/prop-types */
import QuizElement from "./QuizElement"

export default function QuizPage(props) {

  function getAnswers(el) {
      const uniqueAnswers = new Set([...el.incorrect_answers, el.correct_answer])
      return Array.from(uniqueAnswers)
  }

  const quizData = props.data
  const quizElements = quizData.map(element => {
    return <QuizElement key={element.id} question={element.question} answers={getAnswers(element)}/>
  })

  return (
    <div className="quiz-page">
      <div className="quiz-page--container">
        {quizElements}
      </div>
    </div>
  )
}