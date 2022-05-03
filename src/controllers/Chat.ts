import EventEmitter from 'events';
import Connection from '../connection/Connection';

export enum ChatEventType {
  MESSAGE = 'chat-message'
}

export default class Chat extends EventEmitter {
  private static _instance: Chat;
  public messages: ChatMessage[];

  private constructor() {
    // Private constructor to enforce singleton
    super();

    this.messages = [];
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public static send(message: string): void {
    Connection.instance.chat('general-chat', message);
  }
}

export type ChatMessage = {
  date: Date;
  message: string;
  userId: string;
};
