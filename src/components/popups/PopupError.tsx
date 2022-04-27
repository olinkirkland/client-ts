import Modal from 'react-modal';
import React from 'react';
import { PopupProps } from 'react-popup-manager';
import { rootElement } from '../../index';

interface PopupErrorProps extends PopupProps {
  title: string;
  message: string;
}

export class PopupError extends React.Component<PopupErrorProps> {
  render() {
    const { isOpen, title, message, onClose } = this.props;
    return (
      <Modal isOpen={isOpen!} appElement={rootElement!} className="modal">
        <div className="popup">
          <div className="popup-header popup-error">
            <span>❌ {title}</span>
          </div>
          <div className="popup-content">
            <p>{message}</p>
          </div>
          <div className="popup-taskbar">
            <button
              onClick={() => {
                onClose!();
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
