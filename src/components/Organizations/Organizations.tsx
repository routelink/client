import { Observer } from 'mobx-react-lite';
import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SyncIcon from '@mui/icons-material/Sync';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';

import { IOrganization } from '@app/models';
import { useStore } from '@app/store';

import { Modal } from '../Modal';

function DateToString(date: Date): string {
  return (
    date.getFullYear() +
    '.' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '.' +
    String(date.getDate()).padStart(2, '0')
  );
}

{
  /* таблица пользователей */
}
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | Date | undefined },
  b: { [key in Key]: number | string | Date | undefined },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
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

interface IOrgTableView {
  id: number;
  name: string;
  createdAt: Date;
}

interface HeadCell {
  id: keyof IOrgTableView;
  label: string;
}
const headCells: readonly HeadCell[] = [
  { id: 'name', label: 'Организация' },
  { id: 'createdAt', label: 'Дата создания' },
];

interface TableOrgProps {
  orgData: IOrganization[];
  selectedState?: [
    selected: number[],
    setSelected: React.Dispatch<React.SetStateAction<number[]>>,
  ];
}

function TableOrg(props: TableOrgProps) {
  const rows = props.orgData.map((org: IOrganization): IOrgTableView => {
    return { ...org, createdAt: org.createdAt || new Date(0, 0, 0) };
  });

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IOrgTableView>('name');
  let [selected, setSelected] = React.useState<number[]>([]);
  if (props.selectedState) {
    [selected, setSelected] = props.selectedState;
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof IOrgTableView,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
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

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    (property: keyof IOrgTableView) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

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
              <TableCell sx={{ borderWidth: 0, padding: 0, width: '10px' }}>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < rows.length}
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
                        {' '}
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
                  <TableCell sx={{ borderWidth: '0px', padding: 0 }}>
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
                    {' '}
                    {row.name}{' '}
                  </TableCell>

                  <TableCell sx={{ borderWidth: '0px', padding: '12px', width: '180px' }}>
                    {' '}
                    {DateToString(row.createdAt)}{' '}
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
}
/* таблица пользователей (конец) */

/* диалог "добавление организации" */
interface DialogOrgAddProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddEnd?: () => void;
}

