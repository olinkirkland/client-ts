import { MouseEvent, useEffect, useRef, useState } from 'react';
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
  const imgEl = useRef<HTMLImageElement>(null);

  useEffect(() => {
    Terminal.log(`✔️ Home Panel "${titleText}"`);
  }, []);

  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (imgEl.current)
      imgEl.current.style.objectPosition = `${-offset.x / 6}px ${
        -offset.y / 6
      }px`;
  }, [offset]);

  function onMouseMove(event: MouseEvent) {
    const rect: DOMRect = (
      event.currentTarget as HTMLDivElement
    ).getBoundingClientRect();
    const f = {
      x: event.clientX - rect.x - rect.width / 2,
      y: event.clientY - rect.y - rect.height / 2
    };

    imgEl.current?.classList.remove('reset');
    setOffset(f);
  }

  function onMouseOut(event: MouseEvent) {
    imgEl.current?.classList.add('reset');
    setOffset({ x: 0, y: 0 });
  }

  return (
    <div
      className={big ? 'home-panel big' : 'home-panel'}
      onMouseMove={(event) => onMouseMove(event)}
      onMouseLeave={onMouseOut}
    >
      <img src={image} ref={imgEl} alt="" />
      <div className="home-panel-content">
        <p className="title">{titleText}</p>
        {/* <p className="title">{`${offset.x}, ${offset.y}`}</p> */}
        <button onClick={() => onClick()}>{buttonText}</button>
      </div>
    </div>
  );
}
