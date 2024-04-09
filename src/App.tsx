import { Main } from '@app/layouts';
import { Route, Routes, useLocation } from 'react-router-dom';
import OtherContent from './layouts/OtherContent';
import { useEffect } from 'react';
import {EmployeeManagement} from '@app/components';

function App() {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index path="/profile" element={<OtherContent content="Profile" />} />
          <Route
            index
            path="/organization"
            element={<OtherContent content="Organization" />}
          />
          <Route index path="/favorite" element={<OtherContent content="Favorite" />} />
          <Route index path="/maps" element={<OtherContent content="Maps" />} />
          <Route index path="/transport" element={<OtherContent content="Transport" />} />
          <Route index path="/employees" element={<EmployeeManagement />} />
          <Route index path="/analytics" element={<OtherContent content="Analytics" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
