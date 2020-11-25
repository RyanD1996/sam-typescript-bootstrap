import fs from "fs";

export const generatePackageJson = (options: any) => {
  const { projectName, author, description, testSuite } = options;
  const data = {
    name: projectName,
    author,
    version: "1.0.0",
    description,
    main: "index.js",
    types: "index.d.ts",
    scripts: {
      "build:local":
        "npm --prefix ./dist install source-map-support && npx webpack --config webpack.local.js",
      "build:local:watch":
        "npm --prefix ./dist install source-map-support && npx webpack --config webpack.local.js --watch",
      "start:local": "sam local start-api --env-vars env-vars.json",
      build:
        "npm --prefix ./dist install source-map-support && npx webpack --config webpack.deploy.js",
      test: 'NODE_ENV=test mocha -r ts-node/register "./src/**/*.spec.ts"',
      "test:coverage": "nyc npm t",
      "test:coverage:report":
        "nyc report --reporter=clover && nyc report --reporter=lcov",
      cucumber:
        'cd acceptance_tests && tsc && cucumber-js features/*.feature  --require "dist/**/*.js"',
      lint: "eslint 'src/**/*.ts' --fix",
    },
    license: "MIT",
    devDependencies: {
      "@types/node": "^14.14.9",
      "@types/chai": "^4.2.3",
      "@types/chai-as-promised": "^7.1.2",
      "@types/mocha": "^8.0.3",
      "@types/sinon": "^9.0.8",
      chai: "^4.2.0",
      cucumber: "^6.0.5",
      "chai-as-promised": "^7.1.1",
      "chai-http": "^4.3.0",
      mocha: "^8.2.0",
      nyc: "^15.1.0",
      sinon: "^9.2.0",
      "ts-node": "^9.0.0",
      tslint: "^6.1.3",
      typescript: "^4.1.2",
    },
    dependencies: {
      "@types/aws-lambda": "^8.10.33",
      "aws-sdk": "^2.775.0",
      husky: "^4.3.0",
      "lint-staged": "^10.4.2",
      "ts-loader": "^8.0.6",
      webpack: "^4.43.0",
      "webpack-cli": "^3.3.11",
      "webpack-merge": "^4.2.2",
      "webpack-node-externals": "^1.7.2",
    },
    "lint-staged": {
      "*.js": ["eslint --fix", "git add"],
      "*.ts": ["eslint --fix", "git add"],
    },
    nyc: {
      include: ["src"],
      all: true,
      extension: [".ts"],
    },
  };
  fs.writeFileSync("package.json", JSON.stringify(data, null, 4), "utf-8");
};
