import { Route, Routes } from 'react-router-dom';

import DefaultLayout from '@/layout/DefaultLayout';

import Home from '@/screens/Home';
import NoMatchScreen from '@/screens/NoMatchScreen';

import ROUTES from '@/constants/routes';

function App() {
  return (
    <Routes>
      <Route path="*" element={<NoMatchScreen />} />
      <Route element={<DefaultLayout />}>
        <Route path={ROUTES.ROOT} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
