import { useEffect } from 'react';
import { usePopupManager } from 'react-popup-manager';
import Terminal from '../../controllers/Terminal';
import { PopupError } from '../popups/PopupError';
import { PopupInput } from '../popups/PopupInput';
import { PopupPrompt } from '../popups/PopupPrompt';
import HomePanel from './HomePanel';

export default function Navbar() {
  useEffect(() => {
    Terminal.log('🧱 Home');
  }, []);

  const popupManager = usePopupManager();

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-grid">
          <HomePanel
            onClick={() => {
              popupManager.open(PopupPrompt, {
                title: 'Are you sure?',
                message: 'Lorem ipsum dolor sit amet.',
                confirm: 'Yes',
                cancel: 'No',
                onConfirm: () => {
                  console.log('confirm');
                },
                onCancel: () => {
                  console.log('cancel');
                }
              });
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
              popupManager.open(PopupInput, {
                title: 'Choose your name',
                message: 'Enter your name below.',
                confirm: 'Ok',
                cancel: 'Cancel',
                placeholder: 'John Smith',
                onConfirm: (text: string) => {
                  console.log(text);
                },
                onCancel: () => {
                  console.log('cancel');
                }
              });
            }}
            titleText="Customize avatar"
            buttonText="Customize"
            image="assets/images/abstract-3.png"
          />
          <HomePanel
            onClick={() => {
              popupManager.open(PopupError, {
                title: 'Error!',
                message: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'
              });
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
