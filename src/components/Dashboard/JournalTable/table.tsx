import { JournalRecord } from 'services/journal';
import { JournalTableItem } from './item';

type Props = {
  journal: JournalRecord[];
};

export const JournalTable = ({ journal }: Props) => {
  return (
    <div className="p-4 overflow-y-auto h-full">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Время</th>
            <th>Сообщение</th>
          </tr>
        </thead>
        <tbody className="">
          {journal.map((record) => (
            <JournalTableItem record={record} key={record.time} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
