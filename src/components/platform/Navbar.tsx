import Terminal from '../../controllers/Terminal';
import NavUserCard from './NavUserCard';
export default function Navbar() {
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

      <NavUserCard />
    </nav>
  );
}
