import { useEffect } from 'react';
import Home from './Home';
import Navbar from './Navbar';
import Taskbar from './Taskbar';
export default function Platform() {
  useEffect(() => {
  }, []);

  return (
    <div className="main">
      <Navbar />
      <Home />
      <Taskbar />
    </div>
  );
}
