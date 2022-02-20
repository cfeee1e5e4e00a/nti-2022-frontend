import { useNavigate } from 'react-router-dom';

import { ArrowRightIcon, PlusIcon } from '@heroicons/react/outline';
import { Patient } from 'services/patient';
import { PatientItem } from './item';

type Props = {
  patients: Patient[];
};

export const PatientList = ({ patients }: Props) => {
  const navigate = useNavigate();

  const openPatient = (login: string) => navigate(`/patients/${login}`);
  const openSignUpPage = () => navigate('/patients/signup');

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="mb-2 text-2xl font-medium">Пациенты</h2>
      {patients.map((patient) => (
        <PatientItem
          onClick={() => openPatient(patient.login)}
          key={patient.login}
        >{`${patient.profile.name} ${patient.profile.surname}`}</PatientItem>
      ))}
      <PatientItem onClick={openSignUpPage}>
        <span>Добавить пациента</span>
        <PlusIcon className="w-6 h-6" />
      </PatientItem>
    </div>
  );
};
