import ParsingInput from "../../domain/model/parsing-input";
import SpinnerView from "./spinner-view";
import FileRepositoryImpl from "../../data/repository/file-repository-impl";
import ParseFileUseCase from "../../domain/use-case/parse-file-use-case";
import LogEntryParsingStrategy from "../../domain/use-case/parsing-strategy/log-entry-parsing-strategy";
import { MessageType, MessageView } from "./message-view";

export default class FileParsingProcessView {
    private parsingInput: ParsingInput;
    
    constructor(parsingInput: ParsingInput) {
        this.parsingInput = parsingInput;
    }
    
    async show(){
        const spinner = new SpinnerView();
        
        spinner.show();
        
        const fileRepository = new FileRepositoryImpl();
        const parseFileUseCase = new ParseFileUseCase(this.parsingInput, new LogEntryParsingStrategy, fileRepository);
        const parsedFile = await parseFileUseCase.execute();
        fileRepository.writeToFileSystem(parsedFile);
        
        spinner.hide();
        new MessageView(`File ${parsedFile.name} created!`, MessageType.SUCCESS).show();
    }
}
