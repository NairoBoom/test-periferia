import './Avatar.css';

interface AvatarProps {
  name: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
}

const getColorFromName = (name: string): string => {
  const colors = [
    '#667eea',
    '#764ba2',
    '#f093fb',
    '#4facfe',
    '#43e97b',
    '#fa709a',
    '#fee140',
    '#30cfd0',
    '#a8edea',
    '#ff6b9d',
    '#c471f5',
    '#12c2e9',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const getInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export const Avatar = ({ name, size = 'medium', className = '' }: AvatarProps) => {
  const backgroundColor = getColorFromName(name);
  const initials = getInitials(name);

  return (
    <div
      className={`avatar avatar-${size} ${className}`}
      style={{ background: backgroundColor }}
      title={name}
    >
      <span className="avatar-initials">{initials}</span>
    </div>
  );
};
