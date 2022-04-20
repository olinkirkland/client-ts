import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
export default function Navbar() {
  useEffect(() => {
    Terminal.log('Initialized Home');
  }, []);

  return <div className="home">home</div>;
}
