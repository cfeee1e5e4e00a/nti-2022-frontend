import { ActionProps } from '../Action/type';
import { useInput } from 'components/ui/Input/useInput';
import { useEffect, useState } from 'react';
import { normalize } from '../Display/Plain';
import deviceService from 'services/device';

import { Card } from '../Card';
import { Input as UIInput } from 'components/ui/Input';
import { CheckIcon, PencilIcon } from '@heroicons/react/outline';

type Props<T> = ActionProps<T, { value: string }>;

export const Input = <T extends string | number>({
  displayName,
  className,
  value,
  update,
  tag,
}: Props<T>) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const input = useInput(String(value));

  useEffect(() => {
    setLoading(false);
  }, [value]);

  const toggleEditing = () => {
    input.setValue(String(value));
    setEditing(true);
  };

  const save = async () => {
    if (Number.isNaN(Number.parseInt(input.value))) {
      setEditing(false);
      return;
    }
    if (Number.parseInt(input.value) === value) {
      setEditing(false);
      return;
    }
    update({ value: input.value });
    await deviceService.set({
      [tag]: Number.parseInt(input.value),
    });
    setLoading(true);
    setEditing(false);
  };

  const editButton = editing ? (
    <CheckIcon className="min-w-min w-6 h-6 cursor-pointer" onClick={save} />
  ) : (
    <PencilIcon className="w-6 h-6 cursor-pointer" onClick={toggleEditing} />
  );

  const display = editing ? (
    <UIInput model={input} withClear={false} />
  ) : (
    <span>
      {typeof value !== 'undefined' && value !== ''
        ? normalize(value)
        : 'Ошибка'}
    </span>
  );

  return (
    <Card displayName={displayName} className={className}>
      {!loading ? (
        <div className="flex flex-row items-center gap-2">
          {value !== null ? display : <span>Ошибка</span>}
          {editButton}
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center gap-2">
          <span className="loader m-0 p-0 w-6 h-6 border-4"></span>
        </div>
      )}
    </Card>
  );
};
