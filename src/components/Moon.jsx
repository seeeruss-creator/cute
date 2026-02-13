import { useEffect, useState } from 'react';

const Moon = () => {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setParallaxOffset({
        x: 0,
        y: scrollY * 0.1
      });
    };

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setParallaxOffset({ x, y });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="moon"
      style={{
        transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`
      }}
    />
  );
};

export default Moon;
