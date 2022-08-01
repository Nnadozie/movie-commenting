import { Dispatch } from 'react';
import { getDatabase, ref, set, child, push, update, onValue, off } from 'firebase/database';
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

function addCommentListener() {
  //gets what's already there and puts it in state,
  //puts every update in state
}

const reducer = (state: State, action: Actions): State => {
  console.log('in reduceer');
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.value,
      };
    case 'SET_MOVIES':
      console.log('setting user');
      return {
        ...state,
        movies: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
