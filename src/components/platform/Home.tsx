import { useEffect, useState } from 'react';
import Connection, { ConnectionEventType } from '../../connection/Connection';
import { GameOptions } from '../../connection/Game';
import PopupMediator from '../../controllers/PopupMediator';
import { getItemById } from '../../models/Item';
import { PopupBook, SectionType } from '../popups/PopupBook';
import { PopupHostGame } from '../popups/PopupHostGame';
import { PopupInput } from '../popups/PopupInput';
import { PopupJoinGame } from '../popups/PopupJoinGame';
import { PopupPrompt } from '../popups/PopupPrompt';
import { PopupShop } from '../popups/PopupShop';
import HomePanel from './HomePanel';

export default function Home() {
  const [wallpaper, setWallpaper] = useState(
    Connection.instance.me?.currentWallpaper
  );

  useEffect(() => {
    Connection.instance.addListener(
      ConnectionEventType.USER_DATA_CHANGED,
      onUserDataChanged
    );

    return () => {
      Connection.instance.removeListener(
        ConnectionEventType.USER_DATA_CHANGED,
        onUserDataChanged
      );
    };
  }, []);

  function onUserDataChanged() {
    setWallpaper(Connection.instance.me?.currentWallpaper);
  }

  return (
    <div
      className="home"
      style={{
        background: `url(${process.env.PUBLIC_URL}/assets/${
          getItemById(wallpaper!)?.value.url
        }) repeat center center`
      }}
    >
      <div className="home-container">
        <div className="home-grid">
          <HomePanel
            onClick={() => {
              PopupMediator.open(PopupShop);
            }}
            titleText="Avatars &amp; Wallpapers"
            buttonText="Shop"
            image="assets/images/abstract-2.png"
          />
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
            titleText="Play Now &amp; Join a Random Match"
            buttonText="Play Now"
            image="assets/images/abstract-1.png"
            big={true}
          />
          {/* <HomePanel
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
          /> */}
          <HomePanel
            onClick={() => {
              PopupMediator.open(PopupHostGame);
            }}
            titleText="Play with friends"
            buttonText="Host a game"
            image="assets/images/abstract-4.png"
          />
          <HomePanel
            onClick={() => {
              PopupMediator.open(PopupJoinGame);
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
