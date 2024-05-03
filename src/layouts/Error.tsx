import { Observer } from 'mobx-react-lite';

import { Alert, Snackbar } from '@mui/material';

import { useStore } from '@app/store';

export function Error() {
  const { appStore } = useStore();

  return (
    <Observer>
      {() => {
        return (
          <Snackbar
            open={!!appStore.error}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => (appStore.error = null)}>
            <Alert
              onClose={() => (appStore.error = null)}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}>
              {appStore.error}
            </Alert>
          </Snackbar>
        );
      }}
    </Observer>
  );
}
