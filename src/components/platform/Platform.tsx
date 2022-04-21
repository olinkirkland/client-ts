import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
import Taskbar from './Taskbar';
import Home from './Home';
import Navbar from './Navbar';
export default function Platform() {
  useEffect(() => {
    Terminal.log('✔️ Platform');
  }, []);

  return (
    <div className="platform">
      <Navbar />
      <Home />
      <Taskbar />
    </div>
  );
}
