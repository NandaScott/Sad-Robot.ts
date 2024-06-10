import { CustomScryfallConfig } from '../../../axios';
import AbstractOutputHandler from './AbstractOutputHandler';

export default class ReplyHandler implements AbstractOutputHandler {
  ctx: CustomScryfallConfig['ctx'];
  contents: string = '';

  addContext(ctx: CustomScryfallConfig['ctx']) {
    this.ctx = ctx;
  }

  addContents(contents: string) {
    this.contents = contents;
  }

  save(): void {
    this.ctx?.message.reply(this.contents);
  }
}
