import React from 'react';
import Modal from 'react-modal';
import { PopupProps } from 'react-popup-manager';
import { GameOptions } from '../../controllers/Game';
import { rootElement } from '../../index';

type State = {
  gameName: string;
  gameDescription: string;
  gamePassword: string;
};

interface PopupHostGameProps extends PopupProps {
  onConfirm: (gameOptions: GameOptions) => void;
}

export class PopupHostGame extends React.Component<PopupHostGameProps> {
  public readonly state: State = {
    gameName: '',
    gameDescription: '',
    gamePassword: ''
  };

  render() {
    const { isOpen, onConfirm, onClose } = this.props;
    return (
      <Modal isOpen={isOpen!} appElement={rootElement!} className="modal">
        <div className="popup">
          <div className="popup-header">
            <span>Host a Game</span>
            <button className="button-close" onClick={onClose}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="popup-content">
            <div className="input-group">
              <p>Game Name</p>
              <input
                type="text"
                placeholder="My awesome game!"
                onChange={(event) => {
                  this.setState((state, props) => ({
                    gameName: event.target.value
                  }));
                }}
              />
            </div>
            <div className="input-group">
              <p>Game Description</p>
              <input
                type="text"
                placeholder="Did you know that this game is awesome?"
                onChange={(event) => {
                  this.setState((state, props) => ({
                    gameDescription: event.target.value
                  }));
                }}
              />
            </div>
            <div className="input-group">
              <p>Game Password</p>
              <input
                type="text"
                placeholder="Top secret password"
                onChange={(event) => {
                  this.setState((state, props) => ({
                    gamePassword: event.target.value
                  }));
                }}
              />
            </div>
          </div>
          <div className="popup-taskbar">
            <button
              onClick={() => {
                onClose!();
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm!({
                  name: this.state.gameName,
                  description: this.state.gameDescription,
                  password: this.state.gamePassword
                });
                onClose!();
              }}
            >
              Host Game
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
