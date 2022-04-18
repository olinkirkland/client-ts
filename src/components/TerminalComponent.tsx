import { useEffect, useRef, useState } from 'react';
import Terminal, {
  TerminalEventType,
  TerminalLog
} from '../controllers/Terminal';

export default function TerminalComponent() {
  let initialized = useRef(false);

  const [logs, setLogs] = useState<TerminalLog[]>([]);

  useEffect(() => {
    if (initialized.current) return;

    // Initialize terminal
    const terminal = Terminal.instance;
    terminal.on(TerminalEventType.LOG, (log) => {
      setLogs([...Terminal.logs]);
    });
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    scrollToBottomTerminalList();
  }, [logs]);

  function scrollToBottomTerminalList() {
    const terminalList = document.querySelector('.terminal-list')!;
    terminalList.scrollTo(0, terminalList.scrollHeight);
  }

  return (
    <div className="v-group">
      <ul className="terminal-list">
        {logs.map((log: TerminalLog, index: number) => (
          <li key={index}>
            <pre>{log.message}</pre>
          </li>
        ))}
      </ul>
      <div className="h-group center">
        <input type="text" placeholder='Enter a command'/>
        <button>
          <span>Send</span>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
