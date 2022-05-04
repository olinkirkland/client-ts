import axios from 'axios';
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { PopupProps } from 'react-popup-manager';
import { systemUser, url } from '../../connection/Connection';
import Terminal from '../../controllers/Terminal';
import { rootElement } from '../../index';
import User from '../../models/User';
import { experienceNeededFromLevel } from '../../Util';
import ProgressBar from '../platform/ProgressBar';

interface PopupProfileProps extends PopupProps {
  id: string;
}

type State = {
  user: User | null;
};

export class PopupProfile extends React.Component<PopupProfileProps> {
  public readonly state: State = {
    user: null
  };

  private userId?: string;

  constructor(props: PopupProfileProps) {
    super(props);
    this.userId = props.id;
  }

  public componentDidMount() {
    axios
      .get(`${url}users/${this.userId}`, { withCredentials: true })
      .then((res) => {
        // Set state user
        this.setState({
          user: res.data
        });
      })
      .catch((err) => {
        Terminal.log('⚠️', err);
      });
  }

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <Modal isOpen={isOpen!} appElement={rootElement!} className="modal">
        <div className="popup">
          <div className="popup-header">
            <div className="h-group">
              {this.state.user?.isGuest && (
                <span className="badge guest">Guest</span>
              )}
              <span>{`${
                this.state.user ? this.state.user.username : ''
              }`}</span>
            </div>
            <button className="button-close" onClick={onClose}>
              <i className="fas fa-times" />
            </button>
          </div>

          {this.state.user && (
            <div className="popup-content">
              <div className="alert warn">
                <img src={systemUser.currentAvatar} alt="" />
                <span>
                  This is a guest account. Register an account to save your
                  experience points and unlock rewards.
                </span>
              </div>

              <ul className="profile-data">
                <li>
                  <span>Name</span>
                  <div className="user-with-badge">
                    {this.state.user.isGuest && (
                      <span className="badge guest">Guest</span>
                    )}
                    <span>{this.state.user.username}</span>
                  </div>
                </li>
                <li>
                  <span>{`Level ${this.state.user.level}`}</span>
                </li>
                <li>
                  <span>{`User ID`}</span>
                  <span>{this.state.user.id}</span>
                  <div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(this.state.user?.id!);
                      }}
                    >
                      <i className="fas fa-copy" />
                      Copy User ID
                    </button>
                  </div>
                </li>
                <li>
                  <span>Avatar</span>
                  <img
                    className="avatar"
                    src={this.state.user.currentAvatar}
                    alt=""
                  />
                </li>
              </ul>
            </div>
          )}

          <div className="popup-taskbar">
            <button>
              <i className="fas fa-user-plus" />
              <span>Add friend</span>
            </button>
            <button>
              <i className="fas fa-flag" />
              <span>Report</span>
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
