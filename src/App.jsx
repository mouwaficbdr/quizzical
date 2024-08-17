import StartScreen from "./components/StartScreen"
import QuizPage from "./components/QuizPage"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { decode } from 'he';

export default function App() {

  const [data, setData] = useState()  
  const [start, setStart] = useState(false)
  const [choices, setChoices] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  console.log(data)

  function doubleDecode(str) {
    return  decode(decode(str))
  }

  function countCorrectAnswers(data, choices) {
    return choices.reduce((count, choice) => {
      const answerData = data.find((el) => el.id === choice.id);
      return (
        count +
        (answerData && choice.userChoice === answerData.correct_answer ? 1 : 0)
      );
    }, 0);
  }
  
  /* FETCH QUESTIONS AND ANSWERS */
  useEffect(() => {
    
    if (!data) {
      fetch('https://opentdb.com/api.php?amount=10')
      .then(res => {
        if (!res.ok) throw new Error("Network Error")
        return res.json()
      })
        .then(data => setData(data.results.map(el => (
          {
            id: nanoid(),
            question: doubleDecode(el.question), 
            correct_answer: doubleDecode(el.correct_answer),
            incorrect_answers: el.incorrect_answers.map(answer => doubleDecode(answer)),
            ...el
          }
        )
        
      )))
      .catch((error) => console.log(error))
    }
    
  }, [data])

  function startQuiz() {
    setStart(true)
  }

  return (
    <main>
      {!start
        ? 
        <StartScreen
          startQuiz = {startQuiz}
        />
        
        :

        <QuizPage
          data={data}
          choices={choices}
          setChoices={setChoices}
          showResults={showResults}
          setShowResults={setShowResults}
          countCorrectAnswers={countCorrectAnswers}
          correctCount = {correctCount}
          setCorrectCount = {setCorrectCount}
        />
      }

    </main>
  )
}