#!/usr/bin/env node
import { generateBackendTemplate, generateFrontendTemplate } from './TemplateGenerator';
import { generatePackageJson } from './PackageJsonGenerator';
import { generateFolderStructure } from './FolderStructureGenerator';
import { generateOpenApiDefinition } from './OpenApiGenerator';
import { generateWebpackFiles } from './WebpackGenerator';
import { generateTsConfig } from './TsConfigGenerator';
import { generateTestLambdaFunction } from './TestFunctionGenerator';
import { generateTestingSuiteFiles } from './TestSuiteGenerator';

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const path = require('path');
const { Command } = require('commander');
const inquirer = require('inquirer');

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
        validate: function (answer: any) {
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
        validate: function (answer: any) {
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
      validate: function (answer: any) {
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

//   .catch((error: any) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else when wrong
//     }
//   });
