import fs from 'fs';
import path from 'path';

export class FileUtil {
  private _basePath: string;
  private _cliPath: string;

  constructor(basePath: string) {
    this._basePath = path.resolve(basePath);
    this._cliPath = path.resolve(path.dirname(require.main?.filename || ''), '..');
  }

  async generateFolder(folderPath: string) {
    const dir = path.join(this._basePath, folderPath);
    try {
      if (!fs.existsSync(dir)) {
        await fs.promises.mkdir(dir, { recursive: true });
        console.info(`Path '${folderPath}' created.`);
      } else {
        console.info(`Path '${folderPath}' already exists.`);
      }
    } catch (err) {
      console.error(`Error creating path '${folderPath}':`, err);
    }
  }

  async generateFile(folderName: string, filename: string, content: string) {
    const filePath = path.join(this._basePath, folderName, filename);
    try {
      await fs.promises.writeFile(filePath, content);
      console.log(`File '${filename}' created successfully.`);
    } catch (err) {
      console.error(`Error writing file '${filename}':`, err);
    }
  }

  async cloneFile(folderOrigin: string, folderDestiny: string, filename: string) {
    const sourceFilePath = path.join(this._cliPath, folderOrigin, filename);
    const destinationFolderPath = path.join(this._basePath, folderDestiny);
    const destinationFilePath = path.join(destinationFolderPath, filename);

    console.debug(`Source: ${sourceFilePath}`);
    console.debug(`Destination: ${destinationFilePath}`);

    try {
      if (!fs.existsSync(sourceFilePath)) {
        console.error(`Source file does not exist: ${sourceFilePath}`);
        return;
      }

      if (!fs.existsSync(destinationFolderPath)) {
        await fs.promises.mkdir(destinationFolderPath, { recursive: true });
      }

      await fs.promises.copyFile(sourceFilePath, destinationFilePath);
      console.log(`File '${filename}' copied successfully.`);
    } catch (err) {
      console.error(`Error copying file '${filename}':`, err);
    }
  }
}
