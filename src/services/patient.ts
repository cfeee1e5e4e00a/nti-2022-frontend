import { coreApi } from 'api/core';
import { AxiosInstance } from 'axios';
import { ProfileProfile } from './profile';

export type Patient = {
  login: string;
  profile: ProfileProfile;
};

export type Card = {
  weight: number;
  assignments: string;
};

class PatientService {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getPatients() {
    const { data } = await this.api.get<Patient[]>('/api/patients');

    return data;
  }

  async getProfileByLogin(login: Patient['login']) {
    const { data } = await this.api.get<ProfileProfile>(
      `/api/profile/${login}`
    );

    return data;
  }

  async getCardByLogin(login: Patient['login']) {
    const { data } = await this.api.get<Card>(`/api/card/${login}`);

    return data;
  }

  async updateCardByLogin(login: Patient['login'], card: Card) {
    await this.api.post<Card>(`/api/card/${login}`, card);
  }
}

export default new PatientService(coreApi);
