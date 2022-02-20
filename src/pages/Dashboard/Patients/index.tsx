import { useEffect, useState } from 'react';
import { Patient } from 'services/patient';
import patientService from 'services/patient';

import { PatientList } from './List';

export const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      setPatients(await patientService.getPatients());
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <PatientList patients={patients} />
    </div>
  );
};
