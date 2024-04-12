import React, { useEffect, useState } from 'react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';

import { Add } from '@mui/icons-material';
import RoundIconButton from '@app/ui/button/RoundIconButton.tsx';
import VehicleForm from '@app/views/transportManagement/TransportManagementAdd.tsx';

import RlTable from '@app/components/Table/Table.tsx';
import { ColDef, ICellRendererParams } from '@ag-grid-community/core';
import { DateRenderer } from '@app/ui';
import { generateRows } from '@app/utils';
import { Modal } from '@app/components';
import { ITransport } from '@app/models';
// import { TRANSPORT_TYPES } from '@app/utils/consts.ts';
import './styles.scss';

const TransportManagement: React.FC = () => {
  // const getTransportType = (id: number) =>
  //   TRANSPORT_TYPES.find((i) => i.id === id)?.name || '';

  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState<ITransport[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'regNumber',
      headerName: 'Гос. номер',
      cellDataType: 'text',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    {
      field: 'type',
      headerName: 'Тип автомобиля',
      cellRenderer: (props: ICellRendererParams) => {
        console.log(props.value);
        // return <span>{getTransportType(props.value.name)}</span>;
        return <span>{props.value.name}</span>;
      },
    },
    {
      field: 'name',
      headerName: 'Модель',
    },
    {
      field: 'organisation',
      headerName: 'Водятел',
      cellRenderer: (props: ICellRendererParams) => {
        return <span>{props.value?.name}</span>;
      },
    },
    {
      field: 'avgConsumption',
      headerName: 'Расход топлива',
      cellDataType: 'number',
    },
    { field: 'createdAt', headerName: 'Дата создания', cellRenderer: DateRenderer },
  ]);

  const fieldDescription = {
    id: 'int' as const, // auto-increment,
    name: 'str' as const,
    type: {
      name: 'str',
    } as const,
    organisation: 'str' as const,
    regNumber: 'int' as const,
    avgConsumption: 'float' as const,
    createdAt: 'date' as const, //@Todo add type
  };
  useEffect(() => setRowData(generateRows(4, fieldDescription) as ITransport[]), []);
  const onRowAdd = () => {
    toggleDrawer(true);
  };
  const toggleDrawer = (value: boolean) => {
    setOpen(value);
  };
  const onApply = (val) => {
    setRowData((prev) => [...prev, val]);
    toggleDrawer(false);
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
      <Modal isOpen={open} toggle={() => toggleDrawer(false)}>
        <VehicleForm onApply={(val) => onApply(val)}></VehicleForm>
      </Modal>
    </section>
  );
};
export default TransportManagement;
