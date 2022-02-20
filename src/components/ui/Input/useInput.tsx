import { ChangeEvent, useState } from 'react';

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target ? e.target.value : '');

  const clear = (value = '') => setValue(value);

  return {
    value,
    onChange,
    clear,
    setValue,
  };
};
