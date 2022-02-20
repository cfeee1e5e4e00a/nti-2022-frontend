export type RealtimeSensorTypeMap = {
  motion: boolean;
  weight: number;
  lighting: number;
  heater_power: number;
  humidity: number;
  temperature: number;
  cooler_enabled: boolean;
  door_opened: boolean;
  heater_enabled: boolean;
  alv: number;
  window: number;
  cool_temp: number;
  heat_temp: number;
  target_light: number;
  rfid: number;
};

export type RealtimeSensorTag = keyof RealtimeSensorTypeMap;

export type RealtimeState = Partial<{
  [P in RealtimeSensorTag]: RealtimeSensorTypeMap[P];
}>;

type RealtimeServiceOnUpdate = (newState: RealtimeState) => void;

export class RealtimeService {
  onUpdate: RealtimeServiceOnUpdate = () => {};
  ws: WebSocket;

  private onMessage(event: MessageEvent) {
    try {
      // TODO: io-ts
      const data = JSON.parse(event.data) as RealtimeState;

      this.onUpdate(data);
    } catch (error) {
      console.error('fail in RealtimeService.onMessage()');
      console.error(error);
    }
  }

  setOnUpdate(onUpdate: RealtimeServiceOnUpdate) {
    this.onUpdate = onUpdate;
  }

  disconnect() {
    this.ws.close();
  }

  constructor(url: URL) {
    this.ws = new WebSocket(url.toString());
    this.ws.addEventListener('message', (e) => this.onMessage(e));
  }
}
