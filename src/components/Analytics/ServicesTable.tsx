import { Dayjs } from 'dayjs';
import { Observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useStore } from '@app/store';

import DateRangePicker from './DateRangePicker';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 120, description: 'Транспорт ID.' },
  {
    field: 'date',
    headerName: 'Дата',
    description: 'Дата последнего ТО.',
    type: 'date',
    width: 100,
  },
  {
    field: 'length',
    headerName: 'Пробег',
    width: 120,
    description: 'Пробег с последнего ТО.',
    type: 'number',
  },
  {
    field: 'transport',
    headerName: 'Транспорт',
    width: 120,
    description: 'Транспорт',
    type: 'string',
  },
  {
    field: 'regNumber',
    headerName: 'Регистрационный номер',
    width: 240,
    description: 'Регистрационный номер',
    type: 'string',
  },
  {
    field: 'description',
    headerName: 'Описание',
    width: 240,
    description: 'Описание',
    type: 'string',
  },
];

export function ServicesTable() {
  const { servicesStore } = useStore();
  return (
    <Observer>
      {() => {
        useEffect(() => {
          servicesStore.fetchServices(); // Загружаем данные при монтировании компонента
        }, []);

        const rows = servicesStore.services.map((service) => ({
          id: service.id,
          transport: service.transport.name,
          regNumber: service.transport.regNumber,
          description: service.description,
          date: service.createdAt ? new Date(service.createdAt) : null,
          length: service.length,
        }));
        const [beginDate, setBeginDate] = useState<Dayjs | null>(null);
        const [endDate, setEndDate] = useState<Dayjs | null>(null);

        useEffect(() => {
          console.log(beginDate, endDate);

          if (beginDate && endDate) {
            servicesStore.fetchServices({
              beginDate: new Date(beginDate.toDate()),
              endDate: new Date(endDate.toDate()),
            });
          }
        }, [beginDate, endDate]);

        return (
          <>
            <DateRangePicker
              setBeginDate={setBeginDate}
              setEndDate={setEndDate}
              beginDate={beginDate}
              endDate={endDate}
            />
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
// const ServicesTable: React.FC = observer(() => {
//   const serviceStore = new ServiceStore();
//   const { services, loading, error } = serviceStore;
//
//   useEffect(() => {
//     serviceStore.fetchServices(); // Загружаем данные при монтировании компонента
//   }, [serviceStore]);
//
//   // Преобразуем данные из store в формат, подходящий для таблицы
//   const rows = services.map((service) => ({
//     id: service.transport.id,
//     date: service.createdAt ? new Date(service.createdAt) : null,
//     length: service.length,
//   }));
//
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//
//   return (
//     <div style={{ height: 700, width: '100%' }}>
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

// export default ServicesTable;
