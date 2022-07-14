//TODO?: (IL) Do we really want to define it as a class?
export default class LogEntry {
    level: string;
    content: any;

    //TODO: (Conv) You can define the fields as part of constructor signature
    constructor(
        public readonly timestamp: string,
        loglevel: string,
        content: string) {
        this.level = loglevel;
        this.content = content;
    }
}
