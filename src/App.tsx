import { useEffect, useRef } from 'react';
import Terminal from './controllers/Terminal';
import TerminalComponent from './components/TerminalComponent';
import Multiplayer from './multiplayer/Multiplayer';

export default function App() {
  let initialized = useRef(false);

  useEffect(() => {
    // Reload if already initialized
    if (initialized.current) document.location.reload();
    initialized.current = true;

    new Multiplayer();

    Terminal.log('Initialized App');
  }, []);

  return (
    <div className="v-group">
      <TerminalComponent />
      <div className="panel v-group">
        <h2 className="text-center">Quick Actions</h2>
        <div className="h-group center">
          <button>Connect</button>
          <button>Disconnect</button>
          <button>Status</button>
        </div>
      </div>
    </div>
  );
}
