import Logger from './Logger';
import NoOutputSpecified from '../../errors/NoOutputSpecified';
import FileHandler from './FileHandler/FileHandler';
import ReplyHandler from './ReplyHandler/ReplyHandler';

export default class OutputFactory {
  static createOutput(outputTo: 'logs'): Logger;
  static createOutput(outputTo: 'reply'): ReplyHandler;
  static createOutput(outputTo: 'logs' | 'reply') {
    switch (outputTo) {
      case 'logs': {
        const handler = new FileHandler();
        const logger = new Logger(handler);
        return logger;
      }
      case 'reply': {
        return new ReplyHandler();
      }
      default:
        throw new NoOutputSpecified('No Output Specified');
    }
  }
}
