import { Icon } from 'common/icon';
import { SyntheticEvent } from 'react';

type Props = {
  displayName: Capitalize<string>;
  icon: Icon;
  isCurrent: boolean;
  onClick: (event?: SyntheticEvent) => void;
};

export const MenuItem = ({
  displayName,
  isCurrent,
  onClick,
  icon: Icon,
}: Props) => {
  return (
    <li
      className={`w-full flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transform transition duration-200 cursor-pointer ${
        isCurrent
          ? 'bg-blue-500 scale-125 text-white font-semibold'
          : 'font-medium'
      }`}
      onClick={(event: SyntheticEvent) => {
        event.preventDefault();
        onClick(event);
      }}
    >
      <Icon className="w-6 h-6" />
      <p className="text-lg">{displayName}</p>
    </li>
  );
};
