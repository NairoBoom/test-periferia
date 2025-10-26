import { useRef, useState } from 'react';
import './TiltCard.css';

interface TiltCardProps {
  children: React.ReactNode;
  maxTilt?: number;
  scale?: number;
}

export const TiltCard = ({
  children,
  maxTilt = 5,
  scale = 1.02,
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, left: '50%', top: '50%' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
    );

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      opacity: 0.2,
      left: `${glareX}%`,
      top: `${glareY}%`,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    setGlareStyle({ opacity: 0, left: '50%', top: '50%' });
  };

  return (
    <div
      ref={cardRef}
      className="tilt-card"
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div
        className="tilt-glare"
        style={{
          opacity: glareStyle.opacity,
          left: glareStyle.left,
          top: glareStyle.top,
        }}
      />
    </div>
  );
};
