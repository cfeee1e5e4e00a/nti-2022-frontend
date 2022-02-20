import { DisplayProps } from './type';

import { Card } from '../Card';

type StatusDisplayNames = {
  off: string;
  on: string;
};

type Props = Omit<DisplayProps<boolean>, 'displayMeasure'> & {
  statusDisplayNames?: StatusDisplayNames;
};

export const Bool = ({
  displayName,
  className,
  value,
  statusDisplayNames: { on, off } = {
    on: 'Включено',
    off: 'Выключено',
  },
}: Props) => {
  return (
    <Card displayName={displayName} className={className}>
      {value !== null ? (
        <span className={`${value ? 'text-green-500' : 'text-red-500'}`}>
          {value ? on : off}
        </span>
      ) : (
        <span>Ошибка</span>
      )}
    </Card>
  );
};
