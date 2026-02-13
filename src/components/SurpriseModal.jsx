import { useEffect, useState } from 'react';

const SurpriseModal = ({ isOpen, onClose }) => {
  const [fallingStars, setFallingStars] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Create falling stars animation
      const stars = [];
      for (let i = 0; i < 20; i++) {
        stars.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 2 + Math.random() * 2,
          size: 10 + Math.random() * 15
        });
      }
      setFallingStars(stars);
    } else {
      setFallingStars([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Falling stars */}
      {fallingStars.map(star => (
        <span
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            top: '-20px',
            fontSize: `${star.size}px`,
            animation: `fallingStar ${star.duration}s ease-in ${star.delay}s infinite`,
            pointerEvents: 'none'
          }}
        >
          ⭐
        </span>
      ))}
      
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Happy 5th Month, my love.</h2>
        
        <div className="video-container" style={{ marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden' }}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '12px' }}
          >
            <source src="/love-video.mp4" type="video/mp4" />
          </video>
        </div>
        
        <p>
          I can't believe it's already five months with you.
          It feels fast but at the same time, it feels like you've been part of my life for so long already.
        </p>
        <p>
          Thank you for staying.
          Thank you for choosing me every day.
          Thank you for being patient with me, even when I'm not perfect.
        </p>
        <p>
          You don't even realize how much you help me just by being there.
          Your voice, your laugh, your small updates about your day they make my normal days feel special.
        </p>
        <p>
          These five months weren't perfect, but they were real.
          We had good days, some misunderstandings, random jokes, late talks, and simple moments and I love all of it because it's with you.
        </p>
        <p>
          You are my calm when my mind is loud.
          You are my comfort when I'm tired.
          You are my favorite person.
        </p>
        <p>
          I don't just love you because you're sweet or caring.
          I love you because you feel like home to me.
        </p>
        <p>
          Five months down, and I still choose you.
          Still grateful for you.
          Still excited for more months with you.
        </p>
        <p className="modal-signature" style={{ color: '#e8b4c8', fontWeight: '500', marginTop: '1.5rem' }}>
          Happy 5th month, baby.
          I love you always.
        </p>
        <button className="modal-close" onClick={onClose}>
          Close with Love
        </button>
      </div>
      
      <style>{`
        @keyframes fallingStar {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SurpriseModal;
