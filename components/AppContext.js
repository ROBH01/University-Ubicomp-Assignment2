import React from "react";

/**
 * Context is used to have access to global vars such as user name and age
 * from different screens, without passing them explicitly as props from
 * one component to another.
 */
const AppContext = React.createContext();

export default AppContext;
