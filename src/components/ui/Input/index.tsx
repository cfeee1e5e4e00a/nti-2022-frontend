import { useInput } from './useInput';

import { XIcon } from '@heroicons/react/outline';
import { InputHTMLAttributes } from 'react';

type Props = {
  model: ReturnType<typeof useInput>;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  className?: string;
};

export const Input = ({
  model,
  placeholder = '',
  type,
  className = '',
}: Props) => {
  const { value, onChange, clear } = model;

  const showClear = value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <input
        className="w-full px-4 py-2 bg-gray-100 hover:duration-100 focus:duration-100 focus:bg-gray-200 hover:bg-gray-200 hover:border-gray-200 outline-none rounded-lg placeholder:text-gray-500 focus:placeholder:text-black"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
      {showClear && (
        <span className="absolute top-2 right-2" onClick={() => clear()}>
          <XIcon className="w-6 h-6 text-gray-500 transition hover:duration-100 hover:text-black cursor-pointer" />
        </span>
      )}
    </div>
  );
};
