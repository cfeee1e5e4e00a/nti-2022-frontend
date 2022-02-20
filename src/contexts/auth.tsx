import { createContext, Dispatch, ReactNode, Reducer, useReducer } from 'react';
import { act } from 'react-dom/test-utils';
import { AuthMeResponse, AuthRole } from 'services/auth';
import { ProfileProfile } from 'services/profile';

type AuthState = {
  authed: boolean;
  role?: AuthRole;
  profile?: ProfileProfile;
};

type AuthAction =
  | { type: 'signin'; payload: AuthMeResponse }
  | { type: 'signout' };

const reducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case 'signin':
      const { role, profile } = action.payload;
      return {
        ...state,
        authed: true,
        role,
        profile,
      };
    case 'signout':
      return { authed: false };
  }
};

const initialState: AuthState = {
  authed: false,
};

type UseAuthHook = () => {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

const useAuthReducer: UseAuthHook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
};

export const AuthContext = createContext<ReturnType<UseAuthHook>>({
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
