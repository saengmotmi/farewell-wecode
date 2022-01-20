import Nav from 'components/Layout/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Auth from './pages/Auth';
import ProtectedRoute from 'components/ProtectedRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Main />} />
        </Route>
        <Route path="/auth/google" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}
