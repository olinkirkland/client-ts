import { PopupProps } from 'react-popup-manager';

interface PopupInfoProps extends PopupProps {}

export default function PopupInfo({ isOpen, onClose }: PopupInfoProps) {
  return (
    <div className="modal">
      <div className="popup">
        <p>Hello World!</p>
        <button onClick={() => {}}>Close</button>
      </div>
    </div>
  );
}
