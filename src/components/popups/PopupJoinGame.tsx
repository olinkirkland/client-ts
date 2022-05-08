import Modal from 'react-modal';
import React from 'react';
import { PopupProps } from 'react-popup-manager';
import { rootElement } from '../../index';
import axios from 'axios';
import Connection, { url } from '../../connection/Connection';

type State = {
  games: any[] | null;
  selectedGame: any | null;
};

interface PopupJoinGameProps extends PopupProps {}

export class PopupJoinGame extends React.Component<PopupJoinGameProps> {
  public readonly state: State = {
    games: null,
    selectedGame: null
  };

  constructor(props: PopupJoinGameProps) {
    super(props);
    this.refreshList();
  }

  private refreshList() {
    axios.get(url + 'game/list').then((res) => {
      const data = res.data;
      this.setState({ games: data });
    });
  }

  render() {
    const { isOpen, onClose } = this.props;
    return (
      <Modal isOpen={isOpen!} appElement={rootElement!} className="modal">
        <div className="popup">
          <div className="popup-header">
            <span>Join a Game</span>
            <div className="h-group">
              <button
                className="button-close"
                onClick={() => this.refreshList()}
              >
                <i className="fas fa-sync"></i>
              </button>
              <button className="button-close" onClick={onClose}>
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
          <div className="popup-content">
            <ul>
              {this.state.games?.map((game, index) => (
                <li key={index}>
                  <pre>{JSON.stringify(game, null, 2)}</pre>
                </li>
              ))}
            </ul>
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
                Connection.instance.joinGame(this.state.selectedGame!.id);
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
