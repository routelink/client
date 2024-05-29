import { Dayjs } from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

interface DateRangePickerProps {
  beginDate: Dayjs | null;
  endDate: Dayjs | null;

  setEndDate: (date: Dayjs | null) => void;
  setBeginDate: (date: Dayjs | null) => void;
}
export default function DateRangePicker(props: DateRangePickerProps) {
  const { beginDate, endDate, setEndDate, setBeginDate } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Uncontrolled picker"
          value={beginDate}
          onChange={(newValue) => {
            setBeginDate(newValue);
          }}
        />
        <DatePicker
          label="Controlled picker"
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
