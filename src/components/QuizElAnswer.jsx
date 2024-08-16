/* eslint-disable react/prop-types */

export default function QuizzElAnswer({answer, id, choices, setChoices}) {

  function registerChoice() {
    setChoices(prevChoices => {
      const existingChoice = prevChoices.find(el => el.id === id);
      if (existingChoice) {
        return prevChoices.map(el => 
          el.id === id ? { ...el, userChoice: answer } : el
        );
      } else {
        return [...prevChoices, { id: id, userChoice: answer }];
      }
    });
  }

  function doesAnswerExistInChoices() {
    return choices.some(el => answer === el.userChoice)
  }

  const answerExists = doesAnswerExistInChoices();

  const chosenAnswerStyle = {
    backgroundColor: answerExists ? "#D6DBF5" : ""
  }
  
  return (
    <button className="quiz-element--answers" onClick={()=>registerChoice()} style={chosenAnswerStyle}>{answer}</button>
  )
}