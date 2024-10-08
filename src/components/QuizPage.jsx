/* eslint-disable react/prop-types */
import QuizElement from "./QuizElement"

export default function QuizPage(props) {

  function getAnswers(el) {
      const uniqueAnswers = new Set([...el.incorrect_answers, el.correct_answer])
      return Array.from(uniqueAnswers)
  }

  
  function checkAnswers() {
    if (props.choices.length === props.data.length) {
      const count = props.countCorrectAnswers(props.data, props.choices)
      props.setCorrectCount(count)
      props.setShowResults(true)
    } else {
      alert("You did not answered all the questions")
    }
  }

  const quizData = props.data
  const quizElements = quizData.map(element => {
    return <QuizElement
      key={element.id}
      data={props.data}
      question={element.question}
      answers={getAnswers(element)}
      choices={props.choices}
      setChoices={props.setChoices}
      id={element.id}
      showResults={props.showResults}
    />
  })

  const scoreStyle = {
    color: props.correctCount > 4 ? "green" : "red"
  }

  return (
    <div className="quiz-page">
      <div className="quiz-page--container">
        {quizElements}
        <div className="quizz-page--button-container">
          {props.showResults &&
            <p className="correct-answers-count" style={scoreStyle}>
              {`You scored ${props.correctCount}/${props.data.length} correct answers`}
            </p>
          }
          <button className="check-answers"
            onClick={props.showResults ? () => props.playAgain() : () => checkAnswers()}
          >
            {props.showResults ? "Play Again" : "Check answers"}
          </button>
        </div>
      </div>
    </div>
  )
}