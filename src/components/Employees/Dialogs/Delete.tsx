import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useStore } from '@app/store';

interface DialogProps {
  isOpen: boolean;
  employeesIds: number[];
  setClose: () => void;
  onRemoveEnd?: () => void;
}
export function Delete(props: DialogProps) {
  const { isOpen, employeesIds: usersIds, setClose } = props;
  const { employeesStore } = useStore();
  const handleRemove = () => {
    usersIds.forEach((id) => {
      employeesStore.delete(id);
    });
    if (props.onRemoveEnd) {
      props.onRemoveEnd();
    }
    setClose();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={setClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle>Удаление сотрудников</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Запрошено удаление {props.employeesIds.length} сотрудников. Продолжить
            удаление?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={setClose}>
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
