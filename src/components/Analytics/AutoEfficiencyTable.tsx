import { makeAutoObservable, reaction } from 'mobx';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';

class DataStore {
  rows: { id: number; machineDowntime: number; date: Date }[] = [
    { id: 1, machineDowntime: 9, date: new Date(2024, 3, 12) },
    { id: 2, machineDowntime: 9, date: new Date(2024, 3, 12) },
    { id: 3, machineDowntime: 9, date: new Date(2024, 3, 12) },
    { id: 4, machineDowntime: 9, date: new Date(2024, 3, 12) },
    { id: 5, machineDowntime: 9, date: new Date(2024, 3, 12) },
    { id: 6, machineDowntime: 9, date: new Date(2024, 3, 12) },
    { id: 7, machineDowntime: 9, date: new Date(2024, 3, 12) },
    { id: 8, machineDowntime: 9, date: new Date(2024, 3, 12) },
    { id: 9, machineDowntime: 9, date: new Date(2024, 3, 12) },
    { id: 10, machineDowntime: 9, date: new Date(2024, 3, 12) },
    { id: 11, machineDowntime: 9, date: new Date(2024, 3, 12) },
    { id: 12, machineDowntime: 9, date: new Date(2024, 3, 12) },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  // Метод для обновления данных
  updateRows(newRows: { id: number; machineDowntime: number; date: Date }[]) {
    this.rows = newRows;
  }


  // Метод для подписки на изменения данных
  subscribe(callback: () => void) {
    return reaction(() => this.rows, callback);
  }
}

const dataStore = new DataStore();

export default function AutoEfficiencyTable() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, minWidth: 50, description: 'Транспорт ID.' },
    { field: 'machineDowntime', headerName: 'Простой', width: 100, minWidth: 100, type: 'number' },
    { field: 'date', headerName: 'Дата', type: 'date', width: 100 },
  ];

  useEffect(() => {
    const disposer = dataStore.subscribe(() => {
      // Обработка изменения данных
    });

    return disposer;
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={dataStore.rows}
        columns={columns}
        autoHeight
        pagination
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </div>
  );
}
