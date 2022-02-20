import { AuthSignUpDTO } from 'services/auth';
import { useEffect } from 'react';
import authService from 'services/auth';

import { Container } from 'components/Form/Container';
import { Header } from 'components/Form/Header';
import { Button } from 'components/ui/Button';

type Props = {
  onSubmit: (creditionals: Pick<AuthSignUpDTO, 'rfid'>) => void;
};

export const Rfid = ({ onSubmit }: Props) => {
  const abortController = new AbortController();
  const fetchRfid = async () =>
    onSubmit(await authService.getRfid(abortController));

  const skipRfid = () => {
    abortController.abort();
    onSubmit({ rfid: -1 });
  };

  useEffect(() => {
    fetchRfid();
  }, []);

  return (
    <Container onSubmit={() => {}}>
      <Header>Регистрация RFID-Карты</Header>
      <p className="text-2xl font-medium text-center">
        Поднесите карту к считывателю
      </p>
      <Button onClick={skipRfid}>Пропустить</Button>
    </Container>
  );
};
