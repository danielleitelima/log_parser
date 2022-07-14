import CustomFile from '../model/custom-file';

//TODO: (Conv) Let's use an I prefix for interfaces, like IFileRepository
export default interface FileRepository {
  getFromFileSystem(filePath: string): Promise<CustomFile>;
  writeToFileSystem(file: CustomFile): Promise<void>;
}
