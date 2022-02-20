import { ReactNode } from 'react';

type Props = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export const PatientItem = ({
  onClick = () => {},
  className = '',
  children,
}: Props) => {
  return (
    <div
      className={`w-full px-6 py-4 flex flex-row justify-center items-center gap-2 bg-white rounded-xl text-xl cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
