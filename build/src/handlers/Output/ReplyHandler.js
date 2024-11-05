export default class ReplyHandler {
  contents = '';
  addContext(ctx) {
    this.ctx = ctx;
  }
  addContents(contents) {
    this.contents = contents;
  }
  save() {
    this.ctx?.message.reply(this.contents);
  }
}