import { ReactNode } from 'react';

type Props = {
  onChange?: () => void;
  children: ReactNode;
};

export const Checkbox = ({ onChange = () => {}, children }: Props) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <span>{children}</span>
      <div className="relative flex items-center">
        <input
          className="appearance-none w-6 h-6 p-1 checked:bg-gray-400 border-2 border-gray-200 checked:border-gray-400 rounded-md "
          type="checkbox"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
