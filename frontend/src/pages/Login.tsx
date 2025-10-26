import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { authService } from '../api/authService';
import ParticleCanvas from '../components/ParticleCanvas';
import ThemeToggle from '../components/ThemeToggle';
import '../components/ParticleCanvas.css';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const { login } = useAuthStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({ username, password });
      login(response.user, response.token);
      navigate('/posts');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
      setShake(true);
      setTimeout(() => setShake(false), 650);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container particle-container">
      <ParticleCanvas
        particleCount={80}
        connectionDistance={120}
        mouseRadius={150}
        className="login-particles"
        theme={theme}
      />
      <div className="theme-toggle-login">
        <ThemeToggle />
      </div>
      <div className={`login-card particle-content ${shake ? 'shake' : ''} ${error ? 'error-state' : ''}`}>
        <h1 className="login-title">Red Social</h1>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="demo-credentials">
          <p className="demo-title">Usuarios de prueba:</p>
          <p className="demo-text">jperez / password123</p>
          <p className="demo-text">mgonzalez / password123</p>
          <p className="demo-text">crodriguez / password123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
