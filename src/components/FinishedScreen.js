function FinishedScreen({ points, totalPoints, highScore }) {
  const percentage = (points / totalPoints) * 100;
  return (
    <div>
      <p className="result">
        Your Score is {points} out of {totalPoints} ({Math.ceil(percentage)})
      </p>

      <p className="result">High Score is {highScore}</p>
    </div>
  );
}

export default FinishedScreen;
