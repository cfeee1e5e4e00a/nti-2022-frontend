import { ReactNode } from 'react';

import { Menu } from 'components/Menu';

type Props = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex flex-row bg-blue-100">
      <Menu />
      {children}
    </div>
  );
};
