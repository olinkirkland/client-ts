import { useState } from 'react';
import { numberComma } from '../../Util';
import ProgressBar from './ProgressBar';
export default function Taskbar() {
  const [gold, setGold] = useState(2523);
  const [level, setLevel] = useState(2);
  const [experience, setExperience] = useState(45);
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(100);

  return (
    <div className="taskbar">
      <button className="taskbar-tile">
        <img className="" src="assets/icons/coin.png" alt="" />
        <span>{numberComma(gold)}</span>
      </button>
      <button className="taskbar-tile">
        <span>{level}</span>
        <ProgressBar percent={experience / experienceToNextLevel} />
      </button>
    </div>
  );
}
