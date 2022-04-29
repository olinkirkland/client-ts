import Modal from 'react-modal';
import React from 'react';
import { PopupProps } from 'react-popup-manager';
import { rootElement } from '../../index';
import Connection from '../../connection/Connection';
import { experienceNeededFromLevel } from '../../Util';

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
                <p className="alert warn">
                  😢 This is a guest account. Register an account to earn
                  experience points and unlock rewards.
                </p>
              </>
            )}
            <ul className="profile-data">
              <li>
                <span>Name</span>
                <span>{me.username}</span>
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
                <span>Level</span>
                <span>{me.level}</span>
              </li>
              <li>
                <span>Experience</span>
                <span>{`${me.experience}/${experienceNeededFromLevel(
                  me.level!
                )}`}</span>
              </li>
              <li>
                <span>Avatar</span>
                <span>{me.avatar}</span>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    );
  }
}
