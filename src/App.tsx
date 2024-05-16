import { AxiosResponse } from 'axios';
import { action } from 'mobx';
import { Observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Routes, useLocation } from 'react-router-dom';

import {
  Analytics,
  Auth,
  ChangePassword,
  Employees,
  ForgotPassword,
  Login,
  Maps,
  Organizations,
  Profile,
  Register,
  TransportManagement,
  Users,
} from '@app/components';
import AuthGuard from '@app/guards/AuthGuards';
import { Main } from '@app/layouts';
import { useStore } from '@app/store';

function App() {
  const { titleStore, linksStore, authStore } = useStore();
  const pathname = useLocation();
  useEffect(() => {
    titleStore.title = linksStore.getTitle(pathname.pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    authStore.refresh();
  }, [authStore.token === null]);

  return (
    <Observer>
      {() => {
        return (
          <>
            <Routes>
              <Route path="/" element={<AuthGuard outlet={<Main />} />}>
                <Route index element={<Profile />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route path="/maps" element={<Maps />} />
                <Route path="/transport" element={<TransportManagement />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/users" element={<Users />} />
              </Route>
              <Route path="/" element={<AuthGuard id="auth" outlet={<Auth />} />}>
                <Route path="login" index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
            </Routes>

            <Helmet>
              <title> {titleStore.title} - RouteLink</title>
            </Helmet>
          </>
        );
      }}
    </Observer>
  );
}

export default App;
