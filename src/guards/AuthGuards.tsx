import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import { useStore } from '@app/store';

export type ProtectedRouteProps = {
  id?: string;
  outlet: JSX.Element;
  pathname?: string;
};

const protectedRoute: FC<ProtectedRouteProps> = ({
  id,
  outlet,
  pathname,
}: ProtectedRouteProps) => {
  const { authStore } = useStore();
  const [location] = useState(pathname ? pathname : '/');

  useEffect(() => {
    const fetchData = async () => {
      await authStore.refresh();
    };

    fetchData();
  }, []);

  if (!authStore.token && !!authStore.loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  if (authStore.token) {
    return 'auth' === id ? (
      <Navigate to={{ pathname: location ? location : '/' }} />
    ) : (
      outlet
    );
  } else {
    return 'auth' === id ? outlet : <Navigate to={{ pathname: '/login' }} />;
  }
};

export default observer(protectedRoute);
