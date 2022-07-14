//TODO?: To we really need the custom file wrapper? If so, should it be a class?
export default class CustomFile {
  name: string;
  content: string;

  //TODO: (Conv) You can define the fields as part of constructor signature
  constructor(
      public readonly path: string,
      name: string,
      content: string
  ) {
    this.name = name;
    this.content = content;
  }
}
