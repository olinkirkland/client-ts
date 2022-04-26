import Modal from "react-modal";
import React from "react";
import { PopupProps } from "react-popup-manager";
import { rootElement } from "../../index";

interface PromptDialogProps extends PopupProps {
  message: string;
  ok: string;
  cancel: string;
}

export class PromptDialog extends React.Component<PromptDialogProps> {
  render() {
    const { isOpen, onClose, message, ok, cancel } = this.props;
    return (
      <Modal
        isOpen={isOpen!}
        appElement={rootElement!}
        className="promptDialog modal"
      >
        <div className="message">{message}</div>
        <div className="buttons">
          <button onClick={() => onClose!()}>{cancel}</button>
          <button onClick={() => onClose!(true)}>{ok}</button>
        </div>
      </Modal>
    );
  }
}
