export interface ParsingStrategy{
  execute(input: string): Promise<string>;
}
