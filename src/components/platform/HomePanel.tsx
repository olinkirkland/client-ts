import { useEffect } from 'react';
import Terminal from '../../controllers/Terminal';

type Props = {
  onClick: Function;
  titleText: string;
  buttonText: string;
  image: string;
  big?: boolean;
};

export default function HomePanel({
  onClick,
  titleText,
  buttonText,
  image,
  big = false
}: Props) {
  useEffect(() => {
    Terminal.log(`✔️ Home Panel "${titleText}"`);
  }, []);

  return (
    <div className={big ? 'home-panel big' : 'home-panel'}>
      <img src={image} alt="" />
      <div className="home-panel-content">
        <p className="title">{titleText}</p>
        <button onClick={() => onClick()}>{buttonText}</button>
      </div>
    </div>
  );
}
