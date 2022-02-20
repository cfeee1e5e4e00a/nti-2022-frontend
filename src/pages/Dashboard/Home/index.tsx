import { useRealtime } from 'hooks/useRealtime';
import { useAuth } from 'hooks/useAuth';

import { Bool } from 'components/Dashboard/RealtimeCards/Display/Bool';
import { Plain } from 'components/Dashboard/RealtimeCards/Display/Plain';
import { Input } from 'components/Dashboard/RealtimeCards/Action/Input';

import 'styles/loader.css';

export const Home = () => {
  const auth = useAuth();
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
      <Plain displayName="Вес" displayMeasure="г" value={selector('weight')} />
      <Plain
        displayName="Потребление нагревателя"
        displayMeasure="Вт * ч"
        value={selector('heater_power')}
      />
      <Bool displayName="Нагреватель" value={selector('heater_enabled')} />
      <Bool displayName="Охлаждение" value={selector('cooler_enabled')} />
      {auth.role === 'doctor' && (
        <Input<number>
          displayName="Порог освещенности"
          displayMeasure="%"
          update={() => {}}
          tag="target_light"
          value={selector('target_light')}
        />
      )}
      {auth.role === 'doctor' && (
        <Input<number>
          displayName="Порог охлаждения"
          displayMeasure="%"
          update={() => {}}
          tag="cool_temp"
          value={selector('cool_temp')}
        />
      )}
      {auth.role === 'doctor' && (
        <Input<number>
          displayName="Порог нагрева"
          displayMeasure="%"
          update={() => {}}
          tag="heat_temp"
          value={selector('heat_temp')}
        />
      )}
      <Bool
        displayName="Дверь"
        statusDisplayNames={{ on: 'Открыта', off: 'Закрыта' }}
        value={selector('door_opened')}
      />
      <Bool
        displayName="Сигнализация"
        statusDisplayNames={{ on: 'Включена', off: 'Отключена' }}
        value={selector('alarm_enabled')}
      />
    </div>
  );
};
