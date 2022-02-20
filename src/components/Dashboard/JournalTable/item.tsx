import { JournalRecord } from 'services/journal';

type Props = {
  record: JournalRecord;
};

export const JournalTableItem = ({ record }: Props) => (
  <tr>
    <td>{new Date(record.time * 1000).toString()}</td>
    <td>{record.data}</td>
  </tr>
);
