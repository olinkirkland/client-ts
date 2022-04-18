import { useEffect, useRef } from 'react';
import Terminal from './controllers/Terminal';
import TerminalComponent from './components/TerminalComponent';

export default function App() {
  let initialized = useRef(false);

  useEffect(() => {
    // Reload if already initialized
    if (initialized.current) document.location.reload();
    initialized.current = true;

    Terminal.log('Initialized App');
  }, []);

  return (
    <>
      <TerminalComponent />
    </>
  );
}
