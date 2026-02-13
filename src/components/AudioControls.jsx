import { useState, useRef, useEffect } from 'react';

const AudioControls = ({ soundEnabled, setSoundEnabled }) => {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element with romantic ambient music
    audioRef.current = new Audio('https://cdn.pixabay.com/audio/2022/10/25/audio_946bc0eb55.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (musicEnabled) {
      audioRef.current.play().catch(e => {
        console.log('Audio play failed:', e);
      });
    } else {
      audioRef.current.pause();
    }
  }, [musicEnabled]);

  return (
    <div className="audio-controls">
      <button
        className={`audio-btn ${musicEnabled ? 'active' : ''}`}
        onClick={() => setMusicEnabled(!musicEnabled)}
        title={musicEnabled ? 'Pause Music' : 'Play Music'}
        aria-label={musicEnabled ? 'Pause background music' : 'Play background music'}
      >
        {musicEnabled ? '🎵' : '🔇'}
      </button>
      <button
        className={`audio-btn ${soundEnabled ? 'active' : ''}`}
        onClick={() => setSoundEnabled(!soundEnabled)}
        title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
        aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
      >
        {soundEnabled ? '🔔' : '🔕'}
      </button>
    </div>
  );
};

export default AudioControls;
