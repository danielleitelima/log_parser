import CustomFile from '../model/custom-file';

export default interface FileRepository {
  getFromFileSystem(filePath: string): Promise<CustomFile>;
  writeToFileSystem(file: CustomFile): Promise<void>;
}