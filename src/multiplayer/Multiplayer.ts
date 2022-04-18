import { io, Socket } from 'socket.io-client';
import Terminal, { TerminalEventType } from '../controllers/Terminal';

export default class Multiplayer {
  socket: Socket;

  constructor() {
    this.socket = io();

    this.addSocketListeners();
    this.addTerminalListeners();
  }

  // Connect to socket.io server
  public connect() {
    Terminal.log('Connecting to server...');
  }

  // Disconnect from socket.io server
  public disconnect() {
    Terminal.log('Disconnecting from server...');
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
      }
    });
  }
}
