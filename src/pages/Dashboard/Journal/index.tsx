import { useEffect, useState } from 'react';
import journalService, {
  JournalRecord,
  JournalRecordTag,
} from 'services/journal';

import { JournalTable } from 'components/Dashboard/JournalTable/table';
import { TabLayout, TabLayoutTab } from 'layouts/TabLayout';

const Tab = ({ tag }: { tag: JournalRecordTag }) => {
  const [journal, setJournal] = useState<JournalRecord[]>([]);
  useEffect(() => {
    const fetchJournal = async () =>
      setJournal(await journalService.getJournal(tag));

    fetchJournal();
  }, [tag]);
  return <JournalTable journal={journal} />;
};

const tabs: TabLayoutTab[] = [
  { key: 'rfid', displayName: 'RFID-Карты', render: () => <Tab tag="RFID" /> },
  { key: 'face', displayName: 'Face-ID', render: () => <Tab tag="FACE" /> },
  {
    key: 'alarm',
    displayName: 'Сигнализация',
    render: () => <Tab tag="ALARM" />,
  },
  { key: 'alv', displayName: 'ИВЛ', render: () => <Tab tag="ALV" /> },
];

export const Journal = () => {
  return <TabLayout tabs={tabs}></TabLayout>;
};
