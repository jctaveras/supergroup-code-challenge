import { Action, State } from './types';

export default function reducer(state: State, { type, payload }: Action) {
  switch(type) {
    case 'CURRENT_USER_FETCHED':
      return Object.assign({}, state, { User: payload });
    case 'FEED_FETCHED':
      return Object.assign({}, state, { Feed: payload });
    case 'CURRENT_USER_LOGGED_OUT':
      return Object.assign({}, state, { User: payload });
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
} 
