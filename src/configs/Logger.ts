import path from 'path';
import FileHandler from '../handlers/output/FileHandler/FileHandler';

export default class Logger {
  private logLevel: 'info' | 'warning' | 'error' = 'info';
  private date: string;
  private fileName: string;
  private logPath: string;
  private handler;

  constructor(handler: FileHandler) {
    const date = new Date().toISOString().slice(0, 10);
    this.date = date;
    this.fileName = `${date}-${this.logLevel}.log`;
    this.logPath = path.normalize(__dirname + '../../../logs');
    this.handler = handler;
    this.handler.config(this.logPath, this.fileName);
  }

  getLogPath() {
    return this.logPath;
  }

  getFileName() {
    return this.fileName;
  }

  setLogLevel(level: typeof this.logLevel) {
    this.logLevel = level;
    this.fileName = `${this.date}-${level}.log`;
  }

  formatLogEntry(msg: string) {
    const now = new Date().toISOString();
    return `[${now}] ${msg}`;
  }

  info(msg: string) {
    this.setLogLevel('info');
    const content = this.formatLogEntry(msg);
    this.handler.addContents(content);
    this.handler.save();
  }

  warning(msg: string) {
    this.setLogLevel('warning');
    const content = this.formatLogEntry(msg);
    this.handler.addContents(content);
    this.handler.save();
  }

  error(msg: string) {
    this.setLogLevel('error');
    const content = this.formatLogEntry(msg);
    this.handler.addContents(content);
    this.handler.save();
  }
}
