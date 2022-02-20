import { coreApi } from 'api/core';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ProfileProfile } from './profile';
import { Either, left, right } from 'fp-ts/Either';

export type AuthRole = 'doctor' | 'patient';

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
  login: string;
  role: AuthRole;
  profile: ProfileProfile;
};

export type AuthGetRfidResponse = {
  rfid: number;
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

  async logout() {
    await this.api.get('/api/auth/logout');
  }

  async me(): Promise<Either<false, AuthMeResponse>> {
    const { data, status } = await this.api.get<AuthMeResponse>('/api/auth/me');
    return status === 200 ? right(data) : left(false);
  }

  async getRfid(abortController?: AbortController) {
    const { data } = await this.api.get<AuthGetRfidResponse>('/api/rfid', {
      signal: abortController?.signal,
    });

    return data;
  }
}

export default new AuthService(coreApi);
