import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
export default function Navbar() {
  useEffect(() => {
    Terminal.log('Initialized Navbar');
  }, []);

  return (
    <nav>
      <h1 className="logo">Don't Fall!</h1>
      <button>Play</button>
      <button>Host</button>
      <button>Join</button>
      <button>Customize</button>
      <button
        onClick={() => {
          Terminal.show();
        }}
      >
        Terminal
      </button>
    </nav>
  );
}
