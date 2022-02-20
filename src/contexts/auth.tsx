import {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useEffect,
  useReducer,
} from 'react';
import { act } from 'react-dom/test-utils';
import auth, { AuthMeResponse, AuthRole, AuthSignInDTO } from 'services/auth';
import { ProfileProfile } from 'services/profile';
import authService from 'services/auth';
import { isRight } from 'fp-ts/Either';

type AuthState = {
  authed: boolean;
  role?: AuthRole;
  profile?: ProfileProfile;
  login?: string;
};

type AuthAction =
  | { type: 'signin'; payload: AuthMeResponse & Pick<AuthSignInDTO, 'login'> }
  | { type: 'signout' };

const reducer: Reducer<AuthState, AuthAction> = (state, action) => {
  switch (action.type) {
    case 'signin':
      const { role, profile, login } = action.payload;
      return {
        authed: true,
        login,
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

  useEffect(() => {
    const fetchMe = async () => {
      const me = await authService.me();
      if (isRight(me)) {
        dispatch({
          type: 'signin',
          payload: {
            login: me.right.login,
            profile: me.right.profile,
            role: me.right.role,
          },
        });
      }
    };

    fetchMe();
  }, []);

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
