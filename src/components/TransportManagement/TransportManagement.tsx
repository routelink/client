import {
  CellClickedEvent,
  ColumnState,
  ICellRendererParams,
  PaginationChangedEvent,
  SortChangedEvent,
} from '@ag-grid-community/core';
import { AgGridReact } from 'ag-grid-react';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Add } from '@mui/icons-material';
import { Box, Paper, Stack } from '@mui/material';

import { Modal } from '@app/components';
import { useStore } from '@app/store.tsx';
import { DateRenderer, RemoveIconRenderer, SearchField } from '@app/ui';
import RoundIconButton from '@app/ui/button/RoundIconButton.tsx';

import TransportAddForm, { TransportAddState } from './TransportAddForm';
import './styles.scss';

export const TransportManagement: React.FC = observer(() => {
  const defaultPage = 1;
  const defaultCount = 10;
  const defaultSearch = '';

  const location = useLocation();

  // Создаем объект URLSearchParams на основе текущего location.search
  const searchParams = new URLSearchParams(location.search);

  // Извлекаем значение параметра 'count'
  const count = searchParams.get('count');
  const page = searchParams.get('page');
  const search = searchParams.get('search');

  const store = useStore();

  const [_page, setPage] = useState((page && +page) || defaultPage);
  const [_count, setCount] = useState((count && +count) || defaultCount);
  const [_search, setSearch] = useState(search || defaultSearch);
  const [sort, setSort] = useState<Pick<ColumnState, 'colId' | 'sort'>>({
    colId: '',
    sort: null,
  });
  const history = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    if (_page !== defaultPage) {
      params.set('page', `${_page}`);
    }
    if (_count !== defaultCount) {
      params.set('count', `${_count}`);
    }
    if (_search !== defaultSearch) {
      params.set('search', _search);
    }
    if (sort.colId && sort.sort) {
      params.set('sortBy', sort.colId);
      params.set('sortOrder', sort.sort);
    }

    const _params = params.toString();

    history(`?${_params}`);

    store.transportStore.getData(_params);
  }, [_page, _count, _search, sort]);
  React.useEffect(() => {}, [_page, _count, _search, sort]);

  const rowData = store.transportStore.tableData;

  const [open, setOpen] = useState(false);
  const [colDefs, setColDefs] = useState<unknown>([
    {
      field: 'regNumber',
      headerName: 'Гос. номер',
      cellDataType: 'text',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    {
      field: 'typeId',
      headerName: 'Тип автомобиля',
      cellRenderer: (props: ICellRendererParams) => {
        // return <span>{getTransportType(props.value.name)}</span>;
        return <span>{store.appStore.transportTypes[props.value]}</span>;
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
  const onPaginationChanged = useCallback((params: PaginationChangedEvent) => {
    if (params.newPageSize) {
      const count = params.api.paginationGetPageSize();
      setCount(count);
    }
    if (params.newPage) {
      const page = params.api.paginationGetCurrentPage();
      setPage(page);
    }
  }, []);

  const toggleDrawer = (value: boolean) => {
    setOpen(value);
  };
  const onApply = (val: TransportAddState) => {
    store.transportStore.onRowAdd(val);
    toggleDrawer(false);
  };

  const onFilter = (value: string) => {
    setSearch(value);
  };

  const onSortChanged = (event: SortChangedEvent) => {
    const value = event?.api.getColumnState().find((s) => s.sort != null);
    const { colId = '', sort = null } = value || {};
    setSort({ colId, sort });
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
              {/* @ts-ignore */}
              <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                rowSelection={'multiple'}
                suppressRowClickSelection={true}
                suppressColumnVirtualisation={true}
                suppressRowVirtualisation={true}
                onSortChanged={onSortChanged}
                pagination={true}
                paginationPageSize={_count}
                onPaginationChanged={onPaginationChanged}
                paginationPageSizeSelector={[10, 20, 50]}
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
