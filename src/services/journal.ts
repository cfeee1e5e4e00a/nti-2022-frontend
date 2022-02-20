import { coreApi } from 'api/core';
import { AxiosInstance } from 'axios';

export type JournalRecordTag = 'RFID' | 'FACE' | 'ALARM' | 'ALV';

export type JournalRecord = {
  time: number;
  data: string;
};

class JorunalService {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getJournal(tag: JournalRecordTag) {
    const { data } = await this.api.get<JournalRecord[]>(`/api/journal/${tag}`);

    return data;
  }
}

export default new JorunalService(coreApi);
