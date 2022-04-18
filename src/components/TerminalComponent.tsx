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

  function applyCommand() {
    const input: HTMLInputElement = document.querySelector('.terminal-input')!;
    const cmd = input.value;
    input.focus();
    if (!cmd || cmd.length === 0) return;
    input.value = '';
    Terminal.command(cmd);
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
        <input
          className="terminal-input"
          type="text"
          placeholder="Enter a command"
          onKeyDown={(e) => {
            if (e.key === 'Enter') applyCommand();
          }}
        />
        <button onClick={applyCommand}>
          <span>Send</span>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}
