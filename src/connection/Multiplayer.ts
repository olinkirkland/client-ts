import { io, Socket } from 'socket.io-client';
import Terminal, { TerminalEventType } from '../controllers/Terminal';

const url: string = 'http://localhost:8000';
// const url: string = 'http://84.166.31.174:5000/';
let room: string = '';

export default class Multiplayer {
  socket: Socket | undefined;

  // Callbacks
  setStatus?: Function;

  constructor() {
    // const url: string = 'https://multiplayer-server-ts.herokuapp.com/';

    // fetch(url)
    //   .then((response) => response.text().then((text) => console.log(text)))
    //   .catch((error) => console.log(error));

    this.addTerminalListeners();
  }

  // Connect to socket.io server
  public connect() {
    if (this.socket)
      return Terminal.log('❌ Cannot connect; Already connected');
    Terminal.log(`Connecting to ${url}...`);
    this.socket = io(url, {
      query: {
        userID: '6266786fb7b9cadee0dc53d1', //! CHANGE ME!!! Should be like user.userID
        online: true,
        username: 'freezingBetteanne411' //! CHANGE ME!!! Should be like user.username
      }
    });
    this.addSocketListeners();
  }

  // Disconnect from socket.io server
  public disconnect() {
    if (!this.socket || !this.socket.connected) {
      Terminal.log('❌ Cannot disconnect; Connect to a server first');
      return;
    }

    this.socket?.disconnect();
  }

  // Join a room
  private joinRoom(roomId: string) {
    room = roomId;
    Terminal.log(`Joining room ${roomId}...`);
    this.socket?.emit('join-room', roomId);
  }

  // Leave a room
  private leaveRoom(roomId: string) {
    Terminal.log(`Leaving room ${roomId}...`);
  }

  private chat(message: string) {
    //! room === ''
    //!   ? this.socket?.emit('chat', message)
    //!   : this.socket?.to(room).emit('chat', message);

    this.socket?.emit('chat', message); //! REPLACE ME
  }

  // Socket listeners
  private addSocketListeners() {
    this.socket?.on('connect', () => {
      Terminal.log(`✔️ Connected to ${url} as ${this.socket?.id}`);
    });

    this.socket?.on('me', (data) => {
      Terminal.log('user-intro', data);
    });

    this.socket?.on('chat', (data) => {
      Terminal.log('💬', data);
    });

    this.socket?.on('force-reload', (data) => {
      document.location.reload();
    });

    this.socket?.on('rooms', (data) => {
      Terminal.log('rooms', data);
    });

    this.socket?.on('disconnect', () => {
      Terminal.log('✔️ Disconnected');
      this.removeSocketListeners();
      this.socket = undefined;
    });
  }

  private removeSocketListeners() {
    this.socket?.removeAllListeners();
  }

  // Terminal listeners trigger Multiplayer functions
  private addTerminalListeners() {
    Terminal.instance.on(TerminalEventType.COMMAND, (cmd) => {
      const arr = cmd.split(' ');
      cmd = arr.shift();

      switch (cmd) {
        case 'connect':
          this.connect();
          break;
        case 'disconnect':
          this.disconnect();
          break;
        case 'chat':
          this.chat(arr.join(' '));
          break;
        case 'joinRoom':
          this.joinRoom(arr[0]);
          break;
        case 'leaveRoom':
          this.leaveRoom(arr[0]);
          break;
      }
    });
  }
}

export class MultiplayerStatus {
  connected?: boolean;
  id?: string;
  rooms?: string[];
}
