import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
export default function Taskbar() {
  useEffect(() => {
    Terminal.log('✔️ Taskbar');
  }, []);

  return <div className='taskbar'>taskbar</div>;
}
