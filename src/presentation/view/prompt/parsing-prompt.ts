import inquirer from 'inquirer';
import path from 'path'
import ParsingInput from '../../../domain/model/parsing-input';
import { MessageType, MessageView } from '../message-view';
import fileSystem from 'fs/promises';

export default class ParsingPrompt {
  async execute() {
    this.showRules();
    const filePath = await this.askFilePath();
    const fileName = await this.askParsedFileName(path.basename(filePath));
    const parsedFilePath = path.join(path.dirname(filePath), fileName);
    
    return new ParsingInput(filePath, fileName, parsedFilePath);
  }
  
  private showRules(){
    new MessageView(
      `
Welcome to log-parser!
Please, set the input file path and an optional name for the output file.
After processed, the output file will be saved in the same directory of the input file.
If one of the lines in the input file is not valid, the program will skip it.
      `
      , MessageType.INFO, false).show();
    }
    
    private async askParsedFileName(defaultFileName: String) {
      const answer = await inquirer.prompt({
        name: 'fileName',
        type: 'input',
        message: 'How would you like the output file to be called?',
        default: `parsed_${defaultFileName}`
      });
      
      const fileName = answer.fileName
      
      if (!fileName) {
        new MessageView("A valid file name is required!", MessageType.ERROR, true).show();
      }
      
      return fileName;
    }
    
    private async askFilePath() {
      const answer = await inquirer.prompt({
        name: 'filePath',
        type: 'input',
        message: 'What is the file path?'
      });
      
      const filePath = answer.filePath
      
      if (!filePath) {
        new MessageView("A valid file path is required!", MessageType.ERROR, true).show();
      }
      
      try {
        const fileStat = await fileSystem.stat(filePath);
        
        if (fileStat.isDirectory()) {
          new MessageView("Please provide a file path!", MessageType.ERROR, true).show();
        }
        
      } catch (e) {
        new MessageView("File not found!", MessageType.ERROR, true).show();
      }
      
      return filePath;
    }
  }