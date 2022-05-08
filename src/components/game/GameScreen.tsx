import { useEffect, useState } from 'react';
import Connection, { ConnectionEventType } from '../../connection/Connection';

export default function GameScreen() {
  useEffect(() => {}, []);

  return <div className="game">Game Screen
    <button>Leave game</button>
  </div>;
}
