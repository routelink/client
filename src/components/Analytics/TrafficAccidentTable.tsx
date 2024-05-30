import { Observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useStore } from '@app/store';

import ServiceStepper from './ServicesStepper';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 120,
    description: 'Транспорт ID.',
  },
  // {
  //   field: 'totalInsures',
  //   headerName: 'Количество ДТП',
  //   width: 130,
  //   type: 'number',
  // },
  {
    field: 'date',
    headerName: 'Дата',
    description: 'Дата последнего ДТП.',
    type: 'date',
    width: 100,
  },
];

export function TrafficAccidentTable() {
  const { insuresStore } = useStore();
  return (
    <Observer>
      {() => {
        useEffect(() => {
          insuresStore.fetchInsures(); // Загружаем данные при монтировании компонента
        }, []);

        const rows = insuresStore.insures.map((insure) => ({
          id: insure.id,
          transport: insure.transport.name,
          date: insure.createdAt ? new Date(insure.createdAt) : null,
          totalInsures: 12,
        }));
        const [step, setStep] = useState<number>(0);

        useEffect(() => {
          console.log(step);

          if (step) {
            insuresStore.fetchInsures({
              step: step,
            });
          }
        }, [step]);

        return (
          <>
            <ServiceStepper step={step} setStep={setStep} />
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              autoHeight
              pageSizeOptions={[5, 10, 25, 50]}
            />
          </>
        );
      }}
    </Observer>
  );
}

// const TrafficAccidentTable: React.FC = observer(() => {
//   const insureStore = new InsureStore();
//   const { insures, loading, error } = insureStore;

//   useEffect(() => {
//     insureStore.fetchInsures(); // Загружаем данные при монтировании компонента
//   }, []);

//   // Преобразуем данные из store в формат, подходящий для таблицы
//   const rows = insures.map((insure) => ({
//     id: insure.transport.id,
//     date: insure.createdAt ? new Date(insure.createdAt) : null,
//   }));

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div style={{ height: 800, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         autoHeight
//         pageSizeOptions={[5, 10, 25, 50]}
//       />
//     </div>
//   );
// });

// export default TrafficAccidentTable;
