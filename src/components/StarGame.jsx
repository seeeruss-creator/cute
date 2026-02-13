import { useState, useEffect, useRef, useCallback } from 'react';

const StarGame = ({ soundEnabled, onComplete }) => {
  const [score, setScore] = useState(0);
  const [starPosition, setStarPosition] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const gameAreaRef = useRef(null);
  const particleId = useRef(0);

  const targetScore = 10;

  const moveStarToRandomPosition = useCallback(() => {
    const padding = 15; // percentage from edges
    const x = Math.random() * (100 - padding * 2) + padding;
    const y = Math.random() * (100 - padding * 2) + padding;
    setStarPosition({ x, y });
  }, []);

  useEffect(() => {
    moveStarToRandomPosition();
  }, [moveStarToRandomPosition]);

  const playSound = useCallback(() => {
    if (!soundEnabled) return;
    
    // Create a simple sparkle sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Audio not supported
    }
  }, [soundEnabled]);

  const createParticles = useCallback((x, y) => {
    const newParticles = [];
    const emojis = ['💖', '✨', '💕', '⭐', '💗'];
    
    for (let i = 0; i < 5; i++) {
      newParticles.push({
        id: particleId.current++,
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  }, []);

  const handleStarClick = useCallback((e) => {
    if (isComplete) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const clickX = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const clickY = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    
    createParticles(clickX, clickY);
    playSound();
    
    const newScore = score + 1;
    setScore(newScore);
    
    if (newScore >= targetScore) {
      setIsComplete(true);
      onComplete?.();
    } else {
      moveStarToRandomPosition();
    }
  }, [score, isComplete, createParticles, playSound, moveStarToRandomPosition, onComplete]);

  const handleRestart = () => {
    setScore(0);
    setIsComplete(false);
    moveStarToRandomPosition();
  };

  return (
    <div className="glass-card game-section">
      <h3 className="game-title">✨ Catch the Glowing Star ✨</h3>
      
      <div 
        ref={gameAreaRef}
        className="game-area"
        onTouchStart={(e) => e.preventDefault()}
      >
        {!isComplete && (
          <svg
            className="game-star"
            viewBox="0 0 24 24"
            style={{
              left: `calc(${starPosition.x}% - 25px)`,
              top: `calc(${starPosition.y}% - 25px)`
            }}
            onClick={handleStarClick}
            onTouchEnd={handleStarClick}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              fill="#FFD700"
              filter="url(#glow)"
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        )}
        
        {particles.map(particle => (
          <span
            key={particle.id}
            className="heart-particle"
            style={{
              left: particle.x,
              top: particle.y
            }}
          >
            {particle.emoji}
          </span>
        ))}
        
        {isComplete && (
          <div className="game-complete-message">
            <h3>🌟 Amazing! 🌟</h3>
            <p>"You caught all my stars… but you already have my heart."</p>
            <button className="restart-btn" onClick={handleRestart}>
              Play Again 💫
            </button>
          </div>
        )}
      </div>
      
      <p className="game-score">
        Stars caught: <span>{score}</span> / {targetScore}
      </p>
    </div>
  );
};

export default StarGame;
