import fs from 'fs';

export const generateFolderStructure = (options: any) => {
  fs.mkdirSync('src/TestFunction', { recursive: true });
  fs.mkdirSync('src/__tests__');
  fs.writeFileSync('env-vars.json', '{}');
};
