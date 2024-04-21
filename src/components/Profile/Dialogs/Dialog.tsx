import MuiDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogProps {
  open: boolean;
  handleClose: () => void;

  title: string;
  content: JSX.Element;
}
export function Dialog(props: DialogProps) {
  const { open, content, title, handleClose } = props;

  return (
    <>
      <MuiDialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </MuiDialog>
    </>
  );
}
