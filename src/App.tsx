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
    for (let i = 0; i < 10; i++) {
      Terminal.log(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias odit ipsa assumenda illum quod quae atque ut architecto nisi vero. ${i}`);
    }
  }, []);

  return (
    <>
      <TerminalComponent />
    </>
  );
}
