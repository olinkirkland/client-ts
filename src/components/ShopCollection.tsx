import Connection from '../connection/Connection';
import { ShopItem } from './popups/PopupShop';

type Props = {
  name: string;
  description?: string;
  items: ShopItem[];
};

export function ShopCollection({ name, description = '', items }: Props) {
  return (
    <div className="shop-collection">
      <h2>{name}</h2>
      {description.length > 0 && <p>{description}</p>}
      <ul>
        {items.map((item, index) => (
          <li className="shop-card" key={index}>
            <div className="shop-card-body">
              <p>{item.name}</p>
              <p>{item.description}</p>
              <img src={`assets/${item.value.url}`} alt="[Not found]" />
            </div>
            <div className="shop-card-footer">
              {Connection.instance.me?.inventory!.indexOf(item.id) === -1 && (
                <>
                  <div className="price-box">
                    {item.price - item.price * (item.discount / 100) === 0 && (
                      <p>FREE!</p>
                    )}
                    {item.price - item.price * (item.discount / 100) > 0 && (
                      <>
                        <img src="assets/icons/coin.png" alt="" />
                        <p>{item.price - item.price * (item.discount / 100)}</p>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => Connection.instance.buyItem(item.id)}
                  >{`${
                    item.price - item.price * (item.discount / 100) > 0
                      ? 'Buy now'
                      : 'Redeem'
                  }`}</button>
                </>
              )}
              {Connection.instance.me?.inventory!.indexOf(item.id)! >= 0 && (
                <p>Owned</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
