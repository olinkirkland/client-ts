import Modal from 'react-modal';
import React from 'react';
import { PopupProps } from 'react-popup-manager';
import { rootElement } from '../../index';
import Connection from '../../connection/Connection';

interface PopupMyAccountProps extends PopupProps {}

export class PopupMyAccount extends React.Component<PopupMyAccountProps> {
  render() {
    const { isOpen, onClose } = this.props;
    const me = Connection.instance.me!;

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
                  😢 This is a guest account. You are not registered.
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
                <span>{me.experience}</span>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
    );
  }
}
