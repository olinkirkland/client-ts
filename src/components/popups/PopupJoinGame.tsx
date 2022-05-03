import Modal from 'react-modal';
import React from 'react';
import { PopupProps } from 'react-popup-manager';
import { rootElement } from '../../index';

type State = {
  gameId: string | null;
};

interface PopupJoinGameProps extends PopupProps {
  onConfirm: (gameId: string) => void;
}

export class PopupJoinGame extends React.Component<PopupJoinGameProps> {
  public readonly state: State = {
    gameId: null
  };

  constructor(props: PopupJoinGameProps) {
    super(props);
    console.log('init');
  }

  render() {
    const { isOpen, onConfirm, onClose } = this.props;
    return (
      <Modal isOpen={isOpen!} appElement={rootElement!} className="modal">
        <div className="popup">
          <div className="popup-header">
            <span>Join a Game</span>
            <button className="button-close" onClick={onClose}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="popup-content"></div>
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
                onConfirm!(this.state.gameId!);
                onClose!();
              }}
            >
              Join Game
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
