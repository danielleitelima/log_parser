export default class ParsingInput {
  originalFilePath: string;
  parsedFileName: string;
  parsedFilePath: string;
  
  constructor(originalFilePath: string, parsedFileName: string, parsedFilePath: string) {
    this.originalFilePath = originalFilePath;
    this.parsedFileName = parsedFileName;
    this.parsedFilePath = parsedFilePath;
  }
}