import axios from 'axios';
import React from 'react';
import Modal from 'react-modal';
import { PopupProps } from 'react-popup-manager';
import Connection, { MyUserData, url } from '../../connection/Connection';
import Terminal from '../../controllers/Terminal';
import { rootElement } from '../../index';
import Item, { getItemById } from '../../models/Item';
import { numberComma } from '../../Util';
import { ShopCollection } from '../ShopCollection';

interface PopupShopProps extends PopupProps {}

export interface Discount {
  id: string; // Item ID
  percent: number; // % off of price
}

export interface Sale {
  name: string; // Sale name
  description: string; // Sale description
  featured: boolean; // Show the sale in its own collection
  discounts: Discount[]; // Discounts
}

export interface Price {
  id: string; // Item ID
  price: number; // Price
}

export interface ShopData {
  sales: Sale[]; // Sales
  prices: Price[]; // Price list
}

export interface ShopItem extends Item {
  discount: number;
  price: number;
}

type State = {
  shopItems: ShopItem[];
  featuredSales: Sale[];
  user: MyUserData | null;
};

export class PopupShop extends React.Component<PopupShopProps> {
  public readonly state: State = {
    user: Connection.instance.me!,
    shopItems: [],
    featuredSales: []
  };

  private onUserDataChanged() {
    const connection = Connection.instance;
    this.setState({
      user: connection.me
    });
  }

  private buyItem() {
    // TODO: buy item via route
  }

  public componentDidMount() {
    // Get shop data

    axios
      .get(`${url}shop/`)
      .then((res) => {
        // Set shop data
        this.setShopData(res.data);
      })
      .catch((err) => {
        Terminal.log('⚠️', err);
      });
  }

  private setShopData(data: ShopData) {
    const shopItems = data.prices.map((price: Price) => {
      const item: ShopItem = {
        ...getItemById(price?.id)!,
        price: price?.price,
        discount: 0
      };
      // Determine the price
      if (data.sales.length > 0) {
        data.sales.forEach((sale: Sale) => {
          sale.discounts.forEach((discount: Discount) => {
            if (discount.id === item.id) {
              item.discount = discount.percent;
            }
          });
        });
      }

      return item;
    });

    const saleItems = shopItems.filter((item: ShopItem) => {
      return item.discount > 0;
    });

    this.setState({
      shopItems,
      saleItems
    });
  }

  public componentWillUnmount() {
    // const connection = Connection.instance;
    // connection.removeListener(
    //   ConnectionEventType.USER_DATA_CHANGED,
    //   this.onUserDataChanged
    // );
  }

  render() {
    const { isOpen, onClose } = this.props;
    const me = Connection.instance.me!;
    if (!me) return <></>;

    if (!this.state.user) return <></>;
    return (
      <Modal isOpen={isOpen!} appElement={rootElement!} className="modal">
        <div className="popup popup-shop">
          <div className="popup-header">
            <span>Shop</span>
            <div className="gold-box h-group">
              <img src="assets/icons/coin.png" alt="" />
              <span className="gold-text">{numberComma(me.gold!)}</span>
            </div>
            <button className="button-close" onClick={onClose}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="popup-content">
            {this.state.shopItems.length > 0 && (
              <ShopCollection name="Shop" items={this.state.shopItems} />
            )}
          </div>
        </div>
      </Modal>
    );
  }
}
