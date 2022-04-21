import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';
import HomePanel from './HomePanel';

export default function Navbar() {
  useEffect(() => {
    Terminal.log('🧱 Home');
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-grid">
          <HomePanel
            onClick={() => {
              Terminal.log('🖱️ Clicked a HomePanel');
            }}
            titleText="Don't Fall Quick Play"
            buttonText="Play Now"
            image="assets/images/abstract-1.png"
            big={true}
          />
          <HomePanel
            onClick={() => {
              Terminal.log('🖱️ Clicked a HomePanel');
            }}
            titleText="Game Rules"
            buttonText="Learn how to play"
            image="assets/images/abstract-2.png"
          />
          <HomePanel
            onClick={() => {
              Terminal.log('🖱️ Clicked a HomePanel');
            }}
            titleText="Customize avatar"
            buttonText="Customize"
            image="assets/images/abstract-3.png"
          />
          <HomePanel
            onClick={() => {
              Terminal.log('🖱️ Clicked a HomePanel');
            }}
            titleText="Host a public or private game"
            buttonText="Host a game"
            image="assets/images/abstract-4.png"
          />
          <HomePanel
            onClick={() => {
              Terminal.log('🖱️ Clicked a HomePanel');
            }}
            titleText="View open games"
            buttonText="Open games"
            image="assets/images/abstract-5.png"
          />
        </div>
      </div>
    </div>
  );
}
