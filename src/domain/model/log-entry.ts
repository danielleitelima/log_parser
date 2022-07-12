export default class LogEntry {
    timestamp: string;
    level: string;
    content: any;

    constructor(timestamp: string, loglevel: string, content: string) {
        this.timestamp = timestamp;
        this.level = loglevel;
        this.content = content;
    }
}