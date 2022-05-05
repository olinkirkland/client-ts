export default interface User {
  // User-sm
  id: string;
  username: string;
  currentAvatar: string;
  level: number;
  isGuest: boolean;
  isOnline: boolean;

  // User-md

  // User-fl
}

export const systemUser: User = {
  id: 'system',
  username: 'DontFall',
  currentAvatar: 'assets/avatars/system.png',
  level: -1,
  isGuest: false,
  isOnline: false
};
