import { Observer } from 'mobx-react-lite';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import { IUser } from '@app/models';
import { useStore } from '@app/store';
import { formatDate } from '@app/utils';

import { IUserTableView, Order, TableUsersProps, headCells } from './Users';

export function TableUsers(props: TableUsersProps) {
  const { usersStore } = useStore();
  useEffect(() => {
    usersStore.getCollection();
  }, []);

  const rows = usersStore.users.map((user: IUser): IUserTableView => {
    return {
      id: user.id,
      name: user.username,
      email: user.email,
      orgName: user.organization?.name || '',
      roleName: user.role?.name || '',
      createdAt: user.createdAt || new Date(0, 0, 0),
    };
  });

  const onSelectChange = props.onSelectChange
    ? props.onSelectChange
    : (_: readonly number[]) => {};

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IUserTableView>('name');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (_: MouseEvent<unknown>, property: keyof IUserTableView) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      onSelectChange(newSelected);
      setSelected(newSelected);
      return;
    }
    onSelectChange([]);
    setSelected([]);
  };

  const handleClick = (_: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    onSelectChange(newSelected);
    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  /*
   * TODO : FIX ME 
   * const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  ); */

  const createSortHandler =
    (property: keyof IUserTableView) => (event: MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <Observer>
      {() => {
        return (
          <Box>
            <TableContainer
              sx={{
                maxHeight: 'calc( 100vh - 296px )',
                '&::-webkit-scrollbar': { width: '8px' },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#c5c5c5',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1' },
              }}>
              <Table
                stickyHeader
                sx={{ minWidth: 600 }}
                aria-labelledby="tableTitle"
                size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ borderWidth: '0px', padding: '0px', width: '30px' }}>
                      <Checkbox
                        indeterminate={
                          selected.length > 0 && selected.length < rows.length
                        }
                        checked={rows.length > 0 && selected.length === rows.length}
                        onChange={handleSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                      />
                    </TableCell>
                    {headCells.map((headCell) => (
                      <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ borderWidth: '0px' }}>
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={createSortHandler(headCell.id)}>
                          {headCell.label}
                          {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                              {order === 'desc'
                                ? 'sorted descending'
                                : 'sorted ascending'}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {usersStore.users.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}>
                        <TableCell
                          sx={{ borderWidth: '0px', padding: '0px', width: '30px' }}>
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ borderWidth: '0px', padding: '12px' }}
                          id={labelId}
                          scope="row"
                          padding="none">
                          {row.username}
                        </TableCell>
                        <TableCell sx={{ borderWidth: '0px', padding: '12px' }}>
                          {row.email}
                        </TableCell>
                        <TableCell sx={{ borderWidth: '0px', padding: '12px' }}>
                          {row.organization?.name}
                        </TableCell>
                        <TableCell sx={{ borderWidth: '0px', padding: '12px' }}>
                          {row.role?.name}
                        </TableCell>
                        <TableCell
                          sx={{ borderWidth: '0px', padding: '12px', width: '180px' }}>
                          {formatDate(row.createdAt)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 44.02 * emptyRows }}>
                      <TableCell colSpan={6} sx={{ borderWidth: '0px' }} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        );
      }}
    </Observer>
  );
}
