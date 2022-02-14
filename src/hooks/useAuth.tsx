import { useContext } from 'react';
import { AuthAction, AuthContext } from 'contexts/auth';

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const { authed } = state;

  const signin = () => dispatch({ type: AuthAction.signin });
  const signout = () => dispatch({ type: AuthAction.signout });

  return {
    authed,
    signin,
    signout,
  };
};
