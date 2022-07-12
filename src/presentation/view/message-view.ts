import chalk from 'chalk';

export class MessageView {
  text: string;
  type: MessageType;
  shouldExit: boolean;
  
  constructor(message: string, type: MessageType, shouldExit: boolean = false) {
    this.type = type;
    this.text = message;
    this.shouldExit = shouldExit;
  }
  
  show() {
    switch (this.type) {
      case MessageType.INFO:
      console.log(chalk.blue(this.text));
      break;
      case MessageType.ERROR:
      console.log(chalk.red(this.text));
      break;
      case MessageType.SUCCESS:
      console.log(chalk.green(this.text));
      break;
      case MessageType.WARNING:
      console.log(chalk.yellow(this.text));
      break;
      default:
      console.log(this.text);
      break;
    }
    
    if(this.shouldExit) {
      process.exit(0);
    }
  }
}

export enum MessageType {
  INFO,
  ERROR,
  WARNING,
  SUCCESS
}