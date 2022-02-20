import { CheckIcon, PencilIcon } from '@heroicons/react/outline';
import { useInput } from 'components/ui/Input/useInput';
import { useRealtime } from 'hooks/useRealtime';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService, { Card } from 'services/patient';
import { ProfileProfile } from 'services/profile';
import auth from 'services/auth';
import { useAuth } from 'hooks/useAuth';

import { Input } from 'components/ui/Input';
import { Button } from 'components/ui/Button';

export const MedicalCard = () => {
  const { login } = useParams() as { login: string };
  const realtime = useRealtime();
  const auth = useAuth();

  const [editing, setEditing] = useState(false);
  const [card, setCard] = useState<Card>({
    assignments: '',
    weight: 0,
  });
  const [profile, setProfile] = useState<ProfileProfile>({
    age: 0,
    name: '',
    surname: '',
    sex: 'male',
  });

  const weight = useInput();
  const assignments = useInput();

  useEffect(() => {
    const fetchCard = async (login: string) => {
      const card = await patientService.getCardByLogin(login);
      setCard(card);
      weight.setValue(String(card.weight));
      assignments.setValue(card.assignments);
    };

    const fetchProfile = async (login: string) => {
      setProfile(await patientService.getProfileByLogin(login));
    };

    fetchCard(login);
    fetchProfile(login);
  }, [login, editing]);

  const toggleEditing = () => {
    setEditing(true);
  };

  const save = async () => {
    await patientService.updateCardByLogin(login, {
      assignments: assignments.value,
      weight: Number.parseFloat(weight.value),
    });

    await setEditing(false);
  };

  const measureWeight = () => {
    weight.setValue(String(realtime.selector('weight')));
  };

  const editButton = editing ? (
    <CheckIcon className="min-w-min w-6 h-6 cursor-pointer" onClick={save} />
  ) : (
    <PencilIcon
      className="min-w-min w-6 h-6 cursor-pointer"
      onClick={toggleEditing}
    />
  );

  const display = (
    <div className="w-full p-6 flex flex-col items-start justify-center gap-4 bg-white rounded-xl">
      <h2 className="text-3xl flex flex-row gap-4 items-center">
        {`${profile.name} ${profile.surname}`}
        {auth.role === 'doctor' && editButton}
      </h2>
      <span className="text-xl">{`Возраст: ${profile.age}`}</span>
      <span className="text-xl">{`Пол: ${
        profile.sex === 'male' ? 'Мужской' : 'Женский'
      }`}</span>
      <span className="text-xl">{`Вес: ${card.weight}`}</span>
      <span className="text-xl">{`Назначение: ${card.assignments}`}</span>
    </div>
  );

  const editor = (
    <div className="w-full p-6 flex flex-col items-start justify-center gap-4 bg-white rounded-xl">
      <h2 className="text-3xl flex flex-row gap-4 items-center">
        {`${profile.name} ${profile.surname}`}
        {editButton}
      </h2>
      <span className="text-xl">{`Возраст: ${profile.age}`}</span>
      <span className="text-xl">{`Пол: ${
        profile.sex === 'male' ? 'Мужской' : 'Женский'
      }`}</span>
      <div className="flex flex-row gap-4 items-center">
        <span className="text-xl">Вес: </span>
        <Input model={weight} />
        <Button onClick={measureWeight}>Измерить</Button>
      </div>

      <div className="flex flex-row gap-4 items-center">
        <span className="text-xl">Назначения:</span>
        <Input className="w-96" model={assignments} />
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      {card ? (
        editing ? (
          editor
        ) : (
          display
        )
      ) : (
        <span className="loader w-8 h-8"></span>
      )}
    </div>
  );
};
