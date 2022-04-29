import React from 'react';
import Modal from 'react-modal';
import { PopupProps } from 'react-popup-manager';
import Connection from '../../connection/Connection';
import { rootElement } from '../../index';
import Checkbox from '../Checkbox';

type State = {
  email: string;
  password: string;
  staySignedIn: boolean;
};

interface PopupLoginProps extends PopupProps {}

export class PopupLogin extends React.Component<PopupLoginProps> {
  public readonly state: State = {
    email: '',
    password: '',
    staySignedIn: true
  };

  render() {
    const { isOpen, onClose } = this.props;

    return (
      <Modal isOpen={isOpen!} appElement={rootElement!} className="modal">
        <div className="popup">
          <div className="popup-header">
            <span>Login</span>
            <button className="button-close" onClick={onClose}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="popup-content">
            <div className="input-group">
              <p>Email</p>
              <input
                type="text"
                placeholder="john.doe@email.com"
                onChange={(event) => {
                  this.setState((state, props) => ({
                    email: event.target.value
                  }));
                }}
              />
            </div>
            <div className="input-group">
              <p>Password</p>
              <input
                type="password"
                placeholder="********"
                onChange={(event) => {
                  this.setState((state, props) => ({
                    password: event.target.value
                  }));
                }}
              />
            </div>
            <hgroup>
              <Checkbox
                text="Stay signed in"
                value={true}
                checked={(value: boolean) => {
                  this.setState((state, props) => ({
                    staySignedIn: value
                  }));
                }}
              />
            </hgroup>
          </div>
          <div className="popup-taskbar">
            <button>
              <span>Forgot password?</span>
            </button>
            <button
              onClick={() => {
                Connection.instance.login(
                  this.state.email,
                  this.state.password,
                  this.state.staySignedIn
                );
                onClose!();
              }}
            >
              <i className="fas fa-sign-in-alt" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
