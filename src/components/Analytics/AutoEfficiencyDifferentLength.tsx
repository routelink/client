import { LineChart } from '@mui/x-charts/LineChart';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';


class ChartStore {
  xAxisData = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30,
  ];
  seriesData1 = [
    12, 14, 11, 13, 15, 9, 13, 10, 14, 15, 11, 9, 12, 15, 10, 12, 13, 11, 15, 9,
    14, 12, 14, 11, 9, 10, 14, 11, 15, 12,
  ];
  seriesData2 = [
    15, 11, 10, 14, 12, 11, 9, 10, 14, 15, 12, 9, 14, 10, 15, 12, 9, 14, 11, 15,
    12, 10, 14, 11, 9, 10, 14, 12, 15, 11,
  ];

  constructor() {
    makeAutoObservable(this);
  }

}

const chartStore = new ChartStore();

const DifferentLength = observer(() => {
  return (
    <LineChart
      xAxis={[
        {
          data: chartStore.xAxisData,
        },
      ]}
      series={[
        {
          data: chartStore.seriesData1,
        },
        {
          data: chartStore.seriesData2,
        },
      ]}
      height={200}
      margin={{ top: 10, bottom: 20 }}
    />
  );
});

export default DifferentLength;
