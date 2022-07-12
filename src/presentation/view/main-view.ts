import ParsingPrompt from "./prompt/parsing-prompt";
import FileParsingProcessView from "./file-parsing-process-view";
import { MessageView, MessageType } from "./message-view";
export default class MainView {
    async show(){
        try{
            const parsingInput = await new ParsingPrompt().execute()
            new FileParsingProcessView(parsingInput).show();
        } catch(error){
            if(error instanceof Error){
                new MessageView(error.message, MessageType.ERROR, true).show();
            }
            new MessageView("Something wrong happened!", MessageType.ERROR, true).show();
        }
    }
}
