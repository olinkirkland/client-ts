import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
import Footer from './Footer';
import Home from './Home';
import Navbar from './Navbar';
export default function Platform() {
  useEffect(() => {
    Terminal.log('Initialized Platform');
  }, []);

  return (
    <div className="platform">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}
