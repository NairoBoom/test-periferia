import { useState, CSSProperties } from 'react';
import { useSound } from '../hooks/useSound';
import './LikeButton.css';

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onLike: () => void;
  disabled?: boolean;
}

export const LikeButton = ({
  isLiked,
  likesCount,
  onLike,
  disabled
}: LikeButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const { playSound } = useSound();

  const handleClick = () => {
    if (disabled) return;
    setIsAnimating(true);

    if (!isLiked) {
      playSound('like');

      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.cos((i * Math.PI * 2) / 8) * 50,
        y: Math.sin((i * Math.PI * 2) / 8) * 50,
      }));
      setParticles(newParticles);

      setTimeout(() => setParticles([]), 600);
    }

    onLike();
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      className={`like-button-enhanced ${isLiked ? 'liked' : ''} ${isAnimating ? 'animating' : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <div className="like-button-content">
        <svg
          className="heart-icon"
          viewBox="0 0 24 24"
          fill={isLiked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="like-count">{likesCount}</span>
      </div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="like-particle"
          style={{
            '--x': `${particle.x}px`,
            '--y': `${particle.y}px`,
          } as CSSProperties}
        />
      ))}
    </button>
  );
};
