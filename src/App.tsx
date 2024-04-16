import { useEffect } from 'react';
import { Users, Maps, Profile, Analytics, Employees, TransportManagement } from '@app/components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Main, Auth } from '@app/layouts';
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
          <Route index path="/auth" element={<Auth state="login" />} />
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
      </Routes>
    </>
  );
}

export default App;