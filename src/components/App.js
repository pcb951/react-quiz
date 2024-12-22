import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import FinishedScreen from "./FinishedScreen";

const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, status: "Loading" };
    case "FETCH_SUCCESS":
      return { ...state, status: "Loaded", questions: action.payload };
    case "FETCH_ERROR":
      return { ...state, status: "Error" };
    case "START_QUIZ":
      return { ...state, status: "start" };
    case "NEW_ANSWER":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "NEXT_QUESTION":
      return { ...state, index: state.index + 1, answer: null };
    case "FINISH_QUIZ":
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    default:
      throw new Error("Invalid action type");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;

  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(function () {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((error) => dispatch({ type: "FETCH_ERROR" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Loaded" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "start" && (
          <>
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />

            {index < numberOfQuestions - 1 && (
              <Button dispatch={dispatch} answer={answer}>
                Next
              </Button>
            )}

            {index === numberOfQuestions - 1 && (
              <Button dispatch={dispatch}>Finish</Button>
            )}
          </>
        )}

        {status === "finish" && (
          <FinishedScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
