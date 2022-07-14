import ParsingPrompt from "./prompt/parsing-prompt";
import FileParsingProcessView from "./file-parsing-process-view";
import { MessageView, MessageType } from "./message-view";

//TODO: (Conv) Bad naming, it is not a view. Can be Application, ApplicationFacade
//TODO: (II) This implementation doesnt support the arguments, requires the manual input each time.
export default class MainView {
    //TODO: (Conv) Bad naming, the method show also parsing the file.
    async show(){
        try{
            //TODO: (DIP) The code shouldn't create any *new* object inside the logic. The Prompt and View should be injected
            const parsingInput = await new ParsingPrompt().execute();
            //TODO: (IL) There is no await/catch statement for the promise. Will lead to the unhandled promise rejection
            new FileParsingProcessView(parsingInput).show();
        } catch(error){
            //TODO?: (Conv) Most likely you want to print the error stack trace as well
            if(error instanceof Error){
                new MessageView(error.message, MessageType.ERROR, true).show();
            }
            new MessageView("Something wrong happened!", MessageType.ERROR, true).show();
        }
    }
}
