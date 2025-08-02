import { Routes, Route, Navigate } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Login'
import Register from '../pages/Register'

export const AppRoutes = () => {

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

// export default AppRoutes;
