import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useStore } from '@app/store';

export interface DialogRemoveUsersProps {
  isOpen: boolean;
  usersIds: number[];
  setClose: () => void;
  onRemoveEnd?: () => void;
}
export function DialogRemoveUsers(props: DialogRemoveUsersProps) {
  const { isOpen, usersIds, setClose } = props;
  const { usersStore } = useStore();
  const handleRemove = () => {
    usersIds.forEach((id) => {
      usersStore.delete(id);
    });
    if (props.onRemoveEnd) {
      props.onRemoveEnd();
    }
    setClose();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={setClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle>Удаление пользователей</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Запрошено удаление {props.usersIds.length} пользователей. Продолжить удаление?
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
