import { CellClickedEvent, ICellRendererParams } from '@ag-grid-community/core';
import { AgGridReact } from 'ag-grid-react';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import { Add } from '@mui/icons-material';
import { Box, Paper, Stack } from '@mui/material';

import { Modal } from '@app/components';
import { useStore } from '@app/store.tsx';
import { DateRenderer, RemoveIconRenderer, SearchField } from '@app/ui';
import RoundIconButton from '@app/ui/button/RoundIconButton.tsx';

import TransportAddForm, { TransportAddState } from './TransportAddForm';
// import { TRANSPORT_TYPES } from '@app/utils';
import './styles.scss';

export const TransportManagement: React.FC = observer(() => {
  // const getTransportType = (id: number) =>
  //   TRANSPORT_TYPES.find((i) => i.id === id)?.name || '';

  const store = useStore();

  const rowData = store.transportStore.tableData;

  const [open, setOpen] = useState(false);
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
        // return <span>{getTransportType(props.value.name)}</span>;
        return <span>{props.value.name}</span>;
      },
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Модель',
      flex: 1,
    },
    {
      field: 'organisation',
      headerName: 'Водитель',
      cellRenderer: (props: ICellRendererParams) => {
        return <span>{props.value?.name}</span>;
      },
      flex: 1,
    },
    {
      field: 'avgConsumption',
      headerName: 'Расход топлива',
      cellDataType: 'number',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Дата создания',
      cellRenderer: DateRenderer,
      flex: 1,
    },
    {
      headerName: '',
      width: '10px',
      onCellClicked: (event: CellClickedEvent) =>
        store.transportStore.onRowDelete(event.data.id),
      cellRenderer: RemoveIconRenderer,
      flex: 1,
    },
  ]);

  useEffect(() => {
    //@TODO
    setColDefs(colDefs);
  }, []);

  const onRowAdd = () => {
    toggleDrawer(true);
  };
  const toggleDrawer = (value: boolean) => {
    setOpen(value);
  };
  const onApply = (val: TransportAddState) => {
    store.transportStore.onRowAdd(val);
    toggleDrawer(false);
  };

  const onFilter = (value: string) => {
    // store.transportStore.getData({ search: value });
    return value;
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
        <Paper sx={{ width: '100%' }}>
          <Stack spacing={2} sx={{ padding: '1.25rem 0 ' }}>
            <SearchField
              style={{ alignItems: 'center', paddingLeft: '0.9rem' }}
              count={rowData.length}
              onInput={onFilter}></SearchField>
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
          </Stack>
        </Paper>
      </Box>
      <Modal isOpen={open} toggle={() => toggleDrawer(false)}>
        <TransportAddForm onApply={(val) => onApply(val)}></TransportAddForm>
      </Modal>
    </section>
  );
});
