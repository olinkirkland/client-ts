import { useEffect, useState } from 'react';
import Connection, { ConnectionEventType } from '../../connection/Connection';

export default function GameScreen() {
  const [wallpaper, setWallpaper] = useState(
    Connection.instance.me?.currentWallpaper
  );

  useEffect(() => {
    Connection.instance.on(ConnectionEventType.USER_DATA_CHANGED, () => {
      setWallpaper(Connection.instance.me?.currentWallpaper);
    });
  }, []);

  return <div>Game Screen</div>;
}
