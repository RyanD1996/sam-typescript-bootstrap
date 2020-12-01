import fs from 'fs';

export const generateTestingSuiteFiles = (options: any) => {
  const { testSuite } = options;
  if (testSuite === 'Mocha (default)') {
    fs.copyFileSync(
      '../sam-typescript-bootstrap/src/__tests__/Mocha/MochaTestTemplate.spec.ts',
      'src/__tests__/TestFunction.spec.ts',
    );
  }

  if (testSuite === 'Jest') {
    fs.copyFileSync(
      '../sam-typescript-bootstrap/src/__tests__/Jest/JestTestTemplate.spec.ts',
      'src/__tests__/TestFunction.spec.ts',
    );
    fs.copyFileSync('../sam-typescript-bootstrap/src/__tests__/Jest/JestConfig.js', 'jest.config.js');
  }
};
