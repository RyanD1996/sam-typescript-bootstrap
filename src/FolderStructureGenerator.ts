import fs from 'fs';

export const generateFolderStructure = (options: any) => {
  fs.mkdirSync('src/Application/TestFunction', { recursive: true });
  fs.mkdirSync('src/Application/__tests__');
  fs.mkdirSync('src/Domain');
  fs.mkdirSync('src/Infrastructure');
  fs.writeFileSync('env-vars.json', '{}');
};
