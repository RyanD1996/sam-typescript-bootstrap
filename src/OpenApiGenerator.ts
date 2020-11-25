import yaml from 'js-yaml';
import fs from 'fs';

export const generateOpenApiDefinition = (options: any) => {
  const { projectName, projectDescription } = options;
  const data = {
    openapi: '3.0.0',
    info: {
      title: projectName,
      description: projectDescription,
      version: '0.0.1',
    },
    paths: {
      '/test': {
        get: {
          summary: 'Default test function',
          responses: {
            '200': {
              description: 'A successful response',
            },
            '500': {
              description: 'An unsuccessful response',
            },
          },
        },
      },
    },
  };

  const yamlStr = yaml.safeDump(data);
  fs.writeFileSync('openApiDefinition.yaml', yamlStr, 'utf-8');
};
