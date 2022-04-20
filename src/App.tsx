import { useEffect, useRef, useState } from 'react';
import Platform from './components/platform/Platform';
import TerminalComponent from './components/TerminalComponent';
import Terminal, { TerminalEventType } from './controllers/Terminal';
import Multiplayer from './multiplayer/Multiplayer';

export default function App() {
  let initialized = useRef(false);
  const [status, setStatus] = useState({ connected: false, id: '' });
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    // Reload if already initialized
    if (initialized.current) document.location.reload();
    initialized.current = true;

    const multiplayer = new Multiplayer();
    multiplayer.setStatus = setStatus;

    Terminal.instance.on(TerminalEventType.SHOW, () => setOverlay(true));
    Terminal.instance.on(TerminalEventType.HIDE, () => setOverlay(false));

    Terminal.log('Initialized App');
  }, []);

  return (
    <div className="app">
      <Platform />
      <div className={overlay ? 'overlay' : 'overlay hidden'}>
        <TerminalComponent />
      </div>
    </div>
  );
}
