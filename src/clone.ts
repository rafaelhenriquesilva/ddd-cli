import fs from 'fs'
import path from 'path';

const sourceFilePath = path.join(__dirname, '../src/infra/database/@shared/query-interface');
const destinationFolderPath = path.join(__dirname, '../new-project/infra/database/@shared');
const destinationFilePath = path.join(destinationFolderPath, 'query-interface.ts');

if (!fs.existsSync(destinationFolderPath)) {
    fs.mkdirSync(destinationFolderPath, { recursive: true });
}

fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
    if (err) {
        console.error('Erro ao copiar o arquivo:', err);
    } else {
        console.log('Arquivo copiado com sucesso!');
    }
});
