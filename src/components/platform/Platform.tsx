import { useEffect, useState } from 'react';
import PopoverMediator, {
  PopoverMediatorEventType,
  PopoverType
} from '../../controllers/PopoverMediator';
import PopoverChat from '../popovers/PopoverChat';
import PopoverFriends from '../popovers/PopoverFriends';
import PopoverGold from '../popovers/PopoverGold';
import PopoverLevel from '../popovers/PopoverLevel';
import Home from './Home';
import Navbar from './Navbar';
import Taskbar from './Taskbar';
export default function Platform() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isGoldOpen, setIsGoldOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);

  useEffect(() => {
    addPopoverMediatorListeners();
  }, []);

  function addPopoverMediatorListeners() {
    PopoverMediator.instance.on(
      PopoverMediatorEventType.OPEN,
      (type: PopoverType) => openOrClosePopover(type, true)
    );

    PopoverMediator.instance.on(
      PopoverMediatorEventType.CLOSE,
      (type: PopoverType) => openOrClosePopover(type, false)
    );

    PopoverMediator.instance.on(
      PopoverMediatorEventType.TOGGLE,
      (type: PopoverType) => togglePopover(type)
    );
  }

  function openOrClosePopover(type: PopoverType, value: boolean) {
    if (type === PopoverType.FRIENDS) {
      setIsFriendsOpen(value);
      return;
    }

    // Only one left-aligned popover at a time
    if (type === PopoverType.CHAT) setIsChatOpen(value);
    else setIsChatOpen(false);
    if (type === PopoverType.GOLD) setIsGoldOpen(value);
    else setIsGoldOpen(false);
    if (type === PopoverType.LEVEL) setIsLevelOpen(value);
    else setIsLevelOpen(false);
  }

  function togglePopover(type: PopoverType) {
    if (type === PopoverType.FRIENDS) {
      setIsFriendsOpen((value) => !value);
      return;
    }

    if (type === PopoverType.CHAT) setIsChatOpen((value) => !value);
    else setIsChatOpen(false);
    if (type === PopoverType.GOLD) setIsGoldOpen((value) => !value);
    else setIsGoldOpen(false);
    if (type === PopoverType.LEVEL) setIsLevelOpen((value) => !value);
    else setIsLevelOpen(false);
  }

  return (
    <div className="main">
      <Navbar />
      <div className="home-popover-container">
        <Home />
        <div className="popover-container">
          {isChatOpen && <PopoverChat />}
          {isGoldOpen && <PopoverGold />}
          {isLevelOpen && <PopoverLevel />}
          {isFriendsOpen && <PopoverFriends />}
        </div>
      </div>
      <Taskbar />
    </div>
  );
}
