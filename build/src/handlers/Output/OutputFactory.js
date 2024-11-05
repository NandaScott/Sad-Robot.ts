import Logger from "./Logger.js";
import NoOutputSpecified from "../../errors/NoOutputSpecified.js";
import FileHandler from "./FileHandler.js";
import ReplyHandler from "./ReplyHandler.js";
export default class OutputFactory {
  static createOutput(outputTo) {
    switch (outputTo) {
      case 'logs':
        {
          const handler = new FileHandler();
          const logger = new Logger(handler);
          return logger;
        }
      case 'reply':
        {
          return new ReplyHandler();
        }
      default:
        throw new NoOutputSpecified('No Output Specified');
    }
  }
}