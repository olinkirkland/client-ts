import { io, Socket } from 'socket.io-client';
import Terminal, { TerminalEventType } from '../controllers/Terminal';

export default class Multiplayer {
  socket: Socket;

  constructor() {
    this.socket = io('localhost:5000');

    this.addSocketListeners();
    this.addTerminalListeners();
  }

  // Print status (connected or disconnected)
  private printStatus() {
    this.socket.connected
      ? Terminal.log('Connected to server')
      : Terminal.log('Not connected to server');
  }

  // Connect to socket.io server
  public connect() {
    Terminal.log('Connecting to server...');
    this.socket.connect();
  }

  // Disconnect from socket.io server
  public disconnect() {
    Terminal.log('Disconnecting from server...');
    this.socket.disconnect();
  }

  // Join a room
  private joinRoom(roomId: string) {
    Terminal.log(`Joining room ${roomId}...`);
  }

  // Leave a room
  private leaveRoom(roomId: string) {
    Terminal.log(`Leaving room ${roomId}...`);
  }

  // Socket listeners
  private addSocketListeners() {
    this.socket.on('connect', () => {
      Terminal.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      Terminal.log('Disconnected from server');
    });
  }

  // Terminal listeners trigger Multiplayer functions
  private addTerminalListeners() {
    Terminal.instance.on(TerminalEventType.COMMAND, (cmd) => {
      const arr = cmd.split(' ');
      switch (arr[0]) {
        case 'connect':
          this.connect();
          break;
        case 'disconnect':
          this.disconnect();
          break;
        case 'status':
          this.printStatus();
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
