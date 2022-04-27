import axios from 'axios';
import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
export default function NavAnonCard() {
  useEffect(() => {
    Terminal.log('🧱 NavAnonCard');
  }, []);

  return (
    <>
      <div className="nav-user-card">
        <img
          src={`https://avatars.dicebear.com/api/identicon/beagle.svg`}
          alt=""
        />
        <button>Anonymous-193</button>
        <button>Sign Up</button>
        <button>Login</button>
      </div>
    </>
  );
}
