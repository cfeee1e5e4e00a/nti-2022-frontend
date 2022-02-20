export type DisplayPropsDisplayMeasure = string;

export type DisplayProps<T> = {
  value?: T;
  displayMeasure: DisplayPropsDisplayMeasure;
  displayName: Capitalize<string>;
  className?: string;
};
