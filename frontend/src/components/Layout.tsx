import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import ThemeToggle from './ThemeToggle';
import { ProgressBar } from './ProgressBar';
import './Layout.css';

function Layout() {
  const { user, logout } = useAuthStore();
  const { theme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="layout">
      <ProgressBar />
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-title">Red Social</h1>
          <div className="nav-links">
            <Link to="/posts" className={location.pathname === '/posts' ? 'active' : ''}>
              Publicaciones
            </Link>
            <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
              Perfil
            </Link>
          </div>
          <div className="nav-user">
            <span className="user-name">{user?.alias}</span>
            <ThemeToggle />
            <button onClick={handleLogout} className="logout-btn">
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
