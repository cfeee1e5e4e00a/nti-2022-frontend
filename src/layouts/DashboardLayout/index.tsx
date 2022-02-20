import { ReactNode, useEffect, useState } from 'react';
import { useRealtime } from 'hooks/useRealtime';

import { Menu } from 'components/Menu';

import 'styles/centrelize-absolute.css';

type Props = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: Props) => {
  const { selector } = useRealtime();

  const [alarm, setAlarm] = useState(false);

  useEffect(() => {
    setAlarm(!!selector('alarm') || !!selector('alv_failed'));
  }, [selector]);

  const alarmReasons = (
    <div className="absolute w-max centrelize-horizontal bottom-12 bg-white p-6 rounded-2xl text-center text-4xl font-medium flex flex-col gap-4">
      {selector('alarm') && <span>Проникновение в палату</span>}
      {selector('alv_failed') && <span>Отказ ИВЛ</span>}
    </div>
  );

  return (
    <div
      className={`relative w-full h-full flex flex-row ${
        alarm ? 'bg-red-200' : ''
      }`}
    >
      <Menu />
      {children}
      {alarm && alarmReasons}
    </div>
  );
};
