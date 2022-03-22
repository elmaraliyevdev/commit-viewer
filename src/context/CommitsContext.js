import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const { url: initialUrl, children } = props;

  // Use State to keep the values
  const [url, setUrl] = useState(initialUrl);

  // Make the context object:
  const commitsContext = {
    url,
    setUrl,
  };

  // pass the value in provider and return
  return <Context.Provider value={commitsContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  url: PropTypes.string,
};

Provider.defaultProps = {
  url: "",
};
