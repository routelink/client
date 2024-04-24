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
import { Main } from '@app/layouts';

import './components/Auth/ChangePassword';
import OtherContent from './layouts/OtherContent';
import { useStore } from './store';

function App() {
  const pathname = useLocation();

  useEffect(() => {
    titleStore.setTitle(linksStore.getTitle(pathname.pathname));
    window.scrollTo(0, 0);
  }, [pathname]);

  const { titleStore, linksStore } = useStore();

  return (
    <Observer>
      {() => {
        return (
          <>
            <Routes>
              <Route path="/" element={<Main />}>
                <Route index path="/profile" element={<Profile />} />
                <Route index path="/organizations" element={<Organizations />} />
                <Route
                  index
                  path="/favorite"
                  element={<OtherContent content="Favorite" />}
                />
                <Route index path="/maps" element={<Maps />} />
                <Route index path="/transport" element={<TransportManagement />} />
                <Route index path="/employees" element={<Employees />} />
                <Route index path="/analytics" element={<Analytics />} />
                <Route index path="/users" element={<Users />} />
              </Route>
              <Route path="/auth" element={<Auth />}>
                <Route path="login" index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
            </Routes>
            <Helmet>
              <meta charSet="utf-8" />
              <title> {titleStore.title} - RouteLink</title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
          </>
        );
      }}
    </Observer>
  );
}

export default App;
