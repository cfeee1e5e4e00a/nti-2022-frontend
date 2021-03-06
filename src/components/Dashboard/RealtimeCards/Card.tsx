import { ReactNode } from 'react';
import { DisplayPropsDisplayMeasure } from './Display/type';

type Props = {
  children: ReactNode;
  displayName: DisplayPropsDisplayMeasure;
  className?: string;
};

export const Card = ({ children, className = '', displayName }: Props) => {
  return (
    <div
      className={`w-full h-32 p-4 flex flex-col justify-center items-center gap-2 bg-white rounded-2xl font-medium text-lg ${className}`}
    >
      <div className="flex gap-2">{children}</div>
      <h3 className="text-center">{displayName}</h3>
    </div>
  );
};
