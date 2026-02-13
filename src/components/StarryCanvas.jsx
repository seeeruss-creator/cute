import { useEffect, useRef } from 'react';

const StarryCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.1,
          driftY: (Math.random() - 0.5) * 0.05,
          color: getStarColor()
        });
      }
    };

    const getStarColor = () => {
      const colors = [
        { r: 255, g: 255, b: 255 },      // White
        { r: 240, g: 230, b: 255 },      // Silver-white
        { r: 232, g: 180, b: 200 },      // Soft pink
        { r: 184, g: 169, b: 201 },      // Lavender
        { r: 200, g: 220, b: 255 },      // Light blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const drawStar = (star, time) => {
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
      const currentOpacity = star.opacity * twinkle;
      
      // Create gradient for glow effect
      const gradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.radius * 3
      );
      
      gradient.addColorStop(0, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${currentOpacity})`);
      gradient.addColorStop(0.5, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${currentOpacity * 0.3})`);
      gradient.addColorStop(1, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 0)`);
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw core
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${currentOpacity})`;
      ctx.fill();
    };

    const updateStars = () => {
      stars.forEach(star => {
        star.x += star.driftX;
        star.y += star.driftY;
        
        // Wrap around screen
        if (star.x < -10) star.x = canvas.width + 10;
        if (star.x > canvas.width + 10) star.x = -10;
        if (star.y < -10) star.y = canvas.height + 10;
        if (star.y > canvas.height + 10) star.y = -10;
      });
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => drawStar(star, time));
      updateStars();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="stars-canvas" />;
};

export default StarryCanvas;
