import LogEntry from "../../model/log-entry";
import { ParsingStrategy } from "../parsing-strategy";

export default class LogEntryParsingStrategy implements ParsingStrategy {
    async execute(input: string): Promise<string> {
        const lines = input.split('\n');
        const parsedLines = lines.map(line => {
            try{
                const [timestamp, loglevel, rest] = line.split(' - ');
                const content = JSON.parse(rest);
                return new LogEntry(timestamp, loglevel, content);
            }catch(e){
                return null;
            }
        }).filter(line => line != null);
        
        return JSON.stringify(parsedLines);
    }
}