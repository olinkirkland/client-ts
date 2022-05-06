import axios from 'axios';
import EventEmitter from 'events';
import { Socket } from 'socket.io-client';
import Terminal from '../controllers/Terminal';
import Connection, { MyUserData, url } from './Connection';

export type GameOptions = {
  name: string;
  description: string;
  password: string;
};

export enum GameEventType {
  JOIN = 'game-join', // FE -> BE User joined game
  JOINED = 'game-joined', // BE -> FE User joined game
  LEAVE = 'game-leave', // FE -> BE User left game
  LEFT = 'game-left', // BE -> FE User left game
  START = 'game-start', // FE -> BE Host starts the Game
  SETUP = 'game-round-setup', // BE -> FE Send information for the current game round, e.g. Questions
  ANSWER = 'game-answer', // FE -> BE User chooses an Answer
  RESULT = 'game-round-result', // BE -> FE Send Results from the Round to FE. Also start next round or goto END
  END = 'game-ended' // BE -> FE Send information about the round, e.g. Ranking for the ended Round
}

export default class Game extends EventEmitter {
  // Callbacks
  setIsConnected!: Function;
  socket: Socket;
  me: MyUserData;

  public constructor(socket: Socket) {
    // Private constructor to enforce singleton
    super();

    this.me = Connection.instance.me!;
    this.socket = socket;
    this.addSocketListeners();
  }

  private addSocketListeners() {
    this.socket?.on(GameEventType.JOINED, (data) => {
      Terminal.log('✔️', 'Joined game', data.gameID);
    });

    this.socket?.on(GameEventType.LEFT, (data) => {
      Terminal.log('✔️', 'User', data.userID, 'left the game!');
      if (data.userID === this.me.id) {
        Terminal.log('🔥', 'You left the game!');
      }
    });
  }

  public hostGame(gameOptions: GameOptions) {
    Terminal.log('🕹️', 'Hosting game', '...');
    const args = {
      hostID: Connection.instance.me?.id,
      ...gameOptions
    };

    axios
      .post(`${url}game/host`, args, { withCredentials: true })
      .then((res) => {
        Terminal.log('✔️', 'Game hosted with gameId', res.data.roomID);
        Terminal.log(res.data);
        this.joinGame(res.data.roomID);
      })
      .catch((err) => Terminal.log('⚠️', err));
  }

  public leaveGame() {
    Terminal.log('🕹️', 'Leaving game...');
    this.socket?.emit(GameEventType.LEAVE);
  }

  public joinGame(gameId: string) {
    Terminal.log('🕹️', 'Joining game', gameId, '...');
    this.socket?.emit(GameEventType.JOIN, gameId);
  }
}
