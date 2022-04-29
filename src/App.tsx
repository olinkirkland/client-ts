import { useEffect, useRef, useState } from 'react';
import { usePopupManager } from 'react-popup-manager';
import { OpenPopupOptions } from 'react-popup-manager/dist/src/__internal__/popupManagerInternal';
import Platform from './components/platform/Platform';
import { PopupLoading } from './components/popups/PopupLoading';
import TerminalComponent from './components/TerminalComponent';
import Connection from './connection/Connection';
import PopupMediator, {
  PopupMediatorEventType
} from './controllers/PopupMediator';
import Terminal, { TerminalEventType } from './controllers/Terminal';
import { garbageCollectModals } from './Util';

export default function App() {
  let initialized = useRef(false);
  const popupManager = usePopupManager();
  const [isConnected, setIsConnected] = useState(false);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    // Reload if already initialized
    if (initialized.current) document.location.reload();
    initialized.current = true;

    // Popup Mediator
    const popupMediator = PopupMediator.instance;
    popupMediator.on(PopupMediatorEventType.OPEN, openPopup);
    popupMediator.on(PopupMediatorEventType.CLOSE, closePopups);
    popupManager.open(PopupLoading);

    // Terminal
    Terminal.instance.on(TerminalEventType.SHOW, () => setOverlay(true));
    Terminal.instance.on(TerminalEventType.HIDE, () => setOverlay(false));

    // Start connection
    const connection = Connection.instance;
    connection.setIsConnected = setIsConnected;
  }, []);

  function openPopup<T>(props: {
    componentClass: React.ComponentType<T>;
    popupProps?: OpenPopupOptions<T>;
  }) {
    garbageCollectModals();
    setTimeout(() => {
      popupManager.open(props.componentClass, props.popupProps);
    }, 100);
  }

  function closePopups() {
    popupManager.closeAll();
  }

  return (
    <div className={isConnected ? 'app' : 'app hidden'}>
      <Platform />
      <div className={overlay ? 'overlay' : 'overlay hidden'}>
        <TerminalComponent />
      </div>
    </div>
  );
}
