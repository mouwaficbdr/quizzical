import StartScreen from "./components/StartScreen"
import QuizPage from "./components/QuizPage"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

export default function App() {

  const [data, setData] = useState()  
  const [start, setStart] = useState(false)
  const [choices, setChoices] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [isPlayAgain, setIsPlayAgain] = useState(false)

  function countCorrectAnswers(data, choices) {
    return choices.reduce((count, choice) => {
      const answerData = data.find((el) => el.id === choice.id);
      return (
        count +
        (answerData && choice.userChoice === answerData.correct_answer ? 1 : 0)
      );
    }, 0);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  function playAgain() {
    setChoices([])
    setShowResults(false)
    setCorrectCount(0)
    setIsPlayAgain(true)
    scrollToTop()
  }


  
  /* FETCH QUESTIONS AND ANSWERS */
  useEffect(() => {
    
      fetch('https://opentdb.com/api.php?amount=10')
        .then((res) => {
          if (!res.ok) throw new Error('Network Error');
          return res.json();
        })
        .then((data) =>
          setData(
            data.results.map((el) => ({
              id: nanoid(),
              ...el,
            }))
          )
        )
        .catch((error) => console.log(error));
    
  }, [isPlayAgain])

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
          setCorrectCount={setCorrectCount}
          playAgain={playAgain}
        />
      }

    </main>
  )
}