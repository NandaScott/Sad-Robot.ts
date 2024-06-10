import ImageUriError from './src/errors/ImageUriError';
import ScryfallError from './src/errors/ScryfallError';
import OutputFactory from './src/handlers/Output/OutputFactory';

type Errors = ScryfallError | ImageUriError | Error;

process.on('unhandledRejection', (reason: Errors) => {
  if (reason instanceof ScryfallError) {
    // Send reply to user
    const replyHandler = OutputFactory.createOutput('reply');
    replyHandler.addContents('[Mock reply] ' + reason.getDetails());
    replyHandler.addContext(reason.getContext());
    replyHandler.save();
  }

  // Log error to file
  const logHandler = OutputFactory.createOutput('logs');
  logHandler.error(`${reason.name}: ${reason.message}`);
});
