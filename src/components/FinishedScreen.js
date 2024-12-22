function FinishedScreen({ points, totalPoints, highScore, dispatch }) {
  const percentage = (points / totalPoints) * 100;
  return (
    <div>
      <p className="result">
        Your Score is {points} out of {totalPoints} ({Math.ceil(percentage)})
      </p>

      <p className="result">High Score is {highScore}</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "RESTART_QUIZ" })}
      >
        Restart
      </button>
    </div>
  );
}

export default FinishedScreen;
