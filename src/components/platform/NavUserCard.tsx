import { useEffect, useState } from 'react';
import Connection from '../../connection/Connection';
import PopupMediator from '../../controllers/PopupMediator';
import { PopupLogin } from '../popups/PopupLogin';
import { PopupMyAccount } from '../popups/PopupMyAccount';
import { PopupPrompt } from '../popups/PopupPrompt';
import { PopupRegister } from '../popups/PopupRegister';
export default function NavAnonCard() {
  const connection = Connection.instance;
  const [username, setUsername] = useState<string>('');
  const [isGuest, setIsGuest] = useState<boolean>(true);

  useEffect(() => {
    connection.on('connect', () => {
      setUsername(connection.me!.username!);
      setIsGuest(connection.me!.isGuest === true);
    });
  }, []);

  return (
    <>
      <div className="nav-user-card">
        <div
          className="profile-button"
          onClick={() => PopupMediator.open(PopupMyAccount)}
        >
          {username && (
            <img
              src={`https://avatars.dicebear.com/api/identicon/${username}.svg`}
              alt=""
            />
          )}
          <h2>{username}</h2>
        </div>
        {isGuest && (
          <button
            className="user-card-button"
            onClick={() => PopupMediator.open(PopupLogin)}
          >
            <span>Login</span>
          </button>
        )}

        {isGuest && (
          <button
            className="user-card-button featured"
            onClick={() => PopupMediator.open(PopupRegister)}
          >
            <span>Sign Up</span>
          </button>
        )}

        {!isGuest && (
          <button
            className="user-card-button"
            onClick={() =>
              PopupMediator.open(PopupPrompt, {
                title: 'Log out',
                message: 'Are you sure you want to log out?',
                confirm: 'Yes, log me out',
                cancel: 'No',
                onConfirm: () => {
                  connection.logout();
                },
                onCancel: () => {}
              })
            }
          >
            <span>Logout</span>
          </button>
        )}
      </div>
    </>
  );
}
