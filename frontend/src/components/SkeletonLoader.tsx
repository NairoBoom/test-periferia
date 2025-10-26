import './SkeletonLoader.css';

interface SkeletonLoaderProps {
  type?: 'post' | 'profile' | 'card';
  count?: number;
}

export const SkeletonLoader = ({ type = 'post', count = 3 }: SkeletonLoaderProps) => {
  if (type === 'post') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-post">
            <div className="skeleton-post-header">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-user-info">
                <div className="skeleton-line skeleton-name"></div>
                <div className="skeleton-line skeleton-username"></div>
              </div>
            </div>
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-text"></div>
              <div className="skeleton-line skeleton-text"></div>
              <div className="skeleton-line skeleton-text-short"></div>
            </div>
            <div className="skeleton-actions">
              <div className="skeleton-button"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'profile') {
    return (
      <div className="skeleton-profile">
        <div className="skeleton-profile-header">
          <div className="skeleton-avatar-large"></div>
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-subtitle"></div>
        </div>
        <div className="skeleton-profile-body">
          <div className="skeleton-line skeleton-section-title"></div>
          <div className="skeleton-info-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton-info-item">
                <div className="skeleton-line skeleton-label"></div>
                <div className="skeleton-line skeleton-value"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
