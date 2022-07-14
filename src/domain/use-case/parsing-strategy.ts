//TODO: (Conv) Let's use an I prefix for interfaces, like IParsingStrategy
export interface ParsingStrategy{
  execute(input: string): Promise<string>;
}
