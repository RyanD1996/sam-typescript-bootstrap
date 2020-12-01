### Sam-typescript-bootstrap

This is a CLI npm package for creating a simple AWS Serverless project using the [SAM](https://aws.amazon.com/serverless/sam/). The package will ask a series of questions and generate the required files and configuration that makes up a project with the following features:

- Typescript to JS transpiling, using webpack to create a `dist` folder containing the JS source code for the project to be deployed.
- Unit testing library (Mocha/Chai/Sinon OR Jest) and sample unit test file setup.
- Cloudformation template provisioning a simple lambda
- Simple API [Swagger](https://swagger.io/) documentation for the simple lambda that is created

#### Using the package

Installing the package globally
`npm i -g sam-typescript-bootstrap`

Run the `sam-bootstrap` command to start the CLI package, follow the instructions and the files will be generated in the directory that the CLI package was started in.

Once the files are generated, it is important to install the packages:
`npm i`

Then build the bootstrap files for the example lambda:
`npm run build:local`

Once the the build is complete run the following command to start the application:
`npm run start:local`

At this point you should be able to test the lambda is running correctly by performing a GET to the local endpoint that the lambda is running on, which will be displayed on the CLI.

For example:
`GET: http://127.0.0.1:3000/test`

Will return a 200 response:

    {
      "message": "OK"
    }

#### Notes/Todo

- Add ability to generate a simple frontend react-create-app project using AWS SAM
- Clean up the source code of this project, as it is still a WIP.
- Add custom domain for API.
- Automation tests (using [cucumber](https://cucumber.io/docs/cucumber/))

Any suggestions on features/improvements are welcome.
