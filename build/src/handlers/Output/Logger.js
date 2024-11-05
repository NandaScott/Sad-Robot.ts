import path from 'path';
export default class Logger {
  logLevel = 'info';
  constructor(handler) {
    const date = new Date().toISOString().slice(0, 10);
    this.date = date;
    this.fileName = `${date}-${this.logLevel}.log`;
    this.logPath = path.normalize(__dirname + '../../../../logs');
    this.handler = handler;
    this.handler.config(this.logPath, this.fileName);
  }
  getLogPath() {
    return this.logPath;
  }
  getFileName() {
    return this.fileName;
  }
  setLogLevel(level) {
    this.logLevel = level;
    this.fileName = `${this.date}-${level}.log`;
  }
  formatLogEntry(msg) {
    const now = new Date().toISOString();
    return `[${now}] ${msg}`;
  }
  info(msg) {
    this.setLogLevel('info');
    const content = this.formatLogEntry(msg);
    this.handler.addContents(content);
    this.handler.save();
  }
  warning(msg) {
    this.setLogLevel('warning');
    const content = this.formatLogEntry(msg);
    this.handler.addContents(content);
    this.handler.save();
  }
  error(msg) {
    this.setLogLevel('error');
    const content = this.formatLogEntry(msg);
    this.handler.addContents(content);
    this.handler.save();
  }
}