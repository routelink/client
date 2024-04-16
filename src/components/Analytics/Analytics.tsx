import { useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import DateRangePicker from './DateRangePicker';
import DateChooser from './DateChooser';
import ServicesTable from './ServicesTable';
import AutoEfficiencyDifferentLength from './AutoEfficiencyDifferentLength';
import AutoEfficiencyTable from './AutoEfficiencyTable';
import OvertimeTable from './OvertimeTable';
import FuelConsumptionTable from './FuelConsumptionTable';
import TrafficAccidentTable from './TrafficAccidentTable';

interface AnalyticsSwitchProps {
  analyticsType: string;
}

function AnalyticsSwitch({ analyticsType }: AnalyticsSwitchProps) {
  switch (analyticsType) {
    case 'Необходимость технического обслуживания':
      return <div><DateRangePicker/> <ServicesTable/></div>;
    case 'Эффективность использования транспорта':
      return <div> <DateChooser/> <AutoEfficiencyDifferentLength /> <AutoEfficiencyTable /> </div>;
    case 'Переработка':
      return <div> <DateChooser/> <OvertimeTable /></div>;
    case 'Потребление топлива':
      return <div> <DateChooser/> <FuelConsumptionTable /> </div>;
    case 'Страховка авто':
      return <TrafficAccidentTable />;
    default:
      return <div>Выберите тип аналитики</div>;
  }
}


export function Analytics() {
  const [analyticsType, setAnalyticsType] = useState('');

  const handleAnalyticsTypeChange = (event: SelectChangeEvent<string>) => {
    setAnalyticsType(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="analytics-type-label">Выберите тип аналитики</InputLabel>
        <Select
          labelId="analytics-type-label"
          id="analytics-type"
          value={analyticsType}
          label="Выберите тип аналитики"
          onChange={handleAnalyticsTypeChange}
        >
          <MenuItem value={'Необходимость технического обслуживания'}>Необходимость технического обслуживания</MenuItem>
          <MenuItem value={'Эффективность использования транспорта'}>Эффективность использования транспорта</MenuItem>
          <MenuItem value={'Переработка'}>Переработка</MenuItem>
          <MenuItem value={'Потребление топлива'}>Потребление топлива</MenuItem>
          <MenuItem value={'Страховка авто'}>Страховка авто</MenuItem>
        </Select>
      </FormControl>
      <AnalyticsSwitch analyticsType={analyticsType} />
    </div>
  );
}