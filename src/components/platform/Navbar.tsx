import { PopupManager } from 'react-popup-manager';
import PopupMediator from '../../controllers/PopupMediator';
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
          <button
            onClick={() => {
              // PopupMediator.open(PopupShop);
            }}
          >
            <i className="fas fa-shopping-cart" />
            <span>Shop</span>
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
