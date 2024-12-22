import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Button from "./Button";
import FinishedScreen from "./FinishedScreen";
import Progress from "./Progress";
import Footer from "./Footer";
import Timer from "./Timer";

const TIME_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, status: "Loading" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        status: "Loaded",
        questions: action.payload,
      };
    case "FETCH_ERROR":
      return { ...state, status: "Error" };
    case "START_QUIZ":
      return {
        ...state,
        status: "start",
        timeRemaining: state.questions.length * TIME_PER_QUESTION,
      };
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
    case "RESTART_QUIZ":
      return {
        ...initialState,
        status: "Loaded",
        questions: state.questions,
        highScore: state.highScore,
      };
    case "TICK":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Invalid action type");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

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
            <Progress
              numberOfQuestions={numberOfQuestions}
              index={index}
              totalPoints={totalPoints}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />

            <Footer>
              <Timer timeRemaining={timeRemaining} dispatch={dispatch} />

              {index < numberOfQuestions - 1 && (
                <Button dispatch={dispatch} answer={answer}>
                  Next
                </Button>
              )}

              {index === numberOfQuestions - 1 && (
                <Button dispatch={dispatch}>Finish</Button>
              )}
            </Footer>
          </>
        )}

        {status === "finish" && (
          <FinishedScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
