import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { useStore } from '@app/store';

export type ProtectedRouteProps = {
  id?: string;
  outlet: JSX.Element;
};

const protectedRoute = ({ id, outlet }: ProtectedRouteProps) => {
  const { authStore } = useStore();

  if (!!authStore.token) {
    return 'auth' === id ? <Navigate to={{ pathname: '/' }} /> : outlet;
  } else {
    return 'auth' === id ? outlet : <Navigate to={{ pathname: '/login' }} />;
  }
};

export default observer(protectedRoute);
