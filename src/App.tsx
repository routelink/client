import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import {
  Analytics,
  Auth,
  ChangePassword,
  Employees,
  ForgotPassword,
  Login,
  Maps,
  Profile,
  Register,
  TransportManagement,
  Users,
} from '@app/components';
import { Main } from '@app/layouts';

import './components/Auth/ChangePassword';
import OtherContent from './layouts/OtherContent';

function App() {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index path="/profile" element={<Profile />} />
          <Route
            index
            path="/organization"
            element={<OtherContent content="Organization" />}
          />
          <Route index path="/favorite" element={<OtherContent content="Favorite" />} />
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
    </>
  );
}

export default App;
