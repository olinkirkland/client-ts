import EventEmitter from 'events';
import { formatHelpString } from '../Util';

export enum TerminalEventType {
  LOG = 'log',
  COMMAND = 'command',
  SHOW = 'show',
  HIDE = 'hide'
}

export default class Terminal extends EventEmitter {
  private static _instance: Terminal;
  public static logs: TerminalLog[] = [];

  private constructor() {
    // Private constructor to enforce singleton
    super();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public static show() {
    Terminal.instance.emit(TerminalEventType.SHOW);
  }

  public static hide() {
    Terminal.instance.emit(TerminalEventType.HIDE);
  }

  public static log(...args: any[]): void {
    console.log(...args);

    const log = new TerminalLog(...args);
    Terminal.logs.push(log);
    Terminal.instance.emit(TerminalEventType.LOG, log);
  }

  public static command(cmd: string): void {
    if (cmd === 'clear') {
      Terminal.clear();
      return;
    }

    if (cmd === 'help') {
      const helpCommands = [
        ['clear', 'Clear the terminal'],
        ['help', 'Show this help message'],
        ['login', 'Login [email, password]'],
        ['register', 'Register [email, password]'],
        ['logout', 'Logout'],
        ['cheat', 'Set a resource [resource, amount]'],
        ['connect', 'Connect to the socket server'],
        ['disconnect', 'Disconnect from the socket server'],
        ['chat', 'Send a chat message [room, message]'],
        ['create', 'Create a room [room]'],
        ['join', 'Join a room [room]'],
        ['leave', 'Leave a room [room]'],
        ['rooms', 'Show all connected rooms']
      ];

      Terminal.log(
        '📖 Terminal Commands',
        `\n${helpCommands
          .map((arr) => formatHelpString(arr[0], arr[1]))
          .join('\n')}`
      );

      return;
    }

    const log = new TerminalLog(cmd);
    log.cmd = true;
    Terminal.logs.push(log);
    Terminal.instance.emit(TerminalEventType.LOG, log);
    Terminal.instance.emit(TerminalEventType.COMMAND, cmd);
  }

  public static clear() {
    Terminal.logs = [];
    Terminal.instance.emit(TerminalEventType.LOG);
  }
}

export class TerminalLog {
  public message: string;
  public time: Date;
  public cmd: boolean = false;

  constructor(...args: any[]) {
    this.message = args
      .map((u) =>
        typeof u === 'string' || typeof u === 'number' || typeof u === 'boolean'
          ? u
          : JSON.stringify(u)
      )
      .join(' ');
    this.time = new Date();
  }
}
