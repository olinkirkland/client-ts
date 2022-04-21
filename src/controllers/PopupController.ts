import EventEmitter from 'events';

export default class PopupController extends EventEmitter {
  private static _instance: PopupController;

  private constructor() {
    // Private constructor to enforce singleton
    super();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }
}
