import { useContext } from 'react';
import { AuthContext } from 'contexts/auth';
import authService, { AuthSignInDTO, AuthSignUpDTO } from 'services/auth';
import { isRight } from 'fp-ts/Either';
import Cookie from 'js-cookie';

// TODO: message if forget use provider

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const { authed, profile, role, login } = state;

  const signin = async (dto: AuthSignInDTO) => {
    if (!(await authService.signin(dto))) return false;
    const me = await authService.me();
    if (isRight(me)) {
      dispatch({
        type: 'signin',
        payload: {
          login: dto.login,
          profile: me.right.profile,
          role: me.right.role,
        },
      });
      return true;
    } else {
      return false;
    }
  };

  const signup = async (dto: AuthSignUpDTO) => {
    await authService.signup(dto);
  };

  const signout = async () => {
    await authService.logout();
    Cookie.remove('AIOHTTP_SESSION', { path: '/' });
    dispatch({ type: 'signout' });
  };

  return {
    authed,
    profile,
    role,
    signin,
    signup,
    signout,
    login,
  };
};
