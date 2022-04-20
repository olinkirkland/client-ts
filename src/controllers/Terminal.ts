import EventEmitter from 'events';

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
    const log = new TerminalLog(...args);
    Terminal.logs.push(log);
    Terminal.instance.emit(TerminalEventType.LOG, log);
  }

  public static command(cmd: string): void {
    if (cmd === 'clear') {
      Terminal.clear();
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
