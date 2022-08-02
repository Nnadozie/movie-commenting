import { Dispatch } from 'react';
import { User } from '@firebase/auth';

export type SET_USER = { type: 'SET_USER'; value: User };
export type SET_MOVIES = { type: 'SET_MOVIES'; value: Movie[] };

export type Actions = SET_USER | SET_MOVIES;

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

export type State = {
  dispatch: Dispatch<Actions>;
  movies: Movie[] | undefined;
  user: User | undefined;
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.value,
      };
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
