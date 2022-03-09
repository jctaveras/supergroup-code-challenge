import { ReactNode } from "react";

import { Feed } from "../generated/graphql";

export type LoggedUser = {
  token: string;
};

export type Action =
  | { type: 'FEED_FETCHED', payload?: Feed }
  | { type: 'CURRENT_USER_FETCHED', payload: LoggedUser }
  | { type: 'CURRENT_USER_LOGGED_OUT', payload: undefined};

export type State = { Feed?: Feed; User: LoggedUser };
export type ProviderProps = { children: ReactNode };
export type Dispatch = (action: Action) => void;
