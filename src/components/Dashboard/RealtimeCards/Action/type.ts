import { DeviceTag } from 'services/device';

export type ActionPropsDisplayMeasure = string;

export type ActionProps<T, U> = {
  value?: T;
  tag: DeviceTag;
  displayMeasure: ActionPropsDisplayMeasure;
  displayName: Capitalize<string>;
  className?: string;
  update: ({ ...props }: U) => void;
};
