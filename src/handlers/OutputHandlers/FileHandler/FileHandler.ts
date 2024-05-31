import AbstractOutputHandler from '../AbstractOutputHandler';
import fs from 'node:fs';

export default class FileHandler implements AbstractOutputHandler {
  public directory: string = '';
  public fileName: string = '';
  public contents: string = '';

  writeToFile() {
    fs.appendFile(
      `${this.directory}/${this.fileName}`,
      this.contents + '\n',
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  }

  config(directory: string, fileName: string) {
    this.directory = directory;
    this.fileName = fileName;
  }

  addContents(content: string) {
    if (this.contents) {
      this.contents = `${this.contents}\n${content}`;
    } else {
      this.contents = content;
    }
  }

  save(): void {
    this.writeToFile();
  }
}
