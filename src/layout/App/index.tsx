import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import Spinner from '../../components/Spinner';

const NotFound = lazy(() => import('../../page/NotFound'));
const MainPage = lazy(() => import('../../page/MainPage'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
