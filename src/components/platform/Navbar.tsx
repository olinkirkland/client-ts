import Terminal from '../../controllers/Terminal';
import NavUserCard from './NavUserCard';
export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <button className="bar-tile logo-tile">
            <h1 className="logo">Don't Fall</h1>
            <i className="fas fa-gamepad" />
            <span>Play</span>
          </button>
        </li>
        <li>
          <button
            className="bar-tile"
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
            className="bar-tile"
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
