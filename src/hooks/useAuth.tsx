import { useContext } from 'react';
import { AuthContext } from 'contexts/auth';
import authService, { AuthSignInDTO, AuthSignUpDTO } from 'services/auth';

// TODO: message if forget use provider

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const { authed, profile, role } = state;

  const signin = async (dto: AuthSignInDTO) => {
    if (!(await authService.signin(dto))) return false;
    const me = await authService.me();
    dispatch({ type: 'signin', payload: me });
    return true;
  };

  const signup = async (dto: AuthSignUpDTO) => {
    await authService.signup(dto);
  };

  const signout = () => dispatch({ type: 'signout' });

  return {
    authed,
    profile,
    role,
    signin,
    signup,
    signout,
  };
};
