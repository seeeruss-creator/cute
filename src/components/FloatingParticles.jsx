import { useEffect, useState } from 'react';

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create initial particles
    const initialParticles = [];
    const count = window.innerWidth < 768 ? 15 : 25;
    
    for (let i = 0; i < count; i++) {
      initialParticles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 6,
        size: 2 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.4
      });
    }
    
    setParticles(initialParticles);
  }, []);

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </>
  );
};

export default FloatingParticles;
