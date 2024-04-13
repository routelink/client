import * as React from 'react';
import MuiDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
      </MuiDialog>
    </>
  );
}
