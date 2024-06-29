import fs from'fs'
import path from 'path'

export class FileUtil {
  private _pathfile:string

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
      
  generateFile = (folderName: string, filename: string, dto_template: string) => {
    const filePath = path.join(this._pathfile, folderName, filename)
    fs.writeFile(filePath, dto_template, (err: any) => {
      if (err) {
        console.error(`Error writing file '${filename}':`, err)
      }
    })
  }
}