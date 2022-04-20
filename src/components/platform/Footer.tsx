import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
export default function Footer() {
  useEffect(() => {
    Terminal.log('Initialized Footer');
  }, []);

  return <footer>footer</footer>;
}
