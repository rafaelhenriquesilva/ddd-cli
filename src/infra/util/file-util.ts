import fs from'fs'
import path from 'path'

export class FileUtil {
  private _pathfile:string

  constructor(pathfile: string) {
    this._pathfile = pathfile
  }

  generateFolder(folderName: string)  {
    const dir = path.join(this._pathfile,  folderName)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
      console.log(`Folder '${folderName}' created.`)
    } else {
      console.log(`Folder '${folderName}' already exists.`)
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