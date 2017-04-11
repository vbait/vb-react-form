require('shelljs/global');

const path = require('path');
const fs = require('fs');
const config = require('./config');
const exists = fs.existsSync;
const writeFile = fs.writeFileSync;

const defaults = require('lodash/defaultsDeep');

/**
 * I use node_modules/react-boilerplate-dlls by default just because
 * it isn't going to be version controlled and babel wont try to parse it.
 */
mkdir('-p', config.dllPath);

echo('Building the Webpack DLL...');

/**
 * Create a manifest so npm install doesn't warn us
 */
if (!exists(config.dllManifestPath)) {
  writeFile(
    config.dllManifestPath,
    JSON.stringify(defaults({
      name: config.name,
      private: true,
      author: config.pkg.author,
      repository: config.pkg.repository,
      version: config.pkg.version,
    }), null, 2),
    'utf8'
  );
}

// the BUILDING_DLL env var is set to avoid confusing the development environment
exec('cross-env BUILDING_DLL=true webpack --display-chunks --color --config internals/webpack/webpack.dll.babel.js');
