import { InputHTMLAttributes, ReactNode } from 'react';

type Props = {
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
  type?: 'submit';
};

export const Button = ({
  onClick = () => {},
  type,
  children = null,
  className = '',
}: Props) => {
  return (
    <button
      className={`min-w-fit w-24 h-10 px-6 py-4 flex justify-center items-center bg-blue-500 transition hover:duration-100 hover:bg-blue-600 transform active:duration-75 active:scale-95 text-white rounded-xl font-medium ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
