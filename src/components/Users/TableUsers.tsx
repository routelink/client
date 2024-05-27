import { Observer } from 'mobx-react-lite';
import { ChangeEvent, MouseEvent, useState } from 'react';

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
import { formatDate } from '@app/utils';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | Date },
  b: { [key in Key]: number | string | Date },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface IUserTableView {
  id: number;
  username: string;
  email: string;
  orgName: string;
  roleName: string;
  createdAt: Date;
}

interface HeadCell {
  id: keyof IUserTableView;
  label: string;
}

export const headCells: readonly HeadCell[] = [
  { id: 'username', label: 'ФИО' },
  { id: 'email', label: 'Эл. почта' },
  { id: 'orgName', label: 'Организация' },
  { id: 'roleName', label: 'Роль' },
  { id: 'createdAt', label: 'Дата создания' },
];

export interface TableUsersProps {
  userData: IUser[];
  selectedState?: [
    selected: number[],
    setSelected: React.Dispatch<React.SetStateAction<number[]>>,
  ];
}

export function TableUsers(props: TableUsersProps) {
  const rows = props.userData.map((user: IUser): IUserTableView => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      orgName: user.organization?.name || '',
      roleName: user.role?.name || '',
      createdAt: user.createdAt || new Date(0, 0, 0),
    };
  });

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof IUserTableView>('username');
  let [selected, setSelected] = useState<number[]>([]);
  if (props.selectedState) {
    [selected, setSelected] = props.selectedState;
  }

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
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

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

  const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

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
                  {visibleRows.map((row, index) => {
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
                          {row.orgName}
                        </TableCell>
                        <TableCell sx={{ borderWidth: '0px', padding: '12px' }}>
                          {row.roleName}
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
