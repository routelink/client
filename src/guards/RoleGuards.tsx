import { Observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import { Link } from '@app/models';
import { useStore } from '@app/store';

interface IRoleGuardsProps {
  outlet: JSX.Element;
}
export function RoleGuards({ outlet }: IRoleGuardsProps) {
  const { authStore, linksStore } = useStore();
  const { pathname } = useLocation();
  const [access, setAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const data: Link | undefined = linksStore
      .getLinks()
      .find((item) => item.href === pathname);
    data?.role?.includes(authStore.role!) ? setAccess(true) : setAccess(false);
    if (data?.role == null) setAccess(true);
  }, [pathname]);

  return (
    <Observer>
      {() => {
        return (
          <Box>{access ? outlet : access === null ? null : <Navigate to="/" />}</Box>
        );
      }}
    </Observer>
  );
}
