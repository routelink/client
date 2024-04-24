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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';

import { IOrganizationStrict } from '@app/models';
import { useStore } from '@app/store';

import { Modal } from '../Modal';

function DateToString(date: Date): String {
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

interface HeadCell {
  id: keyof IOrganizationStrict;
  label: string;
}
const headCells: readonly HeadCell[] = [
  { id: 'name', label: 'Организация' },
  { id: 'createdAt', label: 'Дата создания' },
];

interface TableOrgProps {
  orgData: IOrganizationStrict[];
  onSelectChange: (selectedIndexArray: readonly number[]) => void;
}

function TableOrg(props: TableOrgProps) {
  const rows = props.orgData;
  const onSelectChange = props.onSelectChange
    ? props.onSelectChange
    : (_: readonly number[]) => {};

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof IOrganizationStrict>('name');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof IOrganizationStrict,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      onSelectChange(newSelected);
      setSelected(newSelected);
      return;
    }
    onSelectChange([]);
    setSelected([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: number) => {
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
    (property: keyof IOrganizationStrict) => (event: React.MouseEvent<unknown>) => {
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
          size={'medium'}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderWidth: '0px', padding: '0px', width: '30px' }}>
                <Checkbox
                  sx={{ '&.MuiCheckbox-root': { color: '#4C4C4C' } }}
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
                  <TableCell sx={{ borderWidth: '0px', padding: '0px', width: '30px' }}>
                    <Checkbox
                      sx={{ '&.MuiCheckbox-root': { color: '#4C4C4C' } }}
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
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
    /* добавить проверку "already exists" */
    orgsStore.addOrgs(orgName);
    props.setOpen(false);
    setOrgName('');
  };

  return (
    <Modal isOpen={props.isOpen}>
      <Box height={'100%'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          height={'calc( 100% - 96px )'}
          justifyContent={'space-between'}
          margin={'48px 60px'}>
          <Box>
            <Typography sx={{ fontSize: '24px', textAlign: 'left' }}>
              Новая организация
            </Typography>

            <TextField
              sx={{ mt: '30px', width: '255px' }}
              required
              variant="standard"
              label="Название организации"
              onChange={(event) => {
                setOrgName(event.target.value);
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: '20px',
            }}>
            <Button
              variant="outlined"
              sx={{ fontSize: '14px', minWidth: '115px' }}
              onClick={() => {
                handleCancel();
              }}>
              Отмена
            </Button>

            <Button
              disabled={!isFormValid}
              variant="contained"
              sx={{ fontSize: '14px', minWidth: '115px' }}
              onClick={() => {
                handleAdd();
              }}>
              Добавить
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
/* диалог "добавление организации" (конец) */

/* диалог "реактирование организации" */
interface DialogOrgEditProps {
  isOpen: boolean;
  orgId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  };

  return (
    <Modal isOpen={props.isOpen}>
      <Box height={'100%'}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          height={'calc( 100% - 96px )'}
          justifyContent={'space-between'}
          margin={'48px 60px'}>
          <Box>
            <Typography sx={{ fontSize: '24px', textAlign: 'left' }}>
              Изменение организации
            </Typography>

            <TextField
              sx={{ mt: '30px', width: '255px' }}
              required
              value={newOrgName}
              variant="standard"
              label="Название организации"
              onChange={(event) => {
                setNewOrgName(event.target.value);
              }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: '20px',
            }}>
            <Button
              variant="outlined"
              sx={{ fontSize: '14px', minWidth: '115px' }}
              onClick={() => {
                handleCancel();
              }}>
              Отмена
            </Button>

            <Button
              disabled={!isFormValid}
              variant="contained"
              sx={{ fontSize: '14px', minWidth: '115px' }}
              onClick={() => {
                handleEdit();
              }}>
              Изменить
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
/* диалог "редактирование организации" (конец)*/

/* диалог "удаления организации" */
interface DialogRemoveOrgProps {
  isOpen: boolean;
  orgIds: number[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DialogRemoveOrgs(props: DialogRemoveOrgProps) {
  const { orgsStore } = useStore();

  const handleCancel = () => {
    props.setOpen(false);
  };

  const handleRemove = () => {
    orgsStore.removeOrgs(props.orgIds);
    props.setOpen(false);
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
  const [dialogOrgAddOpen, setDialogOrgAddOpen] = React.useState(false);
  const [dialogOrgEditOpen, setDialogOrgEditOpen] = React.useState(false);
  const [dialogOrgRemoveOpen, setDialogOrgRemoveOpen] = React.useState(false);

  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [findedCount, setFindedCount] = React.useState(-1);

  const { orgsStore } = useStore();
  const [showOrgData, setShowOrgsData] = React.useState<IOrganizationStrict[]>(
    orgsStore.orgs,
  );

  React.useEffect(() => {
    setShowOrgsData(orgsStore.orgs);
  }, [orgsStore.orgs]);

  const handleSelectChange = (selectedIndexArray: readonly number[]) => {
    setSelectedIds(selectedIndexArray.slice());
  };

  const handleSearchChange = (search: string) => {
    const newOrgData: IOrganizationStrict[] = orgsStore.orgs.filter(
      (orgData) =>
        orgData.name.toLowerCase().includes(search.toLowerCase()) ||
        DateToString(orgData.createdAt).includes(search.toLowerCase()),
    );
    if (search.length) {
      setFindedCount(newOrgData.length);
    } else {
      setFindedCount(-1);
    }
    setShowOrgsData(newOrgData);
  };

  return (
    <Observer>
      {() => {
        return (
          <>
            <DialogOrgAdd isOpen={dialogOrgAddOpen} setOpen={setDialogOrgAddOpen} />
            {selectedIds.length === 1 ? (
              <DialogOrgEdit
                isOpen={dialogOrgEditOpen}
                orgId={selectedIds[0]}
                setOpen={setDialogOrgEditOpen}
              />
            ) : null}

            <DialogRemoveOrgs
              isOpen={dialogOrgRemoveOpen}
              orgIds={selectedIds}
              setOpen={setDialogOrgRemoveOpen}
            />

            <Box margin={'0px 20px 0px 20px'}>
              {/* вызов панели "добавление организации" */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '18px',
                }}>
                <Fab
                  color="primary"
                  sx={{ margin: '20px 0px 20px 0px' }}
                  onClick={() => {
                    setDialogOrgAddOpen(true);
                  }}>
                  <AddIcon />
                </Fab>
                <Typography sx={{ fontSize: '20px' }}>Организация</Typography>
              </Box>

              <Paper sx={{ width: '100%' }}>
                {/* панель инструментов */}
                <Toolbar
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    '&.MuiToolbar-root': { padding: '5px' },
                  }}>
                  {/* панель поиска */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '12px',
                      alignItems: 'flex-end',
                    }}>
                    <SearchIcon sx={{ ml: '5px' }} />
                    <TextField
                      variant="standard"
                      label="Поиск"
                      onChange={(event) => {
                        handleSearchChange(event.target.value.trim());
                      }}
                    />
                    {findedCount >= 0 ? (
                      <Typography variant="body2" sx={{ mr: '20px' }}>
                        Найдено {findedCount} записей
                      </Typography>
                    ) : null}
                  </Box>

                  {/* панель редактирования */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    {selectedIds.length ? (
                      <Typography variant="body2" sx={{ mr: '20px' }}>
                        {' '}
                        Выбрано {selectedIds.length} записей{' '}
                      </Typography>
                    ) : null}

                    <Tooltip title="Изменить выбранное" placement="top">
                      <span>
                        <IconButton
                          disabled={selectedIds.length !== 1}
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
                          disabled={selectedIds.length === 0}
                          onClick={() => {
                            setDialogOrgRemoveOpen(true);
                          }}>
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Обновить данные" placement="top">
                      <span>
                        <IconButton>
                          <SyncIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                </Toolbar>

                {/* таблица организаций */}
                <TableOrg orgData={showOrgData} onSelectChange={handleSelectChange} />
              </Paper>
            </Box>
          </>
        );
      }}
    </Observer>
  );
}
