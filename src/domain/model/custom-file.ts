export default class CustomFile {
  path: string;
  name: string;
  content: string;
  
  constructor(path: string, name: string, content: string) { 
    this.path = path;
    this.name = name;
    this.content = content;
  }
}