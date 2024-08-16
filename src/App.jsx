import StartScreen from "./components/StartScreen"
import QuizPage from "./components/QuizPage"
import { useState } from "react"
import { nanoid } from "nanoid"
import mockData from "./mockData.json"


export default function App() {

  const [data] = useState(mockData.results.map(el => (
    {
      id: nanoid(),
      ...el
    }
  )))  
  const [start, setStart] = useState(false)
  const [choices, setChoices] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  function countCorrectAnswers(data, choices) {
    return choices.reduce((count, choice) => {
      const answerData = data.find((el) => el.id === choice.id);
      return (
        count +
        (answerData && choice.userChoice === answerData.correct_answer ? 1 : 0)
      );
    }, 0);
  }
  
  /* FETCH API */
  // useEffect(() => {
    
  //   if (!data) {
  //     fetch('https://opentdb.com/api.php?amount=10')
  //     .then(res => {
  //       if (!res.ok) throw new Error("Network Error")
  //       return res.json()
  //     })
  //     .then(data => setData(data))
  //     .catch((error) => console.log(error))
  //   }
    
  // }, [data])

  function startQuiz() {
    setStart(true)
  }

  // function getQuestions() {
  //   const questions = data.map(el => el.question)
  //   return questions
  // }

  // function getAnswers() {
  //   const answers = data.map(el => {
  //     const uniqueAnswers = new Set([...el.incorrect_answers, el.correct_answer])
  //     return Array.from(uniqueAnswers)
  //   })
    
  //   return answers
  // }

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