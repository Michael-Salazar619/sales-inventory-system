import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Inventory from '../pages/Inventory.jsx';
import Login from '../pages/Login.jsx';
import Sales from '../pages/Sales.jsx';
import Chat from '../pages/Chat.jsx';
import Reports from '../pages/Reports.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="sales" element={<Sales />} />
        <Route path="chat" element={<Chat />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}
