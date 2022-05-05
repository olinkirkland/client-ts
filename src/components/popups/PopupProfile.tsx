import React from 'react';
import Modal from 'react-modal';
import { PopupProps } from 'react-popup-manager';
import Connection, {
  ConnectionEventType,
  url
} from '../../connection/Connection';
import User, { systemUser } from '../../models/User';
import PopupMediator from '../../controllers/PopupMediator';
import { rootElement } from '../../index';
import { experienceNeededFromLevel } from '../../Util';
import ProgressBar from '../platform/ProgressBar';
import { PopupBook } from './PopupBook';
import { cookie, impressum } from './PopupPresets';
import axios from 'axios';
import Terminal from '../../controllers/Terminal';
import AvatarItemCollection from '../ItemCollection';
import { getItemById } from '../../models/Item';

interface PopupProfileProps extends PopupProps {
  id?: string;
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

    const connection = Connection.instance;
    connection.on(ConnectionEventType.USER_DATA_CHANGED, () => {
      if (this.userId === connection.me?.id) {
        this.setState({
          user: connection.me
        });
      }
    });

    this.userId = props.id;
  }

  public componentDidMount() {
    if (!this.userId) this.userId = Connection.instance.me?.id;

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
    const me = Connection.instance.me!;
    const isMe = this.userId === me.id;

    if (!this.state.user) return <></>;
    return (
      <Modal isOpen={isOpen!} appElement={rootElement!} className="modal">
        <div className="popup">
          <div className="popup-header">
            <span>
              {isMe ? 'My Profile' : `${this.state.user.username}'s Profile`}
            </span>
            <button className="button-close" onClick={onClose}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="popup-content">
            <div className="profile-data v-group center">
              {isMe && me.isGuest && (
                <>
                  <div className="alert warn">
                    <img src={'assets/avatars/system.png'} alt="" />
                    <span>
                      You are currently signed into a guest account.
                      <br />
                      Sign up for a free account to save your progress and earn
                      rewards.
                    </span>
                  </div>
                </>
              )}

              <div className="h-group center">
                <img
                  className="avatar"
                  src={
                    'assets/' +
                    getItemById(this.state.user.currentAvatar!)?.value.url
                  }
                  alt=""
                />
              </div>
              <div className="user-with-badge">
                {me.isGuest && <span className="badge guest">Guest</span>}
                <span>{me.username}</span>
              </div>
              <span className="emphasized text-center h-group">
                <i className="fas fa-quote-left muted" />
                <span>Lorem ipsum dolor sit amet.</span>
                <i className="fas fa-quote-right muted" />
              </span>

              <div className="level-group v-group center">
                <span>{`Level ${me.level}`}</span>
                {isMe && (
                  <ProgressBar
                    percent={Math.min(
                      me.experience! / experienceNeededFromLevel(me.level!)
                    )}
                  />
                )}
              </div>

              {isMe && !me.isGuest && (
                <div className="panel v-group">
                  <div className="profile-editable-item">
                    <span className="muted">Email</span>
                    <span>{me.email}</span>
                    <button className="link">
                      <i className="fas fa-pen" />
                    </button>
                  </div>
                  <div className="profile-editable-item">
                    <span className="muted">Password</span>
                    <span>********</span>
                    <button className="link">
                      <i className="fas fa-pen" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {isMe && (
              <AvatarItemCollection title="Avatars" items={me.getItems()} />
            )}
          </div>

          {isMe && (
            <div className="popup-taskbar">
              <div className="v-group center">
                <div className="h-group center">
                  <button
                    onClick={() => {
                      PopupMediator.open(PopupBook, cookie);
                    }}
                    className="link"
                  >
                    Cookie Policy
                  </button>
                  <button
                    onClick={() => {
                      PopupMediator.open(PopupBook, impressum);
                    }}
                    className="link"
                  >
                    Impressum
                  </button>
                </div>
                <div className="h-group">
                  <button
                    className="link"
                    onClick={() => {
                      navigator.clipboard.writeText(me.id!);
                    }}
                  >
                    {`Id: ${me.id}`}
                  </button>
                </div>
              </div>
            </div>
          )}
          {!isMe && (
            <div className="popup-taskbar">
              {!this.state.user?.isGuest && (
                <button>
                  <i className="fas fa-user-plus" />
                  <span>Add friend</span>
                </button>
              )}
              <button>
                <i className="fas fa-flag" />
                <span>Report</span>
              </button>
            </div>
          )}
        </div>
      </Modal>
    );
  }
}
