import * as r from 'ramda';
import { DisplayProps } from './type';

import { Card } from '../Card';

type Props = DisplayProps<string | number>;

const isFloat = (value: number) => !Number.isInteger(value);

const toFixedPrecision = (value: number, precision = 2) =>
  value.toFixed(precision);

const normalize = (value: string | number) =>
  r.is(Number)(value)
    ? r.ifElse(isFloat, toFixedPrecision, r.toString)(value)
    : r.identity(value);

export const Plain = ({
  value,
  displayName,
  displayMeasure,
  className,
}: Props) => {
  return (
    <Card displayName={displayName} className={className}>
      <span>
        {typeof value !== 'undefined' && value !== ''
          ? normalize(value)
          : 'Ошибка'}
      </span>
      <span>{displayMeasure}</span>
    </Card>
  );
};
