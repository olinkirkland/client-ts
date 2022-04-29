import { useEffect, useState } from 'react';
import Connection from '../../connection/Connection';
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
    connection.on('connect', () => {
      setGold(connection.me!.gold!);
      setLevel(connection.me!.level!);
      setExperience(connection.me!.experience!);
      setExperienceToNextLevel(
        experienceNeededForNextLevel(connection.me!.level!)
      );
    });
  }, []);

  return (
    <div className="taskbar">
      <button className="taskbar-tile">
        <span>{`Level ${level}`}</span>
        <ProgressBar
          percent={Math.min(experience / experienceToNextLevel, 1)}
        />
      </button>
      <button className="taskbar-tile">
        <img className="" src="assets/icons/coin.png" alt="" />
        <span>{numberComma(gold)}</span>
      </button>
    </div>
  );
}
