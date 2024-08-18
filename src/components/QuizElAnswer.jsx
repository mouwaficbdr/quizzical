/* eslint-disable react/prop-types */
import {decode} from "he"

export default function QuizzElAnswer({data, answer, id, choices, setChoices, showResults}) {
  function registerChoice() {
    setChoices((prevChoices) => {
      const existingChoice = prevChoices.find((el) => el.id === id);
      if (existingChoice) {
        return prevChoices.map((el) =>
          el.id === id ? { ...el, userChoice: answer } : el
        );
      } else {
        return [...prevChoices, { id: id, userChoice: answer }];
      }
    });
  }

  function chosenAnswerStyle() {
    const answerExistsInChoices = choices.some(
      (el) => el.id === id && answer === el.userChoice
    );
    return answerExistsInChoices
      ? {
          backgroundColor: '#D6DBF5',
        }
      : {
          backgroundColor: '',
        };
  }

  function resultsStyle() {
    const answerData = data.find((el) => el.id === id)
    if (answer === answerData.correct_answer) {
      return ({
        backgroundColor: '#94D7A2',
        opacity: 1
      })  
    } else if (answerData.incorrect_answers.includes(answer)
      && choices.find(choice => choice.id === id)?.userChoice === answer) {
      return ({
        backgroundColor: "#F8BCBC"
      })
    } else {
      return ({
        backgroundColor: ""
      })
    }
  }

  return (
    <button
      className="quiz-element--answers"
      onClick={() => registerChoice()}
      style={showResults ? resultsStyle() : chosenAnswerStyle()}
      disabled={showResults}
    >
      {decode(answer)}
    </button>
  );
}