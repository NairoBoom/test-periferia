import { useState, useEffect } from 'react';
import { usersService, UserProfile } from '../api/usersService';
import { useThemeStore } from '../store/themeStore';
import ParticleCanvas from '../components/ParticleCanvas';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { Avatar } from '../components/Avatar';
import { TiltCard } from '../components/TiltCard';
import '../components/ParticleCanvas.css';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { theme } = useThemeStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await usersService.getProfile();
        setProfile(data);
      } catch (err) {
        setError('Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div className="profile-container particle-container">
      <ParticleCanvas
        particleCount={40}
        connectionDistance={100}
        mouseRadius={120}
        particleSpeed={0.3}
        className="profile-particles"
        theme={theme}
      />
      <div className="particle-content">
        {loading ? (
          <SkeletonLoader type="profile" count={1} />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : profile ? (
          <TiltCard maxTilt={8} scale={1.01}>
            <div className="profile-card">
              <div className="profile-header">
                <Avatar
                  name={`${profile.firstName} ${profile.lastName}`}
                  size="xlarge"
                />
                <h1 className="profile-alias">{profile.alias}</h1>
                <p className="profile-username">@{profile.username}</p>
              </div>

              <div className="profile-info">
                <div className="info-section">
                  <h2>Información Personal</h2>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Nombres</span>
                      <span className="info-value">{profile.firstName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Apellidos</span>
                      <span className="info-value">{profile.lastName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Fecha de Nacimiento</span>
                      <span className="info-value">{formatDate(profile.birthDate)}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Edad</span>
                      <span className="info-value">{calculateAge(profile.birthDate)} años</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Miembro desde</span>
                      <span className="info-value">{formatDate(profile.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        ) : null}
      </div>
    </div>
  );
}

export default Profile;
