import './TypingIndicator.css';

interface TypingIndicatorProps {
  show: boolean;
}

export const TypingIndicator = ({ show }: TypingIndicatorProps) => {
  if (!show) return null;

  return (
    <div className="typing-indicator">
      <span className="typing-text">Escribiendo</span>
      <div className="typing-dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};
