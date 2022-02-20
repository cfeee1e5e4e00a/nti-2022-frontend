import { useState } from 'react';

export type TabLayoutTab = {
  key: string;
  displayName: string;
  render: () => JSX.Element;
};

type Props = {
  tabs: TabLayoutTab[];
  defaultTab?: TabLayoutTab['key'];
};

export const TabLayout = ({ tabs, defaultTab }: Props) => {
  if (!defaultTab) defaultTab = tabs[0].key;

  const [selected, setSelected] = useState<TabLayoutTab['key']>(defaultTab);

  const tab = tabs.find((t) => t.key === selected);

  return (
    <>
      <ul className="flex flex-row gap-px bg-gray-200 mb-8">
        {tabs.map((t) => (
          <li
            className={`p-4 w-full flex items-center justify-center bg-white first:rounded-l-lg last:rounded-r-lg cursor-pointer transition duration-300 text-lg font-medium ${
              selected === t.key
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100'
            }`}
            key={t.key}
            onClick={() => setSelected(t.key)}
          >
            {t.displayName}
          </li>
        ))}
      </ul>
      {tab && tab.render()}
    </>
  );
};
