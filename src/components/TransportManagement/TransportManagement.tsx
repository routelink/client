import { ICellRendererParams } from '@ag-grid-community/core';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';

import { Add } from '@mui/icons-material';
import { Box, Paper } from '@mui/material';

import { Modal } from '@app/components';
import { ITransport } from '@app/models';
import { DateRenderer } from '@app/ui';
import RoundIconButton from '@app/ui/button/RoundIconButton.tsx';
import { generateRows, v4Int } from '@app/utils';

import TransportAddForm, { TransportAddState } from './TransportAddForm';
// import { TRANSPORT_TYPES } from '@app/utils';
import './styles.scss';

export const TransportManagement: React.FC = () => {
  // const getTransportType = (id: number) =>
  //   TRANSPORT_TYPES.find((i) => i.id === id)?.name || '';

  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState<ITransport[]>([]);
  const [colDefs, setColDefs] = useState<any>([
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
  useEffect(() => {
    //@TODO
    setColDefs(colDefs);
    setRowData(generateRows(100, fieldDescription) as ITransport[]);
  }, []);

  const onRowAdd = () => {
    toggleDrawer(true);
  };
  const toggleDrawer = (value: boolean) => {
    setOpen(value);
  };
  const onApply = (val: TransportAddState) => {
    setRowData((prev) => [...prev, { ...val, name: 'REPLACE', id: v4Int() }]);
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
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <div
            className="ag-theme-material" // applying the grid theme
            style={{ height: 'calc(100vh / 1.5)' }} // the grid will fill the size of the parent container
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              rowSelection={'multiple'}
              suppressRowClickSelection={true}
              suppressColumnVirtualisation={true}
              suppressRowVirtualisation={true}
            />
          </div>
        </Paper>
      </Box>
      <Modal isOpen={open} toggle={() => toggleDrawer(false)}>
        <TransportAddForm onApply={(val) => onApply(val)}></TransportAddForm>
      </Modal>
    </section>
  );
};
