import axios from 'axios';
import EventEmitter from 'events';
import { io, Socket } from 'socket.io-client';
import { PopupError } from '../components/popups/PopupError';
import { PopupLoading } from '../components/popups/PopupLoading';
import { GameOptions } from '../controllers/Game';
import PopupMediator from '../controllers/PopupMediator';
import Terminal, { TerminalEventType } from '../controllers/Terminal';

// const url: string = 'https://dontfall-backend.herokuapp.com/';
const url: string = 'http://localhost:8000/';

export enum ConnectionEventType {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  USER_DATA_CHANGED = 'user-data-changed'
}

export default class Connection extends EventEmitter {
  private static _instance: Connection;

  private socket: Socket | undefined;

  // Data
  public me?: MyUserData;

  // Callbacks
  setIsConnected!: Function;

  private constructor() {
    // Private constructor to enforce singleton
    super();

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

  private error(title: string, message: string) {
    Terminal.log('❌', title);
    PopupMediator.open(PopupError, {
      title: title,
      message: message,
    });
  }

  public hostGame(gameOptions: GameOptions) {
    Terminal.log('🕹️', 'Hosting game', '...');
    axios.get(`${url}game/host`, { withCredentials: true }).then((res) => {
      Terminal.log('✔️', 'Game hosted', res.data.roomID);
    });
  }

  public getMe() {
    Terminal.log('🔑', 'Getting my user data', '...');
    Terminal.log(`${url}users/${this.me?.id}`);
    axios
      .get(`${url}users/${this.me?.id}`, { withCredentials: true })
      .then((res) => {
        // this.me = res.data;
        // this.emit(ConnectionEventType.USER_DATA_CHANGED, res.data);
        Terminal.log('🔑', 'Me', res.data);
      })
      .catch((err) => {
        Terminal.log('⚠️', err);
      });
  }

  public login(
    email: string | null,
    password: string | null,
    staySignedIn: boolean = false
  ) {
    PopupMediator.open(PopupLoading);

    if ((email || password) && !(email && password))
      return Terminal.log(
        '⚠️',
        'Both an email and a password are required to login'
      );

    Terminal.log(
      '🔑',
      'Logging in',
      email && password ? `${email} / ${password}` : 'anonymously',
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
        const data = res.data;
        if (!data.id) {
          this.error('Login failed', 'Invalid username or password.');
          localStorage.removeItem('login');
          return;
        }

        // Disconnect the socket server first
        if (this.socket && this.socket.connected) this.disconnect();

        Terminal.log('✔️ Logged in as', data.id);

        // Populate my user data
        // Terminal.log('👀', JSON.stringify(data, null, 2));
        this.me = {
          id: data.id,
          email: data.email,
          gold: data.gold,
          username: data.username,
          avatar: data.currentAvatar,
          level: data.level,
          experience: data.experience,
          isGuest: data.isGuest,
        };

        if (staySignedIn && !this.me.isGuest) {
          // Save login data
          localStorage.setItem(
            'login',
            JSON.stringify({
              email: email,
              password: password
            })
          );

          Terminal.log('🔑', 'Login credentials saved to local storage');
        }

        this.connect();
      })
      .catch((err) => {
        console.log(err);
        this.error('Login failed', 'Invalid username or password.');
        localStorage.removeItem('login');
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

  public cheat(type: string, value: number): void {
    Terminal.log('⭐', 'Cheating', value, type, '...');
    axios
      .post(
        `${url}cheat/?${type}=${value}`,
        { userID: this.me?.id },
        { withCredentials: true }
      )
      .then((res) => Terminal.log('✔️', res.data))
      .catch((err) => Terminal.log('⚠️', err));
  }

  public register(email: string, password: string) {
    PopupMediator.open(PopupLoading);

    Terminal.log('🔑', `Registering ${email} / ${password}`, '...');
    axios
      .post(
        url + 'users/registration',
        { email: email, password: password, userID: this.me!.id },
        { withCredentials: true }
      )
      .then((res) => {
        // Terminal.log('👀', res);
        Terminal.log('✔️ Registered');

        localStorage.setItem(
          'login',
          JSON.stringify({
            email: email,
            password: password
          })
        );

        Terminal.log('🔑', 'Login credentials saved to local storage');

        PopupMediator.close();
      })
      .catch((err) => {
        Terminal.log(err);
        this.error(
          'Registration failed',
          'Could not register an account with the provided email and password.'
        );
        return;
      });
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
        online: true,
      },
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
    this.socket?.emit('leave-room', roomId);
  }

  private chat(room: string, message: string) {
    this.socket?.emit('chat', { room: room, message: message });
  }

  // Socket listeners
  private addSocketListeners() {
    this.socket?.on('connect', () => {
      Terminal.log(`✔️ Connected to ${url} as ${this.me!.id}`);
      this.emit(ConnectionEventType.CONNECT);
      this.emit(ConnectionEventType.USER_DATA_CHANGED);
      setTimeout(() => {
        this.setIsConnected(true);
        PopupMediator.close();
      }, 500);
    });

    this.socket?.on('chat', (data) => {
      Terminal.log('💬', JSON.stringify(data));
    });

    this.socket?.on('invalidate-user', () => {
      // User data invalidated, update it
      Terminal.log(
        '🔥',
        'User data invalidated by server, validating my data',
        '...'
      );
      axios
        .get(url + `users/${this.me!.id}`, { withCredentials: true })
        .then((res) => {
          const data = res.data;
          this.me = {
            id: data.id,
            email: data.email,
            gold: data.gold,
            username: data.username,
            avatar: data.currentAvatar,
            level: data.level,
            experience: data.experience,
            isGuest: data.isGuest
          };

          Terminal.log('✔️', 'Validated user data');
          this.emit(ConnectionEventType.USER_DATA_CHANGED);
        });
    });

    this.socket?.on('force-reload', (data) => {
      document.location.reload();
    });

    this.socket?.on('rooms', (data) => {
      Terminal.log('rooms', data);
    });

    this.socket?.on('disconnect', () => {
      Terminal.log('✔️ Disconnected');
      this.setIsConnected(false);
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
        case 'me':
          this.getMe();
          break;
        case 'login':
          this.login(arr[0], arr[1]);
          break;
        case 'register':
          this.register(arr[0], arr[1]);
          break;
        case 'logout':
          this.logout();
          break;
        case 'cheat':
          this.cheat(arr[0], parseInt(arr[1]));
          break;
        case 'connect':
          this.connect();
          break;
        case 'disconnect':
          this.disconnect();
          break;
        case 'chat':
          this.chat(arr.shift(), arr.join(' '));
          break;
        case 'join':
          this.joinRoom(arr[0]);
          break;
        case 'leave':
          this.leaveRoom(arr[0]);
          break;
      }
    });
  }
}

export enum OnlineStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
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
