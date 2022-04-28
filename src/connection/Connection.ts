import axios from 'axios';
import EventEmitter from 'events';
import { io, Socket } from 'socket.io-client';
import Terminal, { TerminalEventType } from '../controllers/Terminal';

const url: string = 'https://dontfall-backend.herokuapp.com/';

export default class Connection extends EventEmitter {
  private static _instance: Connection;

  private socket: Socket | undefined;

  // Data
  public me?: MyUserData;

  // Callbacks
  setStatus?: Function;

  private constructor() {
    // Private constructor to enforce singleton
    super();

    // Open loading popup
    // usePopupManager().open(PopupLoading);

    // Get stored login credentials
    let loginCredentials = { email: null, password: null };
    const storedLoginCredentials = localStorage.getItem('login');
    if (storedLoginCredentials) {
      loginCredentials = JSON.parse(storedLoginCredentials);
      Terminal.log('🔑', 'Login credentials loaded from local storage');
    } else {
      Terminal.log('🔑', 'No login credentials found in local storage');
    }

    // Use the login credentials to login
    this.login(loginCredentials.email, loginCredentials.password);

    this.addTerminalListeners();
  }

  public login(email: string | null, password: string | null) {
    if ((email || password) && !(email && password))
      return Terminal.log(
        '⚠️',
        'Both an email and a password are required to login'
      );

    Terminal.log(
      '🔑',
      'Logging in',
      email && password ? `${email} / ${password}` : 'without credentials',
      '...'
    );

    axios
      .post(
        url + 'users/login',
        email && password
          ? { email: email, password: password }
          : { isGuest: true },
        { withCredentials: true }
      )
      .then((res) => {
        // Terminal.log('✨', res);
        const data = res.data;
        if (!data.id) {
          Terminal.log('❌', 'Login failed');
          return;
        }

        // Disconnect the socket server first
        if (this.socket && this.socket.connected) this.disconnect();

        Terminal.log('✔️ Logged in as', data.id);

        // Populate my user data
        this.me = {
          id: data.id,
          email: data.email,
          username: data.username,
          avatar: data.avatar,
          level: data.level,
          experience: data.experience,
          isGuest: data.isGuest
        };

        if (!this.me.isGuest) {
          // Save login data
          // localStorage.setItem(
          //   'login',
          //   JSON.stringify({
          //     email: email,
          //     password: password
          //   })
          // );

          Terminal.log('🔑', 'Login credentials saved to local storage');
        }

        this.connect();
      })
      .catch((err) => {
        Terminal.log('❌', 'Login failed');
        return;
      });
  }

  public logout() {
    this.disconnect();

    // Clear stored login credentials
    localStorage.removeItem('login');

    // Reset my user data & login to anonymous user
    this.me = undefined;
    this.login(null, null);
  }

  public register(email: string, password: string) {
    Terminal.log('🔑', `Registering ${email} / ${password}`);
  }

  public changeUsername(username: string) {
    Terminal.log('🔤', 'Changing username to', username);
    axios
      .post(url + 'update', { username: username }, { withCredentials: true })
      .then((res) => {
        // res == .SUCCESS;
      })
      .catch((err) => Terminal.log('⚠️', err));
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  // Connect to socket.io server
  public connect() {
    if (this.socket)
      return Terminal.log('❌', 'Cannot connect; Already connected');
    Terminal.log(`Connecting to ${url} as ${this.me!.id}`, '...');

    // TODO remove online:true; remove it from BE first, it's unnecessary
    this.socket = io(url, {
      query: {
        userID: this.me!.id,
        online: true
      }
    });
    this.addSocketListeners();
  }

  // Disconnect from socket.io server
  public disconnect() {
    if (!this.socket || !this.socket.connected) {
      Terminal.log('❌', 'Cannot disconnect; Connect to a server first');
      return;
    }

    this.socket?.disconnect();
  }

  // Join a room
  private joinRoom(roomId: string) {
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
      Terminal.log(`✔️ Connected to ${url} as ${this.me!.id}`);
      this.emit('connect');
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

  // Terminal listeners trigger Connection functions
  private addTerminalListeners() {
    Terminal.instance.on(TerminalEventType.COMMAND, (cmd) => {
      const arr = cmd.split(' ');
      cmd = arr.shift();

      switch (cmd) {
        case 'login':
          this.login(arr[0], arr[1]);
          break;
        case 'register':
          this.register(arr[0], arr[1]);
          break;
        case 'logout':
          this.logout();
          break;
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

export enum OnlineStatus {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export class UserData {
  id?: string;
  isGuest?: boolean;
  username?: string;
  avatar?: string;
  level?: number;
  status?: OnlineStatus.ONLINE | OnlineStatus.OFFLINE;
}

export class MyUserData extends UserData {
  email?: string;
  currentSkin?: string;
  gold?: number;
  experience?: number;
  friends?: UserData[];
  friendRequestsIncoming?: UserData[];
  friendRequestsOutgoing?: UserData[];
}
