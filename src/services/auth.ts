import { coreApi } from 'api/core';
import { AxiosInstance } from 'axios';
import { ProfileProfile } from './profile';

export type AuthRole = 'doctor';

export type AuthSignUpDTO = {
  login: string;
  password: string;
  role: AuthRole;
  rfid: number;
  profile: ProfileProfile;
};

export type AuthSignInDTO = {
  login: string;
  password: string;
};

export type AuthMeResponse = {
  role: AuthRole;
  profile: ProfileProfile;
};

class AuthError extends Error {}

class AuthService {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async signup(dto: AuthSignUpDTO) {
    await this.api.post('/api/auth/signup', dto);
  }

  async signin(dto: AuthSignInDTO): Promise<boolean> {
    const { status } = await this.api.post('/api/auth/signin', dto);
    return status === 200;
  }

  async me() {
    const { data } = await this.api.get<AuthMeResponse>('/api/auth/me');
    return data;
  }
}

export default new AuthService(coreApi);
