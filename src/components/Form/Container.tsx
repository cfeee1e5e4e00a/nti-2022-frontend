import { FormEvent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onSubmit: (e: FormEvent) => void;
};

const preventDefault = (callback: (e: FormEvent) => void) => (e: FormEvent) => {
  e.preventDefault();
  callback(e);
};

export const Container = ({ children, onSubmit }: Props) => {
  return (
    <form
      className="w-4/12 max-w-md py-4 px-8 flex flex-col items-center gap-6 bg-white rounded-xl"
      onSubmit={preventDefault(onSubmit)}
    >
      {children}
    </form>
  );
};
