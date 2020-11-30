import fs from 'fs';

export const generateTestingSuiteFiles = (options: any) => {
  const { testSuite } = options;
  if (testSuite === 'Mocha (default)') {
    fs.copyFileSync(
      '../sam-typescript-bootstrap/src/__tests__/MochaTestTemplate.spec.ts',
      'src/__tests__/TestFunction.spec.ts',
    );
  }
};
