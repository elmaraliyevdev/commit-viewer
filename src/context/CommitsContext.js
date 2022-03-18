import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const { commits: initialCommits, error: initialError, children } = props;

  // Use State to keep the values
  const [commits, setCommits] = useState(initialCommits);
  const [error, setError] = useState(initialError);

  // Make the context object:
  const commitsContext = {
    commits,
    error,
    setCommits,
    setError,
  };

  // pass the value in provider and return
  return <Context.Provider value={commitsContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  commits: PropTypes.array,
  error: PropTypes.string,
};

Provider.defaultProps = {
  commits: [],
  error: "",
};
