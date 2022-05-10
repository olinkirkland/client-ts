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
  INVALIDATE = 'invalidate-game', // BE -> FE Invalidate game data (tells front-end to refresh)
  SETUP = 'game-round-setup', // BE -> FE Send information for the current game round, e.g. Questions
  RESULT = 'game-round-result', // BE -> FE Send Results from the Round to FE. Also start next round or goto END
  END = 'game-ended' // BE -> FE Send information about the round, e.g. Ranking for the ended Round
}

export enum GameMode {
  LOBBY = 'mode-lobby',
  GAME = 'mode-game'
}

export default class Game extends EventEmitter {
  // Callbacks
  setIsConnected!: Function;
  socket: Socket;
  me: MyUserData;
  id: string;

  mode?: GameMode = GameMode.LOBBY;

  public constructor(socket: Socket) {
    super();

    this.socket = socket;
    this.addSocketListeners();
    this.me = Connection.instance.me!;
    this.id = this.me.gameID!;
  }

  private addSocketListeners() {
    this.socket.on(GameEventType.INVALIDATE, () => {
      this.invalidateGameData();
    });
  }

  private invalidateGameData() {
    // User data invalidated, update it
    Terminal.log('🔥 Game data invalidated, validating ...');
    Terminal.log(url + `game/${this.id}`);

    axios
      .get(url + `game/${this.id}`, { withCredentials: true })
      .then((res) => {
        const data = res.data;
        Terminal.log(JSON.stringify(data, null, 2));

        this.mode = data.mode;

        Terminal.log('✔️', 'Validated game data');
      })
      .catch((err) => {
        Terminal.log('❌', 'Failed to validate game data');
        Terminal.log(err);
      });
  }
}
