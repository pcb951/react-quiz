function Progress({ numberOfQuestions, index, totalPoints, points }) {
  return (
    <header className="progress">
      <progress max={numberOfQuestions} value={index + 1} />
      <p>
        Question {index + 1}/{numberOfQuestions}
      </p>
      <p>
        Points: {points} / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
