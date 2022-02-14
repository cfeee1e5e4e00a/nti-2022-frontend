import { useAuth } from 'hooks/useAuth';

export const SignInPage = () => {
  const auth = useAuth();

  const signin = () => auth.signin();

  return (
    <div>
      <button onClick={signin}>Войти</button>
    </div>
  );
};
