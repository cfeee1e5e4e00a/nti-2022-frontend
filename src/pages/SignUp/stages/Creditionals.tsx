import { useState } from 'react';
import { AuthSignUpDTO } from 'services/auth';
import { ProfileSex } from 'services/profile';
import { useInput } from 'components/ui/Input/useInput';

import { Container } from 'components/Form/Container';
import { Header } from 'components/Form/Header';
import { RadioGroup } from 'components/Form/RadioGroup';
import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';

type Props = {
  onSubmit: (creditionals: Omit<AuthSignUpDTO, 'rfid'>) => void;
};

type Sexes = { key: ProfileSex; displayName: string }[];
const sexes: Sexes = [
  { key: 'male', displayName: 'Мужской' },
  { key: 'female', displayName: 'Женский' },
];

export const Creditionals = ({ onSubmit }: Props) => {
  const login = useInput();
  const password = useInput();

  const name = useInput();
  const surname = useInput();
  const age = useInput();

  const [sex, setSex] = useState<ProfileSex>('male');

  return (
    <Container
      onSubmit={() =>
        onSubmit({
          login: login.value,
          password: password.value,
          role: 'patient',
          profile: {
            name: name.value,
            surname: surname.value,
            age: Number.parseInt(age.value),
            sex,
          },
        })
      }
    >
      <Header>Добавление пациента</Header>
      <Input className="w-full" model={login} placeholder="Логин" />
      <Input
        className="w-full"
        type="password"
        model={password}
        placeholder="Пароль"
      />
      <hr className="w-full border-gray-200" />
      <Input className="w-full" model={name} placeholder="Имя" type="text" />
      <Input
        className="w-full"
        model={surname}
        placeholder="Фамилия"
        type="text"
      />
      <Input
        className="w-full"
        model={age}
        placeholder="Возраст"
        type="number"
      />
      <RadioGroup
        name="sex"
        value={sex}
        setValue={setSex}
        displayName="Пол"
        variants={sexes}
      />
      <Button type="submit">Далее</Button>
    </Container>
  );
};
