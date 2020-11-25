import fs from 'fs';

export const generateTsConfig = (options: any) => {
  const data = {
    compilerOptions: {
      module: 'commonjs',
      resolveJsonModule: true,
      esModuleInterop: true,
      target: 'es6',
      sourceMap: true,
      outDir: 'dist',
      noImplicitAny: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      strict: true,
      moduleResolution: 'node',
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      lib: ['es2017'],
      allowSyntheticDefaultImports: true,
    },
    exclude: ['node_modules'],
    typesRoot: ['node_modules/@types'],
    include: ['src/**/*'],
  };
  fs.writeFileSync('tsconfig.json', JSON.stringify(data, null, 4), 'utf-8');
};
