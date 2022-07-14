//TODO?: (IL) Do we really want to define it as a class?
export default class ParsingInput {
  parsedFileName: string;
  parsedFilePath: string;

  //TODO: (Conv) You can define the fields as part of constructor signature
  constructor(
      public readonly originalFilePath: string,
      parsedFileName: string,
      parsedFilePath: string
  ) {
    this.parsedFileName = parsedFileName;
    this.parsedFilePath = parsedFilePath;
  }
}
