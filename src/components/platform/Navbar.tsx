import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
import NavAnonCard from './NavAnonCard';
import NavUserCard from './NavUserCard';
export default function Navbar() {
  useEffect(() => {
    Terminal.log('🧱 Navbar');
  }, []);

  return (
    <nav>
      <h1 className="logo">Don't Fall!</h1>
      <ul>
        <li>
          <button>
            <i className="fas fa-gamepad" />
            <span>Play</span>
          </button>
        </li>
        <li>
          <button>
            <i className="fas fa-paint-brush" />
            <span>Customize</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              Terminal.show();
            }}
          >
            <i className="fas fa-keyboard" />
            <span>Terminal</span>
          </button>
        </li>
      </ul>

      <NavAnonCard />
      {/* <NavUserCard /> */}
    </nav>
  );
}
