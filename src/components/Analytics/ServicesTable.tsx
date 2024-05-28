import { observer } from 'mobx-react';
import React, { useEffect } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ServiceStore } from '@app/stores/analytics/analytics';

// Пример импорта вашего store

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
];

const ServicesTable: React.FC = observer(() => {
  const serviceStore = new ServiceStore();
  const { services, loading, error } = serviceStore;

  useEffect(() => {
    serviceStore.fetchServices(); // Загружаем данные при монтировании компонента
  }, [serviceStore]);

  // Преобразуем данные из store в формат, подходящий для таблицы
  const rows = services.map((service) => ({
    id: service.transport.id,
    date: service.createdAt ? new Date(service.createdAt) : null,
    length: service.length,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: 700, width: '100%' }}>
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
    </div>
  );
});

export default ServicesTable;
