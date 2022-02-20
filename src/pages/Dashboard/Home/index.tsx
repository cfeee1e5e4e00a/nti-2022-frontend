import { useRealtime } from 'hooks/useRealtime';

import { Bool } from 'components/Dashboard/RealtimeCards/Display/Bool';
import { Plain } from 'components/Dashboard/RealtimeCards/Display/Plain';

import 'styles/loader.css';

export const Home = () => {
  const { selector } = useRealtime();

  return (
    <div className="grid grid-cols-4 gap-4">
      <Plain
        displayName="Температура"
        displayMeasure="°С"
        value={selector('temperature')}
      />
      <Plain
        displayName="Влажность"
        displayMeasure="%"
        value={selector('humidity')}
      />
      <Plain
        displayName="Освещение"
        displayMeasure="Люкс"
        value={selector('lighting')}
      />
      <Plain
        displayName="Весы"
        displayMeasure="кг"
        value={selector('weight')}
      />
      <Bool displayName="Движение" value={selector('motion')} />
    </div>
  );
};
