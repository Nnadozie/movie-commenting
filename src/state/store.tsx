import React, { createContext, ReactElement, useReducer } from 'react';
import reducer, { State } from './reducer';

const defaultState: State = {
  dispatch: () => {},
  movies: [],
  currentMovie: null,
  messages: {},
};

export const Context = createContext(defaultState);

const Store: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return <Context.Provider value={{ ...state, dispatch: dispatch }}>{children}</Context.Provider>;
};

export default Store;
