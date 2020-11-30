#!/usr/bin/env node
import { generateBackendTemplate, generateFrontendTemplate } from './TemplateGenerator';
import { generatePackageJson } from './PackageJsonGenerator';
import { generateFolderStructure } from './FolderStructureGenerator';
import { generateOpenApiDefinition } from './OpenApiGenerator';
import { generateWebpackFiles } from './WebpackGenerator';
import { generateTsConfig } from './TsConfigGenerator';
import { generateTestLambdaFunction } from './TestFunctionGenerator';
import { generateTestingSuiteFiles } from './TestSuiteGenerator';

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { Command } from 'commander';
import inquirer from 'inquirer';

clear();

const program = new Command();

program.version('0.0.1');

console.log(chalk.green(figlet.textSync('sam-bootstrap', { horizontalLayout: 'full' })));

const start = async () => {
  const projectNameResponse = await inquirer.prompt([
    {
      type: 'input',
      message: 'Project name?',
      name: 'name',
    },
  ]);

  const authorNameResponse = await inquirer.prompt([
    {
      type: 'input',
      message: 'Author name?',
      name: 'name',
    },
  ]);

  const projectTypeResponse = await inquirer.prompt([
    {
      type: 'list',
      message: 'frontend or backend?',
      name: 'projectType',
      choices: ['frontend (WIP)', 'backend'],
      validate: function (answer: any) {
        if (!answer.length) return 'You must select an option';
        return true;
      },
    },
  ]);

  let applicationDescription: any;

  if (projectTypeResponse.projectType === 'frontend (WIP)') {
    console.log('Frontend template is still a work in progres...');
    return;
  }

  if (projectTypeResponse.projectType === 'backend') {
    applicationDescription = await inquirer.prompt([
      {
        type: 'input',
        message: 'Description for the application?',
        name: 'description',
        validate: (answer: any) => {
          if (!answer.length) return 'You enter a description';
          return true;
        },
      },
    ]);

    const endpointConfigurationResponse = await inquirer.prompt([
      {
        type: 'list',
        message: 'What endpoint configuration should the API have?',
        name: 'endpointType',
        choices: ['REGIONAL', 'EDGE'],
        validate: (answer: any) => {
          if (!answer.length) return 'You must select an option';
          return true;
        },
      },
    ]);
    generateBackendTemplate({
      description: applicationDescription.description,
      endpointType: endpointConfigurationResponse.endpointType,
    });
  }

  const testingSuiteConfigurationResponse = await inquirer.prompt([
    {
      type: 'list',
      message: 'What testing suite would you like the API to use?',
      name: 'suite',
      choices: ['Mocha (default)', 'Jest'],
      validate: (answer: any) => {
        if (!answer.length) return 'You must select an option';
        return true;
      },
    },
  ]);

  generateFolderStructure({});

  generateTestingSuiteFiles({ testSuite: testingSuiteConfigurationResponse.suite });

  generatePackageJson({
    projectName: projectNameResponse.name,
    author: authorNameResponse.name,
    description: applicationDescription.description,
    testSuite: testingSuiteConfigurationResponse.suite,
  });

  generateOpenApiDefinition({
    projectName: projectNameResponse.name,
    projectDescription: applicationDescription.description,
  });

  generateWebpackFiles();

  generateTsConfig({});

  generateTestLambdaFunction({});
};

start();
