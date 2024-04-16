import { CircularProgress, Backdrop as MUIBackdrop } from '@mui/material';

export interface IBackdropProps {
  open: boolean;
}
export function Backdrop(props: IBackdropProps) {
  return (
    <>
      <MUIBackdrop
        sx={{
          color: '#fff',
          mt: '0 !important',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={props.open}>
        <CircularProgress color="inherit" />
      </MUIBackdrop>
    </>
  );
}
