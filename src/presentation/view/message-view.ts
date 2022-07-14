import chalk from 'chalk';

//TODO: (Conv) Looks like this class is logger, not the  View it self. Can be generalized as Logger class
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
    //TODO?: (OCP) Use factory + strategy patterns
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

    //TODO: (SRP) The vew can explicitly terminate the application
    if(this.shouldExit) {
      //TODO: (IL) The app doesn't exit gracefully. Terminating the app on half way is bad practice.
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
