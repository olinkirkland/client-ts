import Connection from '../connection/Connection';
import Item from '../models/Item';

type Props = {
  title: string;
  items: Item[];
};

export function AvatarItemCollection({ title, items }: Props) {
  return (
    <div className="item-collection">
      <h2>{`${title} (${items.length})`}</h2>
      <ul>
        {items.map((item) => (
          <li
            onClick={() => {
              Connection.instance.changeAvatar(item.id);
            }}
            key={item.id}
            className={
              Connection.instance.me?.currentAvatar === item.id
                ? 'selected'
                : ''
            }
          >
            <img src={`assets/${item.value.url}`} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}


export function WallpaperItemCollection({ title, items }: Props) {
  return (
    <div className="item-collection">
      <h2>{`${title} (${items.length})`}</h2>
      <ul>
        {items.map((item) => (
          <li
            onClick={() => {
              Connection.instance.changeWallpaper(item.id);
            }}
            key={item.id}
            className={
              Connection.instance.me?.currentWallpaper === item.id
                ? 'selected'
                : ''
            }
          >
            <img src={`assets/${item.value.url}`} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}