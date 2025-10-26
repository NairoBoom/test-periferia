import './EmptyState.css';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: 'posts' | 'search' | 'error';
}

export const EmptyState = ({
  title,
  message,
  icon = 'posts'
}: EmptyStateProps) => {
  const renderIcon = () => {
    if (icon === 'posts') {
      return (
        <svg className="empty-state-icon" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="url(#gradient1)" opacity="0.2"/>
          <path
            d="M60 80h80M60 100h80M60 120h50"
            stroke="url(#gradient1)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <rect
            x="50"
            y="60"
            width="100"
            height="90"
            rx="10"
            stroke="url(#gradient1)"
            strokeWidth="4"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    if (icon === 'search') {
      return (
        <svg className="empty-state-icon" viewBox="0 0 200 200" fill="none">
          <circle cx="80" cy="80" r="40" stroke="url(#gradient2)" strokeWidth="6" fill="none"/>
          <path d="M110 110l30 30" stroke="url(#gradient2)" strokeWidth="6" strokeLinecap="round"/>
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
        </svg>
      );
    }

    return (
      <svg className="empty-state-icon" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="80" stroke="url(#gradient3)" strokeWidth="6" fill="none"/>
        <path d="M70 80h60M100 120v-20" stroke="url(#gradient3)" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="75" cy="80" r="5" fill="url(#gradient3)"/>
        <circle cx="125" cy="80" r="5" fill="url(#gradient3)"/>
        <defs>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <div className="empty-state">
      <div className="empty-state-illustration">
        {renderIcon()}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
    </div>
  );
};
