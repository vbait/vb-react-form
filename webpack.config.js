function buildConfig(env) {
  return require('./webpack/' + env + '.js')({ env: env })
}

module.exports = buildConfig;