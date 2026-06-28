import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import StudentHub from './pages/StudentHub';
import AdminHub from './pages/AdminHub';
import Flashcards from './pages/Flashcards';
import InstallPrompt from './components/InstallPrompt';

function PrivateRoute({ children, requireMaster }) {
  const { currentUser, userData } = useAuth();
  
  if (!currentUser) return <Navigate to="/login" />;
  if (requireMaster && userData?.role !== 'master') return <Navigate to="/" />;
  if (!requireMaster && userData?.role === 'master') return <Navigate to="/admin" />;
  
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <InstallPrompt />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><StudentHub /></PrivateRoute>} />
        <Route path="/flashcards" element={<PrivateRoute><Flashcards /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute requireMaster><AdminHub /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
