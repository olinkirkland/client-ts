import { useEffect, useRef, useState } from 'react';
import TerminalComponent from './components/TerminalComponent';
import Terminal from './controllers/Terminal';
import Multiplayer from './multiplayer/Multiplayer';

export default function App() {
  let initialized = useRef(false);
  const [status, setStatus] = useState({ connected: false, id: '' });

  useEffect(() => {
    // Reload if already initialized
    if (initialized.current) document.location.reload();
    initialized.current = true;

    const multiplayer = new Multiplayer();
    multiplayer.setStatus = setStatus;

    Terminal.log('Initialized App');
  }, []);

  return (
    <div className="v-group">
      <TerminalComponent />
      <div className="panel v-group">
        <h2 className="text-center">Quick Actions</h2>
        {/* <div className="h-group center">
          <Checkbox
            text="Chat mode"
            value={true}
            checked={(b: boolean) => {
              console.log(b);
            }}
          />
        </div> */}
        <div className="h-group center">
          <button
            onClick={() => {
              Terminal.command('connect');
            }}
          >
            Connect
          </button>
          <button
            onClick={() => {
              Terminal.command('disconnect');
            }}
          >
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
}
