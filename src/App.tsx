import { useEffect, useRef, useState } from 'react';
import Platform from './components/platform/Platform';
import TerminalComponent from './components/TerminalComponent';
import Terminal, { TerminalEventType } from './controllers/Terminal';
import Connection from './connection/Connection';

export default function App() {
  let initialized = useRef(false);
  const [status, setStatus] = useState({ connected: false, id: '' });
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    // Reload if already initialized
    if (initialized.current) document.location.reload();
    initialized.current = true;

    Terminal.instance.on(TerminalEventType.SHOW, () => setOverlay(true));
    Terminal.instance.on(TerminalEventType.HIDE, () => setOverlay(false));

    // Start connection
    const connection = Connection.instance;
    connection.setStatus = setStatus;
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
