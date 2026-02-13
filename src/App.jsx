import { useState } from 'react';
import './App.css';

import StarryCanvas from './components/StarryCanvas';
import Typewriter from './components/Typewriter';
import StarGame from './components/StarGame';
import SurpriseModal from './components/SurpriseModal';
import Moon from './components/Moon';
import ShootingStar from './components/ShootingStar';
import FloatingParticles from './components/FloatingParticles';
import AudioControls from './components/AudioControls';
import Footer from './components/Footer';

const romanticMessage = `In a universe of endless stars, you shine the brightest in my sky. You are the gentle dawn that softly breaks through my darkest nights, the quiet calm in my stormy days, and the warmth that makes my heart feel home.

Five months of loving you, and every moment feels like the first time I fell. Thank you for being my peace, my joy, my everything.

You are not just my love — you are my favorite forever. 🌙`;

function App() {
  const [showModal, setShowModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleGameComplete = () => {
    // Optional: trigger something special when game is complete
  };

  return (
    <div className="app">
      {/* Background Elements */}
      <StarryCanvas />
      <Moon />
      <ShootingStar />
      <FloatingParticles />

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">
            Happy 5th Month, My Love
          </h1>
        </section>

        {/* Love Message Card */}
        <div className="glass-card">
          <Typewriter 
            text={romanticMessage} 
            speed={40} 
            delay={800} 
          />
        </div>

        {/* Star Game */}
        <StarGame 
          soundEnabled={soundEnabled}
          onComplete={handleGameComplete}
        />

        {/* Surprise Button */}
        <section className="surprise-section">
          <button 
            className="surprise-btn"
            onClick={() => setShowModal(true)}
          >
            Tap for a Surprise 💖
          </button>
        </section>
      </main>

      {/* Surprise Modal */}
      <SurpriseModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />

      {/* Audio Controls */}
      <AudioControls 
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
