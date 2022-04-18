import { io, Socket } from 'socket.io-client';
import Terminal, { TerminalEventType } from '../controllers/Terminal';

export default class Multiplayer {
  socket: Socket;

  constructor() {
    this.socket = io();

    Terminal.instance.on(TerminalEventType.COMMAND, (cmd) => {});
  }

  // Connect to socket.io server
  public connect() {}

  // Disconnect from socket.io server
  public disconnect() {}
}
