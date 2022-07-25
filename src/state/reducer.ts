import { Dispatch } from 'react';

export type INIT = { type: 'INIT' };
export type SET_CURRENT_MOVIE = { type: 'SET_CURRENT_MOVIE'; value: string };
export type SYNC_MESSAGES = { type: 'SYNC_MESSAGES'; value: { movieId: string; message: Message } };
export type FETCH_MESSAGES = { type: 'FETCH_MESSAGES'; value: { movieId: string } };
export type SEND_MESSAGE = { type: 'SEND_MESSAGE'; value: { movieId: string; message: Message } };

export type Actions = INIT | SET_CURRENT_MOVIE | SYNC_MESSAGES | FETCH_MESSAGES | SEND_MESSAGE;

export type Movie = {
  year: string;
  votes: string;
  title: string;
  runtime: string;
  revenue: string;
  rating: string;
  rank: string;
  metascore: string;
  genre: string[];
  director: string;
  description: string;
  actors: string[];
};

export type Message = {
  value: string;
  timestamp: Date;
};

export type State = {
  dispatch: Dispatch<Actions>;
  movies: Movie[];
  currentMovie: string | null;
  messages: {
    [movieId: string]: {
      [messageKey: string]: Message;
    };
  };
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'INIT':
      //fetch movies data
      const data: Movie[] = [];
      return {
        ...state,
        movies: data,
      };
    case 'SET_CURRENT_MOVIE':
      return {
        ...state,
        currentMovie: action.value,
      };

    case 'SEND_MESSAGE':
      //send update to firebase using movie id

      return {
        ...state,
      };

    case 'SYNC_MESSAGES':
      //call this action whenever a message changes
      //get updated messages from firebase
      const updatedMessages: { [movieId: string]: Message } = {};

      return {
        ...state,
        messages: {
          [action.value.movieId]: updatedMessages,
        },
      };

    case 'FETCH_MESSAGES':
      //fetch movie messages from firebase
      //call this only if movieId does not exist
      const movieMessages: { [movieId: string]: Message } = {};

      return {
        ...state,
        messages: {
          [action.value.movieId]: movieMessages,
        },
      };
    default:
      return state;
  }
};

export default reducer;
