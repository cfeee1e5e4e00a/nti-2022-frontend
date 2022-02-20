import { useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { AuthSignUpDTO } from 'services/auth';

import { Creditionals } from './stages/Creditionals';
import { Rfid } from './stages/Rfid';

const emptyDto: AuthSignUpDTO = {
  login: '',
  password: '',
  rfid: 0,
  role: 'doctor',
  profile: {
    name: '',
    surname: '',
    age: 0,
    sex: 'male',
  },
};

export const SignUpPage = () => {
  const [stage, setStage] = useState(0);
  const [dto, setDto] = useState<AuthSignUpDTO>(emptyDto);
  const navigate = useNavigate();
  const auth = useAuth();

  const fillDto = (
    newFields: Omit<AuthSignUpDTO, 'rfid'> | Pick<AuthSignUpDTO, 'rfid'>
  ) => {
    if (stage < 2) {
      setDto({ ...dto, ...newFields });
      setStage(stage + 1);
    }
  };

  useEffect(() => {
    const signup = async (dto: AuthSignUpDTO) => {
      // await auth.signup(dto);
      console.log(dto);
      navigate('/');
    };

    if (stage === 2) {
      signup(dto);
    }
  }, [dto, stage, navigate]);

  return (
    <div className="w-full h-full p-4 flex justify-center items-center">
      {(() => {
        switch (stage) {
          case 0:
            return <Creditionals onSubmit={fillDto} />;
          case 1:
            return <Rfid onSubmit={fillDto} />;
        }
      })()}
    </div>
  );
};
