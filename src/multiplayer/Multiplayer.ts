import { io, Socket } from 'socket.io-client';
import Terminal, { TerminalEventType } from '../controllers/Terminal';

// const url: string = 'http://localhost:5000';
const url: string = 'http://84.166.31.174:5000/';

export default class Multiplayer {
  socket: Socket | undefined;

  constructor() {
    // const url: string = 'https://multiplayer-server-ts.herokuapp.com/';

    // fetch(url)
    //   .then((response) => response.text().then((text) => console.log(text)))
    //   .catch((error) => console.log(error));

    this.addTerminalListeners();
  }

  // Print status (connected or disconnected)
  private printStatus() {
    this.socket && this.socket.connected
      ? Terminal.log(`Connected to ${url}`)
      : Terminal.log('Not connected to a server');
  }

  // Connect to socket.io server
  public connect() {
    if (this.socket) return Terminal.log('Cannot connect; Already connected');
    Terminal.log(`Connecting to ${url}...`);
    this.socket = io(url, { query: { token: 'abc' } });
    this.addSocketListeners();
  }

  // Disconnect from socket.io server
  public disconnect() {
    if (!this.socket || !this.socket.connected) {
      Terminal.log('Cannot disconnect; Connect to a server first');
      return;
    }

    this.socket?.disconnect();
  }

  // Join a room
  private joinRoom(roomId: string) {
    Terminal.log(`Joining room ${roomId}...`);
  }

  // Leave a room
  private leaveRoom(roomId: string) {
    Terminal.log(`Leaving room ${roomId}...`);
  }

  private chat(message: string) {
    this.socket?.emit('chat', message);
  }

  // Socket listeners
  private addSocketListeners() {
    this.socket?.on('connect', () => {
      Terminal.log(`Connected to ${url}`);
    });

    this.socket?.on('user-intro', (data) => {
      Terminal.log('user-intro', data);
    });

    this.socket?.on('chat', (data) => {
      Terminal.log('>', data);
    });

    this.socket?.on('force-reload', (data) => {
      document.location.reload();
    });

    this.socket?.on('disconnect', () => {
      Terminal.log('Disconnected');
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
        case 'status':
          this.printStatus();
          break;
        case 'chat':
          this.chat(arr.join(' '));
          break;
        case 'joinRoom':
          this.joinRoom(arr[1]);
          break;
        case 'leaveRoom':
          this.leaveRoom(arr[1]);
          break;
      }
    });
  }
}
