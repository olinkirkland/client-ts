import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
import Taskbar from './Taskbar';
import Home from './Home';
import Navbar from './Navbar';
export default function Platform() {
  // const [popup, setPopup] = useState<Popup />();

  useEffect(() => {
    Terminal.log('🧱 Platform');
  }, []);

  return (
    <div className="platform">
      <div className="main">
        <Navbar />
        <Home />
        <Taskbar />
      </div>
      <div className="popup-container"></div>
    </div>
  );
}
