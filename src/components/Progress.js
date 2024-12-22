function Progress({ numberOfQuestions, index, totalPoints, points, answer }) {
  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={index + Number(answer !== null)}
      />
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
