import React, { useEffect, useState } from 'react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';

import { Add } from '@mui/icons-material';
import RoundIconButton from '@app/ui/button/RoundIconButton.tsx';
import './styles.scss';
import Drawer from '@mui/material/Drawer';
import VehicleForm from '@app/views/transportManagement/TransportManagementAdd.tsx';
import { ColDef } from '@ag-grid-community/core';
import { DateRenderer } from '@app/ui';
import { generateRows } from '@app/utils';
import RlTable from '@app/components/Table/Table.tsx';
export interface ITransport {
  id: number; // auto-increment
  name: string;
  type_id: number;
  org_id: number;
  reg_number: string;
  avg_consumption: number;
  unit: string; //@Todo add type
  created_at: string; //@Todo add type
}
const TransportManagement: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState<ITransport[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'reg_number',
      headerName: 'Гос. номер',
      cellDataType: 'text',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    {
      field: 'type_id',
      headerName: 'Тип автомобиля',
    },
    {
      field: 'name',
      headerName: 'Модель',
    },
    {
      field: 'org_id',
      headerName: 'Водятел',
    },
    {
      field: 'avg_consumption',
      headerName: 'Расход топлива',
      cellDataType: 'number',
    },
    { field: 'created_at', headerName: 'Дата создания', cellRenderer: DateRenderer },
  ]);

  const fieldDescription = {
    id: 'int' as const, // auto-increment,
    name: 'str' as const,
    type_id: 'str' as const,
    org_id: 'str' as const,
    reg_number: 'int' as const,
    avg_consumption: 'float' as const,
    unit: 'str' as const, //@Todo add type
    created_at: 'date' as const, //@Todo add type
  };
  useEffect(() => setRowData(generateRows(4, fieldDescription)), []);

  const onRowAdd = () => {
    toggleDrawer(true);
  };
  const toggleDrawer = (value: boolean) => {
    setOpen(value);
  };
  const onApply = (val) => {
    setRowData((prev) => [...prev, val]);
    console.log(rowData);
  };

  return (
    <section className="transport-management">
      <div className="header" style={{ marginBottom: '20px' }}>
        <RoundIconButton
          background="#004d40" //@TODO
          color="white"
          width="48px"
          height="48px"
          fontSize="24px"
          onClick={onRowAdd}>
          <Add />
        </RoundIconButton>
        <span>Транспортное средство</span>
      </div>
      <RlTable columns={columnDefs} rowData={rowData}></RlTable>
      <Drawer open={open} onClose={() => toggleDrawer(false)} anchor="right">
        <VehicleForm onApply={(val) => onApply(val)}></VehicleForm>
      </Drawer>
    </section>
  );
};
export default TransportManagement;
