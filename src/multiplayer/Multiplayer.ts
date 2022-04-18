import { io, Socket } from 'socket.io-client';
import Terminal, { TerminalEventType } from '../controllers/Terminal';

export default class Multiplayer {
  socket: Socket;

  constructor() {
    this.socket = io();

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

  // Connect to socket.io server
  public connect() {}

  // Disconnect from socket.io server
  public disconnect() {}
}
