function StartScreen({ numberOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the react quiz!</h2>
      <h3>{numberOfQuestions} question ready to check your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "START_QUIZ" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
