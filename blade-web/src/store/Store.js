import React, { useReducer, useEffect } from "react";
import initialState from "store/initialState";
import reducer from "store/reducer";

export const AppContext = React.createContext();

const Store = ({ children }) => {
  const hydratedState =
    JSON.parse(localStorage.getItem("blade_state")) || initialState;

  const [state, dispatch] = useReducer(reducer, hydratedState);

  useEffect(() => {
    console.log("Persisting state...", state);
    localStorage.setItem("blade_state", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default Store;
