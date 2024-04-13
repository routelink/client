import React, { useState } from 'react';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const DateRangePicker: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startDate = e.target.value ? new Date(e.target.value) : null;
    setDateRange(prevState => ({ ...prevState, startDate }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const endDate = e.target.value ? new Date(e.target.value) : null;
    setDateRange(prevState => ({ ...prevState, endDate }));
  };

  return (
    <div>
      <label>От </label>
      <input
        type="date"
        value={dateRange.startDate ? dateRange.startDate.toISOString().slice(0, 10) : ''}
        onChange={handleStartDateChange}
      />
      <label> до </label>
      <input
        type="date"
        value={dateRange.endDate ? dateRange.endDate.toISOString().slice(0, 10) : ''}
        onChange={handleEndDateChange}
      />
    </div>
  );
};

export default DateRangePicker;
