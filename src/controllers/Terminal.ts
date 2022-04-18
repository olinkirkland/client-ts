import EventEmitter from 'events';

export enum TerminalEventType {
  LOG = 'log'
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

  public static log(...args: any[]): void {
    const log = new TerminalLog(...args);
    Terminal.logs.push(log);
    Terminal.instance.emit(TerminalEventType.LOG, log);
  }
}

export class TerminalLog {
  public message: any[];
  public time: Date;

  constructor(...args: any[]) {
    this.message = args;
    this.time = new Date();
  }
}
