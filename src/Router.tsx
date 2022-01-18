import Nav from 'components/Layout/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';

export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
