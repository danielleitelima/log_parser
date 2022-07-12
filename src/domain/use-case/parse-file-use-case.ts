import CustomFile from '../model/custom-file';
import { ParsingStrategy } from './parsing-strategy';
import ParsingInput from '../model/parsing-input';
import FileRepository from '../repository/file-repository';

export default class ParseFileUseCase {
  parsingInput: ParsingInput;
  strategy: ParsingStrategy;
  fileRepository: FileRepository;
  
  constructor(userInput: ParsingInput, strategy: ParsingStrategy, fileRepository: FileRepository) {
    this.parsingInput = userInput;
    this.strategy = strategy;
    this.fileRepository = fileRepository;
  }
  
  async execute(): Promise<CustomFile> {
    const originalFile = await this.fileRepository.getFromFileSystem(this.parsingInput.originalFilePath);
    
    const parsedContent = await this.strategy.execute(originalFile.content);
    
    const parsedFile = new CustomFile(this.parsingInput.parsedFilePath, this.parsingInput.parsedFileName, parsedContent);
    return parsedFile;
  }
}