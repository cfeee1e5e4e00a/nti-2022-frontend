import { coreApi } from 'api/core';
import { AxiosInstance } from 'axios';
import { RealtimeSensorTypeMap } from './realtime';

export type DeviceTagMap = Pick<
  RealtimeSensorTypeMap,
  'target_light' | 'cool_temp' | 'heat_temp'
>;

export type DeviceTag = keyof DeviceTagMap;

export type DeviceSetDTO = Partial<{
  [P in DeviceTag]: RealtimeSensorTypeMap[P];
}>;

class DeviceService {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async set(tag: DeviceSetDTO) {
    await coreApi.post('/api/device', tag);
  }
}

export default new DeviceService(coreApi);
