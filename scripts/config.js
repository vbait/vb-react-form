const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const pkg = require(path.join(process.cwd(), 'package.json'));
const dllPath = 'node_modules/vb-react-form-dlls';

const config = {
  pkg: pkg,
  name: 'vb-react-form-dlls',
  dependencies: pkg.dependencies,
  dllPath: dllPath,
  manifestPath: path.resolve(dllPath, 'vbReactFormDeps.json'),
  dllManifestPath: path.resolve(dllPath, 'package.json')
};

module.exports = config;