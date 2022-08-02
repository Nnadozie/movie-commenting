import React, { createContext, ReactElement, useContext, useReducer } from 'react';
import reducer, { State } from './reducer';

const defaultState: State = {
  dispatch: () => {},
  movies: undefined,
  user: undefined,
};

const ChatContext = createContext(defaultState);

const ChatProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return <ChatContext.Provider value={{ ...state, dispatch: dispatch }}>{children}</ChatContext.Provider>;
};

const useChatContext = () => useContext(ChatContext);

export { ChatProvider, useChatContext };
