import { useEffect, useState } from 'react';

const ShootingStar = () => {
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    const createShootingStar = () => {
      const id = Date.now();
      const startX = Math.random() * 60 + 10; // 10-70% from left
      const startY = Math.random() * 30 + 5; // 5-35% from top
      
      setShootingStars(prev => [...prev, { id, startX, startY }]);
      
      // Remove after animation
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== id));
      }, 1500);
    };

    // Create shooting star at random intervals (5-15 seconds)
    const scheduleNextStar = () => {
      const delay = 5000 + Math.random() * 10000;
      return setTimeout(() => {
        createShootingStar();
        scheduleNextStar();
      }, delay);
    };

    // Initial shooting star after 3 seconds
    const initialTimeout = setTimeout(() => {
      createShootingStar();
      scheduleNextStar();
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <>
      {shootingStars.map(star => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            animation: 'shootingStarMove 1.5s ease-out forwards'
          }}
        />
      ))}
      <style>{`
        @keyframes shootingStarMove {
          0% {
            transform: translateX(0) translateY(0) rotate(45deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(300px) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default ShootingStar;
