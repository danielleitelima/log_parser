import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import fileSystem from 'fs/promises';
import path from 'path'

enum MessageType {
  INFO,
  ERROR,
  SUCCESS
}

(
  async () => {
    showRules()

    const filePath = await askFilePath();
    const fileDirectory = path.dirname(filePath);
    const fileName = path.basename(filePath)
    const parsedFileName = await askParsedFileName(fileName);
    const parsedFilePath = `${fileDirectory}/${parsedFileName}`
    const file = await fileSystem.readFile(filePath, { encoding: 'utf-8' })
    const parsedFile = parseFile(file);

    const spinner = createSpinner('Loading...').start();
    fileSystem.writeFile(parsedFilePath, parsedFile)
    spinner.success({ text: `The file ${fileName} was successfully parsed to ${parsedFileName}. \n` });
  }
)().catch((error: Error) => finishWithErrorMessage(error.message));

function showRules() {
  showMessage(
    `
Welcome to log-parser!

Please, set the input file path and an optional name for the output file.
After processed, the output file will be saved in the same directory of the input file.
If one of the lines in the input file is not valid, the program will skip it.
    `,
    MessageType.INFO
  );
}

function parseFile(file: String) {
  const lines = file.split('\n');
  const parsedLines = lines.map(line => {
    try{
      const [timestamp, loglevel, rest] = line.split(' - ');
      const json = JSON.parse(rest);
      return {
        timestamp: parseInt(timestamp),
        loglevel,
        json
      }
    }catch(e){
      return null;
    }
  }).filter(line => line != null);

  return JSON.stringify(parsedLines);
}

async function askFilePath() {
  const answer = await inquirer.prompt({
    name: 'filePath',
    type: 'input',
    message: 'What is the file path?'
  });

  const filePath = answer.filePath

  if (!filePath) {
    finishWithErrorMessage("A valid file path is required!");
  }

  try {
    const fileStat = await fileSystem.stat(filePath);

    if (fileStat.isDirectory()) {
      finishWithErrorMessage("The file cannot be a folder!");
    }

  } catch (e) {
    finishWithErrorMessage("The file with the given path should exist!");
  }

  return filePath;
}

async function askParsedFileName(defaultFileName: String) {
  const answer = await inquirer.prompt({
    name: 'fileName',
    type: 'input',
    message: 'How would you like the output file to be called?',
    default: `parsed_${defaultFileName}`
  });

  const fileName = answer.fileName

  if (!fileName) {
    finishWithErrorMessage("A valid file name is required!");
  }

  return fileName;
}

function showMessage(message: String, type: MessageType) {
  switch (type) {
    case MessageType.INFO:
      console.log(chalk.blue(message));
      break;
    case MessageType.SUCCESS:
      console.log(chalk.green(message));
      break;
    case MessageType.ERROR:
      console.log(chalk.red(message));
      break;
    default:
      console.log(message);
      break;
  }
}

function finishWithErrorMessage(message: String){
  showMessage(message, MessageType.ERROR);
  process.exit(0);
}