import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const {
    commits: initialCommits,

    children,
  } = props;

  // Use State to keep the values
  const [commits, setCommits] = useState(initialCommits);

  //   const addNewUser = (userName) => {
  //     const newUser = { id: new Date().getTime().toString(), name: userName };
  //     setUsers(users.concat([newUser]));
  //   };

  // Make the context object:
  const commitsContext = {
    commits,
    setCommits,
    // selectedUser,
    // setSelectedUser,
    // addNewUser,
  };

  // pass the value in provider and return
  return <Context.Provider value={commitsContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  commits: PropTypes.array,
};

Provider.defaultProps = {
  commits: [],
};
