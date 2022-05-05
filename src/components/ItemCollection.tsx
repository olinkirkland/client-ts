import Connection from '../connection/Connection';
import Item from '../models/Item';

type Props = {
  title: string;
  items: Item[];
};

export default function AvatarItemCollection({ title, items }: Props) {
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
        {items.map((item) => (
          <li key={item.id}>
            <img src={`assets/${item.value.url}`} alt="" />
            {/* <p>{item.name}</p> */}
          </li>
        ))}
        {items.map((item) => (
          <li key={item.id}>
            <img src={`assets/${item.value.url}`} alt="" />
            {/* <p>{item.name}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
