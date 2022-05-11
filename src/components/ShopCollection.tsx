import { useEffect, useState } from 'react';
import Connection, { ConnectionEventType } from '../connection/Connection';
import { numberComma } from '../Util';
import { ShopItem } from './popups/PopupShop';

type Props = {
  name: string;
  description?: string;
  items: ShopItem[];
};

export function ShopCollection({ name, description = '', items }: Props) {
  const [inventory, setInventory] = useState(Connection.instance.me!.inventory);
  const [gold, setGold] = useState(Connection.instance.me!.gold);

  useEffect(() => {
    Connection.instance.addListener(
      ConnectionEventType.USER_DATA_CHANGED,
      onUserDataChanged
    );

    return () => {
      Connection.instance.removeListener(
        ConnectionEventType.USER_DATA_CHANGED,
        onUserDataChanged
      );
    };
  });

  function onUserDataChanged() {
    console.log('ShopCollection: onUserDataChanged');
    setInventory(Connection.instance.me!.inventory);
    setGold(Connection.instance.me!.gold);
  }

  return (
    <div className="shop-collection">
      <h2>{name}</h2>
      {description.length > 0 && <p>{description}</p>}
      <ul>
        {items.map((item, index) => (
          <li className="shop-card" key={index}>
            <div className="shop-card-body">
              <p className="item-name">{item.name}</p>
              <img src={`assets/${item.value.url}`} alt="[Not found]" />
              <p className="item-description">{item.description}</p>
            </div>
            <div className="shop-card-footer">
              {inventory!.indexOf(item.id) === -1 && (
                <>
                  <div className="price-box">
                    {item.price - item.price * (item.discount / 100) === 0 && (
                      <p>FREE!</p>
                    )}
                    {item.price - item.price * (item.discount / 100) > 0 && (
                      <>
                        <img src="assets/icons/coin.png" alt="" />
                        <p>
                          {numberComma(
                            item.price - item.price * (item.discount / 100)
                          )}
                        </p>
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
              {inventory!.indexOf(item.id)! >= 0 && <p>Owned</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
