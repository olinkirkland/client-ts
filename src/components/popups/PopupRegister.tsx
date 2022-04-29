import Modal from 'react-modal';
import React from 'react';
import { PopupProps } from 'react-popup-manager';
import { rootElement } from '../../index';
import Connection from '../../connection/Connection';

type State = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface PopupRegisterProps extends PopupProps {}

export class PopupRegister extends React.Component<PopupRegisterProps> {
  public readonly state: State = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  render() {
    const { isOpen, onClose } = this.props;
    const me = Connection.instance.me;
    return (
      <Modal isOpen={isOpen!} appElement={rootElement!} className="modal">
        <div className="popup">
          <div className="popup-header">
            <span>Create Account</span>
            <button className="button-close" onClick={onClose}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="popup-content">
            <p>
              Enter a valid Email and password. You can change your username
              once your account is created.
            </p>

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
            <div className="input-group">
              <p>Confirm password</p>
              <input
                type="password"
                placeholder="********"
                onChange={(event) => {
                  this.setState((state, props) => ({
                    confirmPassword: event.target.value
                  }));
                }}
              />
            </div>

            <p className="alert warn">{`✨ Your new account will be created at level ${me?.level} with ${me?.experience} experience from your current session's progress.`}</p>
          </div>
          <div className="popup-taskbar">
            <button
              onClick={() => {
                Connection.instance.register(
                  this.state.email,
                  this.state.password
                );
                onClose!();
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
