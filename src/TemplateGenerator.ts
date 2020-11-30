import yaml from 'js-yaml';
import fs from 'fs';

export const generateBackendTemplate = (options: any) => {
  const { description, endpointType } = options;
  const data = {
    AWSTemplateFormatVersion: '2010-09-09',
    Description: description,
    Transform: 'AWS::Serverless-2016-10-31',

    Resources: {
      TestFunction: {
        Type: 'AWS::Serverless::Function',
        Properties: {
          CodeUri: './dist',
          Handler: 'TestFunction.default',
          Runtime: 'nodejs12.x',
          Timeout: 10,
          MemorySize: 128,
          Events: {
            TestFunctionApiEvent: {
              Type: 'Api',
              Properties: {
                Path: '/test',
                Method: 'get',
              },
            },
          },
        },
      },
    },
  };

  const yamlStr = yaml.safeDump(data);
  fs.writeFileSync('template.yaml', yamlStr, 'utf-8');
};

export const generateFrontendTemplate = (options: any) => {
  return true;
};
