import EventEmitter from 'events';
import { Socket } from 'socket.io-client';
import Connection, { MyUserData } from './Connection';

export type GameOptions = {
  name: string;
  description: string;
  password: string;
};

export enum GameEventType {
  INVALIDATE = 'invalidate-game', // BE -> FE Invalidate game data (tells front-end to refresh)
  SETUP = 'game-round-setup', // BE -> FE Send information for the current game round, e.g. Questions
  RESULT = 'game-round-result', // BE -> FE Send Results from the Round to FE. Also start next round or goto END
  END = 'game-ended' // BE -> FE Send information about the round, e.g. Ranking for the ended Round
}

export default class Game extends EventEmitter {
  // Callbacks
  setIsConnected!: Function;
  socket: Socket;
  me: MyUserData;

  public constructor(socket: Socket) {
    super();

    this.socket = socket;
    this.addSocketListeners();
    this.me = Connection.instance.me!;
  }

  private addSocketListeners() {
    this.socket.on(GameEventType.INVALIDATE, () => {});
  }
}
