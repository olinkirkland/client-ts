import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
export default function NavAnonCard() {
  useEffect(() => {
    Terminal.log('🧱 NavAnonCard');
  }, []);

  return (
    <>
      <div className="nav-user-card">
        <div className="profile-button">
          <img
            src={`https://avatars.dicebear.com/api/identicon/beagle.svg`}
            alt=""
          />
          <h2>Anonymous-193</h2>
        </div>
        <button className="user-card-button">
          <span>Login</span>
        </button>
        <button className="user-card-button featured">
          <span>Sign Up</span>
        </button>
      </div>
    </>
  );
}
