import fs from 'node:fs';
export default class FileHandler {
  directory = '';
  fileName = '';
  contents = '';
  writeToFile() {
    fs.appendFile(`${this.directory}/${this.fileName}`, this.contents + '\n', err => {
      if (err) {
        console.error(err);
      }
    });
  }
  config(directory, fileName) {
    this.directory = directory;
    this.fileName = fileName;
  }
  addContents(content) {
    if (this.contents) {
      this.contents = `${this.contents}\n${content}`;
    } else {
      this.contents = content;
    }
  }
  save() {
    this.writeToFile();
  }
}