import { useEffect } from 'react';
import PopupMediator from '../../controllers/PopupMediator';
import { PopupBook, SectionType } from '../popups/PopupBook';
import { PopupError } from '../popups/PopupError';
import { PopupInput } from '../popups/PopupInput';
import { PopupPrompt } from '../popups/PopupPrompt';
import HomePanel from './HomePanel';

export default function Navbar() {
  useEffect(() => {}, []);

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-grid">
          <HomePanel
            onClick={() => {
              PopupMediator.open(PopupPrompt, {
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
              PopupMediator.open(PopupBook, {
                title: 'How to Play',
                sections: [
                  { type: SectionType.TITLE, data: 'Foo bar' },
                  {
                    type: SectionType.BODY,
                    data: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia omnis eum distinctio culpa rem asperiores a optio perferendis numquam obcaecati?'
                  },
                  {
                    type: SectionType.IMAGE,
                    data: 'https://i.imgur.com/CxeYuCs.png'
                  }
                ]
              });
            }}
            titleText="Game Rules"
            buttonText="Learn how to play"
            image="assets/images/abstract-2.png"
          />
          <HomePanel
            onClick={() => {
              PopupMediator.open(PopupInput, {
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
              PopupMediator.open(PopupError, {
                title: 'Error!',
                message:
                  'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'
              });
            }}
            titleText="Host a public or private game"
            buttonText="Host a game"
            image="assets/images/abstract-4.png"
          />
          <HomePanel
            onClick={() => {}}
            titleText="View open games"
            buttonText="Open games"
            image="assets/images/abstract-5.png"
          />
        </div>
      </div>
    </div>
  );
}
