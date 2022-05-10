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
  END = 'game-ended', // BE -> FE Send information about the round, e.g. Ranking for the ended Round
  GAME_DATA_CHANGED = 'game-data-changed' // FE-INTERNAL Game data changed
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
  name: any;
  hostId: any;
  roundIndex: any;
  players: any;
  maxPlayers: any;
  numberOfRounds: any;
  question?: { prompt: string; answer: string[] };

  public constructor(socket: Socket) {
    super();

    this.socket = socket;
    this.addSocketListeners();
    this.me = Connection.instance.me!;
    this.id = this.me.gameID!;
  }

  private addSocketListeners() {
    Terminal.log('Adding socket listeners');
    this.socket!.on(
      GameEventType.INVALIDATE,
      this.invalidateGameData.bind(this)
    );
  }

  public dispose() {
    Terminal.log('🗑️ Disposing game ...');
    this.removeSocketListeners();
  }

  private removeSocketListeners() {
    Terminal.log('Removing socket listeners');
    this.socket.off(GameEventType.INVALIDATE);
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

        this.mode = data.gameMode;
        this.name = data.name;
        this.hostId = data.host.id;
        this.players = data.players;
        this.maxPlayers = data.maxPlayers;
        this.roundIndex = data.roundIndex;
        this.numberOfRounds = data.numberOfRounds;
        this.question = data.question;

        Terminal.log('✔️', 'Validated game data');

        this.emit(GameEventType.GAME_DATA_CHANGED);
      })
      .catch((err) => {
        Terminal.log('❌', 'Failed to validate game data');
        Terminal.log(err);
      });
  }
}
