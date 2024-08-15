/* eslint-disable react/prop-types */

export default function StartScreen(props) {
  return (
    <div className="start-screen">
      <div className="start-screen--menu">
        <h1 className="menu--title">Quizzical</h1>
        <p className="menu--description">
          Challenge your knowledge with this interactive quiz game and review
          your results after completing all the questions.
        </p>
        <button type="button" className="menu--button" onClick={()=>props.startQuiz()}>
          Start quizz
        </button>
      </div>
    </div>
  );
}