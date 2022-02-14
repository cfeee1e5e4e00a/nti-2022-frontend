import { createContext, Dispatch, ReactNode, Reducer, useReducer } from 'react';

export enum AuthAction {
  signin,
  signout,
}

type AuthState = {
  authed: boolean;
};

type AuthReducer = {
  type: AuthAction;
};

const reducer: Reducer<AuthState, AuthReducer> = (state, action) => {
  switch (action.type) {
    case AuthAction.signin:
      return { ...state, authed: true };
    case AuthAction.signout:
      return { ...state, authed: false };
  }
};

const initialState: AuthState = {
  authed: false,
};

type UseAuthReducer = {
  state: AuthState;
  dispatch: Dispatch<AuthReducer>;
};

const useAuthReducer = (): UseAuthReducer => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
};

export const AuthContext = createContext<UseAuthReducer>({
  state: initialState,
  dispatch: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authReducer = useAuthReducer();

  return (
    <AuthContext.Provider value={authReducer}>{children}</AuthContext.Provider>
  );
};
