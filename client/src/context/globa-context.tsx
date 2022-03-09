import React, { FunctionComponent, createContext, useReducer, useContext } from "react";

import reducer from "./reducer";
import { Dispatch, ProviderProps, State } from "./types";

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(undefined);
const initialState = {} as State;

export const Provider: FunctionComponent<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export function useGlobalState() {
  const context = useContext(StateContext);

  if (!context) throw new Error('useGlobalState cannot be used outside the Provider');

  return context;
}

export function useDispatch() {
  const context = useContext(DispatchContext);

  if (!context) throw new Error('useDispatch cannot be used outside the Provider');

  return context;
}
