import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import Layout from './components/Layout';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/posts" />} />
        <Route element={<Layout />}>
          <Route path="/posts" element={isAuthenticated ? <Posts /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? "/posts" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
