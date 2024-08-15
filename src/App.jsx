import StartScreen from "./components/StartScreen"
import QuizQuestions from "./components/QuizQuestions"
import { useState, useEffect } from "react"
import mockData from "./mockData.json"

export default function App() {

  const [data, setData] = useState(mockData.results)  
  const [start, setStart] = useState(false)

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
    // setStart(true)
  }


  return (
    <main>
        <StartScreen
          startQuiz = {startQuiz}
      />
        <QuizQuestions />
    </main>
  )
}