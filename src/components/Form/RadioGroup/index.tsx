import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type Variant = {
  key: string;
  displayName: string;
};

type Props<K extends string> = {
  name: string;
  variants: Variant[];
  value: string;
  setValue: Dispatch<SetStateAction<K>>;
  displayName?: string;
};

const onChangeHandler =
  <K extends string>(setValue: Dispatch<SetStateAction<K>>) =>
  (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value as K);

export const RadioGroup = <K extends string>({
  name,
  variants,
  value,
  setValue,
  displayName = '',
}: Props<K>) => {
  const variantsDivider = (iter: number) =>
    iter + 1 !== variants.length && (
      <div className="w-px h-full bg-gray-200"></div>
    );

  return (
    <section className="w-full flex flex-row justify-start flex-wrap gap-2">
      <h3>{displayName}:</h3>
      {variants.map((variant, iter) => (
        <div className="flex flex-row gap-2 items-center" key={variant.key}>
          <span>{variant.displayName}</span>
          <input
            className=""
            type="radio"
            value={variant.key}
            name={name}
            onChange={onChangeHandler(setValue)}
            checked={variant.key === value}
          />
          {variantsDivider(iter)}
        </div>
      ))}
    </section>
  );
};
