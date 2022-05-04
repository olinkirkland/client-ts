import React from 'react';
import Modal from 'react-modal';
import { PopupProps } from 'react-popup-manager';
import Connection, { systemUser } from '../../connection/Connection';
import PopupMediator from '../../controllers/PopupMediator';
import { rootElement } from '../../index';
import { experienceNeededFromLevel } from '../../Util';
import ProgressBar from '../platform/ProgressBar';
import { PopupBook } from './PopupBook';
import { cookie } from './PopupPresets';

interface PopupMyAccountProps extends PopupProps {}

export class PopupMyAccount extends React.Component<PopupMyAccountProps> {
  render() {
    const { isOpen, onClose } = this.props;
    const me = Connection.instance.me!;

    if (!me) return <></>;
    return (
      <Modal isOpen={isOpen!} appElement={rootElement!} className="modal">
        <div className="popup">
          <div className="popup-header">
            <span>My Profile</span>
            <button className="button-close" onClick={onClose}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="popup-content">
            {me.isGuest && (
              <>
                <div className="alert warn">
                  <img src={systemUser.currentAvatar} alt="" />
                  <span>
                    You are currently signed into a guest account.
                    <br />
                    Sign up for a free account to save your progress and earn
                    rewards.
                  </span>
                </div>
              </>
            )}
            <ul className="profile-data">
              <li>
                <span>Name</span>
                <div className="user-with-badge">
                  {me.isGuest && <span className="badge guest">Guest</span>}
                  <span>{me.username}</span>
                </div>
              </li>
              {!me.isGuest && (
                <>
                  <li>
                    <span>Email</span>
                    <span>{me.email}</span>
                  </li>
                  <li>
                    <span>Password</span>
                    <span>********</span>
                  </li>
                </>
              )}
              <li>
                <span>{`Level ${me.level}`}</span>
                <ProgressBar
                  percent={Math.min(
                    me.experience! / experienceNeededFromLevel(me.level!)
                  )}
                />
                <span className="muted">{`${
                  me.experience
                }/${experienceNeededFromLevel(me.level!)} XP`}</span>
              </li>
              <li>
                <span>{`User ID`}</span>
                <span>{me.id}</span>
                <div>
                  <button
                    className="link"
                    onClick={() => {
                      navigator.clipboard.writeText(me.id!);
                    }}
                  >
                    <i className="fas fa-copy" />
                    Copy User ID
                  </button>
                </div>
              </li>
              <li>
                <span>Avatar</span>
                <img className="avatar" src={me.avatar} alt="" />
              </li>
            </ul>
          </div>
          <div className="popup-taskbar">
            <div className="h-group">
              <button
                onClick={() => {
                  PopupMediator.open(PopupBook, cookie);
                }}
                className="link"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
