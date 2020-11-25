import fs from 'fs';

export const generateWebpackFiles = () => {
  fs.copyFileSync('../sam-typescript-bootstrap/src/Webpack/WebpackTemplate.js', 'webpack.common.js');
  fs.copyFileSync('../sam-typescript-bootstrap/src/Webpack/WebpackLocalTemplate.js', 'webpack.local.js');
  fs.copyFileSync('../sam-typescript-bootstrap/src/Webpack/WebpackDeployTemplate.js', 'webpack.deploy.js');
};
