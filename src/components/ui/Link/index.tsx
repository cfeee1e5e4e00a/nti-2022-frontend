import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

export const Link = ({ href, children, className = '' }: Props) => {
  return (
    <RouterLink
      className={`text-blue-500 transition hover:duration-100 hover:text-blue-600 active:text-blue-700 transform duration-75 active:scale-110 ${className}`}
      to={href}
    >
      {children}
    </RouterLink>
  );
};
