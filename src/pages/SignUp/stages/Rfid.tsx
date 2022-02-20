import { AuthSignUpDTO } from 'services/auth';
import { useEffect } from 'react';
import { useRealtime } from 'hooks/useRealtime';

import { Container } from 'components/Form/Container';
import { Header } from 'components/Form/Header';

type Props = {
  onSubmit: (creditionals: Pick<AuthSignUpDTO, 'rfid'>) => void;
};

export const Rfid = ({ onSubmit }: Props) => {
  const realtime = useRealtime();

  useEffect(() => {
    const rfid = realtime.selector('rfid');
    if (rfid) {
      onSubmit({ rfid });
    }
  }, [realtime, onSubmit]);

  return (
    <Container onSubmit={() => onSubmit({ rfid: 1 })}>
      <Header>Регистрация RFID-Карты</Header>
      <p className="text-2xl font-medium text-center">
        Поднесите карту к считывателю
      </p>
    </Container>
  );
};
