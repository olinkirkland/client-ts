import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
import Home from './Home';
import Navbar from './Navbar';
import Taskbar from './Taskbar';
export default function Platform() {
  useEffect(() => {
    Terminal.log('🧱 Platform');
  }, []);

  return (
    <div className="main">
      <Navbar />
      <Home />
      <Taskbar />
    </div>
  );
}
