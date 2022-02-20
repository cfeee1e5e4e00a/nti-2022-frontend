import { useAuth } from 'hooks/useAuth';
import { useInput } from 'components/ui/Input/useInput';

import { Container } from 'components/Form/Container';
import { Input } from 'components/ui/Input';
import { Button } from 'components/ui/Button';
import { Link } from 'components/ui/Link';
import { Header } from 'components/Form/Header';

export const SignInPage = () => {
  const auth = useAuth();

  // Formik для слабых
  const login = useInput();
  const password = useInput();

  const signin = async () =>
    console.log(
      (await auth.signin({
        login: login.value,
        password: password.value,
      }))
        ? 'Зашел'
        : 'Не зашел'
    );

  return (
    <div className="w-full h-full p-4 flex justify-center items-center">
      <Container onSubmit={signin}>
        <Header>Умная поликлиника</Header>
        <Input className="w-full" model={login} placeholder="Логин" />
        <Input
          className="w-full"
          type="password"
          model={password}
          placeholder="Пароль"
        />
        <Button type="submit">Войти</Button>
      </Container>
    </div>
  );
};
