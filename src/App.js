import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";

const initialState = {
  questions: [],
  status: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, status: "Loading" };
    case "FETCH_SUCCESS":
      return { ...state, status: "Loaded", questions: action.payload };
    case "FETCH_ERROR":
      return { ...state, status: "Error" };
    default:
      throw new Error("Invalid action type");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

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
        {status === "Loaded" && console.log(questions)}
      </Main>
    </div>
  );
}

export default App;
