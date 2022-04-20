import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
import NavUserCard from './NavUserCard';
export default function Navbar() {
  useEffect(() => {
    Terminal.log('Initialized Navbar');
  }, []);

  return (
    <nav>
      <h1 className="logo">Don't Fall!</h1>
      <button>
        <i className="fas fa-gamepad" />
        <span>Play</span>
      </button>
      <button>
        <i className="fas fa-paint-brush" />
        <span>Customize</span>
      </button>
      <button
        onClick={() => {
          Terminal.show();
        }}
      >
        <span>Terminal</span>
      </button>
      <NavUserCard />
    </nav>
  );
}
