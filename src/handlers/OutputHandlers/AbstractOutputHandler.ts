export default abstract class AbstractOutputHandler {
  abstract contents: string;
  abstract addContents(contents: string): void;
  abstract save(): void;
}
