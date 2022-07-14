import CustomFile from '../model/custom-file';
import { ParsingStrategy } from './parsing-strategy';
import ParsingInput from '../model/parsing-input';
import FileRepository from '../repository/file-repository';

export default class ParseFileUseCase {
  //TODO?: (IL) Should these fields be public?
  strategy: ParsingStrategy;
  fileRepository: FileRepository;

  //TODO: (Conv) You can define the fields as part of constructor signature
  constructor(
      public readonly parsingInput: ParsingInput,
      strategy: ParsingStrategy,
      fileRepository: FileRepository
  ) {
    this.strategy = strategy;
    this.fileRepository = fileRepository;
  }

  async execute(): Promise<CustomFile> {
    const originalFile = await this.fileRepository.getFromFileSystem(this.parsingInput.originalFilePath);

    const parsedContent = await this.strategy.execute(originalFile.content);

    //TODO: (DIP) Use factory, not `new`
    const parsedFile = new CustomFile(this.parsingInput.parsedFilePath, this.parsingInput.parsedFileName, parsedContent);
    //TODO: (IL) Variable is redundant
    return parsedFile;
  }
}
