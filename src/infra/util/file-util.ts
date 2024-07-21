import fs from 'fs'
import path from 'path'

export class FileUtil {
  private _pathfile: string

  constructor(pathfile: string) {
    this._pathfile = pathfile
  }

  generateFolder(folderPath: string) {
    const dir = path.join(this._pathfile, folderPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      console.info(`Path '${folderPath}' created.`)
    } else {
      console.info(`Path '${folderPath}' already exists.`)
    }
  }

  generateFile(folderName: string, filename: string, dto_template: string) {
    const filePath = path.join(this._pathfile, folderName, filename)
    fs.writeFile(filePath, dto_template, (err: any) => {
      if (err) {
        console.error(`Error writing file '${filename}':`, err)
      }
    })
  }

  cloneFile(
    folderOrigin: string,
    folderDestiny: string,
    filename: string) {

    const sourceFilePath = path.join(this._pathfile, `${folderOrigin}/${filename}`);
    const destinationFolderPath = path.join(this._pathfile, folderDestiny);
    const destinationFilePath = path.join(destinationFolderPath, filename);

    if (!fs.existsSync(destinationFolderPath)) {
      fs.mkdirSync(destinationFolderPath, { recursive: true });
    }

    fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
      if (err) {
        console.error(`Erro ao copiar o ${filename}:`, err);
      } else {
        console.log(`Arquivo copiado com sucesso: ${filename}!`);
      }
    });

  }
}