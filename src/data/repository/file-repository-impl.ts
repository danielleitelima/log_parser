import CustomFile from "../../domain/model/custom-file";
import FileRepository from "../../domain/repository/file-repository";
import fileSystem from 'fs/promises';
import path from 'path'

export default class FileRepositoryImpl implements FileRepository {
  async writeToFileSystem(file: CustomFile): Promise<void> {
    await fileSystem.writeFile(file.path, file.content);
  }
  async getFromFileSystem(filePath: string): Promise<CustomFile> {
    return new CustomFile(filePath, path.basename(filePath), await fileSystem.readFile(filePath, 'utf8'));
  }
}