function DialogOrgAdd(props: DialogOrgAddProps) {
  const [orgName, setOrgName] = React.useState('');
  const isFormValid = orgName.trim() !== '';
  const { orgsStore } = useStore();

  const handleCancel = () => {
    props.setOpen(false);
    setOrgName('');
  };

  const handleAdd = () => {
    orgsStore.addOrgs(orgName);
    props.setOpen(false);
    setOrgName('');
    if (props.onAddEnd) {
      props.onAddEnd();
    }
  };

  return (
    <Modal isOpen={props.isOpen}>
      <Stack height="100vh" direction="column" justifyContent="space-between" margin={5}>
        <Stack spacing={3}>
          <Typography variant="h5">Новая организация</Typography>

          <TextField
            required
            variant="standard"
            label="Название организации"
            onChange={(event) => {
              setOrgName(event.target.value);
            }}
          />
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => {
              handleCancel();
            }}>
            Отмена
          </Button>

          <Button
            disabled={!isFormValid}
            variant="contained"
            onClick={() => {
              handleAdd();
            }}>
            Добавить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
/* диалог "добавление организации" (конец) */

/* диалог "реактирование организации" */
interface DialogOrgEditProps {
  isOpen: boolean;
  orgId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEditEnd?: () => void;
}

function DialogOrgEdit(props: DialogOrgEditProps) {
  const { orgsStore } = useStore();
  const currentOrgName = orgsStore.getOrgName(props.orgId);
  const [newOrgName, setNewOrgName] = React.useState(currentOrgName);
  const isFormValid = newOrgName.trim() !== '' && newOrgName.trim() !== currentOrgName;

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleEdit = () => {
    orgsStore.updateOrgName(props.orgId, newOrgName);
    props.setOpen(false);
    if (props.onEditEnd) {
      props.onEditEnd();
    }
  };

  return (
    <Modal isOpen={props.isOpen}>
      <Stack height="100vh" direction="column" justifyContent="space-between" margin={5}>
        <Stack spacing={3}>
          <Typography variant="h5">Изменение организации</Typography>

          <TextField
            required
            value={newOrgName}
            variant="standard"
            label="Название организации"
            onChange={(event) => {
              setNewOrgName(event.target.value);
            }}
          />
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => {
              handleCancel();
            }}>
            Отмена
          </Button>

          <Button
            disabled={!isFormValid}
            variant="contained"
            onClick={() => {
              handleEdit();
            }}>
            Изменить
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
/* диалог "редактирование организации" (конец)*/

/* диалог "удаления организации" */
interface DialogRemoveOrgProps {
  isOpen: boolean;
  orgIds: number[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRemove?: () => void;
}

function DialogRemoveOrgs(props: DialogRemoveOrgProps) {
  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleRemove = () => {
    props.setOpen(false);
    if (props.onRemove) {
      props.onRemove();
    }
  };

  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle>Удаление организаций</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Запрошено удаление {props.orgIds.length} организаций. Продолжить удаление?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Отмена
          </Button>
          <Button onClick={handleRemove} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
/* диалог "удаления организации" (конец) */

export function Organizations() {
  const { orgsStore } = useStore();
  const [searchString, setSearchString] = React.useState('');

  const [dialogOrgAddOpen, setDialogOrgAddOpen] = React.useState(false);
  const [dialogOrgEditOpen, setDialogOrgEditOpen] = React.useState(false);
  const [dialogOrgRemoveOpen, setDialogOrgRemoveOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<number[]>([]);

  React.useEffect(() => {
    orgsStore.loadOrgs();
  }, []);

  const handleReloadButton = () => {
    setSelected([]);
    orgsStore.loadOrgs();
  };

  return (
    <Observer>
      {() => {
        return (
          <>
            <DialogOrgAdd
              isOpen={dialogOrgAddOpen}
              setOpen={setDialogOrgAddOpen}
              onAddEnd={() => {
                setSelected([]);
              }}
            />
            {selected.length === 1 ? (
              <DialogOrgEdit
                isOpen={dialogOrgEditOpen}
                orgId={selected[0]}
                setOpen={setDialogOrgEditOpen}
                onEditEnd={() => {
                  setSelected([]);
                }}
              />
            ) : null}

            <DialogRemoveOrgs
              isOpen={dialogOrgRemoveOpen}
              orgIds={selected}
              setOpen={setDialogOrgRemoveOpen}
              onRemove={() => {
                orgsStore.removeOrgs(selected);
                setSelected([]);
              }}
            />

            <Stack direction="column" spacing={2}>
              {/* вызов панели "добавление организации" */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Fab
                  color="primary"
                  onClick={() => {
                    setDialogOrgAddOpen(true);
                  }}>
                  <AddIcon />
                </Fab>
                <Typography variant="h6">Организация</Typography>
              </Stack>

              <Paper>
                {/* панель инструментов */}
                <Stack direction="row" justifyContent="space-between" sx={{ ml: 1 }}>
                  {/* панель поиска */}
                  <Stack direction="row" alignItems="flex-end" spacing={2}>
                    <SearchIcon />
                    <TextField
                      variant="standard"
                      label="Поиск"
                      onChange={(event) => {
                        setSearchString(event.target.value.trim());
                      }}
                    />
                    {searchString.trim() !== '' ? (
                      <Typography variant="body2">
                        Найдено {orgsStore.getOrgs(searchString).length} записей
                      </Typography>
                    ) : null}
                  </Stack>

                  {/* панель редактирования */}
                  <Stack direction="row" alignItems="flex-end">
                    {selected.length ? (
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        Выбрано {selected.length} записей
                      </Typography>
                    ) : null}

                    <Tooltip title="Изменить выбранное" placement="top">
                      <span>
                        <IconButton
                          disabled={selected.length !== 1}
                          onClick={() => {
                            setDialogOrgEditOpen(true);
                          }}>
                          <EditIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Удалить выбранное" placement="top">
                      <span>
                        <IconButton
                          disabled={selected.length === 0}
                          onClick={() => {
                            setDialogOrgRemoveOpen(true);
                          }}>
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Обновить данные" placement="top">
                      <span>
                        <IconButton onClick={handleReloadButton}>
                          <SyncIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Stack>
                </Stack>

                {/* таблица организаций */}
                <TableOrg
                  orgData={orgsStore.getOrgs(searchString)}
                  selectedState={[selected, setSelected]}
                />
              </Paper>
            </Stack>
          </>
        );
      }}
    </Observer>
  );
}
