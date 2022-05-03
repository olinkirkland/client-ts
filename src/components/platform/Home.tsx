import { useEffect } from 'react';
import Connection from '../../connection/Connection';
import { GameOptions } from '../../controllers/Game';
import PopupMediator from '../../controllers/PopupMediator';
import { PopupBook, SectionType } from '../popups/PopupBook';
import { PopupHostGame } from '../popups/PopupHostGame';
import { PopupInput } from '../popups/PopupInput';
import { PopupJoinGame } from '../popups/PopupJoinGame';
import { PopupPrompt } from '../popups/PopupPrompt';
import HomePanel from './HomePanel';

export default function Navbar() {
  useEffect(() => {}, []);

  const wallpaper: string = 'prism.png';

  return (
    <div
      className="home"
      style={{
        background: `url(${process.env.PUBLIC_URL}/assets/images/wallpapers/${wallpaper}) repeat center center`
      }}
    >
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
              PopupMediator.open(PopupHostGame, {
                onConfirm: (gameOptions: GameOptions) => {
                  Connection.instance.hostGame(gameOptions);
                }
              });
            }}
            titleText="Host a public or private game"
            buttonText="Host a game"
            image="assets/images/abstract-4.png"
          />
          <HomePanel
            onClick={() => {
              PopupMediator.open(PopupJoinGame, {
                onConfirm: () => {
                  console.log('confirm');
                }
              });
            }}
            titleText="View open games"
            buttonText="Join a game"
            image="assets/images/abstract-5.png"
          />
        </div>
      </div>
    </div>
  );
}
