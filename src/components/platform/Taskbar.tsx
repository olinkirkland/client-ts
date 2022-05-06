import { useEffect, useState } from 'react';
import Connection, { ConnectionEventType } from '../../connection/Connection';
import PopoverMediator, {
  PopoverType
} from '../../controllers/PopoverMediator';
import {
  experienceNeededFromLevel as experienceNeededForNextLevel,
  numberComma
} from '../../Util';
import ProgressBar from './ProgressBar';
export default function Taskbar() {
  const connection = Connection.instance;
  const [gold, setGold] = useState(0);
  const [level, setLevel] = useState(0);
  const [experience, setExperience] = useState(0);
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(0);

  useEffect(() => {
    connection.on(ConnectionEventType.USER_DATA_CHANGED, () => {
      update();
    });
  }, []);

  function update() {
    setGold(connection.me!.gold!);
    setLevel(connection.me!.level!);
    setExperience(connection.me!.experience!);
    setExperienceToNextLevel(
      experienceNeededForNextLevel(connection.me!.level!)
    );
  }

  return (
    <div className="taskbar">
      <button
        className="bar-tile"
        onClick={(event) => {
          PopoverMediator.toggle(PopoverType.LEVEL);
        }}
      >
        <span>{`Level ${level}`}</span>
        <ProgressBar
          percent={Math.min(experience / experienceToNextLevel, 1)}
        />
      </button>
      <button
        className="bar-tile"
        onClick={(event) => {
          PopoverMediator.toggle(PopoverType.GOLD);
        }}
      >
        <img className="" src="assets/icons/coin.png" alt="" />
        <span>{numberComma(gold)}</span>
      </button>
      <button
        className="bar-tile"
        onClick={(event) => {
          PopoverMediator.toggle(PopoverType.CHAT);
        }}
      >
        <i className="fas fa-comment-alt" />
        <span>Chat Room</span>
      </button>

      <button
        className="bar-tile friends"
        onClick={(event) => {
          console.log(event.currentTarget as HTMLButtonElement);
          PopoverMediator.toggle(PopoverType.FRIENDS);
        }}
      >
        <i className="fas fa-user-friends" />
        <span>{`${connection.me?.friends?.length || 0} Friends`}</span>
      </button>
    </div>
  );
}
