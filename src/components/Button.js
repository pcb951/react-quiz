function Button({ children, dispatch, answer }) {
  // children is a special prop that is passed to components when they are used in JSX
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        children === "Finish"
          ? dispatch({ type: "FINISH_QUIZ" })
          : dispatch({ type: "NEXT_QUESTION" })
      }
    >
      {children}
    </button>
  );
}

export default Button;
